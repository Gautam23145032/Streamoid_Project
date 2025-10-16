const mongoose = require('mongoose');

const connectDB = async (mongoUri) => {
  if (!mongoUri) throw new Error('MONGODB_URI not provided');
  await mongoose.connect(mongoUri, {
  });
  console.log('MongoDB connected');
};

module.exports = connectDB;
