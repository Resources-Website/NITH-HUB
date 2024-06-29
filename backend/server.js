import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import Scholarship from './models/Scholarship.js';

const app = express();

const username = 'shivangibeniwal338';
const password = '54y9M1pdXdl7LLOH';
const clusterUrl = `mongodb+srv://shivangibeniwal338:54y9M1pdXdl7LLOH@search-test.kv5koah.mongodb.net`;
const dbName = 'scholarships';

const uri = `${clusterUrl}/${dbName}?retryWrites=true&w=majority&appName=search-test`;

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('Error connecting to MongoDB Atlas:', error));

app.use(cors());
app.use(bodyParser.json());

app.post('/add-scholarship', (req, res) => {
  // Handle the POST request logic here
  // For example, save data to MongoDB
  console.log('Received POST request at /add-scholarship');
  res.send('POST request received successfully');
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
