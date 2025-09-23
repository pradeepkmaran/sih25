const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
const port = 3000;
dotenv.config();

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Connected to MongoDB via Mongoose'));

// Import models
const Complaint = require('./models/complaint');
const User = require('./models/user');
const Department = require('./models/department');
const Branch = require('./models/branch');
const Employee = require('./models/employee');

app.get('/api/complaints', async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.send(complaints);
  } catch (err) {
    res.status(500).send('Fetch error: ' + err.message);
  }
});

app.post('/api/complaints', async (req, res) => {
  try {
    const complaint = new Complaint({
      ...req.body
      // Example: title, description, reportedBy, department, etc.
    });
    const saved = await complaint.save();
    res.send({ insertedId: saved._id });
  } catch (err) {
    res.status(500).send('Insert error: ' + err.message);
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send('Fetch error: ' + err.message);
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    const saved = await user.save();
    res.send({ insertedId: saved._id });
  } catch (err) {
    res.status(500).send('User insert error: ' + err.message);
  }
});

app.get('/api/departments', async (req, res) => {
  try {
    const departments = await Department.find();
    res.send(departments);
  } catch (err) {
    res.status(500).send('Fetch error: ' + err.message);
  }
});

app.post('/api/departments', async (req, res) => {
  try {
    const department = new Department(req.body);
    const saved = await department.save();
    res.send({ insertedId: saved._id });
  } catch (err) {
    res.status(500).send('Department insert error: ' + err.message);
  }
});

app.get('/api/branches', async (req, res) => {
  try {
    const branches = await Branch.find();
    res.send(branches);
  } catch (err) {
    res.status(500).send('Fetch error: ' + err.message);
  }
});

app.post('/api/branches', async (req, res) => {
  try {
    const branch = new Branch(req.body);
    const saved = await branch.save();
    res.send({ insertedId: saved._id });
  } catch (err) {
    res.status(500).send('Branch insert error: ' + err.message);
  }
});

app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.send(employees);
  } catch (err) {
    res.status(500).send('Fetch error: ' + err.message);
  }
});
app.get('/api/fieldworks', async (req, res) => {
  try {
    const fieldworks = await Employee.find();
    res.send(fieldworks);
  } catch (err) {
    res.status(500).send('Fetch error: ' + err.message);
  }
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});