const mongoose = require('mongoose');
const User = require('./models/user'); // adjust path if needed
const dotenv = require('dotenv');
dotenv.config(); // <-- Load env variables before using them

// connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seedUsers() {
  try {
    // clear old data
    await User.deleteMany({});

    // sample citizen users
    const users = [
      {
        name: "Arun Kumar",
        phone: "9876543210",
        citizenId: "CIT-EB-001",
        dob: new Date("1992-05-15"),
        location: "Anna Nagar, Chennai",
        gender: "Male",
        email: "arun.kumar@example.com",
      },
      {
        name: "Priya Ramesh",
        phone: "9898989898",
        citizenId: "CIT-PWD-002",
        dob: new Date("1995-08-22"),
        location: "Besant Nagar, Chennai",
        gender: "Female",
        email: "priya.ramesh@example.com",
      },
      {
        name: "Sanjay Mehta",
        phone: "9123456789",
        citizenId: "CIT-EB-003",
        dob: new Date("1987-01-12"),
        location: "T. Nagar, Chennai",
        gender: "Male",
        email: "sanjay.mehta@example.com",
      },
      {
        name: "Lakshmi Devi",
        phone: "9000090000",
        citizenId: "CIT-PWD-004",
        dob: new Date("1990-11-03"),
        location: "Mylapore, Chennai",
        gender: "Female",
        email: "lakshmi.devi@example.com",
      },
    ];

    await User.insertMany(users);
    console.log("✅ Citizens added successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding users:", err);
  }
}

seedUsers();