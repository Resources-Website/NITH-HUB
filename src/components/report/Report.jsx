import React, { useState } from 'react';

const ReportIssueForm = ({ scholarship, onClose }) => {
    const [selectedIssue, setSelectedIssue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Report for ${scholarship.title}: ${selectedIssue}`);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-50 hover:text-white z-50">
                &times;
            </button>
            <div className="bg-gray-800 text-white rounded-lg shadow-md p-6 w-full max-w-lg relative">

                <h3 className="text-2xl font-semibold mb-4">Report Issue for {scholarship.title}</h3>
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2">
                        <input
                            type="radio"
                            value="Wrong Date"
                            checked={selectedIssue === 'Wrong Date'}
                            onChange={(e) => setSelectedIssue(e.target.value)}
                            className="mr-2"
                        />
                        Wrong Date
                    </label>
                    <label className="block mb-2">
                        <input
                            type="radio"
                            value="Wrong Funding"
                            checked={selectedIssue === 'Wrong Funding'}
                            onChange={(e) => setSelectedIssue(e.target.value)}
                            className="mr-2"
                        />
                        Wrong Funding
                    </label>
                    <label className="block mb-2">
                        <input
                            type="radio"
                            value="Wrong Links"
                            checked={selectedIssue === 'Wrong Links'}
                            onChange={(e) => setSelectedIssue(e.target.value)}
                            className="mr-2"
                        />
                        Wrong Links
                    </label>
                    <label className="block mb-2">
                        <input
                            type="radio"
                            value="Other"
                            checked={selectedIssue === 'Other'}
                            onChange={(e) => setSelectedIssue(e.target.value)}
                            className="mr-2"
                        />
                        Other
                    </label>
                    <button
                        type="submit"
                        className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReportIssueForm;