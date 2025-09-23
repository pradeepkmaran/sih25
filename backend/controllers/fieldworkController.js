const Fieldworks = require('../models/fieldwork');

exports.getAllFieldworks = async (req, res) => {
  try {
    const fieldworks = await Fieldworks.find();
    res.send(fieldworks);
  } catch (err) {
    res.status(500).send('Fetch error: ' + err.message);
  }
};

exports.createFieldwork = async (req, res) => {
  try {
    const fieldworks = new Fieldworks(req.body);
    const saved = await fieldworks.save();
    res.send({ insertedId: saved._id });
  } catch (err) {
    res.status(500).send('Fieldworks insert error: ' + err.message);
  }
};
