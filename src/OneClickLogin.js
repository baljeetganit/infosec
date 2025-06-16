import React from 'react';
import logo from '../src/asset/ganitinc-logo.svg';

export default function OneClickLogin({ onLogin }) {
  return (
    <div className="form-container one-click-login">
      <img src={logo} alt="Logo" style={{width: '100px', marginBottom: '1rem'}} />
      <h2 style={{marginBottom: '2rem', color: '#3730a3'}}>Welcome!</h2>
      <button
        className="feature-btn"
        style={{fontSize: '1.2rem', padding: '1rem 2.5rem', marginTop: '2rem'}}
        onClick={onLogin}
      >
        One Click Login
      </button>
    </div>
  );
}
