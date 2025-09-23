const mongoose = require('mongoose');
const Branch = require('./models/branch');       // adjust path
const Department = require('./models/departments'); // adjust path
const dotenv = require('dotenv');
dotenv.config(); // <-- Load env variables before using them

// connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seedBranches() {
  try {
    await Branch.deleteMany({}); // clear old branches

    // fetch departments by deptid
    const eb = await Department.findOne({ deptid: "DEP-EB" });
    const pwd = await Department.findOne({ deptid: "DEP-PWD" });
    const water = await Department.findOne({ deptid: "DEP-WATER" });
    const roads = await Department.findOne({ deptid: "DEP-ROADS" });
    const san = await Department.findOne({ deptid: "DEP-SAN" });

    const branches = [
      // EB branches
      {
        branchid: "EB-TNAGAR",
        name: "EB T. Nagar Branch",
        location: "T. Nagar, Chennai",
        contactNumber: "044-24330011",
        email: "eb.tnagar@tangedco.gov.in",
        dept: eb._id,
      },
      {
        branchid: "EB-ANNA",
        name: "EB Anna Nagar Branch",
        location: "Anna Nagar, Chennai",
        contactNumber: "044-26240022",
        email: "eb.annanagar@tangedco.gov.in",
        dept: eb._id,
      },
      {
        branchid: "EB-MYL",
        name: "EB Mylapore Branch",
        location: "Mylapore, Chennai",
        contactNumber: "044-24670033",
        email: "eb.mylapore@tangedco.gov.in",
        dept: eb._id,
      },

      // PWD branches
      {
        branchid: "PWD-CHE",
        name: "PWD Chepauk Branch",
        location: "Chepauk, Chennai",
        contactNumber: "044-28530044",
        email: "pwd.chepauk@tn.gov.in",
        dept: pwd._id,
      },
      {
        branchid: "PWD-TRIP",
        name: "PWD Triplicane Branch",
        location: "Triplicane, Chennai",
        contactNumber: "044-28450055",
        email: "pwd.triplicane@tn.gov.in",
        dept: pwd._id,
      },
      {
        branchid: "PWD-TNAGAR",
        name: "PWD T. Nagar Branch",
        location: "T. Nagar, Chennai",
        contactNumber: "044-24330066",
        email: "pwd.tnagar@tn.gov.in",
        dept: pwd._id,
      },

      // Water Supply branches
      {
        branchid: "WAT-ADYAR",
        name: "Water Supply Adyar Branch",
        location: "Adyar, Chennai",
        contactNumber: "044-24980077",
        email: "water.adyar@cmwssb.gov.in",
        dept: water._id,
      },
      {
        branchid: "WAT-KK",
        name: "Water Supply KK Nagar Branch",
        location: "KK Nagar, Chennai",
        contactNumber: "044-23650088",
        email: "water.kknagar@cmwssb.gov.in",
        dept: water._id,
      },
      {
        branchid: "WAT-PER",
        name: "Water Supply Perambur Branch",
        location: "Perambur, Chennai",
        contactNumber: "044-26780099",
        email: "water.perambur@cmwssb.gov.in",
        dept: water._id,
      },

      // Roads branches
      {
        branchid: "ROADS-NORTH",
        name: "Highways North Division",
        location: "Washermanpet, Chennai",
        contactNumber: "044-25940111",
        email: "roads.north@tnhighways.gov.in",
        dept: roads._id,
      },
      {
        branchid: "ROADS-SOUTH",
        name: "Highways South Division",
        location: "Tambaram, Chennai",
        contactNumber: "044-22340122",
        email: "roads.south@tnhighways.gov.in",
        dept: roads._id,
      },
      {
        branchid: "ROADS-CENTRAL",
        name: "Highways Central Division",
        location: "Nandanam, Chennai",
        contactNumber: "044-24340133",
        email: "roads.central@tnhighways.gov.in",
        dept: roads._id,
      },

      // Sanitation branches
      {
        branchid: "SAN-NORTH",
        name: "Sanitation North Zone",
        location: "George Town, Chennai",
        contactNumber: "044-25240144",
        email: "san.north@chennaicorporation.gov.in",
        dept: san._id,
      },
      {
        branchid: "SAN-SOUTH",
        name: "Sanitation South Zone",
        location: "Velachery, Chennai",
        contactNumber: "044-22440155",
        email: "san.south@chennaicorporation.gov.in",
        dept: san._id,
      },
      {
        branchid: "SAN-CENTRAL",
        name: "Sanitation Central Zone",
        location: "Egmore, Chennai",
        contactNumber: "044-28140166",
        email: "san.central@chennaicorporation.gov.in",
        dept: san._id,
      },
    ];

    await Branch.insertMany(branches);
    console.log("✅ Branches added successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding branches:", err);
  }
}

seedBranches();
