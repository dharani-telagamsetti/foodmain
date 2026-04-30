import Donation from '../models/Donation.js';
import User from '../models/User.js';

export const createDonation = async (req, res) => {
  try {
    const { foodName, quantity, description, dietaryInfo, expiryTime, pickupLocation, foodImage } = req.body;

    if (!foodName || !quantity) {
      return res.status(400).json({ error: 'Food name and quantity required' });
    }

    const donation = new Donation({
      donorId: req.user.userId,
      foodName,
      quantity,
      description,
      dietaryInfo,
      expiryTime: new Date(expiryTime),
      pickupLocation,
      foodImage,
      estimatedMealsSaved: quantity,
      carbonFootprintSaved: quantity * 2.5 // kg CO2 per meal
    });

    await donation.save();

    // Add points to donor
    await User.findByIdAndUpdate(req.user.userId, {
      $inc: { points: 50, totalDonations: 1 }
    });

    res.status(201).json({ message: 'Donation posted successfully', donation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAvailableDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ status: 'available' })
      .populate('donorId', 'fullName profileImage')
      .sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const claimDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      {
        status: 'claimed',
        ngoId: req.body.ngoId,
        claimedAt: new Date()
      },
      { new: true }
    );

    // Award points
    await User.findByIdAndUpdate(req.user.userId, {
      $inc: { points: 25 }
    });

    res.json({ message: 'Donation claimed successfully', donation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deliverDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      {
        status: 'delivered',
        deliveredAt: new Date()
      },
      { new: true }
    );

    // Award volunteer points
    if (donation.volunteerId) {
      await User.findByIdAndUpdate(donation.volunteerId, {
        $inc: { points: 100 }
      });
    }

    res.json({ message: 'Donation delivered successfully', donation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donorId: req.user.userId }).sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
