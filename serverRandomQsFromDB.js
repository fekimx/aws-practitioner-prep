require('dotenv').config();
const express = require('express');
const app = express();
const { Pool } = require('pg');
const cors = require('cors');
const PORT = process.env.PORT || 5001;

const pool = new Pool({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port,
});
app.use(cors());

app.get('/api/random-questions', async (req, res) => {
    const count = parseInt(req.query.count) || 8;
  try {
    const questions = []
    for (let i = 0; i < count; i++) {
    // Get a random definition
    const randomDefinitionResult = await pool.query('SELECT * FROM terminologies ORDER BY RANDOM() LIMIT 1');
    const question = randomDefinitionResult.rows[0];

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
      question: (i+1) + ". " + question.definition,
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


// Start your server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
