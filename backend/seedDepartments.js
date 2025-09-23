const mongoose = require('mongoose');
const Department = require('./models/departments'); // adjust path if needed
const dotenv = require('dotenv');
dotenv.config(); // <-- Load env variables before using them

// connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seedDepartments() {
  try {
    // Clear existing records
    await Department.deleteMany({});

    const departments = [
      {
        deptid: "DEP-EB",
        name: "Electricity Board (EB)",
        officeLocation: "TANGEDCO HQ, Chennai",
        contactNumber: "044-28520131",
        email: "support.eb@tangedco.gov.in",
      },
      {
        deptid: "DEP-PWD",
        name: "Public Works Department (PWD)",
        officeLocation: "PWD Main Office, Chepauk, Chennai",
        contactNumber: "044-28520812",
        email: "info.pwd@tn.gov.in",
      },
      {
        deptid: "DEP-WATER",
        name: "Water Supply & Sewerage Board",
        officeLocation: "CMWSSB HQ, Anna Salai, Chennai",
        contactNumber: "044-45674567",
        email: "support.water@cmwssb.gov.in",
      },
      {
        deptid: "DEP-ROADS",
        name: "Highways & Roads Department",
        officeLocation: "TN Highways Dept, Nandanam, Chennai",
        contactNumber: "044-28434567",
        email: "roads.helpdesk@tnhighways.gov.in",
      },
      {
        deptid: "DEP-SAN",
        name: "Sanitation & Waste Management",
        officeLocation: "Greater Chennai Corporation, Ripon Building, Chennai",
        contactNumber: "1913",
        email: "sanitation@chennaicorporation.gov.in",
      },
    ];

    await Department.insertMany(departments);
    console.log("✅ Departments added successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding departments:", err);
  }
}

seedDepartments();
