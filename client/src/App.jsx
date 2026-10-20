import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('om-portfolio-theme') || 'light');
  const location = useLocation();
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('om-portfolio-theme', theme);
  }, [theme]);
  useEffect(() => {
    if (location.hash) setTimeout(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({behavior:'smooth'}), 80);
    else window.scrollTo({top:0, behavior:'instant'});
  }, [location.pathname, location.hash]);
  return <div className="app-shell">
    <Navbar theme={theme} toggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
    <Routes><Route path="/" element={<Home/>}/><Route path="/projects" element={<Projects/>}/><Route path="*" element={<Home/>}/></Routes>
    <div className="page-wrap"><Footer/></div>
  </div>;
}
