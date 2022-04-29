require('dotenv').config();
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');

const app = express()
app.use(cors());
app.use(express.json())

// Set up default mongoose connection

mongoose.connect(process.env.MONGO_DB_URL);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// API routes

app.use('/api/users', require('./routes/users'));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`)
})