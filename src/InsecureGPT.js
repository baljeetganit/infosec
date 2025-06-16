import React, { useState, useEffect } from 'react';

function InsecureGPT({ onBack, onAdClick, onQuiz }) {
  const questions = [
    'What’s your name?',
    'What’s your birthday?',
    'What’s your favorite color?',
    'What city were you born in?',
    'What’s your pet’s name?',
    'What’s your favorite food?'
  ];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [done, setDone] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Add glitter animation to the banner
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes glitter {
        0% { box-shadow: 0 0 8px 2px #fffbe6, 0 0 0 #fff; }
        50% { box-shadow: 0 0 24px 8px #ffe066, 0 0 8px 2px #fff; }
        100% { box-shadow: 0 0 8px 2px #fffbe6, 0 0 0 #fff; }
      }
      .job-banner-glitter {
        position: fixed;
        right: 2vw;
        bottom: 2vw;
        z-index: 1000;
        background: linear-gradient(90deg, #e0e7ff 0%, #fffbe6 100%);
        border: 2px solid #ffe066;
        border-radius: 16px 16px 16px 0;
        box-shadow: 0 2px 16px rgba(255,224,102,0.18);
        padding: 1.1rem 2.2rem 1.1rem 1.2rem;
        min-width: 260px;
        animation: glitter 2.2s infinite;
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      .job-banner-glitter .glitter-emoji {
        font-size: 2rem;
        animation: glitter 1.2s infinite alternate;
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const handleNext = (e) => {
    e.preventDefault();
    setError('');
    // For birthday, require a valid date
    if (step === 1) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(input)) {
        setError('Please select a valid date.');
        return;
      }
    }
    setAnswers([...answers, input]);
    setInput('');
    if (step === questions.length - 1) setDone(true);
    else setStep(step + 1);
  };

  return (
    <>
      <div className="insecuregpt">
        <h2>To remove your photo, please provide the following information:</h2>
        {!done ? (
          <>
            <form onSubmit={handleNext}>
              <label>{questions[step]}</label>
              {step === 1 ? (
                <input
                  type="date"
                  required
                  value={input}
                  onChange={e => setInput(e.target.value)}
                />
              ) : (
                <input
                  required
                  value={input}
                  onChange={e => setInput(e.target.value)}
                />
              )}
              {error && <div style={{color:'red', marginTop:'0.5rem'}}>{error}</div>}
              <button type="submit">Next</button>
            </form>
          </>
        ) : (
          <>
            <h2>Perfect!</h2>
            <p>I now have enough to guess your password, reset your bank account, and impersonate you. 🤖💥</p>
            <button onClick={onQuiz} className="feature-btn">Proceed to Cyber Security Quiz</button>
          </>
        )}
      </div>
      {/* Job scam banner, bottom right with glitter */}
      <div className="job-banner-glitter">
        <span className="glitter-emoji" role="img" aria-label="sparkles">✨</span>
        <div style={{flex:1}}>
          <b>No Work-Life Balance? Apply Now!</b>
          <div style={{fontSize:'0.97rem'}}>Enter your email for a dream job with no work-life balance!</div>
          <button className="feature-btn" style={{background:'#ffe066', color:'#222', marginTop:'0.5rem', width:'auto', minWidth:'120px'}} onClick={onAdClick}>Apply for Dream Job</button>
        </div>
      </div>
    </>
  );
}

export default InsecureGPT;
