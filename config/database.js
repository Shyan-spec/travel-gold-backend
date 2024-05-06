import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const db = mongoose.connection;


mongoose.set('strictQuery', false);

// Use the environment variable from Netlify

mongoose.connect(process.env.DATABASE_URL);

db.on('connected', function () {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});
