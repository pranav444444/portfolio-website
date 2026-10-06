"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { startTransition, useEffect, useState, type ReactNode } from "react";
import { portfolio, type Experience, type Project } from "@/data/portfolio";
import { TechnologyIcon } from "@/components/technology-icon";

const navItems = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Education", id: "education" },
  { label: "Contact", id: "contact" },
];

const reveal = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } } };

function ArrowUpRight() { return <span aria-hidden="true" className="arrow-icon">↗</span>; }

function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();
  return <motion.div className="section-heading" initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }} whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.7 }} transition={{ duration: 0.5, ease: "easeOut" }}><div><p className="section-eyebrow">{eyebrow}</p><h2>{title}</h2></div>{children && <div className="section-heading-note">{children}</div>}</motion.div>;
}

function ThemeToggle({ theme, onToggle }: { theme: "light" | "dark"; onToggle: () => void }) {
  return <button className="theme-toggle" type="button" onClick={onToggle} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}><span className="theme-toggle-track"><span className="theme-toggle-thumb" /></span><span className="theme-toggle-label">{theme === "light" ? "Light" : "Dark"}</span></button>;
}

function CapabilityIcon({ type }: { type: string }) {
  const glyphs: Record<string, string> = { data: "⌬", analytics: "◒", modeling: "∿", patterns: "◎", deployment: "↗", workflow: "⌘" };
  return <span className="capability-icon" aria-hidden="true">{glyphs[type] ?? "·"}</span>;
}

function CompanyLogo({ experience }: { experience: Experience }) {
  const logos = {
    technohacks: { src: "/technohacks%20logo.jpeg", alt: "TechnoHacks" },
    electrosoft: { src: "/Electrosoft%20logo.png", alt: "Electrosoft" },
    varid: { src: "/varidx%20logo.jpeg", alt: "VaridX" },
  };
  const logo = logos[experience.logoKey];
  return <div className={`company-logo company-logo-${experience.logoKey}`}><Image src={logo.src} alt={`${logo.alt} logo`} width={160} height={48} className="company-logo-image" /></div>;
}

type ProjectImage = { src: string; label: string };
type ProjectPreview = { project: Project; image: ProjectImage };

function getProjectImages(project: Project): ProjectImage[] {
  return project.images ?? (project.image ? [{ src: project.image, label: project.title }] : []);
}

