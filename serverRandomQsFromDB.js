require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const { Pool } = require('pg');
const cors = require('cors');
const PORT = process.env.PORT || 5001;
//get name-desc questions from database
const pool = new Pool({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port,
});
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/api/random-questions', async (req, res) => {
    const count = parseInt(req.query.count) || 8;
  try {
    const questions = [];
    const seenIds = new Set();
    while (questions.length < count) {
    // Get a random definition
    const randomDefinitionResult = await pool.query('SELECT * FROM terminologies ORDER BY RANDOM() LIMIT 1');
    const question = randomDefinitionResult.rows[0];
    if (seenIds.has(question.id)){
      continue;
    }
    seenIds.add(question.id);
    // Fetch random choices from the same category
    const choicesResult = await pool.query(
      'SELECT * FROM terminologies WHERE category = $1 AND name != $2 ORDER BY RANDOM() LIMIT 3',
      [question.category, question.name]
    );

    const choices = choicesResult.rows.map(choice => choice.name);
    
    // Combine the correct answer with the choices
    choices.push(question.name);
    // Shuffle the choices
    const shuffledChoices = choices.sort(() => Math.random() - 0.5);

    questions.push({
      id: question.id,
      question: question.definition,
      correctAnswer: question.name,
      choices: shuffledChoices,
    });
  } //end of for loop
  res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//get the rest of the questions from questions.json
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

function generateQuestions() {
  const questionsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'public', 'questions.json'), 'utf-8'));
  const selectedQuestions = [];
  const seenIds = new Set();
  // Select 7 unique questions
  while (selectedQuestions.length < 7) {
      const randomIndex = Math.floor(Math.random() * questionsData.length);
      const question = questionsData[randomIndex]; 
      if (seenIds.has(question.question)){
        continue;
      }
      seenIds.add(question.question);
      //store the original answer before shuffling
      const correctAnswerIndex = question.answer;
      original_answer = question.choices[correctAnswerIndex];//answer id of the original question
      
      shuffleArray(question.choices);
      // Find the new index of the correct answer after shuffle
      question.answer = question.choices.indexOf(original_answer);
      
      selectedQuestions.push(question);
  }

  return selectedQuestions;
}
app.get('/api/questions', (req, res) => {
  const questions = generateQuestions();
  res.json(questions);
});

// Start your server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
