import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  ngoId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  foodName: { type: String, required: true },
  quantity: { type: Number, required: true },
  description: String,
  dietaryInfo: String,
  expiryTime: Date,
  pickupLocation: String,
  foodImage: String,
  status: { type: String, enum: ['available', 'claimed', 'in_transit', 'delivered', 'expired', 'cancelled'], default: 'available', index: true },
  carbonFootprintSaved: { type: Number, default: 0 },
  estimatedMealsSaved: { type: Number, default: 1 },
  claimedAt: Date,
  deliveredAt: Date
}, { timestamps: true });

const Donation = mongoose.model('Donation', donationSchema);
export default Donation;
