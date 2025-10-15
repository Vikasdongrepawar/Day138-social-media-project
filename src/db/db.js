// src/db/connectDB.js
import mongoose from 'mongoose'

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('✅ Connected to MongoDB')
  } catch (error) {
    console.error(' MongoDB connection failed:', error.message)
  }
}

export default connectDB;
