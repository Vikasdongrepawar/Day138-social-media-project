import dotenv from 'dotenv';
dotenv.config(); // Load .env variables first

import connectDB from './src/db/db.js';
import app from './src/app.js';

connectDB(); // Connect to MongoDB

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
