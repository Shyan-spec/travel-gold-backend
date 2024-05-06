import mongoose from 'mongoose'

 mongoose.set('strictQuery', false);
// MongoDB connection URI from environment variable
const connectionString = process.env.CONNECTION_URI 
// Connect to MongoDB
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(process.env.CONNECTION_URI ))
  .catch((error) => console.error('Error connecting to MongoDB:', error));
