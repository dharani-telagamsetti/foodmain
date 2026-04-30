import Order from '../models/Order.js';
import QRCode from 'qrcode';

export const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, pickupSlot, specialInstructions } = req.body;

    const order = new Order({
      userId: req.user.userId,
      items,
      totalAmount,
      pickupSlot,
      specialInstructions
    });

    // Generate QR code for order
    const qrData = `ORDER-${order._id}-${req.user.userId}`;
    const qrCode = await QRCode.toDataURL(qrData);
    order.qrCode = qrCode;

    // Set expiry to 4 hours
    order.expiresAt = new Date(Date.now() + 4 * 60 * 60 * 1000);

    await order.save();

    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    if (order.userId.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: status, pickedUpAt: status === 'picked_up' ? new Date() : undefined },
      { new: true }
    );
    res.json({ message: 'Order updated', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: 'cancelled' },
      { new: true }
    );
    res.json({ message: 'Order cancelled', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
