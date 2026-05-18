// Stub — will be built in Phase 2
export default function Navbar() {
  return (
    <nav style={{
      borderBottom: '2px dashed #2d2d2d',
      padding: '12px 24px',
      fontFamily: 'Patrick Hand, cursive',
      display: 'flex',
      gap: '16px',
      background: '#fdfbf7',
    }}>
      <a href="/" style={{fontFamily:'Kalam,cursive', fontSize:'1.4rem', textDecoration:'none', color:'#2d2d2d'}}>Fasih</a>
      <a href="/speaking" style={{color:'#2d2d2d', textDecoration:'none'}}>Speaking</a>
      <a href="/interview" style={{color:'#2d2d2d', textDecoration:'none'}}>Interview</a>
      <a href="/vocabulary" style={{color:'#2d2d2d', textDecoration:'none'}}>Vocabulary</a>
      <a href="/daily" style={{color:'#2d2d2d', textDecoration:'none'}}>Daily</a>
    </nav>
  );
}
