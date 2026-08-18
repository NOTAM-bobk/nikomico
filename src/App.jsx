import { useEffect, useRef, useState, useCallback } from 'react'

/* ==========================================================================
   CONFIG — edit everything here. Nothing below this block needs to change
   for normal content updates (nav, socials, records, achievements, sponsors,
   gallery, timeline, footer).
   ========================================================================== */

const CONFIG = {

  name: 'Nico Schultz',
  tagline: '800m specialist. Indoor and outdoor. Still chasing state.',

  // Drop matching files into /public/images to bring these to life.
  images: {
    hero: '/images/hero-action.jpg',
  },

  // Top nav quick links (in-page anchors or external URLs)
  nav: [
    { label: 'Home', href: '#top' },
    { label: 'Records', href: '#prs' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Sponsors', href: '#sponsors' },
    { label: 'Journey', href: '#journey' },
    { label: 'Contact', href: '#contact' },
  ],

  // Social links — used in the nav bar AND the social strip.
  // icon options: instagram, twitter, tiktok, strava, youtube, linkedin, email
  socials: [
    { platform: 'Instagram', icon: 'instagram', url: 'https://instagram.com/' },
    { platform: 'YouTube', icon: 'youtube', url: 'https://youtube.com/' },
    { platform: 'Twitter/X', icon: 'twitter', url: 'https://twitter.com/' },
    { platform: 'Strava', icon: 'strava', url: 'https://strava.com/' },
    { platform: 'TikTok', icon: 'tiktok', url: 'https://tiktok.com/' },
  ],

  // Personal Records — 800m only, indoor and outdoor
  prs: [
    { event: '800m Indoor', mark: '1:53.02', meta: 'Conference Indoor Championships — Feb 2026' },
    { event: '800m Outdoor', mark: '1:52.14', meta: 'Sectional Championships — May 2026' },
  ],

  // Achievements — wins, medals, and honors
  achievements: [
    { title: '1st Place, 800m', meta: 'Sectional Championships — 2026', detail: 'Broke away with 200m to go to take the section title in a personal-best time.' },
    { title: '2nd Place, 800m Indoor', meta: 'Conference Indoor Championships — 2026', detail: 'Ran down the leader on the final straight, finishing a stride short of the win.' },
    { title: 'All-Conference, Indoor Track', meta: 'Winter 2026', detail: 'Named to the all-conference team after a season of consistent top-three finishes.' },
    { title: '3rd Place, 800m', meta: 'Regional Championships — 2025', detail: 'Held off a five-way pack in the final 100m to medal at regionals as a junior.' },
    { title: 'Team MVP, Track & Field', meta: 'Roosevelt High School — 2025', detail: 'Voted team MVP by coaches and teammates for the outdoor season.' },
    { title: 'Academic All-Conference', meta: '2025 — 2026', detail: 'Recognized for maintaining conference honor-roll standards across both seasons.' },
  ],

  // Sponsors — shown in the sliding carousel.
  // color accepts any CSS color; it sets the card's top bar + logo mark.
  sponsors: [
    { name: 'BiCarb', tier: 'Nutrition Partner', initials: 'BC', color: '#7A9E7E' },
    { name: 'Eddie Bauer', tier: 'Apparel Partner', initials: 'EB', color: '#3E5C76' },
    { name: 'TrailForge', tier: 'Gear Sponsor', initials: 'TF', color: '#B7742F' },
    { name: 'PaceLab', tier: 'Training Partner', initials: 'PL', color: '#9A5A44' },
    { name: 'NorthWind Co.', tier: 'Local Sponsor', initials: 'NW', color: '#556270' },
  ],

  // Race-day gallery — drop matching files into /public/images
  gallery: [
    { src: '/images/gallery-1.jpg', caption: 'Kicking for the line — Sectional Championships' },
    { src: '/images/gallery-2.jpg', caption: 'Pre-race warmup — Regional Championships' },
    { src: '/images/gallery-3.jpg', caption: 'Podium finish — Conference Indoor' },
  ],

  // Journey timeline — order matters, earliest first
  timeline: [
    {
      year: '2019 — 2021',
      title: 'Middle School Track',
      org: 'Lincoln Middle School',
      desc: 'First laps on a real track. Ran junior varsity distance events and found out running could be more than a gym-class mile.',
    },
    {
      year: '2021 — 2023',
      title: 'Freshman & JV Years',
      org: 'Roosevelt High School',
      desc: 'Moved up to the high school program. Cut his mile time by nearly a minute across two seasons of varsity-adjacent racing.',
    },
    {
      year: '2023 — 2025',
      title: 'Varsity Breakthrough',
      org: 'Roosevelt High School',
      desc: 'Earned a varsity spot, qualified for regionals in cross country, and set five personal records in a single outdoor season.',
    },
    {
      year: '2025 — Present',
      title: 'Chasing State, Chasing More',
      org: 'Roosevelt High School / Independent Training',
      desc: 'Training for a state qualifying mark in the 800m, picking up local sponsors along the way, and building toward the next level.',
    },
  ],

  // Footer links
  footerLinks: [
    { label: 'Records', href: '#prs' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Sponsors', href: '#sponsors' },
    { label: 'Journey', href: '#journey' },
  ],

  gofundme: 'https://gofundme.com/',
  contact: 'mailto:developer@example.com',
}

/* ==========================================================================
   ICON LIBRARY — small inline SVGs, currentColor-based
   ========================================================================== */

const ICONS = {
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1"/></svg>',
  twitter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 3H21.5L15.6 9.7L22.5 21H17.1L12.9 14.9L8.1 21H5.5L11.8 13.8L5.2 3H10.8L14.6 8.6L18.9 3ZM17.9 19.4H19.4L9.9 4.5H8.3L17.9 19.4Z"/></svg>',
  strava: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10.8 2L4.5 14.3H8.2L10.8 9.2L13.3 14.3H17L10.8 2ZM13.4 16.9L11.7 20.4L10 16.9H6.9L11.7 26L16.5 16.9H13.4Z"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 5.8C15.9 5.1 15.5 4.1 15.5 3H12.4V16.4C12.4 17.8 11.3 18.9 9.9 18.9C8.5 18.9 7.4 17.8 7.4 16.4C7.4 15 8.5 13.9 9.9 13.9C10.2 13.9 10.4 13.9 10.7 14V10.9C10.4 10.9 10.2 10.8 9.9 10.8C6.8 10.8 4.3 13.3 4.3 16.4C4.3 19.5 6.8 22 9.9 22C13 22 15.5 19.5 15.5 16.4V9.1C16.7 9.9 18.1 10.4 19.6 10.4V7.3C18.5 7.3 17.4 6.7 16.6 5.8Z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 8.2C22 6.5 20.7 5.2 19 5.1C16.7 5 12 5 12 5C12 5 7.3 5 5 5.1C3.3 5.2 2 6.5 2 8.2C1.9 9.6 1.9 12 1.9 12C1.9 12 1.9 14.4 2 15.8C2 17.5 3.3 18.8 5 18.9C7.3 19 12 19 12 19C12 19 16.7 19 19 18.9C20.7 18.8 22 17.5 22 15.8C22.1 14.4 22.1 12 22.1 12C22.1 12 22.1 9.6 22 8.2ZM9.9 15.3V8.7L15.7 12L9.9 15.3Z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5.3 3C4 3 3 4 3 5.3S4 7.6 5.3 7.6 7.6 6.6 7.6 5.3 6.6 3 5.3 3ZM3.3 9.1H7.3V21H3.3V9.1ZM10.3 9.1H14.1V10.8H14.2C14.7 9.9 15.9 8.9 17.7 8.9C21.4 8.9 22.1 11.3 22.1 14.4V21H18.1V15.2C18.1 13.8 18.1 12 16.1 12C14.1 12 13.8 13.5 13.8 15.1V21H10.3V9.1Z"/></svg>',
  email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7L12 13L21 7"/></svg>',
  medal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4L6.2 10.2M15 4L17.8 10.2M9 4H15"/><circle cx="12" cy="14.5" r="5.5"/><path d="M12 11.6L13 13.7L15.3 14L13.6 15.6L14 17.9L12 16.8L10 17.9L10.4 15.6L8.7 14L11 13.7L12 11.6Z"/></svg>',
}

function Icon({ name }) {
  return <span className="icon" dangerouslySetInnerHTML={{ __html: ICONS[name] || ICONS.email }} />
}

/* ==========================================================================
   Reusable scroll-reveal hook — observes a list of refs and tracks which
   indices have entered the viewport. Used by the records, achievements,
   and gallery grids.
   ========================================================================== */

function useSectionReveal() {
  const refs = useRef([])
  const [visible, setVisible] = useState(() => new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.idx)
            setVisible((prev) => (prev.has(idx) ? prev : new Set(prev).add(idx)))
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    )
    refs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return { refs, visible }
}

/* ==========================================================================
   APP
   ========================================================================== */

export default function App() {
  const [loaderHidden, setLoaderHidden] = useState(false)
  const [navScrolled, setNavScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  const canvasRef = useRef(null)
  const timelineRefs = useRef([])
  const [timelineVisible, setTimelineVisible] = useState(new Set())
  const timelineWrapRef = useRef(null)
  const progressPathRef = useRef(null)
  const footerSentinelRef = useRef(null)
  const modalShownRef = useRef(false)

  const prReveal = useSectionReveal()
  const achievementReveal = useSectionReveal()
  const galleryReveal = useSectionReveal()

  /* ---- Loader ---- */
  useEffect(() => {
    const t = setTimeout(() => setLoaderHidden(true), 500)
    return () => clearTimeout(t)
  }, [])

  /* ---- Nav scrolled state + scroll progress (single listener) ---- */
  useEffect(() => {
    const onScroll = () => {
      setNavScrolled(window.scrollY > 12)
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setScrollProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ---- Ambient dot field (canvas) ---- */
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const grays = ['#918B7C', '#B9B2A0', '#57534A', '#1A1917', '#322F29']
    const spacing = 26
    let dots = []
    let w, h
    let rafId

    function buildDots() {
      dots = []
      const cols = Math.ceil(w / (spacing * devicePixelRatio))
      const rows = Math.ceil(h / (spacing * devicePixelRatio))
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          dots.push({
            x: x * spacing * devicePixelRatio + (spacing * devicePixelRatio) / 2,
            y: y * spacing * devicePixelRatio + (spacing * devicePixelRatio) / 2,
            baseColor: grays[Math.floor(Math.random() * grays.length)],
            phase: Math.random() * Math.PI * 2,
            speed: 0.15 + Math.random() * 0.25,
            radius: 0.75 + Math.random() * 0.7,
          })
        }
      }
    }

    function resize() {
      w = canvas.width = window.innerWidth * devicePixelRatio
      h = canvas.height = document.documentElement.scrollHeight * devicePixelRatio
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = document.documentElement.scrollHeight + 'px'
      buildDots()
    }

    function draw(t) {
      ctx.clearRect(0, 0, w, h)
      const time = t * 0.001
      for (const d of dots) {
        const pulse = (Math.sin(time * d.speed + d.phase) + 1) / 2
        ctx.globalAlpha = 0.16 + pulse * 0.38
        ctx.fillStyle = d.baseColor
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.radius * devicePixelRatio, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      if (!reducedMotion) rafId = requestAnimationFrame(draw)
    }

    let resizeTimer
    const debouncedResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 200)
    }

    resize()
    window.addEventListener('resize', debouncedResize)
    const loadTimer = setTimeout(resize, 300)

    if (reducedMotion) {
      draw(0)
    } else {
      rafId = requestAnimationFrame(draw)
    }

    return () => {
      window.removeEventListener('resize', debouncedResize)
      clearTimeout(resizeTimer)
      clearTimeout(loadTimer)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  /* ---- Scroll reveal: timeline items ---- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.idx)
            setTimelineVisible((prev) => new Set(prev).add(idx))
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    )
    timelineRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  /* ---- Timeline line draw progress ---- */
  useEffect(() => {
    const wrap = timelineWrapRef.current
    const progress = progressPathRef.current
    if (!wrap || !progress) return

    function clamp(v, min, max) {
      return Math.max(min, Math.min(max, v))
    }

    function update() {
      const rect = wrap.getBoundingClientRect()
      const vh = window.innerHeight
      const total = rect.height
      const scrolled = clamp(vh * 0.75 - rect.top, 0, total)
      const ratio = total > 0 ? scrolled / total : 0
      const length = 1000
      progress.setAttribute('d', `M2,0 L2,${length * ratio}`)
    }

    let rafId
    const onScroll = () => {
      rafId = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  /* ---- Bottom popup modal ---- */
  useEffect(() => {
    const sentinel = footerSentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !modalShownRef.current) {
            modalShownRef.current = true
            setTimeout(() => setModalVisible(true), 300)
          }
        })
      },
      { threshold: 0.6 }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!modalVisible) return
    const onKey = (e) => {
      if (e.key === 'Escape') setModalVisible(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [modalVisible])

  const closeMenuIfLink = useCallback((e) => {
    if (e.target.tagName === 'A') setMenuOpen(false)
  }, [])

  const sponsorTrack = [...CONFIG.sponsors, ...CONFIG.sponsors]

  return (
    <>
      {/* ============ LOADER ============ */}
      <div id="loader" className={loaderHidden ? 'loader-hidden' : ''} aria-hidden="true">
        <div className="loader-inner">
          <p className="loader-mark">N·S</p>
          <div className="loader-bar"><span></span></div>
        </div>
      </div>

      {/* ============ AMBIENT DOT FIELD ============ */}
      <canvas id="dot-field" ref={canvasRef} aria-hidden="true"></canvas>

      {/* ============ NAV ============ */}
      <header
        id="site-nav"
        className={`site-nav ${navScrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}
      >
        <div className="nav-inner">
          <a href="#top" className="nav-logo">N. SCHULTZ</a>

          <nav className="nav-links" id="nav-links" aria-label="Page sections" onClick={closeMenuIfLink}>
            {CONFIG.nav.map((item) => (
              <a key={item.label} href={item.href}>{item.label}</a>
            ))}
          </nav>

          <div className="nav-right">
            <div className="nav-socials" aria-label="Social links">
              {CONFIG.socials.map((s) => (
                <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.platform}>
                  <Icon name={s.icon} />
                </a>
              ))}
            </div>
            <span className="nav-divider" aria-hidden="true"></span>
            <button
              className="nav-toggle"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
        <div className="nav-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true"></div>
      </header>

      <main id="top">

        {/* ============ HERO ============ */}
        <section className="hero" id="home">
          <div className="hero-media" aria-hidden="true">
            <img src={CONFIG.images.hero} alt="" loading="eager" />
          </div>
          <div className="hero-content">
            <p className="hero-eyebrow">TRACK &amp; FIELD</p>
            <h1 className="hero-name" aria-label={CONFIG.name}>{CONFIG.name}</h1>
            <p className="hero-tagline">{CONFIG.tagline}</p>
            <a href="#journey" className="scroll-cue" aria-label="Scroll to explore">
              <span className="scroll-cue-line"></span>
              <span className="scroll-cue-text">SCROLL</span>
            </a>
          </div>
        </section>

        {/* ============ SOCIAL STRIP ============ */}
        <section className="social-strip" aria-label="Follow Nico">
          <div className="social-strip-inner">
            {CONFIG.socials.map((s) => (
              <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer">
                <Icon name={s.icon} />
                <span>{s.platform}</span>
              </a>
            ))}
          </div>
        </section>

        {/* ============ PRs ============ */}
        <section className="prs" id="prs">
          <div className="section-inner">
            <p className="section-eyebrow">01 — BY THE NUMBERS</p>
            <h2 className="section-title">Personal Records</h2>
            <p className="section-sub">Two events, one focus.</p>

            <div className="pr-grid">
              {CONFIG.prs.map((pr, idx) => (
                <div
                  key={pr.event}
                  ref={(el) => (prReveal.refs.current[idx] = el)}
                  data-idx={idx}
                  style={{ '--i': idx }}
                  className={`pr-card ${prReveal.visible.has(idx) ? 'in-view' : ''}`}
                >
                  <p className="pr-event">{pr.event}</p>
                  <p className="pr-mark">{pr.mark}</p>
                  <p className="pr-meta">{pr.meta}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ ACHIEVEMENTS ============ */}
        <section className="achievements" id="achievements">
          <div className="section-inner">
            <p className="section-eyebrow">02 — HONORS &amp; RESULTS</p>
            <h2 className="section-title">Achievements</h2>
            <p className="section-sub">Results that back up the times.</p>

            <div className="achievements-grid">
              {CONFIG.achievements.map((a, idx) => (
                <div
                  key={a.title}
                  ref={(el) => (achievementReveal.refs.current[idx] = el)}
                  data-idx={idx}
                  style={{ '--i': idx }}
                  className={`achievement-card ${achievementReveal.visible.has(idx) ? 'in-view' : ''}`}
                >
                  <span className="achievement-icon"><Icon name="medal" /></span>
                  <p className="achievement-meta">{a.meta}</p>
                  <h3 className="achievement-title">{a.title}</h3>
                  <p className="achievement-detail">{a.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ SPONSORS ============ */}
        <section className="sponsors" id="sponsors">
          <div className="section-inner">
            <p className="section-eyebrow">03 — BACKED BY</p>
            <h2 className="section-title">Sponsors &amp; Partners</h2>
            <p className="section-sub">The brands behind every mile.</p>
          </div>

          <div className="sponsor-carousel">
            <div className="sponsor-track">
              {sponsorTrack.map((s, idx) => (
                <div key={idx} className="sponsor-card" style={{ '--sponsor-color': s.color }}>
                  <div className="sponsor-mark">{s.initials}</div>
                  <p className="sponsor-name">{s.name}</p>
                  <p className="sponsor-tier">{s.tier}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ GALLERY ============ */}
        <section className="gallery" id="gallery">
          <div className="section-inner">
            <p className="section-eyebrow">04 — ON THE LINE</p>
            <h2 className="section-title">Race Day</h2>
          </div>

          <div className="gallery-grid section-inner">
            {CONFIG.gallery.map((g, idx) => (
              <figure
                key={g.src}
                ref={(el) => (galleryReveal.refs.current[idx] = el)}
                data-idx={idx}
                style={{ '--i': idx }}
                className={`gallery-item ${galleryReveal.visible.has(idx) ? 'in-view' : ''}`}
              >
                <img src={g.src} alt={g.caption} loading="lazy" />
                <figcaption>{g.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ============ JOURNEY / TIMELINE ============ */}
        <section className="journey" id="journey">
          <div className="section-inner">
            <p className="section-eyebrow">05 — THE JOURNEY</p>
            <h2 className="section-title">Middle School to Now</h2>
            <p className="section-sub">Every season builds on the last.</p>
          </div>

          <div className="timeline-wrap" ref={timelineWrapRef}>
            <svg className="timeline-line" viewBox="0 0 4 1000" preserveAspectRatio="none" aria-hidden="true">
              <path d="M2,0 L2,1000" />
              <path ref={progressPathRef} id="timeline-path-progress" d="M2,0 L2,0" />
            </svg>
            <div className="timeline-items">
              {CONFIG.timeline.map((t, idx) => (
                <div
                  key={t.title}
                  ref={(el) => (timelineRefs.current[idx] = el)}
                  data-idx={idx}
                  className={`timeline-item ${timelineVisible.has(idx) ? 'in-view' : ''}`}
                >
                  <span className="timeline-dot"></span>
                  <p className="timeline-year">{t.year}</p>
                  <h3 className="timeline-title">{t.title}</h3>
                  <p className="timeline-org">{t.org}</p>
                  <p className="timeline-desc">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* ============ FOOTER ============ */}
      <footer className="site-footer" id="contact">
        <div className="footer-inner">
          <div className="footer-brand">
            <p className="footer-name">{CONFIG.name}</p>
            <p className="footer-tag">Thanks for following the journey.</p>
          </div>

          <div className="footer-links">
            {CONFIG.footerLinks.map((l) => (
              <a key={l.label} href={l.href}>{l.label}</a>
            ))}
          </div>

          <div className="footer-support">
            <a href={CONFIG.gofundme} className="footer-gofundme-link" target="_blank" rel="noopener noreferrer">
              Support the journey →
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {CONFIG.name}. All rights reserved.</p>
        </div>
        <div ref={footerSentinelRef} aria-hidden="true" style={{ height: 1 }}></div>
      </footer>

      {/* ============ BOTTOM POPUP MODAL ============ */}
      <div className={`modal-overlay ${modalVisible ? 'modal-visible' : ''}`} onClick={(e) => {
        if (e.target === e.currentTarget) setModalVisible(false)
      }}>
        <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <button className="modal-close" aria-label="Close" onClick={() => setModalVisible(false)}>&times;</button>
          <p className="modal-eyebrow">BEFORE YOU GO</p>
          <h3 className="modal-title" id="modal-title">Want to help out?</h3>
          <p className="modal-body">
            This site is built and maintained independently. Reach out directly, or support Nico's season through his GoFundMe.
          </p>
          <div className="modal-actions">
            <a href={CONFIG.contact} className="modal-btn modal-btn-primary" target="_blank" rel="noopener noreferrer">
              Contact the Developer
            </a>
            <a href={CONFIG.gofundme} className="modal-btn modal-btn-secondary" target="_blank" rel="noopener noreferrer">
              Visit the GoFundMe
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
