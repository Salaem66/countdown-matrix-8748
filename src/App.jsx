import React, { useState, useEffect } from 'react';

const App = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isPaused]);

  useEffect(() => {
    if (time === 0) {
      setIsFinished(true);
      setIsRunning(false);
    }
  }, [time]);

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused((prevState) => !prevState);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    setIsPaused(false);
    setIsFinished(false);
  };

  const handleSetTime = (seconds) => {
    setTime(seconds);
    setIsRunning(false);
    setIsPaused(false);
    setIsFinished(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-green-500 font-mono">
      <div className="text-4xl mb-8">
        {Math.floor(time / 60)}:{String(time % 60).padStart(2, '0')}
      </div>
      <div className="space-x-4">
        <button
          className={`px-4 py-2 rounded-md transition-colors ${
            isRunning && !isPaused
              ? 'bg-green-500 hover:bg-green-600 text-black'
              : 'bg-transparent hover:bg-green-500 hover:text-black'
          }`}
          onClick={handleStart}
        >
          Start
        </button>
        <button
          className={`px-4 py-2 rounded-md transition-colors ${
            isPaused ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : 'bg-transparent hover:bg-yellow-500 hover:text-black'
          }`}
          onClick={handlePause}
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button
          className="px-4 py-2 rounded-md bg-transparent hover:bg-red-500 hover:text-black transition-colors"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <div className="mt-8 space-x-4">
        <button
          className="px-4 py-2 rounded-md bg-transparent hover:bg-blue-500 hover:text-black transition-colors"
          onClick={() => handleSetTime(60)}
        >
          1 min
        </button>
        <button
          className="px-4 py-2 rounded-md bg-transparent hover:bg-blue-500 hover:text-black transition-colors"
          onClick={() => handleSetTime(300)}
        >
          5 min
        </button>
        <button
          className="px-4 py-2 rounded-md bg-transparent hover:bg-blue-500 hover:text-black transition-colors"
          onClick={() => handleSetTime(600)}
        >
          10 min
        </button>
      </div>
      {isFinished && (
        <div className="mt-8 text-red-500 animate-blink">
          <span className="text-4xl">Time's up!</span>
        </div>
      )}
    </div>
  );
};

export default App;