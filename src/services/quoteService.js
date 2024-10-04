const fetchQuote = async () => {
  try {
    console.log('Attempting to fetch quote...');
    const response = await fetch('http://localhost:5000/api/quote');
    console.log('API response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Received quote:', data);
    
    return {
      content: data.content,
      author: data.author
    };
  } catch (error) {
    console.error('Error fetching quote:', error.message);
    return {
      content: 'Unable to load quote',
      author: 'Unknown'
    };
  }
};

export { fetchQuote };