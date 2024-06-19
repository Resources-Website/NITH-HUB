import React, { useState } from 'react';

const AddScholarship = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    date: '',
    amount: '',
    rating: '',
    reviews: '',
    image: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      title: '',
      location: '',
      date: '',
      amount: '',
      rating: '',
      reviews: '',
      image: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg mb-6">
      <h2 className="text-xl text-white mb-4">Add Scholarship</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="mb-2 p-2 w-full bg-gray-700 text-white rounded"
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="mb-2 p-2 w-full bg-gray-700 text-white rounded"
      />
      <input
        type="text"
        name="date"
        placeholder="Date"
        value={formData.date}
        onChange={handleChange}
        className="mb-2 p-2 w-full bg-gray-700 text-white rounded"
      />
      <input
        type="text"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        className="mb-2 p-2 w-full bg-gray-700 text-white rounded"
      />
      <input
        type="number"
        name="rating"
        placeholder="Rating"
        value={formData.rating}
        onChange={handleChange}
        className="mb-2 p-2 w-full bg-gray-700 text-white rounded"
      />
      <input
        type="number"
        name="reviews"
        placeholder="Reviews"
        value={formData.reviews}
        onChange={handleChange}
        className="mb-2 p-2 w-full bg-gray-700 text-white rounded"
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
        className="mb-2 p-2 w-full bg-gray-700 text-white rounded"
      />
      <button type="submit" className="bg-blue-500 p-2 rounded text-white w-full">Add Scholarship</button>
    </form>
  );
};

export default AddScholarship;
