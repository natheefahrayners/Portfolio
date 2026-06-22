import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Download, ArrowRight } from 'lucide-react';
import DinoGame from '../components/DinoGame';

export default function Home() {
  const [clicks,   setClicks]   = useState(0);
  const [showDino, setShowDino] = useState(false);
  const [bounce,   setBounce]   = useState(false);
  const timerRef = useRef(null);

  const handlePhotoClick = () => {
    // Bounce animation on each click
    setBounce(true);
    setTimeout(() => setBounce(false), 380);

    const next = clicks + 1;
    setClicks(next);

    // Reset counter if no click within 2s
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setClicks(0), 2000);

    if (next >= 5) {
      setClicks(0);
      setShowDino(v => !v);  // toggle — click 5 more times to close
    }
  };

  return (
    <section className="home page">
      <div className="float-accent float-accent-1" />
      <div className="float-accent float-accent-2" />

      <div className="home-content">

        {/* ── Left: text ─────────────────────────────────── */}
        <div className="home-text">
          <p className="home-eyebrow">Frontend Developer · Cape Town, ZA</p>
          <h1 className="home-name">
            Natheefah <br />
            <span>Rayners</span>
          </h1>
          <p className="home-title">Where design meets the DOM</p>
          <p className="home-desc">
            Aspiring frontend developer passionate about creating responsive,
            user-friendly websites and turning creative ideas into engaging
            digital experiences.
          </p>
          <div className="home-actions">
            {/* CV DOWNLOAD */}
            <a href="/Natheefah CV.pdf" download className="btn-primary">
              <Download size={15} />
              <span>Download CV</span>
            </a>
            <Link to="/about" className="btn-outline">
              <span>My Story</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* ── Right: photo / dino frame ──────────────────── */}
        <div className="home-photo-wrap">
          {/*
            The outer frame is the same fixed-size box for BOTH the photo
            and the dino game. Clicking it 5 times flips between them.
          */}
          <div
            className={`home-photo-frame${bounce ? ' photo-bounce' : ''}`}
            onClick={handlePhotoClick}
            style={{ cursor: 'pointer', overflow: 'hidden' }}
            title="Click me 5 times…"
          >
            {/* ── DINO GAME — fills the frame exactly ── */}
            {showDino ? (
              <DinoGame />
            ) : (
                <img src="/home.jpg" alt="Natheefah Rayners" />
            )}
          </div>

          {/* Small label that appears once game is open */}
          {showDino && (
            <p className="dino-label">🦖 click the frame again to close</p>
          )}
        </div>

      </div>
    </section>
  );
}
