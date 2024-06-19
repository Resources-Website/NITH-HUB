import React, { useState, useEffect } from 'react';
import scholarshipsData from './scholarships.json';

const Scholarship = () => {
    const [scholarships, setScholarships] = useState([]);

    useEffect(() => {
        setScholarships(scholarshipsData);
    }, []);

    return (
        <div className="bg-gray-900 min-h-screen rounded-lg p-4">
            <div className="max-w-screen-lg mx-auto">
                {scholarships.map(scholarship => (
                    <div key={scholarship.id} className="bg-gray-800 text-white rounded-lg shadow-md p-6 mb-4 flex items-center space-x-4">
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
                ))}
            </div>
        </div>
    );
};

export default Scholarship;