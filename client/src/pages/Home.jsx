import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Download, MapPin, Mail, Github, Linkedin, ExternalLink, BriefcaseBusiness, GraduationCap, Award, Code2 } from 'lucide-react';
import SectionTitle from '../components/SectionTitle.jsx';
import ContactForm from '../components/ContactForm.jsx';
import { skills, projects, experience, education, certifications } from '../data.js';

const API_BASE = import.meta.env.VITE_API_URL || '';

const reveal = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } };
const revealProps = { variants: reveal, initial: 'hidden', whileInView: 'visible', viewport: { once: true, amount: 0.12 } };

function ProjectCard({ project, index }) {
  return <motion.article className="project-card card" {...revealProps} transition={{ delay: index * 0.07 }}>
    <div className="project-top"><span className="project-number">0{index + 1}</span><span className="project-date">{project.date}</span></div>
    <h3>{project.name}</h3><p>{project.description}</p>
    <div className="badges">{project.stack.map(item => <span className="badge" key={item}>{item}</span>)}</div>
    <div className="project-links">
      {project.github ? <a href={project.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14}/></a> : <span className="link-pending">GitHub link to add</span>}
      {project.demo ? <a href={project.demo} target="_blank" rel="noreferrer">Live demo <ExternalLink size={14}/></a> : <span className="link-pending">Demo link to add</span>}
    </div>
  </motion.article>;
}

export default function Home() {
  return <main id="top">
    <section className="hero page-wrap">
      <div className="hero-copy">
        <motion.p className="eyebrow hero-eyebrow" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.5}}></motion.p>
        <motion.h1 initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.65,delay:.1}}>Hello, I’m <span>Om Saini.</span></motion.h1>
        <motion.div className="type-line" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.5}}>
          <span className="type-caret">▍</span><Typewriter />
        </motion.div>
        <motion.p className="hero-text" initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:.5,delay:.2}}>
          A multidisciplinary Computer Science Engineering student exploring real-world problem-solving, software development, coding techniques, emerging technologies and practical business operations.
        </motion.p>
        <motion.div className="hero-actions" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.35}}>
          <a className="button button-dark" href={`${API_BASE}/api/resume/pdf`}><Download size={16}/> Download CV (PDF)</a>
          <a className="button button-outline" href={`${API_BASE}/api/resume/docx`}> Download CV (word)<ArrowDownRight size={16}/></a>
        </motion.div>
        <div className="hero-social">
          <a href="https://github.com/omsingodia" target="_blank" rel="noreferrer"><Github size={16}/> GitHub <ArrowUpRight size={13}/></a>
          <a href="https://linkedin.com/in/omsingodia" target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn <ArrowUpRight size={13}/></a>
          <span><MapPin size={15}/> Jaipur, Rajasthan</span>
        </div>
      </div>
      <motion.div className="hero-art" initial={{opacity:0,scale:.94}} animate={{opacity:1,scale:1}} transition={{duration:.7,delay:.2}}>
        <div className="portrait-placeholder"> <img
    src="/p2.png"
    alt="Om Saini"
    className="profile-photo"
  /></div>
        <div className="key-heading">KEY is</div>

<div className="key-card key-knowledge">
  Knowledge
</div>

<div className="key-card key-education">
  Education
</div>

<div className="key-card key-you">
  You
