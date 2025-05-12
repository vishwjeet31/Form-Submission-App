const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8010/submit';

console.log('Using backend URL:', BACKEND_URL); // for debug

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Render form
app.get('/', (req, res) => {
  res.render('form');
});

// Handle form submission
app.post('/submit', async (req, res) => {
  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const result = await response.json();
    res.render('form', { message: result.message });
  } catch (error) {
    console.error('Error submitting to backend:', error);
    res.render('form', { message: 'Submission failed.' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Frontend server running on http://localhost:${PORT}`);
});


