const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

const authRoutes = require('../src/routes/authRoutes');

app.use('/', authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(PORT, () => {
  console.log(`Server up at ${PORT}`);
});
