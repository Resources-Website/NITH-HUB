import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema({
    title: String,
    location: String,
    amount: String,
    date: String,
    duration: String,
    eligibility: String,
    fundingType: String,
    description: String,
    image: String
});

const Internship = mongoose.model('Internship', internshipSchema);

export default Internship;
