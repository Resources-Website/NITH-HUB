import React, { useState } from 'react';
import scholarships from './scholarships.json';

const AddScholarship = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    eligibility: '',
    deadline: '',
    link: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedScholarships = [...scholarships, form];

    // Simulate saving to JSON file
    console.log('Updated Scholarships:', JSON.stringify(updatedScholarships, null, 2));

    // Reset form
    setForm({
      name: '',
      description: '',
      eligibility: '',
      deadline: '',
      link: ''
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Add a New Scholarship</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-white">Description</label>
          <textarea
            id="description"
            name="description"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={form.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="eligibility" className="block text-sm font-medium text-white">Eligibility</label>
          <textarea
            id="eligibility"
            name="eligibility"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={form.eligibility}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="deadline" className="block text-sm font-medium text-white">Deadline</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={form.deadline}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="link" className="block text-sm font-medium text-white">Link</label>
          <input
            type="url"
            id="link"
            name="link"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={form.link}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded-md shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Scholarship
        </button>
      </form>
    </div>
  );
};

export default AddScholarship;
