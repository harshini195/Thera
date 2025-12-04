import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const steps = [
  { direction: 'right', label: 'Inhale' },
  { direction: 'down', label: 'Hold' },
  { direction: 'left', label: 'Exhale' },
  { direction: 'up', label: 'Hold' },
];

const MAX_CYCLES = 5;

const Start = () => {
  const [step, setStep] = useState(-2); // -2 = "Ready?", 0+ = animation
  const [cycleCount, setCycleCount] = useState(1); // Start from cycle 1
  const [resetBox, setResetBox] = useState(false);
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const navigate = useNavigate();
  const timerRef = useRef(null);

  useEffect(() => {
    if (step === -2) {
      timerRef.current = setTimeout(() => setStep(0), 2000);
      return () => clearTimeout(timerRef.current);
    }

    if (paused || stopped || cycleCount > MAX_CYCLES) return;

    if (step >= 0 && step < steps.length) {
      timerRef.current = setTimeout(() => {
        setStep((prev) => prev + 1);
      }, 4000);
    }

    if (step === steps.length) {
      timerRef.current = setTimeout(() => {
        setResetBox(true);
        setTimeout(() => {
          setResetBox(false);
          setCycleCount((c) => c + 1);
          if (cycleCount < MAX_CYCLES) {
            setStep(0); // Reset to 0 to start next cycle
          }
        }, 200);
      }, 500);
    }

    return () => clearTimeout(timerRef.current);
  }, [step, cycleCount, paused, stopped]);

  const handlePauseResume = () => {
    setPaused((prev) => !prev);
  };

  const handleExit = () => {
    clearTimeout(timerRef.current);
    navigate('/thera');
  };

  const renderLine = (index) => {
    if (resetBox || step < index) return null;
    const className = `line ${steps[index].direction} animate`;
    return <div key={index} className={className} />;
  };

  const renderLabel = (index) => {
    const visible = step === index;
    return (
      <div key={`label-${index}`} className={`label ${steps[index].direction} ${visible ? 'visible' : ''}`}>
        {steps[index].label}
      </div>
    );
  };

  return (
    <div className="breathing-container">
      <h1 className="title">Box Breathing</h1>

      <div className="box">
        {step >= 0 && steps.map((_, i) => renderLine(i))}
        {step >= 0 && steps.map((_, i) => renderLabel(i))}

        <div className="center-display">
          {step === -2 && <div className="ready-text">Ready?</div>}
          {step >= 0 && cycleCount <= MAX_CYCLES && !stopped && (
            <button className="cycle-button">Cycle: {cycleCount}</button>
          )}
          {cycleCount > MAX_CYCLES && !stopped && (
            <div className="done-section">
              <div className="done-text">Done!</div>
              <div className="done-buttons">
                <button
                  className="control-button"
                  onClick={() => {
                    setCycleCount(1); // Restart from cycle 1
                    setStep(-2);
                  }}
                >
                  Repeat
                </button>
                <button
                  className="control-button exit"
                  onClick={handleExit}
                >
                  Exit
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {!stopped && cycleCount <= MAX_CYCLES && (
        <div className="bottom-controls">
          <button className="control-button" onClick={handlePauseResume}>
            {paused ? 'Resume' : 'Pause'}
          </button>
          <button className="control-button exit" onClick={handleExit}>
            Exit
          </button>
        </div>
      )}
    </div>
  );
};

export default Start;
