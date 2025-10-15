import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';

// REGISTER
export async function registerController(req, res) {
  try {
    const { username, password } = req.body;

    const existingUser = await userModel.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    // Hash the password BEFORE saving
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new userModel({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    // Respond without password
    const userResponse = {
      _id: newUser._id,
      username: newUser.username,
    };

    res.status(201).json({ message: 'User registered successfully', user: userResponse });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

// LOGIN
export async function loginController(req, res) {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Compare entered password with hashed password in DB
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send token and user info (without password)
    res.status(200).json({
      message: 'Login successful',
      token,
      user: { _id: user._id, username: user.username },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
