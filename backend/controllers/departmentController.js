const Department = require('../models/department');

exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.send(departments);
  } catch (err) {
    res.status(500).send('Fetch error: ' + err.message);
  }
};

exports.createDepartment = async (req, res) => {
  try {
    const department = new Department(req.body);
    const saved = await department.save();
    res.send({ insertedId: saved._id });
  } catch (err) {
    res.status(500).send('Department insert error: ' + err.message);
  }
};
