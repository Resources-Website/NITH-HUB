import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Scholarship from './components/scholarship/Scholarship';
import AddScholarship from './components/scholarship/AddScholarship';
import SignIn from './components/signin/SignIn';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Scholarship />} />
          <Route path="/scholarship" element={<Scholarship />} />
          <Route path="/add-scholarship" element={<AddScholarship />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
