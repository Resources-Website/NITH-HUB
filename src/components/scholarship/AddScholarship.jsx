import React, { useState } from 'react';
import axios from 'axios';

const AddScholarship = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    date: '',
    duration: '',
    description: '',
    amount: '',
    image: '',
    scholarship: '',
    eligibilty: '',
    fundingType: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    console.log("Form Data:", formData);


    // Basic validation
    for (let key in formData) {
      if (formData[key] === '') {
        setError('All fields are required.');
        setLoading(false);
        return;
      }
    }
    try {
      const response = await axios.post('http://localhost:8000/add-scholarship', formData);
      console.log('Scholarship added successfully:', response.data);
      setSuccess('Scholarship added successfully!');
      setLoading(false);
  
        // Clear form
        setFormData({
          title: '',
          location: '',
          date: '',
          duration: '',
          description: '',
          amount: '',
          image: '',
          scholarship: '',
          eligibilty: '',
          fundingType: ''
        });
  
        if (onAdd) {
          onAdd(response.data);
        }

    } catch (error) {
      console.error('Error adding scholarship:', error);
      setError('Failed to add scholarship.');
      setLoading(false);
      // Handle error feedback to the user
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6 max-w-md mx-auto">
  <h2 className="text-2xl text-white font-semibold mb-4 text-center">Add Scholarship</h2>
  {error && <div className="bg-red-600 text-white p-3 mb-4 rounded shadow">{error}</div>}
  {success && <div className="bg-green-600 text-white p-3 mb-4 rounded shadow">{success}</div>}
  <input
    type="text"
    name="title"
    placeholder="Title"
    value={formData.title}
    onChange={handleChange}
    className="mb-3 p-3 w-full bg-gray-700 text-white rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <input
    type="text"
    name="location"
    placeholder="Location"
    value={formData.location}
    onChange={handleChange}
    className="mb-3 p-3 w-full bg-gray-700 text-white rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <input
    type="text"
    name="date"
    placeholder="Date"
    value={formData.date}
    onChange={handleChange}
    className="mb-3 p-3 w-full bg-gray-700 text-white rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <input
    type="text"
    name="duration"
    placeholder="Duration"
    value={formData.duration}
    onChange={handleChange}
    className="mb-3 p-3 w-full bg-gray-700 text-white rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <input
    type="text"
    name="description"
    placeholder="Description"
    value={formData.description}
    onChange={handleChange}
    className="mb-3 p-3 w-full bg-gray-700 text-white rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <input
    type="text"
    name="amount"
    placeholder="Amount"
    value={formData.amount}
    onChange={handleChange}
    className="mb-3 p-3 w-full bg-gray-700 text-white rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <input
    type="text"
    name="image"
    placeholder="Image URL"
    value={formData.image}
    onChange={handleChange}
    className="mb-3 p-3 w-full bg-gray-700 text-white rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <input
    type="text"
    name="scholarship"
    placeholder="Scholarship URL"
    value={formData.scholarship}
    onChange={handleChange}
    className="mb-3 p-3 w-full bg-gray-700 text-white rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <input
    type="text"
    name="fundingType"
    placeholder="Funding Type"
    value={formData.fundingType}
    onChange={handleChange}
    className="mb-3 p-3 w-full bg-gray-700 text-white rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <input
    type="text"
    name="eligibilty"
    placeholder="Eligibilty"
    value={formData.eligibilty}
    onChange={handleChange}
    className="mb-3 p-3 w-full bg-gray-700 text-white rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <button type="submit" className="bg-blue-500 p-3 rounded text-white w-full font-semibold shadow hover:bg-blue-600 transition-all duration-300">
    {loading ? 'Adding...' : 'Add Scholarship'}
  </button>
</form>

  );
};

export default AddScholarship;
