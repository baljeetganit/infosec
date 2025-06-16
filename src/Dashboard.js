import React from 'react';

function Dashboard({ userPhoto, onRemove }) {
  const [removed, setRemoved] = React.useState(false);

  React.useEffect(() => {
    if (removed && onRemove) {
      onRemove();
    }
  }, [removed, onRemove]);

  if (removed) {
    return (
      <div className="dashboard user-friendly">
        <h2>Your faceprint has been removed from the Dark Web!</h2>
        <p>Stay safe online! 🚀</p>
      </div>
    );
  }

  return (
    <div className="dashboard user-friendly">
      <h2>Faceprint uploaded to the Dark Web!</h2>
      <p>You’ve been deepfaked 😱.</p>
      {userPhoto && (
        <img src={userPhoto} alt="Deepfaked you" style={{width:200, borderRadius:'8px', border:'2px solid #c7d2fe', marginBottom:'1rem'}} />
      )}
      <p>“Hi, I’m you, and I just gave away access to my camera!”</p>
      <footer className="dashboard-footer">
        Stay safe online! 🚀
        <br />
        <button className="feature-btn" style={{marginTop:'1.5rem'}} onClick={() => setRemoved(true)}>
          Click to remove your picture from the dark web
        </button>
      </footer>
    </div>
  );
}

export default Dashboard;
