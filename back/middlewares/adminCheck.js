const User = require("../models/user");

exports.adminCheck = async (req, res, next) => {
  const { userid } = req.body;
  try {
    const user = await User.findById(userid);
    if (user.role !== "admin") {
      return res.status(401).json("you dont have permision");
    }
    next();
  } catch (err) {
    res.status(500).json(err.message);
  }
};
