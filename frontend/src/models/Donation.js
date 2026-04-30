import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ngoId: { type: mongoose.Schema.Types.ObjectId, ref: 'NGO' },
  volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  foodName: String,
  quantity: Number,
  expiryTime: Date,
  pickupLocation: String,
  status: {
    type: String,
    enum: ['available', 'claimed', 'in_transit', 'delivered', 'expired'],
    default: 'available'
  },
  foodImage: String,
  description: String,
  dietaryInfo: String,
  carbonFootprintSaved: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  claimedAt: Date,
  deliveredAt: Date
});

export default mongoose.model('Donation', donationSchema);