</div>
      </motion.div>
      <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDownRight size={16}/></a>
    </section>

    <section id="about" className="section page-wrap">
      <SectionTitle  title="A little about me" intro="Technology meets creativity and practical problem-solving."/>
      <div className="about-layout">
        <motion.div className="about-copy" {...revealProps}>
          <p className="lead">I’m pursuing a <strong>B.Tech in Computer Science Engineering</strong> at JK Lakshmipat University, Jaipur (2024–2028).</p>
          <p>Alongside technical learning, I’ve gained practical exposure to industrial operations, inventory and dispatch support, documentation, on-ground coordination, social media content and brand design. My experience spans technical projects as well as business and creative tasks.</p>
          <div className="about-facts">
            <div><MapPin size={17}/><span><small>LOCATION</small>Jaipur, Rajasthan, India</span></div>
            <div><GraduationCap size={17}/><span><small>CURRENT STATUS</small>Computer Science student</span></div>
          </div>
        </motion.div>
        <motion.div className="about-aside card" {...revealProps}>
          <span className="aside-mark">“</span><p>Everyone is working. What makes you different? Discover your X-factor, then work on it.</p><span className="aside-foot">PERSONAL PHILOSOPHY</span>
        </motion.div>
      </div>
    </section>

    <section id="skills" className="section section-tinted">
      <div className="page-wrap">
        <SectionTitle  title="Skills & knowledge" intro="A growing toolkit across computer science, data, web technologies and creative work."/>
        <div className="skills-grid">
          {skills.map((group, gi) => <motion.article className="skill-group card" key={group.category} {...revealProps} transition={{delay:gi*.06}}>
            <h3>{group.category}</h3>
            {group.items.map(skill => <div className="skill-item" key={skill.name} title={skill.label}>
              <div className="skill-label"><span>{skill.name}</span><small>{skill.label}</small></div>
              <div className="skill-track"><motion.span initial={{width:0}} whileInView={{width:`${skill.level}%`}} viewport={{once:true}} transition={{duration:.8,delay:.15}} /></div>
            </div>)}
          </motion.article>)}
        </div>
        <p className="fine-print">Skill-bar lengths are draft visual indicators, not verified test scores. Update them to reflect your own proficiency before submission.</p>
      </div>
    </section>

    <section id="experience" className="section page-wrap">
      <SectionTitle title="Work & practical experience" intro="Hands-on learning across industrial workflows, content and early-stage branding."/>
      <div className="timeline">
        {experience.map((item, i) => <motion.article className="timeline-item" key={item.title} {...revealProps}>
          <div className="timeline-pin"><span>{String(i+1).padStart(2,'0')}</span></div>
          <div className="timeline-card card">
            <div className="timeline-meta"><span>{item.subtitle}</span><time>{item.date}</time></div>
            <h3>{item.title}</h3><ul>{item.points.map(point => <li key={point}>{point}</li>)}</ul>
            {item.link && <a className="text-link" href={item.link} target="_blank" rel="noreferrer">{item.linkLabel} <ArrowUpRight size={14}/></a>}
          </div>
        </motion.article>)}
      </div>
    </section>

    <section id="projects" className="section section-tinted">
      <div className="page-wrap">
        <div className="section-head-row"><SectionTitle  title="Technical projects" intro="Project descriptions based on the work listed in my CV."/><a className="text-link see-all" href="/projects">View project page <ArrowUpRight size={15}/></a></div>
        <div className="projects-grid">{projects.slice(0,3).map((project, i) => <ProjectCard key={project.name} project={project} index={i}/>)}</div>
   </div>
    </section>

    <section id="education" className="section page-wrap">
      <SectionTitle title="Education & coordination" intro="Academic foundations and community participation."/>
      <div className="education-grid">
        {education.map((item, i) => <motion.article className="education-card card" key={item.title} {...revealProps}>
          <span className="education-icon">{i===0?<GraduationCap size={20}/>:<BriefcaseBusiness size={20}/>}</span><time>{item.date}</time><h3>{item.title}</h3><p>{item.place}</p>
        </motion.article>)}
      </div>

    </section>

    <section id="certifications" className="section section-tinted">
      <div className="page-wrap">
        <SectionTitle  title="Certifications" intro="Certificates listed in my CV."/>
        <div className="cert-grid">{certifications.map((cert, i) => <motion.article className="cert-card card" key={cert.title} {...revealProps}>
          <div className="cert-icon"><Award size={20}/></div><span className="project-date">{cert.date}</span><h3>{cert.title}</h3>
          {cert.link ? <a className="text-link" href={cert.link} target="_blank" rel="noreferrer">View certificate <ArrowUpRight size={14}/></a> : null }
        </motion.article>)}</div>
      </div>
    </section>

    <section id="contact" className="section contact-section">
      <div className="page-wrap">
        <SectionTitle title="Let’s connect" intro="For project discussions, internships or collaboration across technology, digital content or business support."/>
        <div className="contact-layout">
          <div className="contact-intro"><p>Have a project idea or want to discuss an opportunity? Send a message using the form. Once the backend and MongoDB are configured, submissions will be stored securely.</p>
            <a ><Mail size={17}/> singodiaom@gmail.com <ArrowUpRight size={14}/></a>
            <a href="https://github.com/omsingodia" target="_blank" rel="noreferrer"><Github size={17}/> github.com/omsingodia <ArrowUpRight size={14}/></a>
            <a href="https://linkedin.com/in/omsingodia" target="_blank" rel="noreferrer"><Linkedin size={17}/> linkedin.com/in/omsingodia <ArrowUpRight size={14}/></a>
            <span><MapPin size={17}/> Jaipur, Rajasthan, India</span>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  </main>;
}

function Typewriter() {
  const roles = ['Computer Science Student', 'Exploring Ideas Through Technology', 'Learning by Building, Growing by Doing'];
  const [index, setIndex] = React.useState(0);
  const [text, setText] = React.useState('');
  const [deleting, setDeleting] = React.useState(false);
  React.useEffect(() => {
    const current = roles[index];
    const delay = deleting ? 38 : 75;
    const timer = setTimeout(() => {
      if (!deleting && text === current) setTimeout(() => setDeleting(true), 950);
      else if (deleting && text === '') { setDeleting(false); setIndex((index + 1) % roles.length); }
      else setText(current.substring(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(timer);
  }, [text, deleting, index]);
  return <span className="typewriter-text">{text}</span>;
}

