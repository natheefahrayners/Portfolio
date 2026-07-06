import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

function GitHubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

const projects = [
  {
    name: 'CampusGlow',
    desc: 'A Vue 3 e-commerce platform built for the South African campus market, featuring 37 products, PayFast payment integration, email services, and a referral system.',
    tags: ['Vue 3', 'Node.js', 'PayFast', 'MySQL'],
    github: 'https://github.com/natheefahrayners/Campus_Glow.git',
    img: '/E-Commerce.png',
  },
  {
    name: 'HR Portal',
    desc: 'A clean, responsive front-end interface for an HR management portal, built with Vue 3. It features interactive dashboards for employee records, leave tracking, and administrative views—designed as a standalone client-side prototype that runs entirely in the browser using mock data for seamless UI demonstration.',
    tags: ['Vue 3'],
    github: 'https://github.com/natheefahrayners/HR-Portal.git',
    img: '/HR Project.png',
  },
  {
    name: 'OT Analytic Enterprise',
    desc: 'An Oracle APEX dashboard for real-time inventory and order tracking. It centralizes stock monitoring, order trend analysis, and demand forecasting to optimize supply chain visibility and reduce stockouts.',
    tags: ['React', 'CSS3', 'React Router', 'Netlify'],
    github: 'https://github.com/natheefahrayners/Oracle-Apex-Project.git',
    live: 'https://oracleapex.com/ords/r/lc/ot-enterprise-analytics/home',
    img: '/OT Analytic Enterprises.png',
  },
];

export default function Projects() {
  const headerRef = useReveal();

  return (
    <section className="projects page">
      <div className="projects-inner">
        <div className="section-header reveal" ref={headerRef}>
          <p className="section-eyebrow">Work</p>
          <h2 className="section-heading">
            Selected <em>Projects</em>
          </h2>
          <p className="projects-subhead">
            A few things I have built — click to explore the code or see it live.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const ref = useReveal();
  const delay = (index % 3) + 1;

  return (
    <div className={`project-card reveal reveal-delay-${delay}`} ref={ref}>

      <div className="project-img-wrap">
        {project.img && (
          <img
            src={project.img}
            alt={project.name}
            className="project-img"
            onError={e => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        )}
        <div
          className="project-img-placeholder"
          style={{ display: project.img ? 'none' : 'flex' }}
        >
          <span className="project-placeholder-num">0{index + 1}</span>
          <span className="project-placeholder-name">{project.name}</span>
        </div>

        <div className="project-img-overlay">
          {project.live && project.live !== '#' && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-live-btn" onClick={e => e.stopPropagation()}>
              <ExternalLink size={16} />
              <span>Live Preview</span>
            </a>
          )}
        </div>
      </div>

      <div className="project-body">
        <div className="project-meta">
          <span className="project-num">0{index + 1}</span>
          <div className="project-tags">
            {project.tags.map((t, i) => (
              <span key={i} className="project-tag">{t}</span>
            ))}
          </div>
        </div>

        <h3 className="project-name">{project.name}</h3>
        <p className="project-desc">{project.desc}</p>

        <div className="project-links">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
            <GitHubIcon size={15} />
            <span>View Code</span>
          </a>

          {project.live && project.live !== '#' && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link project-link-live">
              <ArrowUpRight size={15} />
              <span>Live Site</span>
            </a>
          )}
        </div>
      </div>

    </div>
  );
}