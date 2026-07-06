import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const torchRef = useRef(null);
  const pos      = useRef({ x: -200, y: -200 });
  const ring     = useRef({ x: -200, y: -200 });
  const [hovering, setHovering] = useState(false);
  const [visible,  setVisible]  = useState(false);
  const rafRef   = useRef(null);

  useEffect(() => {
    // Hide cursor on touch/mobile devices
    const isTouchDevice = () =>
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window;

    if (isTouchDevice()) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
      if (torchRef.current) {
        torchRef.current.style.background = `radial-gradient(
          circle 260px at ${e.clientX}px ${e.clientY}px,
          rgba(154, 0, 2, 0.07) 0%,
          rgba(192, 57, 43, 0.04) 40%,
          transparent 75%
        )`;
      }
    };

    const onLeave    = () => setVisible(false);
    const onEnter    = () => setVisible(true);
    const onHoverOn  = () => setHovering(true);
    const onHoverOff = () => setHovering(false);

    document.addEventListener('mousemove',  onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    const interactables = 'a, button, .cert-card, .contact-card, .project-card, .soft-pill, .skill-block, .skill-soft-block';
    document.querySelectorAll(interactables).forEach(el => {
      el.addEventListener('mouseenter', onHoverOn);
      el.addEventListener('mouseleave', onHoverOff);
    });

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.14;
      ring.current.y += (pos.current.y - ring.current.y) * 0.14;
      if (dotRef.current) {
        dotRef.current.style.left = `${pos.current.x}px`;
        dotRef.current.style.top  = `${pos.current.y}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top  = `${ring.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={torchRef} className="torch-overlay" />
      <div
        ref={dotRef}
        className="cursor"
        style={{
          width:   hovering ? '20px' : '12px',
          height:  hovering ? '20px' : '12px',
          opacity: visible ? (hovering ? 0.7 : 1) : 0,
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          width:   hovering ? '60px' : '36px',
          height:  hovering ? '60px' : '36px',
          opacity: visible ? (hovering ? 0.25 : 0.5) : 0,
        }}
      />
    </>
  );
}