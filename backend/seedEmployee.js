const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Employee = require('./models/employee');
const Branch = require('./models/branch');
const Department = require('./models/department');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ Connected to MongoDB for seeding Employees"))
  .catch(err => console.error("❌ DB Connection Error:", err));

async function seedEmployees() {
  try {
    await Employee.deleteMany({});
    console.log("🗑️ Cleared existing employees");

    // Fetch departments
    const ebDept = await Department.findOne({ deptid: "DEP-EB" });
    const pwdDept = await Department.findOne({ deptid: "DEP-PWD" });

    // Fetch branches
    const ebTnagar = await Branch.findOne({ branchid: "EB-TNAGAR" });
    const pwdTrip = await Branch.findOne({ branchid: "PWD-TRIP" });

    const employees = [
      // EB – T Nagar
      {
        empId: "EMP-EB-001",
        name: "V. Subramanian",
        designation: "Assistant Engineer/O&M",
        department: ebDept?._id,
        branch: ebTnagar?._id,
        phone: "+91 9445850123",
        email: "ae.om.tnagar@tnebnet.org",
        specialization: "Street Lighting & Distribution",
        experience: "12 years",
        currentAssignments: 8,
      },
      {
        empId: "EMP-EB-002",
        name: "R. Ramesh Kumar",
        designation: "Junior Engineer",
        department: ebDept?._id,
        branch: ebTnagar?._id,
        phone: "+91 9445850456",
        email: "je.tnagar@tnebnet.org",
        specialization: "Transformer Maintenance",
        experience: "6 years",
        currentAssignments: 5,
      },
      {
        empId: "EMP-EB-003",
        name: "Dr. S. Muralidharan",
        designation: "Executive Engineer",
        department: ebDept?._id,
        branch: ebTnagar?._id,
        phone: "+91 9445850789",
        email: "ee.tnagar@tnebnet.org",
        specialization: "Feeder & Substation Operations",
        experience: "18 years",
        currentAssignments: 10,
      },
      {
        empId: "EMP-EB-004",
        name: "K. Balachandran",
        designation: "Superintending Engineer",
        department: ebDept?._id,
        branch: ebTnagar?._id,
        phone: "+91 9445850999",
        email: "se.tnagar@tnebnet.org",
        specialization: "Circle Management",
        experience: "25 years",
        currentAssignments: 3,
        jurisdiction: "T Nagar Circle",
        officesUnder: 12,
      },

      // PWD – Triplicane
      {
        empId: "EMP-PWD-001",
        name: "Arun Raj",
        designation: "Junior Engineer",
        department: pwdDept?._id,
        branch: pwdTrip?._id,
        phone: "+91 9445850111",
        email: "je.triplicane@pwd.org",
        specialization: "Road Maintenance",
        experience: "6 years",
        currentAssignments: 4,
      },
      {
        empId: "EMP-PWD-002",
        name: "Meena K",
        designation: "Assistant Engineer",
        department: pwdDept?._id,
        branch: pwdTrip?._id,
        phone: "+91 9445850222",
        email: "ae.triplicane@pwd.org",
        specialization: "Bridge Maintenance",
        experience: "11 years",
        currentAssignments: 6,
      },
      {
        empId: "EMP-PWD-003",
        name: "S. Prakash",
        designation: "Executive Engineer",
        department: pwdDept?._id,
        branch: pwdTrip?._id,
        phone: "+91 9445850333",
        email: "ee.triplicane@pwd.org",
        specialization: "Storm Water Drain Projects",
        experience: "17 years",
        currentAssignments: 2,
      }
    ];

    const inserted = await Employee.insertMany(employees);
    console.log(`✅ Seeded ${inserted.length} employees`);

    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding employees:", err);
    mongoose.connection.close();
  }
}

seedEmployees();
