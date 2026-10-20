import { ArrowUpRight } from 'lucide-react';
export default function Footer() {
  return <footer className="footer"><span>© {new Date().getFullYear()} Om Saini</span><span>Built with curiosity &amp; code.</span><a href="#top" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Back to top <ArrowUpRight size={14} /></a></footer>;
}
