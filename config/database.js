import mongoose from 'mongoose'

 mongoose.set('strictQuery', false);
// MongoDB connection URI from environment variable
const connectionString = process.env.CONNECTION_URI || 'mongodb+srv://shyan:test@cluster0.vou8vwx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// Connect to MongoDB
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(process.env.CONNECTION_URI ))
  .catch((error) => console.error('Error connecting to MongoDB:', error));
