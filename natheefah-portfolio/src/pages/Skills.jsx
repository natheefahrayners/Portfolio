import { useReveal } from '../hooks/useReveal';

const hardSkills = [
  { name: 'SQL / Database Querying',   tag: 'Data'    },
  { name: 'Microsoft Azure',           tag: 'Cloud'   },
  { name: 'Python',                    tag: 'Code'    },
  { name: 'Git',                       tag: 'Dev'     },
  { name: 'HTML',                      tag: 'Web'     },
  { name: 'CSS',                       tag: 'Web'     },
  { name: 'JavaScript',                tag: 'Web'     },
  { name: 'Node.js',                   tag: 'Web'     },
];

const softSkills = [
  { name: 'Critical Thinking',        icon: '◈' },
  { name: 'Problem Solving',          icon: '◈' },
  { name: 'Attention to Detail',      icon: '◈' },
  { name: 'Communication',            icon: '◈' },
  { name: 'Collaboration',            icon: '◈' },
  { name: 'Adaptability',             icon: '◈' },
  { name: 'Time Management',          icon: '◈' },
  { name: 'Continuous Learning',      icon: '◈' },
  { name: 'Presentation Skills',      icon: '◈' },
  { name: 'Self-Motivation',          icon: '◈' },
];

export default function Skills() {
  const header = useReveal();
  const hard   = useReveal();
  const soft   = useReveal();

  return (
    <section className="skills page">
      <div className="skills-inner">

        <div className="section-header reveal" ref={header}>
          <p className="section-eyebrow">Capabilities</p>
          <h2 className="section-heading">
            Hard &amp; <em>Soft</em> Skills
          </h2>
        </div>

        <div className="skills-cols">

          {/* ── Hard Skills ── */}
          <div className="reveal" ref={hard}>
            <h3 className="skills-group-title">Technical Skills</h3>
            <div className="skill-block-grid">
              {hardSkills.map((s, i) => (
                <div key={i} className="skill-block" style={{ animationDelay: `${i * 0.04}s` }}>
                  <span className="skill-block-tag">{s.tag}</span>
                  <span className="skill-block-name">{s.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Soft Skills ── */}
          <div className="reveal reveal-delay-2" ref={soft}>
            <h3 className="skills-group-title">Professional Skills</h3>
            <div className="skill-soft-grid">
              {softSkills.map((s, i) => (
                <div key={i} className="skill-soft-block" style={{ animationDelay: `${i * 0.04}s` }}>
                  <span className="skill-soft-icon">{s.icon}</span>
                  <span className="skill-soft-name">{s.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
