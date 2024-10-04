import React, { useState, useEffect } from 'react';
import { fetchQuote } from './services/quoteService';
import { TwitterShareButton, FacebookShareButton } from 'react-share';
import { CSSTransition } from 'react-transition-group';
import './App.css';

function App() {
  const [quote, setQuote] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showQuote, setShowQuote] = useState(false);

  useEffect(() => {
    getNewQuote();
  }, []);

  const getNewQuote = async () => {
    setIsLoading(true);
    setError(null);
    setShowQuote(false);
    try {
      const newQuote = await fetchQuote();
      setQuote(newQuote);
      setShowQuote(true);
    } catch (err) {
      console.error('Error in getNewQuote:', err);
      setError('Failed to fetch a new quote. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Random Quote Generator</h1>
      <div className="quote-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <CSSTransition
            in={showQuote}
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
            <div className="quote">
              <p className="quote-content">"{quote.content}"</p>
              <p className="quote-author">- {quote.author}</p>
            </div>
          </CSSTransition>
        )}
      </div>
      <button onClick={getNewQuote} disabled={isLoading} className="new-quote-btn">
        {isLoading ? 'Loading...' : 'Get New Quote'}
      </button>
      <div className="share-buttons">
        <TwitterShareButton
          url={'https://your-app-url.com'}
          title={`"${quote.content}" - ${quote.author}`}
        >
          Share on Twitter
        </TwitterShareButton>
        <FacebookShareButton
          url={'https://your-app-url.com'}
          quote={`"${quote.content}" - ${quote.author}`}
        >
          Share on Facebook
        </FacebookShareButton>
      </div>
    </div>
  );
}

export default App;