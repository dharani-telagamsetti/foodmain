import User from '../models/User.js';
import Donation from '../models/Donation.js';

// Badge system
const BADGES = {
  'first-order': { name: 'First Order', icon: '🎯', points: 10 },
  'generous-donor': { name: 'Generous Donor', icon: '🤝', points: 50, requirement: 10 }, // 10 donations
  'super-volunteer': { name: 'Super Volunteer', icon: '⚡', points: 100, requirement: 50 }, // 50 deliveries
  'eco-warrior': { name: 'Eco Warrior', icon: '🌱', points: 75, requirement: 100 }, // 100kg CO2 saved
  'meal-saver': { name: 'Meal Saver', icon: '🍽️', points: 50, requirement: 50 }, // 50 meals saved
  'community-hero': { name: 'Community Hero', icon: '🦸', points: 200, requirement: 100 }, // 100 orders
};

export const awardBadge = async (userId, badgeKey) => {
  try {
    const badge = BADGES[badgeKey];
    if (!badge) return;

    const user = await User.findByIdAndUpdate(userId, {
      $addToSet: { badges: badgeKey },
      $inc: { points: badge.points }
    }, { new: true });

    return user;
  } catch (error) {
    console.error('Badge award error:', error);
  }
};

export const checkAndAwardBadges = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) return;

    // Check first order
    if (user.totalOrders === 1) {
      await awardBadge(userId, 'first-order');
    }

    // Check generous donor
    if (user.totalDonations >= 10 && !user.badges.includes('generous-donor')) {
      await awardBadge(userId, 'generous-donor');
    }

    // Check meal saver
    const donations = await Donation.find({ donorId: userId });
    const mealsSaved = donations.reduce((sum, d) => sum + (d.estimatedMealsSaved || 0), 0);
    if (mealsSaved >= 50 && !user.badges.includes('meal-saver')) {
      await awardBadge(userId, 'meal-saver');
    }

    // Check community hero
    if (user.totalOrders >= 100 && !user.badges.includes('community-hero')) {
      await awardBadge(userId, 'community-hero');
    }
  } catch (error) {
    console.error('Badge check error:', error);
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const topUsers = await User.find()
      .select('username fullName points totalOrders totalDonations badges')
      .sort({ points: -1 })
      .limit(50);

    res.json(topUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserStats = async (req, res) => {
  try {
    const userId = req.params.userId || req.user.userId;
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const donations = await Donation.find({ donorId: userId });
    const deliveredDonations = donations.filter(d => d.status === 'delivered');
    const mealsSaved = donations.reduce((sum, d) => sum + (d.estimatedMealsSaved || 0), 0);
    const carbonSaved = donations.reduce((sum, d) => sum + (d.carbonFootprintSaved || 0), 0);

    res.json({
      user,
      stats: {
        totalDonations: user.totalDonations,
        totalOrders: user.totalOrders,
        mealsSaved,
        carbonSavedKg: carbonSaved.toFixed(2),
        successfulDeliveries: deliveredDonations.length,
        badges: user.badges.map(b => BADGES[b]),
        rank: await User.countDocuments({ points: { $gt: user.points } }) + 1,
        nextBadge: getNextBadge(user)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNextBadge = (user) => {
  const achieved = user.badges || [];
  for (const [key, badge] of Object.entries(BADGES)) {
    if (!achieved.includes(key) && badge.requirement) {
      return { key, ...badge };
    }
  }
  return null;
};

export const getBadges = (req, res) => {
  res.json(BADGES);
};