export default function Portfolio() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [expandedExperience, setExpandedExperience] = useState<string | null>("varid");
  const [projectPreview, setProjectPreview] = useState<ProjectPreview | null>(null);
  const [projectImageIndexes, setProjectImageIndexes] = useState<Record<string, number>>({});
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("portfolio-theme") as "light" | "dark" | null;
    const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const nextTheme = storedTheme ?? preferredTheme;
    if (nextTheme !== "light") startTransition(() => setTheme(nextTheme));
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const sections = navItems.map(({ id }) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => { const visible = entries.find((entry) => entry.isIntersecting); if (visible) setActiveSection(visible.target.id); }, { rootMargin: "-30% 0px -55%" });
    sections.forEach((section) => section && observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!projectPreview) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setProjectPreview(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [projectPreview]);

  const motionProps = shouldReduceMotion ? {} : { initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.15 }, variants: reveal };

  return <div className="site-shell"><div className="ambient ambient-one" aria-hidden="true" /><div className="ambient ambient-two" aria-hidden="true" />
    <header className="site-header"><nav className="nav container" aria-label="Main navigation"><a className="brand" href="#top" aria-label={`${portfolio.name} home`} onClick={() => setMenuOpen(false)}><span className="brand-mark">{portfolio.monogram}</span><span className="brand-name">{portfolio.name}</span></a><button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="main-menu"><span>{menuOpen ? "Close" : "Menu"}</span></button><div id="main-menu" className={`nav-menu ${menuOpen ? "is-open" : ""}`}><div className="nav-links">{navItems.map((item) => <a key={item.id} className={activeSection === item.id ? "is-active" : ""} href={`#${item.id}`} onClick={() => setMenuOpen(false)}>{item.label}</a>)}</div><ThemeToggle theme={theme} onToggle={() => setTheme((current) => current === "light" ? "dark" : "light")} /></div></nav></header>
    <main id="top">
      <section className="hero container" aria-labelledby="hero-title"><div className="hero-copy"><motion.p className="eyebrow" initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }} animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>{portfolio.eyebrow}</motion.p><motion.h1 id="hero-title" initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }} animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}>Data, intelligence <span>with purpose.</span></motion.h1><motion.p className="hero-intro" initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }} animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.16 }}>{portfolio.intro}</motion.p><motion.div className="hero-role-list" initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }} animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}><span>Analytics</span><span>Data Science</span><span>ML Engineering</span><span>AI / ML</span></motion.div><motion.div className="hero-actions" initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }} animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.28 }}><a className="button button-primary" href="#projects">View projects <ArrowUpRight /></a><a className="button button-secondary" href={portfolio.resumeHref}>Download resume <span aria-hidden="true">↓</span></a></motion.div><motion.div className="hero-links" initial={shouldReduceMotion ? false : { opacity: 0 }} animate={shouldReduceMotion ? undefined : { opacity: 1 }} transition={{ duration: 0.5, delay: 0.42 }}><a href={portfolio.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight /></a><a href={portfolio.linkedin}>LinkedIn <ArrowUpRight /></a></motion.div></div><motion.div className="hero-aside" initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }} animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}><div className="signal-card"><div className="signal-topline"><span className="status-dot" /> Available for opportunities</div><div className="signal-graphic" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /></div><div className="signal-footer"><span>Data</span><strong>→</strong><span>Models</span><strong>→</strong><span>Systems</span></div></div><p className="hero-aside-caption">From a clean dataset to a useful model, dashboard, or API that people can trust.</p></motion.div></section>
      <section id="about" className="section container"><SectionHeading eyebrow="01 / About" title="A practical mind for meaningful questions." /><motion.div className="about-grid" {...motionProps}><div className="about-lead"><p>Data is most valuable when it helps people see what to do next.</p></div><div className="about-copy">{portfolio.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="about-meta"><span>{portfolio.location}</span><span>•</span><span>Open to learning and contributing</span></div></div></motion.div></section>
      <section id="skills" className="section section-border container"><SectionHeading eyebrow="02 / Capabilities" title="Tools for turning data into decisions, models into systems."><p>A toolkit spanning data preparation, analytics, machine learning, AI, and production-minded delivery.</p></SectionHeading><motion.div className="skills-grid" {...motionProps}>{portfolio.skills.map((group, index) => <article className="skill-card" key={group.label}><div className="skill-card-heading"><div className="skill-index">0{index + 1}</div><CapabilityIcon type={group.icon} /></div><h3>{group.label}</h3><p className="skill-description">{group.description}</p><div className="skill-list">{group.skills.map((skill) => <span className="skill-chip" key={skill}><TechnologyIcon name={skill} /><span>{skill}</span></span>)}</div></article>)}</motion.div></section>
      <section id="experience" className="section container"><SectionHeading eyebrow="03 / Experience" title="Learning the full path from data to decision."><p>Internship experience across analytics, BI, Python, SQL, real-world data, APIs, and QA.</p></SectionHeading><div className="timeline">{portfolio.experience.map((item, index) => { const isExpanded = expandedExperience === item.id; return <motion.article className={`timeline-item experience-item ${isExpanded ? "is-expanded" : ""}`} key={item.id} {...motionProps}><div className="timeline-marker">0{index + 1}</div><div className="timeline-content"><div className="experience-topline"><CompanyLogo experience={item} /><strong className="experience-metric">{item.metric}</strong></div><div className="timeline-heading"><div><p className="muted-label">{item.duration}</p><h3>{item.role}</h3><p className="company-name">{item.company} · {item.location}</p>{item.collaboration && <p className="experience-collaboration">Collaboration: {item.collaboration}</p>}</div></div><p>{item.responsibilities}</p><div className="tag-row">{item.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div><button className="experience-toggle" type="button" aria-expanded={isExpanded} onClick={() => setExpandedExperience(isExpanded ? null : item.id)}><span>{isExpanded ? "Hide selected work" : "View selected work"}</span><span className="experience-toggle-icon" aria-hidden="true">{isExpanded ? "−" : "+"}</span></button>{isExpanded && <motion.div className="experience-details" initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }} animate={shouldReduceMotion ? undefined : { opacity: 1, height: "auto" }} transition={{ duration: 0.3 }}><p className="muted-label">Selected work</p><div className="selected-work-grid">{item.selectedWork.map((work) => <div className="selected-work" key={work.title}><strong>{work.title}</strong><span>{work.context}</span></div>)}</div></motion.div>}</div></motion.article>; })}</div></section>
      <section id="projects" className="section section-projects"><div className="container"><SectionHeading eyebrow="04 / Selected work" title="Projects built to answer real questions."><p>Academic, Portfolio as well as Internship Projects</p></SectionHeading><div className="projects-grid">{portfolio.projects.map((project, index) => { const projectImages = getProjectImages(project); const isCarousel = projectImages.length > 1; const activeImageIndex = isCarousel ? (projectImageIndexes[project.title] ?? 0) : 0; const activeImage = projectImages[activeImageIndex] ?? projectImages[0]; const setActiveImageIndex = (nextIndex: number) => setProjectImageIndexes((current) => ({ ...current, [project.title]: nextIndex })); return <motion.article className={`project-card ${"featured" in project && project.featured ? "project-featured" : ""} ${projectImages.length ? "project-with-image" : ""}`} key={project.title} {...motionProps} transition={{ duration: 0.55, delay: index * 0.08 }}>{activeImage && <div className={`project-carousel ${isCarousel ? "project-carousel-multi" : ""}`}><button className="project-image-button" type="button" onClick={() => setProjectPreview({ project, image: activeImage })} aria-label={`Open ${activeImage.label} preview`}><Image src={activeImage.src} alt={activeImage.label} width={1338} height={745} className="project-image" /></button>{isCarousel && <><button className="project-carousel-arrow project-carousel-prev" type="button" onClick={() => setActiveImageIndex((activeImageIndex + projectImages.length - 1) % projectImages.length)} aria-label={`Show previous ${project.title} dashboard`}>‹</button><button className="project-carousel-arrow project-carousel-next" type="button" onClick={() => setActiveImageIndex((activeImageIndex + 1) % projectImages.length)} aria-label={`Show next ${project.title} dashboard`}>›</button><div className="project-carousel-caption"><span>{String(activeImageIndex + 1).padStart(2, "0")} / {String(projectImages.length).padStart(2, "0")} — {activeImage.label}</span><div className="project-carousel-dots" role="tablist" aria-label={`${project.title} dashboard views`}>{projectImages.map((image, imageIndex) => <button key={image.src} className={imageIndex === activeImageIndex ? "is-active" : ""} type="button" role="tab" aria-selected={imageIndex === activeImageIndex} aria-label={`Show ${image.label}`} onClick={() => setActiveImageIndex(imageIndex)}><span /></button>)}</div></div></>}</div>}<div className="project-card-top"><span className="project-number">0{index + 1}</span><span className="project-category">{project.category}</span></div><h3>{project.title}</h3><p className="project-summary">{project.summary}</p>{project.context && <p className="project-context">{project.context}</p>}{project.highlights && <ul className="project-highlights">{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>}{project.disclaimer && <p className="project-disclaimer">{project.disclaimer}</p>}<div className="project-metric"><span>Project signal</span><strong>{project.metric}</strong></div><div className="project-bottom"><div className="tag-row">{project.stack.map((item) => <span key={item}>{item}</span>)}</div><div className="project-links"><a href={project.github} target="_blank" rel="noreferrer" aria-label={`View ${project.title} on GitHub`}>GitHub <ArrowUpRight /></a>{project.demo && <a href={project.demo} target={project.externalDemo ? "_blank" : undefined} rel={project.externalDemo ? "noreferrer" : undefined} aria-label={`${project.title} live demo link`}>Live demo <ArrowUpRight /></a>}</div></div></motion.article>; })}</div></div></section>
      {projectPreview && <div className="project-preview-backdrop" role="dialog" aria-modal="true" aria-label={`${projectPreview.image.label} preview`} onClick={() => setProjectPreview(null)}><div className="project-preview-dialog" onClick={(event) => event.stopPropagation()}><button className="project-preview-close" type="button" onClick={() => setProjectPreview(null)} aria-label="Close project preview">×</button><Image src={projectPreview.image.src} alt={projectPreview.image.label} width={1338} height={745} className="project-preview-image" /><p>{projectPreview.project.title} · {projectPreview.image.label}</p></div></div>}
      <section id="education" className="section container"><SectionHeading eyebrow="05 / Education" title="A strong technical foundation." /><motion.div className="education-card" {...motionProps}><div className="education-logo-wrap"><Image src="/charusat_logo.png" alt="CHARUSAT logo" width={72} height={72} className="education-logo" /></div><div><p className="muted-label">{portfolio.education.dates} · Graduation April 2026</p><h3>{portfolio.education.university}</h3><p className="company-name">{portfolio.education.degree}</p><p>{portfolio.education.details}</p></div><div className="education-score"><span>CGPA</span><strong>{portfolio.education.cgpa}</strong></div></motion.div></section>
      <section id="certifications" className="section section-border container"><SectionHeading eyebrow="06 / Certifications" title="Curiosity with a structured practice." /><div className="cert-grid">{portfolio.certifications.map((item, index) => <motion.article className="cert-card" key={item.title} {...motionProps}><span className="cert-index">0{index + 1}</span><div><h3>{item.title}</h3><p>{item.issuer}</p></div><a className="cert-verification" href={item.url} target="_blank" rel="noreferrer" aria-label={`Verify ${item.title} on ${item.issuer}`}><Image src={item.logo} alt={`${item.issuer} logo`} width={56} height={40} className="cert-logo" /><span>Verify certificate</span></a></motion.article>)}</div></section>
      <section id="contact" className="contact-section"><div className="container contact-inner"><div className="contact-intro"><p className="section-eyebrow">07 / Contact</p><h2>Let&apos;s build what the data is asking for.</h2><p className="contact-copy">I am actively seeking entry-level opportunities across Data Analytics, Data Science, Machine Learning, and AI/ML.</p><a className="button button-primary contact-email-link" href="mailto:pranavjmp444@gmail.com"><span className="contact-icon-frame" aria-hidden="true"><Image src="/mail%20logo.png" alt="" width={48} height={48} className="contact-icon" /></span><span className="contact-email-copy"><strong>Email me</strong><small>pranavjmp444@gmail.com</small></span><ArrowUpRight /></a></div><div className="contact-actions"><div className="contact-social-links"><a className="contact-social-link" href="https://www.linkedin.com/in/pranav-patel-www22447630a" target="_blank" rel="noreferrer"><span className="contact-icon-frame" aria-hidden="true"><Image src="/linkedin_logo.png" alt="" width={48} height={48} className="contact-icon" /></span><span>LinkedIn</span><ArrowUpRight /></a><a className="contact-social-link" href="https://github.com/pranav444444" target="_blank" rel="noreferrer"><span className="contact-icon-frame" aria-hidden="true"><Image src="/github_logo.png" alt="" width={48} height={48} className="contact-icon" /></span><span>GitHub</span><ArrowUpRight /></a></div></div></div></section>
    </main>
    <footer className="site-footer"><div className="container footer-inner"><span>{portfolio.name}</span><span>© {new Date().getFullYear()} · {portfolio.role}</span><div><a href="https://github.com/pranav444444" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/pranav-patel-www22447630a" target="_blank" rel="noreferrer">LinkedIn</a></div></div></footer>
  </div>;
}
