import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './db.js';

dotenv.config();
connectDB();

const db = mongoose.connection;

db.on('connected', function () {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});

