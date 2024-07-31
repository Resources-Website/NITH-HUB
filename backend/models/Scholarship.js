import mongoose from 'mongoose';

const scholarshipSchema = new mongoose.Schema({
  title: String,
  location: String,
  date: String,
  duration: String,
  description: String,
  amount: String,
  image: String,
  scholarship: String,
  fundingtype: String,
  eligibilty: String
});

export default mongoose.model('Scholarship', scholarshipSchema);
