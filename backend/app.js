const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')

const app = express();
const port = 3000;
dotenv.config();

const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Connected to MongoDB via Mongoose'));

const testSchema = new mongoose.Schema({
  name: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const TestData = mongoose.model('TestData', testSchema);

app.get('/api/add', async (req, res) => {
  try {
    const testData = new TestData({
      name: 'Test User from GET',
      message: 'Inserted data using GET endpoint',
    });
    const saved = await testData.save();
    res.send({ insertedId: saved._id });
  } catch (err) {
    res.status(500).send('Insert error: ' + err.message);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
