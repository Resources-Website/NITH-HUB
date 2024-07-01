import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import Scholarship from './models/Scholarship.js'; // Ensure you have this model defined

const app = express();

const username = '22bph040';
const password = 'eb8APetEwYQUR8V4';
const clusterUrl = `mongodb+srv://${username}:${password}@cluster0.o4y2lbm.mongodb.net`;
const dbName = 'Scholarships';

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

// New route to fetch scholarships
app.get('/scholarships', async (req, res) => {
    try {
        const scholarships = await Scholarship.find();
        res.json(scholarships);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
