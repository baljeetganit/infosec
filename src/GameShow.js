import React, { useState } from 'react';

function GameShow({ onBack }) {
  const questions = [
    {
      q: 'Which of these is a phishing email?',
      options: [
        'Your bank: “Urgent! Click here to verify your account.”',
        'Your friend: “Check out these vacation pics!”',
        'Your boss: “Meeting at 3pm.”',
        'Amazon: “Your order has shipped.”'
      ],
      answer: 0
    },
    {
      q: 'Which password is strongest?',
      options: [
        'password123',
        'Q!7v$2pL9z',
        'letmein',
        'john1985'
      ],
      answer: 1
    },
    {
      q: 'Which URL is safe?',
      options: [
        'https://paypa1.com',
        'https://paypal.com',
        'https://paypal-login.com',
        'https://paypall.com'
      ],
      answer: 1
    },
    {
      q: 'What should you do if you receive an unexpected attachment from a coworker?',
      options: [
        'Open it immediately',
        'Forward it to your friends',
        'Verify with the sender before opening',
        'Upload it to social media'
      ],
      answer: 2
    },
    {
      q: 'Which of these is the best way to protect your online accounts?',
      options: [
        'Use the same password everywhere',
        'Enable two-factor authentication',
        'Share your password with friends',
        'Write your password on a sticky note'
      ],
      answer: 1
    }
  ];
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const handleAnswer = (i) => {
    if (i === questions[step].answer) setScore(score + 1);
    if (step === questions.length - 1) setDone(true);
    else setStep(step + 1);
  };

  if (done) {
    return (
      <div className="gameshow">
        <h2>Game Over!</h2>
        <p>Your score: {score} / {questions.length}</p>
        <p>{score === questions.length ? 'You’re a cyber pro!' : 'Hackers could have gotten you!'}</p>
        <button onClick={onBack}>Back</button>
      </div>
    );
  }

  return (
    <div className="gameshow">
      <h2>Cyber Security Game Show</h2>
      <p>{questions[step].q}</p>
      <ul>
        {questions[step].options.map((opt, i) => (
          <li key={i}>
            <button onClick={() => handleAnswer(i)}>{opt}</button>
          </li>
        ))}
      </ul>
      <button onClick={onBack}>Back</button>
    </div>
  );
}

export default GameShow;
