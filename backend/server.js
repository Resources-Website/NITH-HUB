const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://22bph040:eb8APetEwYQUR8V4@cluster0.o4y2lbm.mongodb.net/Scholarships?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connection established'))
    .catch(error => console.error('MongoDB connection error:', error));

const scholarshipSchema = new mongoose.Schema({
    id: Number,
    title: String,
    location: String,
    date: String,
    amount: String,
    rating: Number,
    reviews: Number,
    image: String
});

const Scholarship = mongoose.model('scholarships', scholarshipSchema);

app.get('/scholarships', async (req, res) => {
    try {
        const scholarships = await Scholarship.find();
        res.json(scholarships);
    } catch (error) {
        console.error('Error fetching scholarships:', error);
        res.status(500).json({ message: 'Error fetching scholarships', error });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
