const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Fieldwork = require('../models/fieldwork');
const Complaint = require('../models/complaint');
const Employee = require('../models/employee');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ Connected to MongoDB for seeding Fieldwork"))
  .catch(err => console.error("❌ DB Connection Error:", err));

async function seedFieldwork() {
  try {
    await Fieldwork.deleteMany({});
    console.log("🗑️ Cleared existing fieldwork assignments");

    // Fetch some sample complaints
    const tnagarComplaint = await Complaint.findOne({ branch: (await Employee.findOne({ empId: "EMP-EB-001" })).branch });
    const pwdComplaint = await Complaint.findOne({ branch: (await Employee.findOne({ empId: "EMP-PWD-001" })).branch });

    // Fetch employees
    const aeTnagar = await Employee.findOne({ empId: "EMP-EB-001" }); // Assistant Engineer
    const jeTnagar = await Employee.findOne({ empId: "EMP-EB-002" }); // Junior Engineer
    const eeTnagar = await Employee.findOne({ empId: "EMP-EB-003" }); // Executive Engineer

    const jePwd = await Employee.findOne({ empId: "EMP-PWD-001" });
    const aePwd = await Employee.findOne({ empId: "EMP-PWD-002" });

    const fieldworks = [
      {
        assignmentId: "FW-EB-001",
        complaint: tnagarComplaint?._id,
        assignedTo: jeTnagar?._id,
        assignedBy: aeTnagar?._id,
        status: "Assigned",
        notes: "Check transformer overload issue reported in Pondy Bazaar.",
      },
      {
        assignmentId: "FW-EB-002",
        complaint: tnagarComplaint?._id,
        assignedTo: aeTnagar?._id,
        assignedBy: eeTnagar?._id,
        status: "In Progress",
        notes: "Follow up on street light outages along Ranganathan Street.",
        startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      },
      {
        assignmentId: "FW-PWD-001",
        complaint: pwdComplaint?._id,
        assignedTo: jePwd?._id,
        assignedBy: aePwd?._id,
        status: "Assigned",
        notes: "Inspect potholes on Triplicane High Road.",
      },
      {
        assignmentId: "FW-PWD-002",
        complaint: pwdComplaint?._id,
        assignedTo: aePwd?._id,
        assignedBy: null, // direct assignment from system
        status: "Completed",
        notes: "Stormwater drain blockage cleared near Marina Beach.",
        startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        endDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),   // 1 day ago
      }
    ];

    const inserted = await Fieldwork.insertMany(fieldworks);
    console.log(`✅ Seeded ${inserted.length} fieldwork assignments`);

    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding fieldwork:", err);
    mongoose.connection.close();
  }
}

seedFieldwork();
