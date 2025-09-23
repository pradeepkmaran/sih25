const Complaint = require('../models/complaint');

exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.send(complaints);
  } catch (err) {
    res.status(500).send('Fetch error: ' + err.message);
  }
};

exports.createComplaint = async (req, res) => {
  try {
    const complaint = new Complaint({
      ...req.body
    });
    const saved = await complaint.save();
    res.send({ insertedId: saved._id });
  } catch (err) {
    res.status(500).send('Insert error: ' + err.message);
  }
};
