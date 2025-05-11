const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const TimeLog = require('./models/TimeLog');

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch((err) => {
  console.error('❌ MongoDB connection failed:', err);
});

// POST endpoint to receive logs from Chrome extension
app.post('/log', async (req, res) => {
  try {
    const { domain, duration, timestamp } = req.body;

    // Create a new document in MongoDB
    const newLog = new TimeLog({
      domain,
      duration,
      timestamp: new Date(timestamp)
    });

    await newLog.save(); // Save to DB
    res.status(200).json({ message: 'Log saved successfully ✅' });

  } catch (error) {
    console.error('❌ Error saving log:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Health check route
app.get('/', (req, res) => {
  res.send('🟢 Time Tracker API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});

// GET all logs for dashboard
app.get('/logs', async (req, res) => {
  try {
    const logs = await TimeLog.find().sort({ timestamp: -1 }).limit(1000);
    res.status(200).json(logs);
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ message: 'Failed to fetch logs' });
  }
});
