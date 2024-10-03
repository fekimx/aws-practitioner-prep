import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import About from './About';
import Flashcards from './Flashcards';


import './App.css'; // Import your main CSS file


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
          <div className="container">
            <Routes>
              <Route path="/"  element={<Home/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/flash-cards" element={<Flashcards/>} />
              {/* <Route path="/contact" component={ContactPage} /> */}
            </Routes>
          </div>
        <Footer />
      </Router>
      
    </div>
  );
}

export default App;
