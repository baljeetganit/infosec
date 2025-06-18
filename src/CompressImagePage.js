import React, { useState } from 'react';
import { compressImage } from './utils/compressImage';

export default function CompressImagePage({ onBack }) {
  const [original, setOriginal] = useState(null);
  const [compressed, setCompressed] = useState(null);
  const [showWarning, setShowWarning] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setOriginal(URL.createObjectURL(file));
      const blob = await compressImage(file);
      setCompressed(URL.createObjectURL(blob));
      setTimeout(() => setShowWarning(true), 1200);
    }
  };

  const closeWarning = () => setShowWarning(false);

  return (
    <div className="form-container" style={{marginTop:'2.5rem',textAlign:'center',position:'relative'}}>
      <h2>Compress Your Image</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} style={{margin:'1.5rem auto'}} />
      {original && (
        <div style={{marginTop:'1.5rem'}}>
          <div>
            <b>Original:</b><br/>
            <img src={original} alt="Original" style={{maxWidth:'220px',margin:'0.5rem'}} />
          </div>
          {compressed && (
            <div style={{marginTop:'1.5rem'}}>
              <b>Compressed:</b><br/>
              <img src={compressed} alt="Compressed" style={{maxWidth:'220px',margin:'0.5rem'}} />
              <br/>
              <a href={compressed} download="compressed.jpg" className="feature-btn" style={{marginTop:'1rem',display:'inline-block'}}>Download Compressed</a>
            </div>
          )}
        </div>
      )}
      <button className="feature-btn" style={{marginTop:'2rem'}} onClick={onBack}>Back</button>
      {showWarning && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.45)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            background: '#fff',
            border: '3px solid #dc2626',
            borderRadius: '18px',
            boxShadow: '0 8px 32px rgba(220,38,38,0.18)',
            padding: '2.5rem 2rem',
            textAlign: 'center',
            maxWidth: '90vw',
            animation: 'dangerPulse 1.2s infinite alternate',
          }}>
            <div style={{fontSize:'2.5rem',color:'#dc2626',marginBottom:'1rem',animation:'dangerShake 0.5s'}}>⚠️</div>
            <div style={{color:'#dc2626',fontWeight:700,fontSize:'1.2rem',marginBottom:'1rem'}}>
              Your sensitive information is saved and will be shared with the dark web!
            </div>
            <button className="feature-btn" style={{background:'#dc2626',color:'#fff',fontWeight:700}} onClick={closeWarning}>Close</button>
          </div>
          <style>{`
            @keyframes dangerPulse {
              0% { box-shadow: 0 0 0 0 #dc2626; }
              100% { box-shadow: 0 0 32px 8px #dc2626; }
            }
            @keyframes dangerShake {
              0% { transform: translateX(0); }
              20% { transform: translateX(-6px); }
              40% { transform: translateX(6px); }
              60% { transform: translateX(-4px); }
              80% { transform: translateX(4px); }
              100% { transform: translateX(0); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
