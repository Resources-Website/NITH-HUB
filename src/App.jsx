import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Scholarship from './components/scholarship/Scholarship';
import AddScholarship from './components/scholarship/AddScholarship';
import SignIn from './components/signin/SignIn';
import Research_intern from "./components/research_intern/Research_intern"
import Add_intern from "./components/research_intern/Add_intern"
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Scholarship />} />
          <Route path="/scholarship" element={<Scholarship />} />
          <Route path="/research_intern" element={<Research_intern />} />
          <Route path="/add_intern" element={<Add_intern />} />
          <Route path="/add-scholarship" element={<AddScholarship />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
