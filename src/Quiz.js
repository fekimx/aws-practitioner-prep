import React, { useState } from 'react';
import axios from 'axios';
import './style-quizzes.css';


const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(8).fill(''));
  const [results, setResults] = useState([]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/random-questions?count=8');
      setQuestions(response.data);
      setSelectedAnswers(Array(8).fill(''));
      setResults([]);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleAnswerChange = (index, answer) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[index] = answer;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newResults = questions.map((question, index) => ({
      question: question.question,
      selectedAnswer: selectedAnswers[index],
      correctAnswer: question.correctAnswer,
      isCorrect: selectedAnswers[index] === question.correctAnswer,
    }));
    setResults(newResults);
  };

  return (
    <div>
      <button onClick={fetchQuestions} className="btn btn-primary">Quiz Me</button>
      {questions.length > 0 && (
        <form onSubmit={handleSubmit}>
          {questions.map((question, questionIndex) => (
            <div key={questionIndex}>
              <h3>
                {question.question}
                {results.length > 0 && (
                  <>
                    {results[questionIndex].isCorrect ? ' ✅' : ' ❌'}
                  </>
                )}
              </h3>
              {question.choices.map((choice, choiceIndex) => (
                <div key={choiceIndex}>
                  <label>
                    <input
                      type="radio"
                      name={`quiz-choice-${questionIndex}`}
                      value={choice}
                      checked={selectedAnswers[questionIndex] === choice}
                      onChange={() => handleAnswerChange(questionIndex, choice)}
                    />
                    <span style={{ color: results.length > 0 && choice === question.correctAnswer ? 'green' : 'black', fontWeight: results.length > 0 && choice === question.correctAnswer ? 'bold' : 'normal' }}>
        {choice}
      </span>
                  </label>
                </div>
              ))}
            </div>
          ))}
          <button type="submit" className="btn btn-primary">Submit Answers</button>
        </form>
      )}
    </div>
  );
};

export default Quiz;
