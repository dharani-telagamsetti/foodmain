import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getLeaderboard = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const count = await User.countDocuments();
  const topUsers = await User.find()
    .select('username fullName points totalOrders totalDonations')
    .sort({ points: -1 })
    .skip(skip)
    .limit(limit);

  res.json({ users: topUsers, page, pages: Math.ceil(count / limit), total: count });
});
