import { useReveal } from '../hooks/useReveal';

export default function About() {
  const rPhoto  = useReveal();
  const rEye    = useReveal();
  const rHead   = useReveal();
  const rP1     = useReveal();
  const rP2     = useReveal();
  const rP3     = useReveal();
  const rStats  = useReveal();

  return (
    <section className="about page">
      <div className="about-inner">

        {/* ── Photo ── */}
        <div className="about-photo-wrap reveal" ref={rPhoto}>
          <div className="about-photo-frame">

            {/* ABOUT PAGE PHOTO */}
            <img src="/about.jpg" alt="Natheefah Rayners" />
          </div>
        </div>

        {/* ── Text ── */}
        <div className="about-text">

          <p className="section-eyebrow reveal" ref={rEye}>About Me</p>

          <h2 className="section-heading reveal reveal-delay-1" ref={rHead}>
            Curious by nature, <em>precise</em> by practice
          </h2>

          <p className="about-body reveal reveal-delay-2" ref={rP1}>
            Hi, I'm Natheefah Rayners. I'm a Frontend Developer from Cape Town,
            South Africa.
          </p>

          <p className="about-body reveal reveal-delay-3" ref={rP2}>
            I have a passion for designing responsive and user-friendly websites.
            I love turning ideas into clean, functional and digital products.
            I'm currently starting my career in the software industry and I'm
            looking forward to putting my skills to use.
          </p>

          <p className="about-body reveal reveal-delay-4" ref={rP3}>
            When I'm not coding, I enjoy exploring modern web designs,
            experimenting with new creative ideas, and learning ways to
            improve user experience. I'm always looking for opportunities
            to grow as both a developer and designer.
          </p>

          <div className="about-stats reveal reveal-delay-5" ref={rStats}>
            <div className="stat">
              <div className="stat-num">7+</div>
              <div className="stat-label">Months Experience</div>
            </div>
            <div className="stat">
              <div className="stat-num">10+</div>
              <div className="stat-label">Certifications</div>
            </div>
            <div className="stat">
              <div className="stat-num">5+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
