import mongoose from 'mongoose';

// User Schema with roles
const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true,
    lowercase: true 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['student', 'canteen', 'ngo', 'volunteer', 'admin'],
    default: 'student'
  },
  fullName: String,
  phone: String,
  location: String,
  profileImage: String,
  isVerified: { type: Boolean, default: false },
  badges: [String],
  points: { type: Number, default: 0 },
  totalDonations: { type: Number, default: 0 },
  totalOrders: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
