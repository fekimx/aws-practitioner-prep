import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} AWS Practitioner Prep, created by Fatma Ekim.</p>
        <a className="text-warning mx-2" href="https://www.linkedin.com/in/fatma-ekim/">LinkedIn</a>
        <a className="text-warning mx-2" href="https://github.com/fekimx/aws-practitioner-prep">GitHub</a>
      </div>
    </footer>
  );
};

export default Footer;