const Branch = require('../models/branch');

exports.getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find();
    res.send(branches);
  } catch (err) {
    res.status(500).send('Fetch error: ' + err.message);
  }
};

exports.createBranch = async (req, res) => {
  try {
    const branch = new Branch(req.body);
    const saved = await branch.save();
    res.send({ insertedId: saved._id });
  } catch (err) {
    res.status(500).send('Branch insert error: ' + err.message);
  }
};
