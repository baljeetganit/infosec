import React, { useState } from 'react';
import CameraLogin from './CameraLogin';
import OneClickLogin from './OneClickLogin';
import Dashboard from './Dashboard';
import InsecureGPT from './InsecureGPT';
import PhoneGiveaway from './PhoneGiveaway';
import GameShow from './GameShow';
import Navbar from './Navbar';
import CompressImagePage from './CompressImagePage';
import './App.css';

function App() {
  const [photo, setPhoto] = useState(null);
  const [showInsecureGPT, setShowInsecureGPT] = useState(false);
  const [showGiveaway, setShowGiveaway] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [showCompress, setShowCompress] = useState(false);

  if (showCompress) {
    // Only show compress page if facial login is done
    if (!photo) {
      // If not logged in, force login flow
      return (
        <>
          {!showCamera ? (
            <OneClickLogin onLogin={() => setShowCamera(true)} />
          ) : (
            <CameraLogin onLogin={setPhoto} autoCapture={true} />
          )}
        </>
      );
    }
    return <CompressImagePage onBack={() => setShowCompress(false)} />;
  }

  return (
    <>
      {!showCamera ? (
        <OneClickLogin onLogin={() => setShowCamera(true)} />
      ) : !photo ? (
        <CameraLogin onLogin={setPhoto} autoCapture={true} />
      ) : showQuiz ? (
        <GameShow onBack={() => setShowQuiz(false)} />
      ) : showGiveaway ? (
        <PhoneGiveaway onBack={() => setShowGiveaway(false)} onQuiz={() => setShowQuiz(true)} />
      ) : showInsecureGPT ? (
        <>
          <Navbar onCompress={() => setShowCompress(true)} />
          <InsecureGPT onBack={() => setShowInsecureGPT(false)} onAdClick={() => setShowGiveaway(true)} onQuiz={() => setShowQuiz(true)} />
        </>
      ) : (
        <Dashboard userPhoto={photo} onRemove={() => setShowInsecureGPT(true)} />
      )}
    </>
  );
}

export default App;
