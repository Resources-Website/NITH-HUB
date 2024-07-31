import React, { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';
import AddScholarship from './AddScholarship'; // Ensure you import the AddScholarship component


const Scholarship = () => {
    const [scholarships, setScholarships] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedScholarshipIndex, setSelectedScholarshipIndex] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/scholarships')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Fetched scholarships:', data); // Log the fetched data
                setScholarships(data);
            })
            .catch((error) => console.error('Error fetching scholarships:', error));
    }, []);

    const addScholarship = (newScholarship) => {
        setScholarships([...scholarships, newScholarship ]);
    };

    const handleSearch = debounce((event) => {
        setSearchTerm(event.target.value);
    }, 300);

    const handleCardClick = (index) => {
        setSelectedScholarshipIndex(index);
    };

    const handleCloseModal = () => {
        setSelectedScholarshipIndex(null);
    };

    const handlePrevious = () => {
        setSelectedScholarshipIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : scholarships.length - 1));
    };

    const handleNext = () => {
        setSelectedScholarshipIndex((prevIndex) => (prevIndex < scholarships.length - 1 ? prevIndex + 1 : 0));
    };

    const filteredScholarships = scholarships.filter((scholarship) => {
        return (
            scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            scholarship.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            scholarship.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
            scholarship.amount.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="bg-gray-900 min-h-screen rounded-lg p-4">
            <div className="max-w-screen-lg mx-auto">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search scholarships..."
                        onChange={(e) => handleSearch(e)}
                        className="w-full p-2 rounded-lg bg-gray-800 text-white"
                    />
                </div>
                {filteredScholarships.length === 0 ? (
                    <p className="text-white">No scholarships found.</p>
                ) : (
                    filteredScholarships.map((scholarship, index) => (
                        <div
                            key={scholarship._id} // Use _id from MongoDB
                            className="bg-gray-800 text-white rounded-lg shadow-md p-6 mb-4 flex items-center space-x-4 cursor-pointer"
                            onClick={() => handleCardClick(index)}
                        >
                            <img src={scholarship.image} alt={scholarship.title} className="w-16 h-16 rounded-full" />
                            <div className="flex-grow">
                                <h3 className="text-xl font-semibold">{scholarship.title}</h3>
                                <p className="text-gray-400">Eligibilty: {scholarship.eligibilty}</p>
                                <p className="text-gray-400">Location: {scholarship.location}</p>
                                <p className="text-gray-400">Amount: {scholarship.amount}</p>
                                
                                <p className="text-gray-400">Funding Type: {scholarship.fundingType}</p>
                            </div>
                        </div>
                    ))
                )}
                {selectedScholarshipIndex !== null && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-gray-800 text-white rounded-lg shadow-md p-6 w-full max-w-lg relative">
                            <button onClick={handleCloseModal} className="absolute top-2 right-2 text-gray-400 hover:text-white">
                                &times;
                            </button>
                            <h3 className="text-2xl font-semibold mb-4">{scholarships[selectedScholarshipIndex].title}</h3>
                            <img src={scholarships[selectedScholarshipIndex].image} alt={scholarships[selectedScholarshipIndex].title} className="w-32 h-32 rounded-full mx-auto mb-4" />
                            <p className="text-gray-400 mb-2"><strong>Location:</strong> {scholarships[selectedScholarshipIndex].location}</p>
                            <p className="text-gray-400 mb-2"><strong>Date:</strong> {scholarships[selectedScholarshipIndex].date}</p>
                            <p className="text-gray-400 mb-2"><strong>Duration:</strong> {scholarships[selectedScholarshipIndex].duration}</p>
                            <p className="text-gray-400 mb-2"><strong>Amount:</strong> {scholarships[selectedScholarshipIndex].amount}</p>
                            <p className="text-gray-400 mb-2"><strong>Eligibilty:</strong> {scholarships[selectedScholarshipIndex].eligibilty}</p>
                            <p className="text-gray-400 mb-2"><strong>Funding Type:</strong> {scholarships[selectedScholarshipIndex].fundingType}</p>
                            <p className="text-gray-400 mb-4"><strong>Description: </strong>{scholarships[selectedScholarshipIndex].description}</p>
                             

  
                            <a
                                href={scholarships[selectedScholarshipIndex].link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 underline"
                            >
                                <button
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Apply Now
                                </button>
                            </a>
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={handlePrevious}
                                    className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Scholarship;
