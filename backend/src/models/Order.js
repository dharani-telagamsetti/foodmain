import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  items: [{ itemId: Number, name: String, quantity: Number, price: Number }],
  totalAmount: { type: Number, required: true },
  orderStatus: { type: String, enum: ['placed', 'confirmed', 'ready', 'picked_up', 'cancelled'], default: 'placed', index: true },
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  pickupSlot: String,
  qrCode: String,
  expiresAt: Date
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
