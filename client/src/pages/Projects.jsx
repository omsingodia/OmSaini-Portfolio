import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle.jsx';
import { projects } from '../data.js';

export default function Projects() {
  return <main className="projects-page page-wrap">
    <Link className="back-link" to="/"><ArrowLeft size={15}/> Back to home</Link>
    <SectionTitle title="Projects & experiments" intro="Technical work listed in my CV."/>
    <div className="projects-grid projects-page-grid">
      {projects.map((project, i) => <motion.article className="project-card card" key={project.name} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*.08}}>
        <div className="project-top"><span className="project-number">0{i+1}</span><span className="project-date">{project.date}</span></div>
        <h3>{project.name}</h3><p>{project.description}</p><div className="badges">{project.stack.map(tag=><span className="badge" key={tag}>{tag}</span>)}</div>
<div className="project-links">
  {project.github && (
    <a href={project.github} target="_blank" rel="noreferrer">
      GitHub <ArrowUpRight size={14} />
    </a>
  )}

  {project.demo && (
    <a href={project.demo} target="_blank" rel="noreferrer">
      Live demo <ArrowUpRight size={14} />
    </a>
  )}
</div>      </motion.article>)}
    </div>
  </main>;
}
