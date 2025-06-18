import React from 'react';

export default function Navbar({ onCompress }) {
  return (
    <nav
      style={{
        width: '100%',
        background: '#fff',
        boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
        padding: '0.7rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        zIndex: 100,
        position: 'sticky',
        top: 0,
        flexWrap: 'wrap',
        maxWidth: '100vw',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        <button
          className="feature-btn"
          style={{
            padding: '0.5rem 1.2rem',
            fontSize: '1rem',
            minWidth: '120px',
            whiteSpace: 'nowrap',
          }}
          onClick={onCompress}
        >
          Compress Image
        </button>
      </div>
    </nav>
  );
}
