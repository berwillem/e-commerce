const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Registration endpoint
exports.register = async (req, res) => {
  const { username, password, email } = req.body;

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res.status(400).json({ error: "Username or email already exists" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ username, password: hashedPassword, email });
    await user.save();
    res.json({ message: "Registration successful!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login endpoint
exports.login = async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const userWithoutPassword = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: "3h",
    });
    // Send the user without the password in the response
    res.json({ user: userWithoutPassword, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
