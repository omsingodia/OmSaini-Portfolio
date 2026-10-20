import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Download } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || '';

const navItems = [
  ['Home', '/'], ['About', '/#about'], ['Skills', '/#skills'],
  ['Experience', '/#experience'], ['Projects', '/projects'],
  ['Education', '/#education'], ['Certifications', '/#certifications'], ['Contact', '/#contact'],
];

export default function Navbar({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const goTo = (href) => {
    setOpen(false);
    if (href.includes('#') && location.pathname === '/') {
      const id = href.split('#')[1];
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 0);
    }
  };

  return (
    <header className="topbar">
      <Link to="/" className="brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <span className="brand-name">OM SAINI</span>
      </Link>
      <button className="mobile-menu icon-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
        {open ? <X size={19} /> : <Menu size={19} />}
      </button>
      <nav className={`nav-links ${open ? 'nav-open' : ''}`}>
        {navItems.map(([label, href]) => href === '/projects'
          ? <Link key={label} to={href} className={location.pathname === href ? 'nav-active' : ''} onClick={() => { setOpen(false); window.scrollTo(0, 0); }}>{label}</Link>
          : <Link key={label} to={href} onClick={() => goTo(href)}>{label}</Link>)}
       <div className="nav-actions">
 
  

  <button
    className="icon-button"
    onClick={toggleTheme}
    aria-label="Toggle colour theme"
    title="Toggle dark/light"
  >
    {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
  </button>
</div>
      </nav>
    </header>
  );
}
