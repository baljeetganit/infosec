import React, { useState } from 'react';

function PhoneGiveaway({ onBack, onQuiz }) {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState(null);
  const [locError, setLocError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(1);
    // Try to get real geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          // Reverse geocode using OpenStreetMap Nominatim
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then(res => res.json())
            .then(data => {
              setLocation(data.display_name || `${latitude}, ${longitude}`);
              setTimeout(() => setStep(2), 1500);
            })
            .catch(() => {
              setLocation(`${latitude}, ${longitude}`);
              setTimeout(() => setStep(2), 1500);
            });
        },
        (err) => {
          setLocError('Location permission denied.');
          setTimeout(() => setStep(2), 1500);
        }
      );
    } else {
      setLocError('Geolocation not supported.');
      setTimeout(() => setStep(2), 1500);
    }
  };

  if (step === 0) {
    return (
      <div className="giveaway">
        <h2>💼 Dream Job Opportunity!</h2>
        <p>No work-life balance? Enter your email so our HR will connect with you!</p>
        <form onSubmit={handleSubmit}>
          <input required type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} />
          <button type="submit">Apply Now</button>
        </form>
        <button onClick={onBack}>Back</button>
      </div>
    );
  }
  if (step === 1) {
    return (
      <div className="giveaway">
        <h2>Processing...</h2>
        <p>Verifying your details...</p>
      </div>
    );
  }
  if (step === 2) {
    return (
      <div className="giveaway">
        <h2>Scam Alert!</h2>
        <p>You just fell for a scam. 1.1 million users lose money this way every year.</p>
        <p>Your location: <b>{location ? location : locError || 'Unknown'}</b></p>
        <button onClick={onQuiz} style={{marginTop:'1.5rem'}} className="feature-btn">Proceed to Cyber Security Quiz</button>
        <button onClick={onBack} style={{marginTop:'0.5rem'}}>Back</button>
      </div>
    );
  }
}

export default PhoneGiveaway;
