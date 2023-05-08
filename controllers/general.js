import jwt from "jsonwebtoken"

import User from "../models/User.js";
import OverallStat from "../models/OverallStat.js";
import Transaction from "../models/Transaction.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // hardcoded values
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";

    /* Recent Transactions */
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });

    /* Overall Stats */
    const overallStat = await OverallStat.find({ year: currentYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat[0];

    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postLoginUser = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let token = null
    const user = await User.findOne({ email });

    if (user && user.password === password) {
      const id = user._id
      if (user.role === "superadmin" || user.role === "admin") {
        token = jwt.sign({ id }, process.env.SECRET, {
          expiresIn: 60 * 60 * 24
        });
      }
      res.status(200).json({ token: token, message: "login with success", user: { ...user._doc } });
    } else {
      res.status(404).json({ email, message: "user don't find" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postRegisterUser = async (req, res) => {
  try {
    let userData = { ...req.body }

    const user = await User.findOne({ email: userData.email });
    if (user) return res.status(404).json({ email: userData.email, message: "user already exist" });

    const createUser = await User.create({ ...userData })
    res.status(200).json({ user: { ...createUser._doc }, message: "register with success" });

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}