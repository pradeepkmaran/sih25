const Employee = require('../models/employee');

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.send(employees);
  } catch (err) {
    res.status(500).send('Fetch error: ' + err.message);
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    const saved = await employee.save();
    res.send({ insertedId: saved._id });
  } catch (err) {
    res.status(500).send('Employee insert error: ' + err.message);
  }
};
