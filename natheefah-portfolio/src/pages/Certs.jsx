import { useReveal } from '../hooks/useReveal';

const certs = [
  {
    name: 'YouthCode Project Certificate',
    org: 'Life Choices Academy',
    year: '2025',
    desc: 'Awarded for completing a real-world project as part of the YouthCode training programme.',
    tag: 'YouthCode',
    img: '/youth-code.png',
  },
  {
    name: 'Microsoft Azure Natural Language Processing',
    org: 'Microsoft',
    year: '2026',
    desc: "Skills in processing and analyzing text data using Azure's NLP cognitive services.",
    tag: 'NLP',
    img: '/NL.png',
    credentialId: '7ORB8TL0PEMH',
  },
  {
    name: 'Microsoft Azure Machine Learning',
    org: 'Microsoft',
    year: '2026',
    desc: 'Foundations of building and deploying machine learning models using Microsoft Azure.',
    tag: 'ML',
    img: '/ML.png',
    credentialId: 'VSFW2LOQG6O2',
  },
  {
    name: 'Computer Vision in Microsoft Azure',
    org: 'Microsoft',
    year: '2026',
    desc: 'Practical skills in image classification, object detection and OCR using Azure Cognitive Services.',
    tag: 'Computer Vision',
    img: '/computer vision.png',
    credentialId: 'CIELWNYBMOQK',
  },
  {
    name: 'Microsoft AI Fundamentals',
    org: 'Microsoft',
    year: '2026',
    desc: 'Foundations of artificial intelligence and machine learning workloads on the Azure platform.',
    tag: 'AI',
    img: '/AI.png',
    credentialId: '41D78FI5LW5M',
  },
  {
    name: 'Cisco Introduction to Data Science',
    org: 'Cisco Networking Academy',
    year: '2025',
    desc: 'Foundations of data science including data analysis, visualisation and real-world applications.',
    tag: 'Data Science',
    img: '/DS.jpg',
    credentialId: '1cbe8471-fe93-4609-b193-63790427722a',
  },
  {
    name: 'Cisco Introduction to Cybersecurity',
    org: 'Cisco Networking Academy',
    year: '2025',
    desc: 'Core concepts of cybersecurity including threats, vulnerabilities and how to protect digital systems.',
    tag: 'Cybersecurity',
    img: '/cybersecurity.jpg',
    credentialId: '58c9f5c9-fede-4126-91ce-6cc9b117fa99',
  },
];

export default function Certs() {
  const headerRef = useReveal();

  return (
    <section className="certs page">
      <div className="certs-inner">
        <div className="section-header reveal" ref={headerRef}>
          <p className="section-eyebrow">Credentials</p>
          <h2 className="section-heading">
            Certifications &amp; <em>Achievements</em>
          </h2>
          <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginTop: '0.8rem' }}>
            Hover to preview each certificate.
          </p>
        </div>

        <div className="certs-grid">
          {certs.map((cert, i) => (
            <CertCard key={i} cert={cert} delay={i % 3} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CertCard({ cert, delay }) {
  const ref = useReveal();

  return (
    <div
      className={`cert-card reveal reveal-delay-${delay + 1}`}
      ref={ref}
    >
      {/* ── Certificate image (top half of card) ───────────────────────── */}
      <div className="cert-img-wrap">
        <img
          src={cert.img}
          alt={`${cert.name} certificate`}
          className="cert-img"
          onError={e => {
            // Hides broken img and shows placeholder instead
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        {/*
          ── PLACEHOLDER shown when image is missing ──────────────────────
          Once you add a real image above this will be hidden automatically.
          ────────────────────────────────────────────────────────────────── */}
        <div className="cert-img-placeholder">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <circle cx="12" cy="8" r="4"/>
            <path d="M6 20v-1a6 6 0 0 1 12 0v1"/>
            <path d="M9 11l-1 9 4-2 4 2-1-9"/>
          </svg>
          <span>{cert.tag}</span>
          <span style={{ fontSize: '0.6rem', opacity: 0.5 }}>add image to public/certs/</span>
        </div>
      </div>

      {/* ── Info strip — always visible at bottom ──────────────────────── */}
      <div className="cert-info">
        <div className="cert-info-tag">{cert.tag}</div>
        <div className="cert-name">{cert.name}</div>
        <div className="cert-org">{cert.org} · {cert.year}</div>
      </div>

      {/* ── PEEK overlay — slides up from bottom on hover ──────────────── */}
      <div className="cert-peek">
        <div className="cert-peek-tag">{cert.tag}</div>
        <div className="cert-peek-title">{cert.name}</div>
        <div className="cert-peek-desc">{cert.desc}</div>
        <div className="cert-peek-meta">{cert.org} — {cert.year}</div>

        {/* Credential ID — shown only if filled in */}
        {cert.credentialId && cert.credentialId !== 'CREDENTIAL-ID-HERE' && (
          <div className="cert-peek-credential">
            <span className="cert-peek-credential-label">Credential ID</span>
            <span className="cert-peek-credential-value">{cert.credentialId}</span>
          </div>
        )}
      </div>
    </div>
  );
}
