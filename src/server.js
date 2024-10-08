const express = require('express');
const { GoogleAuth } = require('google-auth-library');
const cors = require('cors');
const axios = require('axios'); // Import axios

const app = express();
const PORT = 5001;

app.use(cors({
  origin: 'http://localhost:3000' // Replace with your frontend origin
}));

const SERVICE_ACCOUNT_FILE = './service_account.json'; 
const DOCUMENT_ID = '1wI5jCQODspLgbWHNtj7cyIoCeWx5EBAZoc5SrTifLPk'; // Google Doc ID

app.get('/api/doc', async (req, res) => {
  const auth = new GoogleAuth({
    keyFile: SERVICE_ACCOUNT_FILE,
    scopes: ['https://www.googleapis.com/auth/documents.readonly'],
  });

  try {
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();
    // console.log('Access Token:', accessToken.token);

    const response = await axios.get(`https://docs.googleapis.com/v1/documents/${DOCUMENT_ID}`, {
      headers: {
        Authorization: `Bearer ${accessToken.token}`,
      },
    });

    res.json(response.data.body.content); // Send the content back
    const structuredContent = [];
    let currentHeading = null;

    content.forEach(element => {
      if (element.paragraph) {
        const textStyle = element.paragraph.paragraphStyle;

        // Check if the paragraph is a heading (Level 1-6)
        if (textStyle.namedStyleType && textStyle.namedStyleType.startsWith('HEADING_')) {
          if (currentHeading) {
            structuredContent.push(currentHeading); // Push previous heading
          }
          currentHeading = {
            title: element.paragraph.elements[0].textRun.content.trim(),
            content: [],
            expanded: false,
          };
        } else if (currentHeading) {
          // Add non-heading content to the current heading
          const paragraphText = element.paragraph.elements.map(el => el.textRun.content).join('').trim();
          if (paragraphText) {
            currentHeading.content.push(paragraphText);
          }
        }
      }
    });
    if (currentHeading) {
      structuredContent.push(currentHeading); // Push the last heading
    }

    res.json(structuredContent); // Send the structured content
  } catch (error) {
    console.error('Error fetching document:', error.response ? error.response.data : error.message);
    res.status(500).send('Error fetching document');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
