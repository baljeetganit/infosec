import React, { useRef, useState, useEffect } from 'react';
import logo from '../src/asset/ganitinc-logo.svg';

export default function CameraLogin({ onLogin, autoCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);
  const [showDeepfakeMsg, setShowDeepfakeMsg] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);

  useEffect(() => {
    let stream;
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(s => {
        stream = s;
        if (videoRef.current) videoRef.current.srcObject = stream;
        setCameraReady(true); // Only set ready after access granted
      })
      .catch(() => setError('Camera access denied or unavailable.'));
    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, []);

  useEffect(() => {
    // Only start timer after camera is ready, not before
    if (autoCapture && cameraReady && !photo && !error) {
      const timer = setTimeout(() => {
        handleCapture();
      }, 4000); // 4 seconds
      return () => clearTimeout(timer);
    }
  }, [autoCapture, cameraReady, photo, error]);

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
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
      <img src={logo} alt="Logo" style={{width: '100px', marginBottom: '1rem'}} />
      <h2>Facial Login</h2>
      {!photo && !showDeepfakeMsg ? (
        <>
          <video ref={videoRef} width="320" height="240" autoPlay playsInline style={{borderRadius: '8px', border: '2px solid #c7d2fe'}} />
          <br />
          {/* <button onClick={handleCapture} className="feature-btn" style={{marginTop: '1rem'}}>Capture Photo</button> */}
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
