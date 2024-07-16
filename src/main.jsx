import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { SketchField } from 'react-sketch';
import './index.css';

// Function to retrieve base URL based on environment
export const getBaseUrl = () => {
  if (import.meta.env.MODE === 'production') {
    console.log('We are in production environment now ', import.meta.env.BASE_URL);
    return 'https://realmonte.pythonanywhere.com';
  } else {
    console.log('We are in development environment now ', import.meta.env.BASE_URL);
    return 'http://127.0.0.1:5000';
  }
};

const Layout = () => {
  const sketchRef = useRef(null);
  const [error, setError] = useState('');
  const [prediction, setPrediction] = useState('');

  const handleSubmit = async () => {
    const image = sketchRef.current.toDataURL();

    const baseUrl = getBaseUrl();

    const response = await fetch(`${baseUrl}/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image }),
    });

    const text = await response.text();

    setPrediction(text);

    setError(undefined);
  };

  const handleClear = () => {
    sketchRef.current.clear();
    setPrediction('');
  };
  return (
    <div className="App">
      <header className="App-header">
        <p>Draw a digit here:</p>
        <div className="holder">
          <div className="blob-1 child1"></div>
          <div className="sketchWrapper child2">
            <SketchField ref={sketchRef} width="100%" height="100%" lineColor="#111" lineWidth={10} />
          </div>
        </div>

        <p>Predicted value is: {prediction || ' '}</p>
        <div className="controls">
          <button onClick={handleClear}>Clear</button>
          <button onClick={handleSubmit}>Guess the number</button>
        </div>
        {error && <p className="message">Something went wrong</p>}
      </header>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Layout />);
