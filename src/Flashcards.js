// Flashcard.js
import React, { useState } from 'react';
import data from './json_files/cloud-concepts.json'; // Import the JSON data

const Flashcards = () => {
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % data.length);
    setShowBack(false); // Reset to show front side
  };

  const handlePrevious = () => {
    setIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
    setShowBack(false); // Reset to show front side
  };

  const handleFlip = () => {
    setShowBack((prev) => !prev);
  };

  return (
    <div className="text-center mt-4">
      <div className="card flashcard w-50 mx-auto" onClick={handleFlip} style={{ cursor: 'pointer' }}>
        <div className="card-body">
          {showBack ? (
            <>
              <p className="card-text">{data[index].description}</p>
            </>
          ) : (
            <>
              <h5 className="card-title">{data[index].name}</h5>
            </>
          )}
        </div>
      </div>
      <div className="mt-3">
        <button className="btn me-2" onClick={handlePrevious}>
          &lt;
        </button>
        <button className="btn" onClick={handleNext}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Flashcards;
