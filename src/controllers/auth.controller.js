import jwt from 'jsonwebtoken'
import userModel from '../models/user.model.js'

// REGISTER
export async function registerController(req, res) {
  try {
    const { username, password } = req.body
    const isUserAlreadyExists = await userModel.findOne({ username })
    if (isUserAlreadyExists) {
      return res.status(400).json({ message: 'User already exists' })
    }
    const newUser = new userModel({ username, password })
    await newUser.save()

    // Create a user object for the response that doesn't include the password
    const userResponse = {
      _id: newUser._id,
      username: newUser.username,
    }

    res
      .status(201)
      .json({ message: 'User registered successfully', user: userResponse })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// LOGIN
export async function loginController(req, res) {
  try {
    const { username, password } = req.body
    const user = await userModel.findOne({ username })
    if (!user) return res.status(404).json({ message: 'User not found' })
    if (user.password !== password)
      return res.status(401).json({ message: 'Invalid credentials' })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })
    res.cookie('token', token, { httpOnly: true })

    // Create a user object for the response that doesn't include the password
    const userResponse = {
      _id: user._id,
      username: user.username,
    }

    res.status(200).json({ message: 'Login successful', user: userResponse })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
