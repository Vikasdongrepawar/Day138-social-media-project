const express = require('express');


const app = express();

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Social Media API');
});

// More routes can be added here