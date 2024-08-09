import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import nodemailer from 'nodemailer';
import Scholarship from './models/Scholarship.js'; // Model for scholarships
import Internship from './models/Internship.js'; // Model for internships
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASS;
const clusterUrl = `mongodb+srv://${username}:${password}@cluster0.o4y2lbm.mongodb.net`;
const dbName = 'Scholarships';

const uri = `${clusterUrl}/${dbName}?retryWrites=true&w=majority&appName=search-test`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.error('Error connecting to MongoDB Atlas:', error));

app.use(cors());
app.use(bodyParser.json());

// Route to add a new scholarship
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

// Route to fetch all scholarships
app.get('/scholarships', async (req, res) => {
    try {
        const scholarships = await Scholarship.find();
        res.json(scholarships);
    } catch (error) {
        console.error('Error fetching scholarships:', error);
        res.status(500).json({ message: error.message });
    }
});

// Route to fetch all internships
app.get('/internships', async (req, res) => {
    try {
        const internships = await Internship.find();
        res.json(internships);
    } catch (error) {
        console.error('Error fetching internships:', error);
        res.status(500).json({ message: error.message });
    }
});

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Route to send email
app.post('/send-email', (req, res) => {
    const { title, issue, description } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'shabdpatel0@gmail.com',
        subject: `Issue Report for Scholarship: ${title}`,
        text: `Issue: ${issue}\n\nDescription: ${description}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Failed to send email' });
        }
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Email sent successfully' });
    });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
