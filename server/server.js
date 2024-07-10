import mongoose from 'mongoose';
import express from 'express';

const dbName = 'scholarships';
const uri = `mongodb+srv://shivangibeniwal338:gDPqXCvju4NkdiRA@search-test.kv5koah.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=search-test`;

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('Error connecting to MongoDB Atlas:', error));

// Your server setup code (e.g., Express app) goes here
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});