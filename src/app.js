const express = require('express')

const authRoutes = require('./models/routes/auth.routes')

const cookieParser = require('cookie-parser')
const app = express()

app.use(express.json())
app.use(cookieParser())

// Use auth routes

app.use('/api/auth', authRoutes)

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Social Media API')
})

// More routes can be added here
