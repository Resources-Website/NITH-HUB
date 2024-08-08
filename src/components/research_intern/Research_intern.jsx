import React, { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';
import { GrCaretPrevious, GrCaretNext } from "react-icons/gr";
import { GoAlert } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";
import ReportIssueForm from "../scholarship/report/Report";
import EditInternship from "../scholarship/edit/Edit"; // Ensure you have an EditInternship component similar to EditScholarship

const Internship = () => {
    const [internships, setInternships] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedInternship, setSelectedInternship] = useState(null);
    const [reportInternship, setReportInternship] = useState(null);
    const [editInternship, setEditInternship] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/internships')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Fetched internships:', data); // Log the fetched data
                setInternships(data);
            })
            .catch((error) => console.error('Error fetching internships:', error));
    }, []);

    const addInternship = (newInternship) => {
        setInternships([...internships, newInternship]);
    };

    const handleSearch = debounce((event) => {
        setSearchTerm(event.target.value);
    }, 300);

    const handleCardClick = (internship) => {
        setSelectedInternship(internship);
    };

    const handleCloseModal = () => {
        setSelectedInternship(null);
    };

    const handlePrevious = () => {
        const currentIndex = internships.findIndex(s => s._id === selectedInternship._id);
        const prevIndex = (currentIndex > 0 ? currentIndex - 1 : internships.length - 1);
        setSelectedInternship(internships[prevIndex]);
    };

    const handleNext = () => {
        const currentIndex = internships.findIndex(s => s._id === selectedInternship._id);
        const nextIndex = (currentIndex < internships.length - 1 ? currentIndex + 1 : 0);
        setSelectedInternship(internships[nextIndex]);
    };

    const handleAlertClick = (internship) => {
        setReportInternship(internship);
    };

    const handleCloseReport = () => {
        setReportInternship(null);
    };

    const handleEditClick = (internship) => {
        setEditInternship(internship);
    };

    const handleCloseEdit = () => {
        setEditInternship(null);
    };

    const handleSaveEdit = (updatedInternship) => {
        setInternships(internships.map(s => s._id === updatedInternship._id ? updatedInternship : s));
    };

    const filteredInternships = internships.filter((internship) => {
        return (
            internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            internship.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            internship.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
            internship.amount.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="bg-gray-900 min-h-screen rounded-lg p-4">
            <div className="max-w-screen-lg mx-auto">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search internships..."
                        onChange={(e) => handleSearch(e)}
                        className="w-full p-2 rounded-lg bg-gray-800 text-white"
                    />
                </div>
                {filteredInternships.length === 0 ? (
                    <p className="text-white">No internships found.</p>
                ) : (
                    filteredInternships.map((internship) => (
                        <div
                            key={internship._id} // Use _id from MongoDB
                            className="bg-gray-800 text-white rounded-lg shadow-md p-6 mb-4 flex items-center space-x-4 cursor-pointer relative"
                            onClick={() => handleCardClick(internship)}
                        >
                            <img src={internship.image} alt={internship.title} className="w-20 h-auto shadow-md" />
                            <div className="flex-grow">
                                <h3 className="text-xl font-semibold">{internship.title}</h3>
                                <p className="text-gray-400">Eligibility: {internship.eligibility}</p>
                                <p className="text-gray-400">Location: {internship.location}</p>
                                <p className="text-gray-400">Amount: {internship.amount}</p>
                                <p className="text-gray-400">Funding Type: {internship.fundingType}</p>
                            </div>
                            <div className="absolute bottom-6 right-6" onClick={(e) => { e.stopPropagation(); handleAlertClick(internship); }}>
                                <GoAlert />
                            </div>
                            <div className="absolute top-6 right-6" onClick={(e) => { e.stopPropagation(); handleEditClick(internship); }}>
                                <FaRegEdit />
                            </div>
                        </div>
                    ))
                )}
                {selectedInternship && (
                    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-start justify-center z-50 overflow-y-scroll">
                        <button onClick={handleCloseModal} className="fixed top-4 right-10 text-gray-50 hover:text-white z-50">
                            &times;
                        </button>
                        <div className="bg-gray-800 text-white rounded-lg shadow-md p-6 w-full max-w-lg relative">
                            <h3 className="text-2xl font-semibold mb-4">{selectedInternship.title}</h3>
                            <img src={selectedInternship.image} alt={selectedInternship.title} className="w-32 h-auto mx-auto mb-4 shadow-md" />
                            <p className="text-gray-400 mb-2"><strong>Location:</strong> {selectedInternship.location}</p>
                            <p className="text-gray-400 mb-2"><strong>Date:</strong> {selectedInternship.date}</p>
                            <p className="text-gray-400 mb-2"><strong>Duration:</strong> {selectedInternship.duration}</p>
                            <p className="text-gray-400 mb-2"><strong>Amount:</strong> {selectedInternship.amount}</p>
                            <p className="text-gray-400 mb-2"><strong>Eligibility:</strong> {selectedInternship.eligibility}</p>
                            <p className="text-gray-400 mb-2"><strong>Funding Type:</strong> {selectedInternship.fundingType}</p>
                            <p className="text-gray-400 mb-4"><strong>Description: </strong>{selectedInternship.description}</p>
                            <div className="flex justify-between">
                                <button className="text-xl text-gray-50" onClick={handlePrevious}>
                                    <GrCaretPrevious />
                                </button>
                                <button className="text-xl text-gray-50" onClick={handleNext}>
                                    <GrCaretNext />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {reportInternship && (
                    <ReportIssueForm
                        internship={reportInternship}
                        onClose={handleCloseReport}
                    />
                )}
                {editInternship && (
                    <EditInternship
                        internship={editInternship}
                        onClose={handleCloseEdit}
                        onSave={handleSaveEdit}
                    />
                )}
            </div>
        </div>
    );
};

export default Internship;
