import mongoose from 'mongoose';

const ScholarshipSchema = new mongoose.Schema({
  title: String,
  location: String,
  date: String,
  amount: String,
  rating: Number,
  reviews: Number,
  image: String
});

const Scholarship = mongoose.model('Scholarship', ScholarshipSchema);

export default Scholarship;
