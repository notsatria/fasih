import { useState, useEffect } from 'react';

// Stub — will be built fully in Phase 2 (2.10)
export default function ApiKeyModal() {
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('fasih-gemini-key');
    if (!stored) setOpen(true);
  }, []);

  function handleSave() {
    if (key.trim()) {
      localStorage.setItem('fasih-gemini-key', key.trim());
      setOpen(false);
    }
  }

  if (!open) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(253,251,247,0.9)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        background: '#fff',
        border: '3px solid #2d2d2d',
        borderRadius: '15px 225px 15px 255px / 255px 15px 225px 15px',
        boxShadow: '8px 8px 0px 0px #2d2d2d',
        padding: '2rem',
        maxWidth: '480px',
        width: '90%',
        fontFamily: 'Patrick Hand, cursive',
      }}>
        <h2 style={{fontFamily:'Kalam, cursive', fontSize:'1.6rem', marginBottom:'0.5rem'}}>
          Enter your Gemini API Key
        </h2>
        <p style={{color:'#666', marginBottom:'1rem', fontSize:'0.95rem'}}>
          Fasih uses Google Gemini for AI feedback. Your key is stored locally and never sent to any server other than Google.
        </p>
        <input
          type="password"
          value={key}
          onChange={e => setKey(e.target.value)}
          placeholder="Paste your Gemini API key here..."
          onKeyDown={e => e.key === 'Enter' && handleSave()}
          style={{
            width: '100%', padding: '10px 14px',
            border: '2px solid #2d2d2d',
            borderRadius: '225px 15px 255px 15px / 15px 255px 15px 225px',
            fontFamily: 'Patrick Hand, cursive',
            fontSize: '1rem',
            background: '#fdfbf7',
            outline: 'none',
            marginBottom: '1rem',
          }}
        />
        <button
          onClick={handleSave}
          style={{
            width: '100%', padding: '12px',
            background: '#2d2d2d', color: '#fff',
            border: '3px solid #2d2d2d',
            borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
            fontFamily: 'Patrick Hand, cursive',
            fontSize: '1.1rem',
            cursor: 'pointer',
            boxShadow: '4px 4px 0px 0px #ff4d4d',
          }}
        >
          Save & Continue
        </button>
        <p style={{marginTop:'0.75rem', fontSize:'0.8rem', color:'#888', textAlign:'center'}}>
          <a href="https://aistudio.google.com" target="_blank" rel="noreferrer" style={{color:'#2d5da1'}}>
            Get a free API key at aistudio.google.com
          </a>
        </p>
      </div>
    </div>
  );
}
