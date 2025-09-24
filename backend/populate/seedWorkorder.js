const mongoose = require('mongoose');
const WorkOrder = require('../models/workorder'); // adjust path if needed
const dotenv = require('dotenv');
dotenv.config();

// connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seedWorkOrders() {
  try {
    // clear old data
    await WorkOrder.deleteMany({});

    // sample work orders
    const workOrders = [
      {
        workOrderId: "WO-1001",
        task: "Transformer Maintenance",
        details: "Routine check and oil level inspection.",
        location: "Anna Nagar, Chennai",
        assignedTo: "Engineer Suresh",
        priority: "High",
        status: "Open"
      },
      {
        workOrderId: "WO-1002",
        task: "Street Light Repair",
        details: "Replace faulty bulbs and check wiring.",
        location: "Besant Nagar, Chennai",
        assignedTo: "Technician Priya",
        priority: "Medium",
        status: "In Progress"
      },
      {
        workOrderId: "WO-1003",
        task: "Substation Inspection",
        details: "Check for overheating and loose connections.",
        location: "T. Nagar, Chennai",
        assignedTo: "Engineer Arjun",
        priority: "Critical",
        status: "Open"
      },
      {
        workOrderId: "WO-1004",
        task: "Meter Replacement",
        details: "Replace old meters with digital meters.",
        location: "Mylapore, Chennai",
        assignedTo: "Technician Lakshmi",
        priority: "Low",
        status: "Completed"
      }
    ];

    await WorkOrder.insertMany(workOrders);
    console.log("✅ Work orders added successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding work orders:", err);
  }
}

seedWorkOrders();