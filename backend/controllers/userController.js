const User = require('../models/user');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send('Fetch error: ' + err.message);
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const saved = await user.save();
    res.send({ insertedId: saved._id });
  } catch (err) {
    res.status(500).send('User insert error: ' + err.message);
  }
};
