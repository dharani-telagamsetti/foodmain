import Order from '../models/Order.js';
import QRCode from 'qrcode';
import { Buffer } from 'node:buffer';
import { asyncHandler } from '../utils/asyncHandler.js';

const makeOrderQrPayload = (order) => {
  const payload = {
    type: 'food-order',
    orderId: order._id.toString(),
    userId: order.userId.toString(),
    orderNumber: order.orderNumber,
    issuedAt: new Date().toISOString()
  };
  return `FOODAPP:${Buffer.from(JSON.stringify(payload)).toString('base64url')}`;
};

const parseOrderQrPayload = (rawValue = '') => {
  if (rawValue.startsWith('FOODAPP:')) {
    const encoded = rawValue.slice('FOODAPP:'.length);
    const decoded = Buffer.from(encoded, 'base64url').toString('utf-8');
    const payload = JSON.parse(decoded);
    if (payload?.type !== 'food-order' || !payload?.orderId) {
      throw new Error('Invalid QR payload');
    }
    return payload;
  }
  if (rawValue.startsWith('ORDER-')) {
    const parts = rawValue.split('-');
    return { type: 'food-order', orderId: parts[1], userId: parts[2] };
  }
  throw new Error('Unsupported QR format');
};

export const scanOrder = asyncHandler(async (req, res) => {
  const { qrText } = req.body;
  if (!qrText) {
    res.status(400);
    throw new Error('qrText is required');
  }

  try {
    const parsed = parseOrderQrPayload(qrText);
    const order = await Order.findById(parsed.orderId).populate('userId', 'username fullName email phone role');
    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }

    return res.json({
      message: 'QR verified successfully',
      order: {
        id: order._id,
        orderNumber: order.orderNumber,
        items: order.items,
        totalAmount: order.totalAmount,
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
        pickupSlot: order.pickupSlot,
        createdAt: order.createdAt,
        expiresAt: order.expiresAt
      },
      person: {
        id: order.userId?._id,
        username: order.userId?.username,
        fullName: order.userId?.fullName || order.userId?.username,
        email: order.userId?.email,
        phone: order.userId?.phone || '',
        role: order.userId?.role
      }
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message || 'Invalid QR');
  }
});

export const createOrder = asyncHandler(async (req, res) => {
  const { items, totalAmount, pickupSlot } = req.body;
  const order = new Order({
    userId: req.user._id,
    items,
    totalAmount,
    pickupSlot,
    expiresAt: new Date(Date.now() + 4 * 60 * 60 * 1000)
  });

  order.orderNumber = `ORD-${Date.now().toString().slice(-8)}-${Math.floor(Math.random() * 900 + 100)}`;
  const qrData = makeOrderQrPayload(order);
  order.qrCode = await QRCode.toDataURL(qrData, {
    errorCorrectionLevel: 'H',
    width: 360,
    margin: 2
  });

  await order.save();

  // Emitting new order event to admins via socket
  if (req.app.get('io')) {
    req.app.get('io').emit('orderCreated', order);
  }

  res.status(201).json({ message: 'Order created successfully', order });
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

export const getAdminOrders = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const count = await Order.countDocuments();
  const orders = await Order.find()
    .populate('userId', 'username fullName email phone role')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.json({ orders, page, pages: Math.ceil(count / limit), total: count });
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { orderStatus: req.body.status || 'picked_up' },
    { new: true }
  ).populate('userId', 'username fullName email phone role');

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  if (req.app.get('io')) {
    req.app.get('io').emit('orderUpdated', order);
  }

  res.json({ message: 'Order status updated', order });
});
