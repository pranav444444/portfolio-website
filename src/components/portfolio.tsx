"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { startTransition, useEffect, useRef, useState, type ReactNode } from "react";
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

type ChartParticle = { x: number; y: number; phase: number; speed: number };
type ChartPoint = { x: number; y: number };

function SignalNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !container || !context) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const particles: ChartParticle[] = [
      { x: 0.13, y: 0.42, phase: 0.3, speed: 0.46 },
      { x: 0.265, y: 0.2, phase: 1.4, speed: 0.38 },
      { x: 0.4, y: 0.36, phase: 2.6, speed: 0.42 },
      { x: 0.535, y: 0.16, phase: 3.8, speed: 0.35 },
      { x: 0.67, y: 0.43, phase: 5.1, speed: 0.4 },
      { x: 0.805, y: 0.23, phase: 5.8, speed: 0.37 },
    ];
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let frameId = 0;
    let isReducedMotion = motionQuery.matches;
    let isPageVisible = !document.hidden;
    let theme: "dark" | "light" = document.documentElement.dataset.theme === "dark" ? "dark" : "light";

    const draw = (timestamp: number) => {
      frameId = 0;
      context.clearRect(0, 0, width, height);
      const dark = theme === "dark";
      const time = isReducedMotion ? 0 : timestamp / 1000;
      const lineColor = dark ? "6, 182, 212" : "71, 85, 105";
      const particleColor = dark ? "16, 185, 129" : "79, 70, 229";
      const highlightColor = dark ? "6, 182, 212" : "99, 102, 241";
      const points: ChartPoint[] = particles.map((particle) => ({
        x: (particle.x + (isReducedMotion ? 0 : Math.sin(time * particle.speed + particle.phase) * 0.018)) * width,
        y: (particle.y + (isReducedMotion ? 0 : Math.cos(time * particle.speed * 0.82 + particle.phase) * 0.045)) * height,
      }));
      let edgeIndex = 0;

      for (let first = 0; first < points.length; first += 1) {
        for (let second = first + 1; second < points.length && second <= first + 2; second += 1) {
          const start = points[first];
          const end = points[second];
          const dx = end.x - start.x;
          const dy = end.y - start.y;
          const distance = Math.hypot(dx, dy);
          if (distance > Math.min(width * 0.32, 132)) continue;

          context.beginPath();
          context.moveTo(start.x, start.y);
          context.quadraticCurveTo((start.x + end.x) / 2, (start.y + end.y) / 2 - 12, end.x, end.y);
          context.strokeStyle = "rgba(" + lineColor + ", " + (dark ? 0.19 : 0.2) + ")";
          context.lineWidth = 0.75;
          context.stroke();

          if (!isReducedMotion && edgeIndex % 2 === 0) {
            const progress = (timestamp / 7600 + edgeIndex * 0.21) % 1;
            const pulseX = start.x + dx * progress;
            const pulseY = start.y + dy * progress - Math.sin(progress * Math.PI) * 12;
            context.beginPath();
            context.arc(pulseX, pulseY, 1.15, 0, Math.PI * 2);
            context.fillStyle = "rgba(" + highlightColor + ", " + (dark ? 0.56 : 0.44) + ")";
            context.shadowBlur = dark ? 7 : 4;
            context.shadowColor = "rgba(" + highlightColor + ", " + (dark ? 0.54 : 0.3) + ")";
            context.fill();
            context.shadowBlur = 0;
          }
          edgeIndex += 1;
        }
      }

      points.forEach((point, index) => {
        context.beginPath();
        context.arc(point.x, point.y, index === 2 ? 2 : 1.55, 0, Math.PI * 2);
        context.fillStyle = "rgba(" + particleColor + ", " + (dark ? 0.72 : 0.5) + ")";
        context.shadowBlur = dark ? 8 : 4;
        context.shadowColor = "rgba(" + (dark ? particleColor : highlightColor) + ", " + (dark ? 0.45 : 0.24) + ")";
        context.fill();
        context.shadowBlur = 0;
      });

      if (!isReducedMotion && isPageVisible) frameId = window.requestAnimationFrame(draw);
    };

    const resize = () => {
      const bounds = container.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      if (isReducedMotion || !isPageVisible) draw(performance.now());
    };
    const handleMotionChange = (event: MediaQueryListEvent) => {
      isReducedMotion = event.matches;
      if (frameId) window.cancelAnimationFrame(frameId);
      draw(performance.now());
    };
    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (!isPageVisible && frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      } else if (isPageVisible && !isReducedMotion && !frameId) {
        frameId = window.requestAnimationFrame(draw);
      }
    };
    const themeObserver = new MutationObserver(() => {
      theme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
      if (isReducedMotion) draw(performance.now());
    });
    const resizeObserver = new ResizeObserver(resize);

    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    resizeObserver.observe(container);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    motionQuery.addEventListener("change", handleMotionChange);
    resize();
    draw(performance.now());

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      themeObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="signal-network" aria-hidden="true" />;
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
      <section className="hero container" aria-labelledby="hero-title"><div className="hero-copy"><motion.p className="eyebrow" initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }} animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>{portfolio.eyebrow}</motion.p><motion.h1 id="hero-title" initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }} animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}>Data, intelligence <span>with purpose.</span></motion.h1><motion.p className="hero-intro" initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }} animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.16 }}>{portfolio.intro}</motion.p><motion.div className="hero-role-list" initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }} animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}><span>Analytics</span><span>Data Science</span><span>ML Engineering</span><span>AI / ML</span></motion.div><motion.div className="hero-actions" initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }} animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.28 }}><a className="button button-primary" href="#projects">View projects <ArrowUpRight /></a><a className="button button-secondary" href={portfolio.resumeHref}>Download resume <span aria-hidden="true">↓</span></a></motion.div><motion.div className="hero-links" initial={shouldReduceMotion ? false : { opacity: 0 }} animate={shouldReduceMotion ? undefined : { opacity: 1 }} transition={{ duration: 0.5, delay: 0.42 }}><a href={portfolio.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight /></a><a href={portfolio.linkedin}>LinkedIn <ArrowUpRight /></a></motion.div></div><motion.div className="hero-aside" initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }} animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}><div className="signal-card"><div className="signal-topline"><span className="status-dot" /> Available for opportunities</div><div className="signal-graphic" aria-hidden="true"><SignalNetwork /><span /><span /><span /><span /><span /><span /><span /></div><div className="signal-footer"><span>Data</span><strong>→</strong><span>Models</span><strong>→</strong><span>Systems</span></div></div><p className="hero-aside-caption">From a clean dataset to a useful model, dashboard, or API that people can trust.</p></motion.div></section>
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
