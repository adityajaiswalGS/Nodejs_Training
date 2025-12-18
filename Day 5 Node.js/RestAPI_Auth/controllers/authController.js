import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  try {
    const { name, address, mobileNo, password } = req.body;
    const user = await User.create({ name, address, mobileNo, password });
    res.status(201).json({ message: "User created", id: user.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    // req.user.id comes from the decoded JWT in our middleware
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] } // Don't send the hashed password back
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


export const login = async (req, res) => {
  try {
    const { mobileNo, password } = req.body;
    const user = await User.findOne({ where: { mobileNo } });

    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '60s' }
    );

    res.json({ message: "Success", token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};