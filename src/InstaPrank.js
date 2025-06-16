import React, { useState } from 'react';

function InstaPrank({ onBack }) {
  const [username, setUsername] = useState('');
  const [report, setReport] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setReport({
      photos: 11,
      hate: 3,
      passwords: 4
    });
    setTimeout(() => setReport('joke'), 2500);
  };

  if (report === 'joke') {
    return (
      <div className="instaprank">
        <h2>Just kidding!</h2>
        <p>But real attackers can do this with OSINT. Protect your online footprint.</p>
        <button onClick={onBack}>Back</button>
      </div>
    );
  }

  return (
    <div className="instaprank">
      <h2>InstaPrank: Social Media Scanner</h2>
      <form onSubmit={handleSubmit}>
        <input
          required
          placeholder="Instagram or Twitter username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit">Scan</button>
      </form>
      {report && (
        <div className="report">
          <p>We found {report.photos} leaked photos, {report.hate} tagged hate speech posts, and {report.passwords} exposed passwords.</p>
        </div>
      )}
      <button onClick={onBack}>Back</button>
    </div>
  );
}

export default InstaPrank;
