import mongoose from 'mongoose';

import dotenv from 'dotenv'

dotenv.config();

const Connection = process.env.CONNECTION_URI

mongoose.connect(Connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});
