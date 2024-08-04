import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import Scholarship from './models/Scholarship.js'; // Ensure you have this model defined

const app = express();

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const clusterUrl = process.env.MONGO_CLUSTER_URL;
const dbName = process.env.MONGO_DB_NAME;

const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/${dbName}?retryWrites=true&w=majority&appName=search-test`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.error('Error connecting to MongoDB Atlas:', error));

app.use(cors({
    origin: 'https://nith-hub.vercel.app/'
}));
app.use(bodyParser.json());

app.post('/add-scholarship', async (req, res) => {
    try {
        const newScholarship = new Scholarship(req.body);
        await newScholarship.save();
        console.log('Scholarship added successfully:', newScholarship);
        res.status(201).send('Scholarship added successfully');
    } catch (error) {
        console.error('Error adding scholarship:', error);
        res.status(400).send('Error adding scholarship');
    }
});

app.get('/scholarships', async (req, res) => {
    try {
        const scholarships = await Scholarship.find();
        res.json(scholarships);
    } catch (error) {
        console.error('Error fetching scholarships:', error);
        res.status(500).json({ message: error.message });
    }
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
