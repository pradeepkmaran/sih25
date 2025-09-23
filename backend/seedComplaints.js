const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Complaint = require('./models/complaint');
const Branch = require('./models/branch');
const Department = require('./models/department');
const User = require('./models/user');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seedComplaints() {
  try {
    // Clear existing complaints first
    const deleteResult = await Complaint.deleteMany({});
    console.log(`🗑️  Cleared ${deleteResult.deletedCount} existing complaints`);

    // Fetch all departments by deptid
    const ebDept = await Department.findOne({ deptid: "DEP-EB" });
    const pwdDept = await Department.findOne({ deptid: "DEP-PWD" });
    const waterDept = await Department.findOne({ deptid: "DEP-WATER" });
    const roadsDept = await Department.findOne({ deptid: "DEP-ROADS" });
    const sanDept = await Department.findOne({ deptid: "DEP-SAN" });

    // Validate departments exist
    if (!ebDept || !pwdDept || !waterDept || !roadsDept || !sanDept) {
      throw new Error("One or more departments not found. Please seed departments first.");
    }

    // Fetch all branches
    const ebTnagar = await Branch.findOne({ branchid: "EB-TNAGAR" });
    const ebAnna = await Branch.findOne({ branchid: "EB-ANNA" });
    const ebMyl = await Branch.findOne({ branchid: "EB-MYL" });
    
    const pwdChe = await Branch.findOne({ branchid: "PWD-CHE" });
    const pwdTrip = await Branch.findOne({ branchid: "PWD-TRIP" });
    const pwdTnagar = await Branch.findOne({ branchid: "PWD-TNAGAR" });
    
    const watAdyar = await Branch.findOne({ branchid: "WAT-ADYAR" });
    const watKK = await Branch.findOne({ branchid: "WAT-KK" });
    const watPer = await Branch.findOne({ branchid: "WAT-PER" });
    
    const roadsNorth = await Branch.findOne({ branchid: "ROADS-NORTH" });
    const roadsSouth = await Branch.findOne({ branchid: "ROADS-SOUTH" });
    const roadsCentral = await Branch.findOne({ branchid: "ROADS-CENTRAL" });
    
    const sanNorth = await Branch.findOne({ branchid: "SAN-NORTH" });
    const sanSouth = await Branch.findOne({ branchid: "SAN-SOUTH" });
    const sanCentral = await Branch.findOne({ branchid: "SAN-CENTRAL" });

    // Validate branches exist
    const branches = [ebTnagar, ebAnna, ebMyl, pwdChe, pwdTrip, pwdTnagar, watAdyar, watKK, watPer, roadsNorth, roadsSouth, roadsCentral, sanNorth, sanSouth, sanCentral];
    if (branches.some(branch => !branch)) {
      throw new Error("One or more branches not found. Please seed branches first.");
    }

    // Fetch users
    const users = await User.find({});
    const userMap = {};
    users.forEach(u => { userMap[u.name] = u._id; });

    if (Object.keys(userMap).length === 0) {
      console.log("⚠️  No users found. Complaints will be created without reportedBy field.");
    }

    const complaintsData = [
      // ========== EB Complaints ==========
      {
        complaintId: "COMP-EB-001",
        title: "Street Light Not Working - Pondy Bazaar",
        description: "Street light pole PB-45 on Pondy Bazaar has been non-functional for 4 days. LED bulb appears to be damaged and needs replacement. This is causing safety concerns for evening shoppers.",
        location: "Pondy Bazaar, T Nagar",
        status: "Work Order Issued",
        priority: "High",
        category: "Street Light Maintenance",
        department: ebDept._id,
        branch: ebTnagar._id,
        reportedBy: userMap["Arun Kumar"] || null,
        createdDate: new Date("2025-09-18T10:30:00Z"),
        workOrderNumber: "WO/TNE/2025/0045",
        images: ["streetlight_pondy1.jpg", "pole_pb45.jpg"],
        upvotes: 23,
        comments: 5,
      },
      {
        complaintId: "COMP-EB-002",
        title: "Frequent Power Cuts - Ranganathan Street",
        description: "Experiencing 3-4 hour power cuts daily for the past week. Transformer T-NG-15 seems to be overloading during peak hours. Multiple shops and residences affected.",
        location: "Ranganathan Street, T Nagar",
        status: "In Progress",
        priority: "Critical",
        category: "Power Supply Issue",
        department: ebDept._id,
        branch: ebTnagar._id,
        reportedBy: userMap["Sanjay Mehta"] || null,
        createdDate: new Date("2025-09-19T08:15:00Z"),
        workOrderNumber: "WO/TNE/2025/0046",
        images: ["transformer_t_ng_15.jpg", "overload_damage.jpg"],
        upvotes: 67,
        comments: 18,
      },
      {
        complaintId: "COMP-EB-003",
        title: "Meter Reading Error - Anna Nagar",
        description: "Electricity meter showing abnormally high consumption (1200 units for a 2BHK apartment). Previous month was only 180 units. Request meter testing and verification.",
        location: "Anna Nagar West, Chennai",
        status: "Verified",
        priority: "Medium",
        category: "Meter Related",
        department: ebDept._id,
        branch: ebAnna._id,
        reportedBy: userMap["Priya Ramesh"] || null,
        createdDate: new Date("2025-09-20T14:20:00Z"),
        images: ["meter_an4501234.jpg", "bill_comparison.jpg"],
        upvotes: 8,
        comments: 3,
      },
      {
        complaintId: "COMP-EB-004",
        title: "Voltage Fluctuation - Mylapore",
        description: "Severe voltage fluctuations between 180V-280V causing damage to electronic appliances. Multiple households in the street affected. AC and refrigerator damaged.",
        location: "Kutchery Road, Mylapore",
        status: "Open",
        priority: "High",
        category: "Power Quality",
        department: ebDept._id,
        branch: ebMyl._id,
        reportedBy: userMap["Lakshmi Devi"] || null,
        createdDate: new Date("2025-09-17T09:45:00Z"),
        images: ["voltage_meter.jpg", "damaged_appliance.jpg"],
        upvotes: 45,
        comments: 12,
      },
      {
        complaintId: "COMP-EB-005",
        title: "Cable Spark Near Anna Nagar Bus Stop",
        description: "Overhead high-tension cable sparking dangerously near Anna Nagar bus stop. Immediate safety hazard for commuters and nearby shops.",
        location: "Anna Nagar West Bus Stop",
        status: "Resolved",
        priority: "Emergency",
        category: "Safety Hazard",
        department: ebDept._id,
        branch: ebAnna._id,
        reportedBy: userMap["Arun Kumar"] || null,
        createdDate: new Date("2025-09-15T11:30:00Z"),
        resolvedDate: new Date("2025-09-15T16:45:00Z"),
        workOrderNumber: "WO/ANE/2025/0044",
        images: ["cable_spark_anna.jpg", "cable_repaired.jpg", "safety_clearance.jpg"],
        upvotes: 92,
        comments: 21,
      },

      // ========== PWD Complaints ==========
      {
        complaintId: "COMP-PWD-001",
        title: "Broken Footpath - Marina Beach Road",
        description: "Large section of footpath broken near Marina Beach lighthouse. Pedestrians, especially elderly and children, facing difficulty walking. Concrete slabs displaced.",
        location: "Marina Beach Road, Triplicane",
        status: "Open",
        priority: "High",
        category: "Road Maintenance",
        department: pwdDept._id,
        branch: pwdTrip._id,
        reportedBy: userMap["Priya Ramesh"] || null,
        createdDate: new Date("2025-09-21T09:00:00Z"),
        workOrderNumber: "PWD/TRI/2025/0078",
        images: ["broken_footpath_marina.jpg", "footpath_hole.jpg"],
        upvotes: 15,
        comments: 4,
      },
      {
        complaintId: "COMP-PWD-002",
        title: "Multiple Potholes - Mount Road",
        description: "Several large potholes formed on Mount Road near LIC building after recent rains. Causing severe traffic jams and vehicle damage. Urgent repair needed.",
        location: "Mount Road, Near LIC Building",
        status: "In Progress",
        priority: "High",
        category: "Road Repair",
        department: pwdDept._id,
        branch: pwdChe._id,
        reportedBy: userMap["Sanjay Mehta"] || null,
        createdDate: new Date("2025-09-22T11:00:00Z"),
        workOrderNumber: "PWD/CHE/2025/0079",
        images: ["mountroad_potholes.jpg", "traffic_jam.jpg"],
        upvotes: 89,
        comments: 23,
      },
      {
        complaintId: "COMP-PWD-003",
        title: "Storm Water Drain Blockage - T Nagar",
        description: "Main storm water drain completely blocked near Mambalam railway station. Water stagnation during rains causing flooding in nearby shops and houses.",
        location: "Near Mambalam Railway Station, T Nagar",
        status: "Work Order Issued",
        priority: "High",
        category: "Drainage",
        department: pwdDept._id,
        branch: pwdTnagar._id,
        reportedBy: userMap["Arun Kumar"] || null,
        createdDate: new Date("2025-09-23T10:30:00Z"),
        workOrderNumber: "PWD/TN/2025/0080",
        images: ["blocked_drain_tn.jpg", "flooding_shops.jpg"],
        upvotes: 34,
        comments: 8,
      },
      {
        complaintId: "COMP-PWD-004",
        title: "Road Cave-in - Chepauk",
        description: "Small section of road caved in near Chepauk stadium due to underground pipe burst. Creating traffic diversion and safety hazard.",
        location: "Chepauk Stadium Road",
        status: "Emergency",
        priority: "Critical",
        category: "Emergency Road Repair",
        department: pwdDept._id,
        branch: pwdChe._id,
        reportedBy: userMap["Lakshmi Devi"] || null,
        createdDate: new Date("2025-09-20T08:00:00Z"),
        workOrderNumber: "PWD/CHE/2025/0081",
        images: ["road_cavein_chepauk.jpg", "traffic_diversion.jpg"],
        upvotes: 56,
        comments: 14,
      },
      {
        complaintId: "COMP-PWD-005",
        title: "Fallen Tree Blocking Road",
        description: "Large banyan tree fell due to yesterday's storm, completely blocking the road near Triplicane temple. Emergency clearance required for traffic flow.",
        location: "Triplicane High Road, Near Temple",
        status: "Resolved",
        priority: "Emergency",
        category: "Emergency Road Clearance",
        department: pwdDept._id,
        branch: pwdTrip._id,
        reportedBy: userMap["Priya Ramesh"] || null,
        createdDate: new Date("2025-09-19T14:30:00Z"),
        resolvedDate: new Date("2025-09-20T10:15:00Z"),
        workOrderNumber: "PWD/TRI/2025/0082",
        images: ["fallen_tree_triplicane.jpg", "tree_cleared.jpg"],
        upvotes: 78,
        comments: 16,
      },

      // ========== Water Supply Complaints ==========
      {
        complaintId: "COMP-WAT-001",
        title: "No Water Supply - Adyar",
        description: "Complete water supply cut for the past 3 days in Adyar area. No prior notice given to residents. Affecting over 500 households in the locality.",
        location: "Adyar, Near Theosophical Society",
        status: "In Progress",
        priority: "Critical",
        category: "Water Supply Issue",
        department: waterDept._id,
        branch: watAdyar._id,
        reportedBy: userMap["Priya Ramesh"] || null,
        createdDate: new Date("2025-09-21T07:30:00Z"),
        workOrderNumber: "WAT/ADY/2025/0145",
        images: ["dry_taps_adyar.jpg", "water_tanker_queue.jpg"],
        upvotes: 125,
        comments: 45,
      },
      {
        complaintId: "COMP-WAT-002",
        title: "Water Pipe Burst - KK Nagar",
        description: "Major water pipe burst on main road causing flooding and water wastage. Road condition deteriorating due to continuous water flow.",
        location: "KK Nagar Main Road",
        status: "Work Order Issued",
        priority: "High",
        category: "Pipe Repair",
        department: waterDept._id,
        branch: watKK._id,
        reportedBy: userMap["Sanjay Mehta"] || null,
        createdDate: new Date("2025-09-22T13:45:00Z"),
        workOrderNumber: "WAT/KK/2025/0146",
        images: ["pipe_burst_kk.jpg", "road_flooding.jpg"],
        upvotes: 67,
        comments: 12,
      },
      {
        complaintId: "COMP-WAT-003",
        title: "Dirty Water Supply - Perambur",
        description: "Water supplied through municipal pipeline is muddy and contaminated. Multiple families reporting stomach issues. Need immediate water quality testing.",
        location: "Perambur, Ward 15",
        status: "Under Investigation",
        priority: "High",
        category: "Water Quality",
        department: waterDept._id,
        branch: watPer._id,
        reportedBy: userMap["Arun Kumar"] || null,
        createdDate: new Date("2025-09-20T09:15:00Z"),
        images: ["dirty_water_perambur.jpg", "water_sample.jpg"],
        upvotes: 43,
        comments: 18,
      },
      {
        complaintId: "COMP-WAT-004",
        title: "Sewage Overflow - Adyar",
        description: "Sewage overflow from manholes near Adyar river bridge. Foul smell and unhygienic conditions affecting nearby residents and commuters.",
        location: "Adyar Bridge Road",
        status: "Open",
        priority: "High",
        category: "Sewage Management",
        department: waterDept._id,
        branch: watAdyar._id,
        reportedBy: userMap["Lakshmi Devi"] || null,
        createdDate: new Date("2025-09-19T16:20:00Z"),
        images: ["sewage_overflow_adyar.jpg", "manhole_blocked.jpg"],
        upvotes: 89,
        comments: 25,
      },
      {
        complaintId: "COMP-WAT-005",
        title: "Low Water Pressure - KK Nagar",
        description: "Very low water pressure in KK Nagar area, especially in upper floors of apartments. Water barely reaches 2nd floor and above during peak hours.",
        location: "KK Nagar, Blocks A-D",
        status: "Inspection Scheduled",
        priority: "Medium",
        category: "Water Pressure",
        department: waterDept._id,
        branch: watKK._id,
        reportedBy: userMap["Priya Ramesh"] || null,
        createdDate: new Date("2025-09-18T11:30:00Z"),
        images: ["low_pressure_kk.jpg", "apartment_water_issue.jpg"],
        upvotes: 34,
        comments: 9,
      },

      // ========== Roads/Highways Complaints ==========
      {
        complaintId: "COMP-ROADS-001",
        title: "Highway Pothole - NH4",
        description: "Dangerous pothole on NH4 near Poonamallee causing vehicle damage and accidents. Heavy vehicles struggling to navigate safely.",
        location: "NH4, Near Poonamallee Bypass",
        status: "Work Order Issued",
        priority: "Critical",
        category: "Highway Maintenance",
        department: roadsDept._id,
        branch: roadsNorth._id,
        reportedBy: userMap["Sanjay Mehta"] || null,
        createdDate: new Date("2025-09-21T14:20:00Z"),
        workOrderNumber: "HWY/N/2025/0234",
        images: ["nh4_pothole.jpg", "vehicle_damage.jpg"],
        upvotes: 156,
        comments: 38,
      },
      {
        complaintId: "COMP-ROADS-002",
        title: "Missing Road Signs - GST Road",
        description: "Several important directional signs missing on GST Road near Tambaram. Causing confusion for drivers, especially during night time.",
        location: "GST Road, Tambaram",
        status: "Open",
        priority: "Medium",
        category: "Road Signage",
        department: roadsDept._id,
        branch: roadsSouth._id,
        reportedBy: userMap["Arun Kumar"] || null,
        createdDate: new Date("2025-09-20T10:45:00Z"),
        images: ["missing_signs_gst.jpg", "sign_pole_damaged.jpg"],
        upvotes: 23,
        comments: 6,
      },
      {
        complaintId: "COMP-ROADS-003",
        title: "Bridge Crack - Cooum River",
        description: "Visible cracks appearing on Cooum river bridge near Nandanam. Safety inspection required urgently before further deterioration.",
        location: "Cooum Bridge, Nandanam",
        status: "Under Investigation",
        priority: "High",
        category: "Bridge Maintenance",
        department: roadsDept._id,
        branch: roadsCentral._id,
        reportedBy: userMap["Lakshmi Devi"] || null,
        createdDate: new Date("2025-09-19T12:30:00Z"),
        images: ["bridge_crack_cooum.jpg", "structural_damage.jpg"],
        upvotes: 78,
        comments: 19,
      },
      {
        complaintId: "COMP-ROADS-004",
        title: "Road Median Damage - OMR",
        description: "Road median damaged by heavy vehicles on Old Mahabalipuram Road. Metal barriers bent and concrete blocks displaced creating hazard.",
        location: "OMR, Near Sholinganallur",
        status: "In Progress",
        priority: "Medium",
        category: "Road Infrastructure",
        department: roadsDept._id,
        branch: roadsSouth._id,
        reportedBy: userMap["Priya Ramesh"] || null,
        createdDate: new Date("2025-09-18T15:10:00Z"),
        workOrderNumber: "HWY/S/2025/0235",
        images: ["median_damage_omr.jpg", "bent_barriers.jpg"],
        upvotes: 45,
        comments: 11,
      },
      {
        complaintId: "COMP-ROADS-005",
        title: "Street Light Outage - Inner Ring Road",
        description: "Complete street light outage on Inner Ring Road stretch from Chetpet to Nungambakkam. Major safety concern for night traffic.",
        location: "Inner Ring Road, Chetpet-Nungambakkam",
        status: "Resolved",
        priority: "High",
        category: "Highway Lighting",
        department: roadsDept._id,
        branch: roadsCentral._id,
        reportedBy: userMap["Sanjay Mehta"] || null,
        createdDate: new Date("2025-09-17T19:20:00Z"),
        resolvedDate: new Date("2025-09-19T08:30:00Z"),
        workOrderNumber: "HWY/C/2025/0236",
        images: ["dark_irr_road.jpg", "lights_restored.jpg"],
        upvotes: 67,
        comments: 15,
      },

      // ========== Sanitation Complaints ==========
      {
        complaintId: "COMP-SAN-001",
        title: "Garbage Not Collected - George Town",
        description: "Garbage collection missed for 4 consecutive days in George Town area. Waste piling up causing foul smell and attracting stray animals.",
        location: "George Town, NSC Bose Road",
        status: "In Progress",
        priority: "High",
        category: "Waste Collection",
        department: sanDept._id,
        branch: sanNorth._id,
        reportedBy: userMap["Arun Kumar"] || null,
        createdDate: new Date("2025-09-22T08:30:00Z"),
        workOrderNumber: "SAN/N/2025/0445",
        images: ["garbage_pile_gt.jpg", "overflowing_bins.jpg"],
        upvotes: 89,
        comments: 22,
      },
      {
        complaintId: "COMP-SAN-002",
        title: "Broken Garbage Bin - Velachery",
        description: "Large community garbage bin broken and overturning near Velachery bus stop. Waste spilling on road creating unhygienic conditions.",
        location: "Velachery Bus Stop",
        status: "Work Order Issued",
        priority: "Medium",
        category: "Infrastructure Maintenance",
        department: sanDept._id,
        branch: sanSouth._id,
        reportedBy: userMap["Priya Ramesh"] || null,
        createdDate: new Date("2025-09-21T11:15:00Z"),
        workOrderNumber: "SAN/S/2025/0446",
        images: ["broken_bin_velachery.jpg", "waste_spillage.jpg"],
        upvotes: 34,
        comments: 7,
      },
      {
        complaintId: "COMP-SAN-003",
        title: "Public Toilet Cleaning Required - Egmore",
        description: "Public toilet near Egmore railway station in very poor condition. Requires immediate deep cleaning and maintenance. Health hazard for commuters.",
        location: "Egmore Railway Station Area",
        status: "Open",
        priority: "High",
        category: "Public Toilet Maintenance",
        department: sanDept._id,
        branch: sanCentral._id,
        reportedBy: userMap["Lakshmi Devi"] || null,
        createdDate: new Date("2025-09-20T13:45:00Z"),
        images: ["toilet_condition_egmore.jpg", "unhygienic_state.jpg"],
        upvotes: 67,
        comments: 16,
      },
      {
        complaintId: "COMP-SAN-004",
        title: "Stray Dog Menace - Washermanpet",
        description: "Large pack of stray dogs creating nuisance and safety concerns in Washermanpet market area. Several incidents of dog bites reported.",
        location: "Washermanpet Market",
        status: "Under Investigation",
        priority: "High",
        category: "Animal Control",
        department: sanDept._id,
        branch: sanNorth._id,
        reportedBy: userMap["Sanjay Mehta"] || null,
        createdDate: new Date("2025-09-19T09:20:00Z"),
        images: ["stray_dogs_washermanpet.jpg", "dog_pack.jpg"],
        upvotes: 123,
        comments: 34,
      },
      {
        complaintId: "COMP-SAN-005",
        title: "Illegal Dumping - Tambaram",
        description: "Construction debris and household waste being illegally dumped in vacant plot near Tambaram station. Creating environmental hazard and mosquito breeding.",
        location: "Vacant Plot, Near Tambaram Station",
        status: "Inspection Scheduled",
        priority: "Medium",
        category: "Illegal Dumping",
        department: sanDept._id,
        branch: sanSouth._id,
        reportedBy: userMap["Arun Kumar"] || null,
        createdDate: new Date("2025-09-18T16:30:00Z"),
        images: ["illegal_dump_tambaram.jpg", "construction_debris.jpg"],
        upvotes: 45,
        comments: 12,
      }
    ];

    // Insert complaints in batches to handle any potential issues
    const insertResult = await Complaint.insertMany(complaintsData, { ordered: false });
    console.log(`✅ Successfully inserted ${insertResult.length} complaints`);
    
    // Display summary
    console.log("\n📊 SEEDING SUMMARY:");
    console.log(`⚡ EB Complaints: 5`);
    console.log(`🏗️  PWD Complaints: 5`);
    console.log(`💧 Water Complaints: 5`);
    console.log(`🛣️  Roads Complaints: 5`);
    console.log(`🗑️  Sanitation Complaints: 5`);
    console.log(`📝 Total Complaints: ${insertResult.length}`);
    
    // Verify the data
    const totalCount = await Complaint.countDocuments({});
    console.log(`\n🔍 Verification: ${totalCount} complaints exist in database`);
    
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding complaints:", err);
    
    // Show more details about the error
    if (err.writeErrors) {
      console.error("Write errors:", err.writeErrors);
    }
    
    mongoose.connection.close();
    process.exit(1);
  }
}

seedComplaints();