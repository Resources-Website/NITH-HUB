import mongoose from 'mongoose';

const scholarshipSchema = new mongoose.Schema({
  title: String,
  location: String,
  date: String,
  amount: String,
  rating: Number,
  reviews: Number,
  image: String,
  description: String,
  link: String,
});

export default mongoose.model('Scholarship', scholarshipSchema);
