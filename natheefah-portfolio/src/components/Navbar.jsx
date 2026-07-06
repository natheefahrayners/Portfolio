import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const links = [
  { to: '/',          label: 'Home'     },
  { to: '/about',     label: 'About'    },
  { to: '/projects',  label: 'Projects' },
  { to: '/certs',     label: 'Certs'    },
  { to: '/skills',    label: 'Skills'   },
  { to: '/contact',   label: 'Contact'  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <nav className="navbar-desktop">
        <NavLink to="/" className="nav-logo">N · R</NavLink>
        <ul className="nav-desktop-links">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <button
        className={`nav-fab${open ? ' open' : ''}`}
        onClick={() => setOpen(p => !p)}
        aria-label="menu"
      >
        <span /><span />
      </button>

      <div className={`nav-mobile-sheet${open ? ' open' : ''}`}>
        <p className="nav-sheet-eyebrow">Menu</p>
        <ul>
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      {open && <div className="nav-overlay" onClick={() => setOpen(false)} />}
    </>
  );
}