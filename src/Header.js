import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-warning mb-5">
      <div className="container">
        <a className="navbar-brand" href="/">AWS Practitioner Prep</a>
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleMenu}
          aria-controls="navbarNav" 
          aria-expanded={isMenuOpen} 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
            {/* <ul className={`navbar-nav ms-auto position-absolute`} style={{ top: '10px', right: '0', zIndex: 1000 }}> */}
            <ul className="navbar-nav ms-auto">
                <li className="nav-item"><Link className="nav-link text-white py-2" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link text-white py-2" to="/about">About</Link></li>
                <li className="nav-item"><Link className="nav-link text-white py-2" to="/lessons">Lessons</Link></li>
                <li className="nav-item"><Link className="nav-link text-white py-2" to="/flash-cards">Flash Cards</Link></li>
                <li className="nav-item"><Link className="nav-link text-white py-2" to="/quiz">Quizzes</Link></li>
                <li className="nav-item"><Link className="nav-link text-white py-2" to="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
