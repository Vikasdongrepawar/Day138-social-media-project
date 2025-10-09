const userModel = require('../modeles/user.model')

const jwt = require('jsonwebtoken')




async function registerController(req, res) {
  const { username, password } = req.body

  const isUserAlreadyExists = await userModel.findOne({ username })

  if (isUserAlreadyExists) {
    return res.status(400).json({ message: 'User already exists' })
  }

  const newUser = new userModel({ username, password })

  res.status(201).json({ message: 'User registered successfully', user: newUser })
}

async function loginController(req, res) {
  const { username, password } = req.body
}

module.exports = {
  registerController,
  loginController,
}
// api ke andara kya hoga aur kaise hoga uske kaam mein aayenge
