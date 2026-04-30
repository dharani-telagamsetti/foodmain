import User from '../models/User.js';
import Order from '../models/Order.js';
import Donation from '../models/Donation.js';

export const getDashboardAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalDonations = await Donation.countDocuments();
    const deliveredDonations = await Donation.countDocuments({ status: 'delivered' });

    // Calculate totals
    const allOrders = await Order.find({ orderStatus: 'picked_up' });
    const totalRevenue = allOrders.reduce((sum, o) => sum + o.totalAmount, 0);

    const allDonations = await Donation.find();
    const totalMealsSaved = allDonations.reduce((sum, d) => sum + (d.estimatedMealsSaved || 0), 0);
    const totalCarbonSaved = allDonations.reduce((sum, d) => sum + (d.carbonFootprintSaved || 0), 0);

    // Orders per day (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const ordersLast30 = await Order.find({ createdAt: { $gte: thirtyDaysAgo } });
    
    const ordersPerDay = {};
    for (let i = 0; i < 30; i++) {
      const date = new Date(thirtyDaysAgo);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      ordersPerDay[dateStr] = ordersLast30.filter(
        o => o.createdAt.toISOString().split('T')[0] === dateStr
      ).length;
    }

    // Users growth (last 12 months)
    const twelveMonthsAgo = new Date(Date.now() - 12 * 30 * 24 * 60 * 60 * 1000);
    const usersLastYear = await User.find({ createdAt: { $gte: twelveMonthsAgo } });
    
    const usersPerMonth = {};
    for (let i = 0; i < 12; i++) {
      const date = new Date(twelveMonthsAgo);
      date.setMonth(date.getMonth() + i);
      const monthStr = date.toISOString().slice(0, 7);
      usersPerMonth[monthStr] = usersLastYear.filter(
        u => u.createdAt.toISOString().slice(0, 7) === monthStr
      ).length;
    }

    // Top donors
    const topDonors = await User.find()
      .select('username fullName totalDonations points')
      .sort({ totalDonations: -1 })
      .limit(5);

    // Donation status breakdown
    const donationsByStatus = {
      available: await Donation.countDocuments({ status: 'available' }),
      claimed: await Donation.countDocuments({ status: 'claimed' }),
      in_transit: await Donation.countDocuments({ status: 'in_transit' }),
      delivered: await Donation.countDocuments({ status: 'delivered' }),
      expired: await Donation.countDocuments({ status: 'expired' })
    };

    res.json({
      kpis: {
        totalUsers,
        totalOrders,
        totalDonations,
        deliveredDonations,
        totalRevenue,
        totalMealsSaved,
        totalCarbonSavedKg: totalCarbonSaved.toFixed(2)
      },
      charts: {
        ordersPerDay,
        usersPerMonth,
        donationsByStatus
      },
      topDonors,
      systemHealth: {
        dbConnected: true,
        lastUpdate: new Date()
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserAnalytics = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    const userOrders = await Order.find({ userId });
    const userDonations = await Donation.find({ donorId: userId });

    const spentOnOrders = userOrders.reduce((sum, o) => sum + o.totalAmount, 0);
    const mealsSaved = userDonations.reduce((sum, d) => sum + (d.estimatedMealsSaved || 0), 0);
    const carbonSaved = userDonations.reduce((sum, d) => sum + (d.carbonFootprintSaved || 0), 0);

    res.json({
      user: { username: user.username, role: user.role, points: user.points },
      orders: userOrders.length,
      donations: user.totalDonations,
      spentOnOrders,
      mealsSaved,
      carbonSavedKg: carbonSaved.toFixed(2),
      badges: user.badges || [],
      recentOrders: userOrders.slice(-5),
      recentDonations: userDonations.slice(-5)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
