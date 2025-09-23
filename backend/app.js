const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const routes = require('./routes');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});