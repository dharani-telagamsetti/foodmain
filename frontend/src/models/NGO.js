import mongoose from 'mongoose';

const ngoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  address: String,
  city: String,
  latitude: Number,
  longitude: Number,
  registrationNumber: { type: String, unique: true },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  logoUrl: String,
  description: String,
  beneficiariesCount: { type: Number, default: 0 },
  totalMealsServed: { type: Number, default: 0 },
  rating: { type: Number, default: 4.5, min: 0, max: 5 },
  operatingHours: {
    open: String,
    close: String
  },
  acceptedFoodTypes: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('NGO', ngoSchema);
