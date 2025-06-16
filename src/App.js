import React, { useState } from 'react';
import CameraLogin from './CameraLogin';
import Dashboard from './Dashboard';
import InsecureGPT from './InsecureGPT';
import PhoneGiveaway from './PhoneGiveaway';
import GameShow from './GameShow';
import './App.css';

function App() {
  const [photo, setPhoto] = useState(null);
  const [showInsecureGPT, setShowInsecureGPT] = useState(false);
  const [showGiveaway, setShowGiveaway] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  if (!photo) return <CameraLogin onLogin={setPhoto} />;
  if (showQuiz) return <GameShow onBack={() => setShowQuiz(false)} />;
  if (showGiveaway) return <PhoneGiveaway onBack={() => setShowGiveaway(false)} onQuiz={() => setShowQuiz(true)} />;
  if (showInsecureGPT) return <InsecureGPT onBack={() => setShowInsecureGPT(false)} onAdClick={() => setShowGiveaway(true)} onQuiz={() => setShowQuiz(true)} />;
  return <Dashboard userPhoto={photo} onRemove={() => setShowInsecureGPT(true)} />;
}

export default App;
