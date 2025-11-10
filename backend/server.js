const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  console.log('Root route hit!'); // This helps debug
  res.json({ message: 'Welcome to PlantHub API' });
});

app.get('/api/test', (req, res) => {
  console.log('Test route hit!'); // This helps debug
  res.json({ 
    message: 'Backend is working!', 
    timestamp: new Date().toISOString() 
  });
});

// MongoDB connection and server start
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/planthub';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    console.log('📊 Database:', MONGODB_URI);
    
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`🧪 Test the API at: http://localhost:${PORT}/api/test`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });