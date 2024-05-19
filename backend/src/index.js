const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
var cors = require('cors');
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

const authRoutes = require('../src/routes/authRoutes');
const blogRoutes = require('../src/routes/blogRoutes');

app.use('/auth', authRoutes);
app.use('/blog', blogRoutes);

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
