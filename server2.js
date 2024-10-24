require('dotenv').config();
const express = require('express');
const { Client } = require('pg');
const app = express();
const PORT = process.env.PORT || 5001;
const cors = require('cors');
// pull from database directly, env was used but not tested

// PostgreSQL setup
const pgClient = new Client({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port,
});

// Connect to PostgreSQL
pgClient.connect();

app.use(cors());

// API route to get notes
app.get('/api/lessons', async (req, res) => {
    try {
        const result = await pgClient.query('SELECT * FROM notes ORDER BY heading');
        res.json(result.rows); // Send notes as JSON response
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

process.on('SIGINT', async () => {
    await pgClient.end();
    process.exit();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

