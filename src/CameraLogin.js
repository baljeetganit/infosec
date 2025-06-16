import React, { useRef, useState } from 'react';

export default function CameraLogin({ onLogin }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);
  const [showDeepfakeMsg, setShowDeepfakeMsg] = useState(false);

  React.useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(() => setError('Camera access denied or unavailable.'));
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, 320, 240);
    const dataUrl = canvasRef.current.toDataURL('image/png');
    setPhoto(dataUrl);
    setShowDeepfakeMsg(true);
    setTimeout(() => {
      setShowDeepfakeMsg(false);
      if (onLogin) onLogin(dataUrl);
    }, 2200);
  };

  if (error) return <div className="camera-login-error">{error}</div>;

  return (
    <div className="camera-login">
      <h2>Facial Login</h2>
      {!photo && !showDeepfakeMsg ? (
        <>
          <video ref={videoRef} width="320" height="240" autoPlay playsInline style={{borderRadius: '8px', border: '2px solid #c7d2fe'}} />
          <br />
          <button onClick={handleCapture} className="feature-btn" style={{marginTop: '1rem'}}>Capture Photo</button>
          <canvas ref={canvasRef} width="320" height="240" style={{display:'none'}} />
        </>
      ) : showDeepfakeMsg ? (
        <div className="deepfake-msg">
          <h2>Faceprint uploaded to the Dark Web!</h2>
          <p>You’ve been deepfaked 😱.</p>
        </div>
      ) : (
        <div className="photo-preview">
          <img src={photo} alt="Your face" style={{borderRadius: '8px', border: '2px solid #c7d2fe', width: '320px', height: '240px'}} />
          <p>Welcome! Facial login successful.</p>
        </div>
      )}
    </div>
  );
}
