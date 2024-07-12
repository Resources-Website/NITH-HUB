import React, { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';
import AddScholarship from './AddScholarship'; // Ensure you import the AddScholarship component


const Scholarship = () => {
    const [scholarships, setScholarships] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedScholarship, setSelectedScholarship] = useState(null);

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

    const handleCardClick = (scholarship) => {
        setSelectedScholarship(scholarship);
    };

    const handleCloseModal = () => {
        setSelectedScholarship(null);
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
                    filteredScholarships.map((scholarship) => (
                        <div
                            key={scholarship._id} // Use _id from MongoDB
                            className="bg-gray-800 text-white rounded-lg shadow-md p-6 mb-4 flex items-center space-x-4 cursor-pointer"
                            onClick={() => handleCardClick(scholarship)}
                        >
                            <img src={scholarship.image} alt={scholarship.title} className="w-16 h-16 rounded-full" />
                            <div className="flex-grow">
                                <h3 className="text-xl font-semibold">{scholarship.title}</h3>
                                <p className="text-gray-400">{scholarship.location}</p>
                                <p className="text-gray-400">{scholarship.date}</p>
                                <p className="text-gray-400">{scholarship.amount}</p>
                                <div className="flex items-center space-x-2 mt-2">
                                    <span className="text-yellow-400">{"⭐".repeat(scholarship.rating)}</span>
                                    <span className="text-gray-400">{scholarship.reviews} reviews</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                {selectedScholarship && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-gray-800 text-white rounded-lg shadow-md p-6 w-full max-w-lg relative">
                            <button onClick={handleCloseModal} className="absolute top-2 right-2 text-gray-400 hover:text-white">
                                &times;
                            </button>
                            <h3 className="text-2xl font-semibold mb-4">{selectedScholarship.title}</h3>
                            <img src={selectedScholarship.image} alt={selectedScholarship.title} className="w-32 h-32 rounded-full mx-auto mb-4" />
                            <p className="text-gray-400 mb-2"><strong>Location:</strong> {selectedScholarship.location}</p>
                            <p className="text-gray-400 mb-2"><strong>Date:</strong> {selectedScholarship.date}</p>
                            <p className="text-gray-400 mb-2"><strong>Amount:</strong> {selectedScholarship.amount}</p>
                            <div className="flex items-center space-x-2 mb-4">
                                <span className="text-yellow-400">{"⭐".repeat(selectedScholarship.rating)}</span>
                                <span className="text-gray-400">{selectedScholarship.reviews} reviews</span>
                            </div>
                            <p className="text-gray-400 mb-4">{selectedScholarship.description}</p>
                            <a
                                href={selectedScholarship.link}
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
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Scholarship;
