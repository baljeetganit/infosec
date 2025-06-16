import React from 'react';

function DeepfakeDashboard({ onBack, userPhoto }) {
  const [step, setStep] = React.useState(0);

  React.useEffect(() => {
    if (step === 1) {
      setTimeout(() => setStep(2), 2000);
    }
  }, [step]);

  if (step === 0) {
    return (
      <div className="deepfake">
        <h2>Webcam Facial Recognition</h2>
        <p>This feature needs access to your webcam to scan your face.</p>
        <button onClick={() => setStep(1)}>Allow Webcam Access</button>
        <button onClick={onBack}>Back</button>
      </div>
    );
  }
  if (step === 1) {
    return (
      <div className="deepfake">
        <h2>Scanning...</h2>
        <p>Scanning your face for recognition...</p>
      </div>
    );
  }
  if (step === 2) {
    return (
      <div className="deepfake">
        <h2>Faceprint uploaded to the Dark Web!</h2>
        <p>You’ve been deepfaked 😱.</p>
        {userPhoto ? (
          <img src={userPhoto} alt="Deepfaked you" style={{width:200, borderRadius:'8px', border:'2px solid #c7d2fe'}} />
        ) : (
          <img src="https://thispersondoesnotexist.com/" alt="Deepfake" style={{width:200}} />
        )}
        <p>“Hi, I’m you, and I just gave away access to my camera!”</p>
        <button onClick={onBack}>Back</button>
      </div>
    );
  }
}

export default DeepfakeDashboard;
