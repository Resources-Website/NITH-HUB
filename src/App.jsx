import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar'



function App() {


  return (
    <div>
      <section id='Navbar'>
        <Navbar />
      </section>
      <section id='Community'>Community</section>
      <section id='Results'>Results</section>
      <section id='Company'>Company</section>
      <section id='Host'>Host</section>
      <section id='Syllabus'>Syllabus tracker</section>

    </div>
  )
}

export default App
