const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

app.get('/api/quote', async (req, res) => {
  try {
    console.log('Attempting to fetch quote from external API...');
    const response = await axios.get('http://api.quotable.io/random');
    console.log('Successfully fetched quote:', response.data);
    res.json({
      content: response.data.content,
      author: response.data.author
    });
  } catch (error) {
    console.error('Error fetching quote:', error.message);
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
    }
    res.status(500).json({ error: 'Error fetching quote', details: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
