import { Mail, MapPin, ExternalLink } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

function GitHubIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

const EMAIL    = 'natheefahrayners4@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/natheefah-rayners-a8b935394';
const GITHUB   = 'https://github.com/natheefahrayners';
const LOCATION = 'Cape Town, South Africa';

export default function Contact() {
  const h = useReveal();
  const c = useReveal();

  return (
    <section className="contact page">
      <div className="contact-inner">

        <div className="contact-intro reveal" ref={h}>
          <p className="section-eyebrow">Get In Touch</p>
          <h2 className="section-heading">
            Let's <em>connect</em>
          </h2>
          <p>
            Whether you have a project in mind, a question about my work,
            or just want to connect over data — my inbox is always open.
          </p>
        </div>

        <div className="contact-links reveal" ref={c}>
          <a href={`mailto:${EMAIL}`} className="contact-card">
            <div className="contact-card-icon">
              <Mail size={22} />
            </div>
            <div className="contact-card-info">
              <div className="contact-card-label">Email</div>
              <div className="contact-card-value">{EMAIL}</div>
            </div>
          </a>

          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="contact-card">
            <div className="contact-card-icon">
              <ExternalLink size={22} />
            </div>
            <div className="contact-card-info">
              <div className="contact-card-label">LinkedIn</div>
              <div className="contact-card-value">Natheefah Rayners</div>
            </div>
          </a>

          <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="contact-card">
            <div className="contact-card-icon">
              <GitHubIcon size={22} />
            </div>
            <div className="contact-card-info">
              <div className="contact-card-label">GitHub</div>
              <div className="contact-card-value">natheefahrayners</div>
            </div>
          </a>

          <div className="contact-card" style={{ cursor: 'default' }}>
            <div className="contact-card-icon">
              <MapPin size={22} />
            </div>
            <div className="contact-card-info">
              <div className="contact-card-label">Location</div>
              <div className="contact-card-value">{LOCATION}</div>
            </div>
          </div>
        </div>

        <div className="contact-footer">
          <p>
            Designed &amp; built by <strong>Natheefah Rayners</strong> · Cape Town, {new Date().getFullYear()}
          </p>
        </div>

      </div>
    </section>
  );
}
