import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { SketchField } from 'react-sketch';
import './index.css';

const Layout = () => {
  const sketchRef = useRef(null);
  const [error, setError] = useState('');
  const [prediction, setPrediction] = useState('');

  const handleSubmit = async () => {
    const image = sketchRef.current.toDataURL();

    const response = await fetch(
      'https://realmonte.pythonanywhere.com/process',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image }),
      }
    );

    const text = await response.text();

    setPrediction(text);

    setError(undefined);
  };

  const handleClear = e => {
    sketchRef.current.clear();
    setPrediction('');
  };
  return (
    <div className='App'>
      <header className='App-header'>
        <p>Draw a digit here:</p>
        <div className='holder'>
          <div className='blob-1 child1'></div>
          <div className='sketchWrapper child2'>
            <SketchField
              ref={sketchRef}
              width='100%'
              height='100%'
              lineColor='#111'
              lineWidth={10}
            />
          </div>
        </div>

        <p>Predicted value is: {prediction || ' '}</p>
        <div className='controls'>
          <button onClick={handleClear}>Clear</button>
          <button onClick={handleSubmit}>Guess the number</button>
        </div>
        {error && <p className='message'>Something went wrong</p>}
      </header>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Layout />);
