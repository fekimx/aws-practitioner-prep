require('dotenv').config();
const fs = require('fs');
const { Pool } = require('pg');
const { Parser } = require('htmlparser2');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;

// PostgreSQL connection setup
const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
});

// Function to parse HTML and save data
const parseHTML = (html) => {
  const data = [];
  let currentCategory = '';

  const parser = new Parser({
      onopentag(name, attributes) {
          if (name === 'h2' && attributes.class === 'c8') {
              this.inCategory = true; // Flag for category
          }
          if (name === 'p') {
            this.inParagraph = true; // Flag for paragraph
            this.currentName = ''; // Reset current name
            this.currentDefinition = ''; // Reset current definition
          }
          if (name === 'span') {
              // Check for the span classes
              if (attributes.class === 'c1') {
                  this.inName = true; // Flag for name span
              }
              if (attributes.class === 'c2') {
                  this.inDefinition = true; // Flag for definition span
              }
          }
      },
      ontext(text) {
          const trimmedText = text.trim();
          if (this.inCategory) {
              currentCategory = trimmedText; // Capture category
              this.inCategory = false; // Reset flag
          } else if (this.inParagraph) {
              // Extract spans
              if (this.inName) {
                this.currentName += trimmedText; // Capture name
            } else if (this.inDefinition) {
                this.currentDefinition += trimmedText; // Capture definition
            }
          }
      },
      onclosetag(tag) {
        if (tag === 'h2') {
          this.inCategory = false; // Reset category flag
      } else if (tag === 'p') {
          this.inParagraph = false; // Reset paragraph flag
          // Push data to array after closing the paragraph
          const cleanedDefinition = this.currentDefinition
            .replace(/:/g, '') // Remove colons
            .replace(/\n/g, ' ') // Replace newline characters with space
            .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
            .trim(); // Trim leading and trailing spaces
          if (currentCategory && this.currentName && cleanedDefinition) {
              data.push({
                  category: currentCategory,
                  name: this.currentName.trim(),
                  definition: cleanedDefinition.trim(),
              });
              // Reset for next <p>
              
              this.currentName = '';
              this.currentDefinition = '';
          }
      } else if (tag === 'span') {
          if (this.inName) {
              this.inName = false; // Reset name flag
          }
          if (this.inDefinition) {
              this.inDefinition = false; // Reset definition flag
          }
      }
      }
  });

  parser.write(html);
  parser.end();
  return data;
  
};


// Function to save data to PostgreSQL
const saveToDatabase = async (data) => {
    const client = await pool.connect();
    console.log(`Number of records to insert: ${data.length}`);
    try {
        const insertPromises = data.map(async ({ category, name, definition }) => {
            await client.query('INSERT INTO terminologies (category, name, definition) VALUES ($1, $2, $3)', [category, name, definition]);
        });
        await Promise.all(insertPromises);
        console.log('Data saved successfully');
    } catch (error) {
        console.error('Error saving data:', error);
    } finally {
        client.release();
    }
};

// Main function
const main = async () => {
    const htmlFilePath = './public/AWSCPforNameDef.html'; 
    const html = fs.readFileSync(htmlFilePath, 'utf8');
    const data = parseHTML(html);
    await saveToDatabase(data);
    pool.end(); // Close the pool after the operation
};

main().catch(console.error);

app.listen(PORT, () => {
  console.log(`Server is running`);
}); 