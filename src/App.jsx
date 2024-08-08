// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Scholarship from './components/scholarship/Scholarship';
import AddScholarship from './components/scholarship/AddScholarship';
import SignIn from './components/signin/SignIn';
import Research_intern from "./components/research_intern/Research_intern"
import Add_intern from "./components/research_intern/Add_intern"
import Loader from './components/loader/Loader';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay of 5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div>
        {loading && <Loader />}
        {!loading && (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Scholarship />} />
              <Route path="/scholarship" element={<Scholarship />} />
              <Route path="/research_intern" element={<Research_intern />} />
              <Route path="/add_intern" element={<Add_intern />} />
              <Route path="/add-scholarship" element={<AddScholarship />} />
              <Route path="/signin" element={<SignIn />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
