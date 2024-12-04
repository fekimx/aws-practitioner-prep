import React, { useState } from 'react';
import axios from 'axios';
import './style-quizzes.module.css';


const Quiz = () => {
  //questions is to pull from DB and json
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [results, setResults] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fetchQuestions = async () => {
    
    try {
      setIsSubmitted(false);
      const [response1, response2] = await Promise.all([
        axios.get('http://localhost:5001/api/random-questions?count=8'),
        axios.get('http://localhost:5001/api/questions')
      ]);
      console.log(response1.data);
      console.log(response2.data);

      const processedQuestions2 = response2.data.map((question) => ({
        ...question,
        correctAnswer: question.choices[question.answer], // Use answer index to set correctAnswer in questions.json
      }));

      setQuestions([...response1.data, ...processedQuestions2]);
      setSelectedAnswers(Array(questions.length).fill(''));
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
    setIsSubmitted(true);
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
    <div className="container row col-md-8" style={{ margin: 'auto', textAlign:'justify' }}>
      <p>When you hit the "Quiz Me" button below, the questions will be generated randomly. Here you can test your AWS knowledge!</p>
      <div className="text-center my-3">
        <button onClick={fetchQuestions} className="btn btn-dark rounded-pill py-2 px-4" >Quiz Me</button>
      </div>
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
                      disabled={isSubmitted}
                    />
                    <span style={{ color: results.length > 0 && choice === question.correctAnswer ? 'green' : 'black', fontWeight: results.length > 0 && choice === question.correctAnswer ? 'bold' : 'normal' }}>
        {choice}
      </span>
                  </label>
                </div>
              ))}
            </div>
          ))}
          <div className="text-center my-3">
            <button type="submit" className="btn btn-dark rounded-pill py-2 px-4" disabled={isSubmitted}>Submit Answers</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Quiz;
