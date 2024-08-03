import React, { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';
import AddScholarship from './AddScholarship';
import { GrCaretPrevious, GrCaretNext } from "react-icons/gr";
import { GoAlert } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";
import ReportIssueForm from "./report/Report";
import EditScholarship from "./edit/Edit";

const Scholarship = () => {
    const [scholarships, setScholarships] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedScholarship, setSelectedScholarship] = useState(null);
    const [reportScholarship, setReportScholarship] = useState(null);
    const [editScholarship, setEditScholarship] = useState(null);

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
        setScholarships([...scholarships, newScholarship]);
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

    const handlePrevious = () => {
        const currentIndex = scholarships.findIndex(s => s._id === selectedScholarship._id);
        const prevIndex = (currentIndex > 0 ? currentIndex - 1 : scholarships.length - 1);
        setSelectedScholarship(scholarships[prevIndex]);
    };

    const handleNext = () => {
        const currentIndex = scholarships.findIndex(s => s._id === selectedScholarship._id);
        const nextIndex = (currentIndex < scholarships.length - 1 ? currentIndex + 1 : 0);
        setSelectedScholarship(scholarships[nextIndex]);
    };

    const handleAlertClick = (scholarship) => {
        setReportScholarship(scholarship);
    };

    const handleCloseReport = () => {
        setReportScholarship(null);
    };

    const handleEditClick = (scholarship) => {
        setEditScholarship(scholarship);
    };

    const handleCloseEdit = () => {
        setEditScholarship(null);
    };

    const handleSaveEdit = (updatedScholarship) => {
        setScholarships(scholarships.map(s => s._id === updatedScholarship._id ? updatedScholarship : s));
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
                            className="bg-gray-800 text-white rounded-lg shadow-md p-6 mb-4 flex items-center space-x-4 cursor-pointer relative"
                            onClick={() => handleCardClick(scholarship)}
                        >
                            <img src={scholarship.image} alt={scholarship.title} className="w-16 h-16 rounded-full" />
                            <div className="flex-grow">
                                <h3 className="text-xl font-semibold">{scholarship.title}</h3>
                                <p className="text-gray-400">Eligibility: {scholarship.eligibility}</p>
                                <p className="text-gray-400">Location: {scholarship.location}</p>
                                <p className="text-gray-400">Amount: {scholarship.amount}</p>
                                <p className="text-gray-400">Funding Type: {scholarship.fundingType}</p>
                            </div>
                            <div className="absolute bottom-6 right-6" onClick={(e) => { e.stopPropagation(); handleAlertClick(scholarship); }}>
                                <GoAlert />
                            </div>
                            <div className="absolute top-6 right-6" onClick={(e) => { e.stopPropagation(); handleEditClick(scholarship); }}>
                                <FaRegEdit />
                            </div>
                        </div>
                    ))
                )}
                {selectedScholarship && (
                    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                        <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-50 hover:text-white z-50">
                            &times;
                        </button>
                        <div className="bg-gray-800 text-white rounded-lg shadow-md p-6 w-full max-w-lg relative">
                            <h3 className="text-2xl font-semibold mb-4">{selectedScholarship.title}</h3>
                            <img src={selectedScholarship.image} alt={selectedScholarship.title} className="w-32 h-32 rounded-full mx-auto mb-4" />
                            <p className="text-gray-400 mb-2"><strong>Location:</strong> {selectedScholarship.location}</p>
                            <p className="text-gray-400 mb-2"><strong>Date:</strong> {selectedScholarship.date}</p>
                            <p className="text-gray-400 mb-2"><strong>Duration:</strong> {selectedScholarship.duration}</p>
                            <p className="text-gray-400 mb-2"><strong>Amount:</strong> {selectedScholarship.amount}</p>
                            <p className="text-gray-400 mb-2"><strong>Eligibility:</strong> {selectedScholarship.eligibility}</p>
                            <p className="text-gray-400 mb-2"><strong>Funding Type:</strong> {selectedScholarship.fundingType}</p>
                            <p className="text-gray-400 mb-4"><strong>Description: </strong>{selectedScholarship.description}</p>
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
                        <button
                            onClick={handlePrevious}
                            className="absolute left-64 top-1/2 transform -translate-y-1/2 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                        >
                            <GrCaretPrevious />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-64 top-1/2 transform -translate-y-1/2 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                        >
                            <GrCaretNext />
                        </button>
                    </div>
                )}
                {reportScholarship && (
                    <ReportIssueForm scholarship={reportScholarship} onClose={handleCloseReport} />
                )}
                {editScholarship && (
                    <EditScholarship scholarship={editScholarship} onClose={handleCloseEdit} onSave={handleSaveEdit} />
                )}
            </div>
        </div>
    );
};

export default Scholarship;
