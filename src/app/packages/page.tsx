'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { packages } from '../data/packages';

/* ── palette ───────────────────────────────────────────── */
const C = {
  crimson:'#C41E3A', darkRed:'#8B0000', dark:'#1A1714',
  ivory:'#F8F5F0',  muted:'#8A8074',   gold:'#C9A96E',
  white:'#FFFFFF',  surface:'#FFFFFF',
};

/* ── category meta ─────────────────────────────────────── */
const CATS = [
  { key:'all',       label:'All Packages', icon:'🌿', color:'#1A1714', img:'/assets/index-hero.webp' },
  { key:'culture',   label:'Culture',      icon:'🏛️', color:'#B97C3A', img:'/assets/culture-package/sigiriya.webp' },
  { key:'beach',     label:'Beach',        icon:'🏖️', color:'#2D9CDB', img:'/assets/hikkaduwa-beach-1.webp' },
  { key:'wildlife',  label:'Wildlife',     icon:'🐘', color:'#D4842A', img:'/assets/yala-national-park-1.webp' },
  { key:'nature',    label:'Nature',       icon:'⛰️', color:'#52B788', img:'/assets/horton-plains-1.webp' },
  { key:'adventure', label:'Adventure',    icon:'🚣', color:'#A855F7', img:'/assets/kitulgala-1.webp' },
];
const DIFFS = ['All','Easy','Moderate','Challenging'];
const SORTS = [
  { key:'default',    label:'Featured'   },
  { key:'price-asc',  label:'Price ↑'    },
  { key:'price-desc', label:'Price ↓'    },
  { key:'rating',     label:'Top Rated'  },
  { key:'duration',   label:'Duration'   },
];

/* ── global CSS ─────────────────────────────────────────── */
const CSS = `
  *, *::before, *::after { box-sizing:border-box; }
  html, body { overflow-x:hidden; }

  /* ── Keyframes ── */
  @keyframes pkgFadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:none} }
  @keyframes pkgFadeIn   { from{opacity:0} to{opacity:1} }
  @keyframes heroLine    { from{width:0} to{width:60px} }
  @keyframes slideUp     { from{transform:translateY(110%)} to{transform:translateY(0)} }
  @keyframes shimmer     { from{background-position:200% center} to{background-position:-200% center} }
  @keyframes heroBgDrift { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04) translate(-1%,-1%)} }

  /* ── Hero ── */
  .ph-hero {
    position:relative;
    width:100%;
    overflow:hidden;
    /* fallback then modern unit */
    min-height:100vh;
    min-height:100svh;
    display:flex;
    flex-direction:column;
    justify-content:flex-end;
  }
  .ph-hero-bg {
    position:absolute;
    inset:0;
    width:100%;
    height:100%;
    background-size:cover;
    background-position:center center;
    background-repeat:no-repeat;
    animation:heroBgDrift 20s ease-in-out infinite;
    will-change:transform;
    transition:background-image .6s ease;
  }
  .ph-hero-overlay {
    position:absolute;
    inset:0;
    background:linear-gradient(
      to top,
      rgba(10,7,5,.98) 0%,
      rgba(10,7,5,.6) 50%,
      rgba(10,7,5,.2) 100%
    );
  }
  .ph-hero-content {
    position:relative;
    z-index:2;
    width:100%;
    max-width:1340px;
    margin:0 auto;
    padding:0 clamp(18px,5vw,72px) 40px;
  }
  .ph-eyebrow {
    display:inline-flex;
    align-items:center;
    gap:10px;
    margin-bottom:18px;
    animation:pkgFadeUp .7s ease both;
  }
  .ph-eyebrow-line {
    width:60px; height:2px;
    background:${C.crimson};
    animation:heroLine .9s ease .3s both;
    flex-shrink:0;
  }
  .ph-eyebrow-text {
    font-family:var(--font-accent);
    font-size:1.12rem; font-weight:700;
    letter-spacing:.26em; text-transform:uppercase;
    color:${C.crimson};
    white-space:nowrap;
  }
  .ph-title {
    font-family:var(--font-heading);
    font-size:clamp(2.6rem,7vw,5.4rem);
    font-weight:900; color:#fff;
    line-height:1.07; letter-spacing:-.028em;
    margin:0 0 20px;
    animation:pkgFadeUp .75s ease .15s both;
  }
  .ph-title span {
    background:linear-gradient(90deg,${C.gold},#f0d99a,${C.gold});
    background-size:200%;
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    animation:shimmer 4s linear 1s infinite;
  }
  .ph-sub {
    font-family:var(--font-body);
    font-size:clamp(1rem,1.5vw,1.2rem);
    color:rgba(255,255,255,.62);
    max-width:560px; line-height:1.82;
    margin:0 0 34px;
    animation:pkgFadeUp .75s ease .28s both;
  }
  .ph-stats {
    display:flex;
    gap:clamp(18px,4vw,52px);
    flex-wrap:wrap;
    margin-bottom:40px;
    animation:pkgFadeUp .75s ease .38s both;
  }
  .ph-stat-num {
    font-family:var(--font-heading);
    font-size:clamp(1.6rem,3vw,2.6rem);
    font-weight:900; color:${C.gold}; line-height:1;
  }
  .ph-stat-lbl {
    font-family:var(--font-accent);
    font-size:0.94rem; font-weight:600;
    letter-spacing:.14em; text-transform:uppercase;
    color:rgba(255,255,255,.42); margin-top:5px;
  }

  /* ── Category card strip ── */
  .ph-cat-strip {
    position:relative; z-index:3;
    width:100%; max-width:1340px;
    margin:0 auto;
    padding:0 clamp(18px,5vw,72px) clamp(28px,4vw,48px);
  }
  .ph-cat-row {
    display:flex; gap:12px;
    overflow-x:auto; overflow-y:visible;
    scrollbar-width:none;
    padding-bottom:4px; /* avoids clipping the lift animation */
  }
  .ph-cat-row::-webkit-scrollbar { display:none; }

  .ph-cat-card {
    flex:0 0 auto;
    position:relative;
    height:96px; width:150px;
    border-radius:14px; overflow:hidden;
    cursor:pointer;
    border:2px solid transparent;
    transition:border-color .25s, transform .3s cubic-bezier(.23,1,.32,1), box-shadow .3s;
    animation:pkgFadeUp .6s ease both;
  }
  .ph-cat-card.active {
    border-color:${C.gold};
    transform:translateY(-6px);
    box-shadow:0 12px 32px rgba(0,0,0,.45);
  }
  .ph-cat-card:not(.active):hover {
    transform:translateY(-3px);
    box-shadow:0 8px 22px rgba(0,0,0,.3);
  }
  .ph-cat-card-bg {
    position:absolute; inset:0;
    background-size:cover; background-position:center;
    transition:transform .4s ease;
    filter:brightness(.55);
  }
  .ph-cat-card:hover .ph-cat-card-bg { transform:scale(1.08); }
  .ph-cat-card.active .ph-cat-card-bg { filter:brightness(.45); }
  .ph-cat-card-overlay {
    position:absolute; inset:0;
    background:linear-gradient(to top,rgba(0,0,0,.72) 0%,transparent 70%);
  }
  .ph-cat-card-body {
    position:absolute; inset:0;
    display:flex; flex-direction:column;
    align-items:center; justify-content:flex-end;
    padding:0 8px 10px; text-align:center;
  }
  .ph-cat-card-icon { font-size:1.45rem; margin-bottom:5px; }
  .ph-cat-card-lbl  {
    font-family:var(--font-accent);
    font-size:0.96rem; font-weight:700;
    letter-spacing:.07em; text-transform:uppercase; color:#fff;
  }
  .ph-cat-card-badge {
    position:absolute; top:7px; right:7px;
    background:${C.gold}; color:${C.dark};
    border-radius:50px; padding:2px 8px;
    font-family:var(--font-accent); font-size:0.86rem; font-weight:800;
  }

  /* ── Body layout ── */
  .ph-body {
    display:grid;
    grid-template-columns:280px 1fr;
    gap:32px;
    max-width:1340px;
    margin:0 auto;
    padding:40px clamp(18px,5vw,72px) 100px;
    align-items:start;
  }

  /* ── Sidebar ── */
  .ph-sidebar { position:sticky; top:80px; }
  .ph-sidebar-card { background:${C.white}; border-radius:20px; padding:24px; box-shadow:0 4px 24px rgba(0,0,0,.07); }
  .ph-sidebar-title { font-family:var(--font-heading); font-size:1.2rem; font-weight:800; color:${C.dark}; margin:0 0 20px; display:flex; align-items:center; justify-content:space-between; }
  .ph-sidebar-clear { font-family:var(--font-accent); font-size:0.96rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:${C.crimson}; background:none; border:none; cursor:pointer; }
  .ph-section-lbl { font-family:var(--font-accent); font-size:0.94rem; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:${C.muted}; margin:0 0 11px; }
  .ph-sep { height:1px; background:rgba(0,0,0,.07); margin:20px 0; }

  .ph-sb-search { position:relative; margin-bottom:18px; }
  .ph-sb-search input { width:100%; padding:11px 14px 11px 38px; border:1.5px solid rgba(0,0,0,.1); border-radius:12px; font-family:var(--font-body); font-size:.08rem; color:${C.dark}; background:${C.ivory}; outline:none; transition:border-color .2s; }
  .ph-sb-search input:focus { border-color:${C.crimson}; }
  .ph-sb-search svg { position:absolute; left:12px; top:50%; transform:translateY(-50%); pointer-events:none; }

  .ph-pills { display:flex; flex-wrap:wrap; gap:8px; }
  .ph-pill { font-family:var(--font-accent); font-size:1rem; font-weight:700; letter-spacing:.07em; text-transform:uppercase; padding:8px 16px; border-radius:50px; cursor:pointer; border:1.5px solid rgba(0,0,0,.1); background:${C.white}; color:${C.muted}; transition:all .2s; }
  .ph-pill.active { background:${C.crimson}; border-color:${C.crimson}; color:${C.white}; box-shadow:0 4px 12px rgba(196,30,58,.28); }

  .ph-sort-btns { display:flex; flex-direction:column; gap:5px; }
  .ph-sort-btn { display:flex; align-items:center; justify-content:space-between; padding:10px 13px; border-radius:10px; border:none; cursor:pointer; font-family:var(--font-accent); font-size:1.17rem; font-weight:600; letter-spacing:.06em; background:transparent; color:${C.muted}; transition:all .2s; text-align:left; }
  .ph-sort-btn.active { background:rgba(26,23,20,.07); color:${C.dark}; font-weight:700; }
  .ph-sort-btn:hover:not(.active) { background:rgba(0,0,0,.04); }

  .ph-chips { display:flex; flex-wrap:wrap; gap:7px; margin-bottom:20px; }
  .ph-chip { display:inline-flex; align-items:center; gap:5px; padding:6px 13px; border-radius:50px; background:rgba(196,30,58,.09); border:1px solid rgba(196,30,58,.2); font-family:var(--font-accent); font-size:0.98rem; font-weight:700; letter-spacing:.07em; color:${C.crimson}; }
  .ph-chip button { background:none; border:none; cursor:pointer; color:${C.crimson}; font-size:1.2rem; line-height:1; padding:0 0 0 2px; }

  .ph-results-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:24px; flex-wrap:wrap; gap:10px; }
  .ph-count-text { font-family:var(--font-body); font-size:1rem; color:${C.muted}; }
  .ph-count-num  { font-family:var(--font-heading); font-size:1.65rem; font-weight:800; color:${C.dark}; margin-right:7px; }

  .ph-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:20px; }

  .ph-card { border-radius:20px; overflow:hidden; background:${C.white}; cursor:pointer; transition:box-shadow .35s; box-shadow:0 3px 18px rgba(0,0,0,.07); will-change:transform; display:flex; flex-direction:column; }
  .ph-card-img { position:relative; height:210px; overflow:hidden; flex-shrink:0; }
  .ph-card-img-bg { position:absolute; inset:0; background-size:cover; background-position:center; transition:transform .6s cubic-bezier(.23,1,.32,1); }
  .ph-card:hover .ph-card-img-bg { transform:scale(1.06); }
  .ph-card-img-grad { position:absolute; inset:0; background:linear-gradient(to top,rgba(20,14,10,.65) 0%,transparent 55%); }
  .ph-card-body { padding:18px 20px 16px; flex:1; display:flex; flex-direction:column; }

  .ph-cta { background:linear-gradient(135deg,#1A1714 60%,#2A1810); border-radius:24px; padding:clamp(26px,4vw,52px); display:flex; align-items:center; justify-content:space-between; gap:24px; flex-wrap:wrap; margin-top:56px; }
  .ph-cta-btn { display:inline-flex; align-items:center; gap:9px; background:linear-gradient(135deg,${C.darkRed},${C.crimson}); color:${C.white}; text-decoration:none; font-family:var(--font-accent); font-size:1.2rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase; padding:16px 34px; border-radius:50px; box-shadow:0 8px 28px rgba(196,30,58,.35); white-space:nowrap; flex-shrink:0; transition:transform .25s, box-shadow .25s; }
  .ph-cta-btn:hover { transform:translateY(-2px); box-shadow:0 14px 36px rgba(196,30,58,.5); }

  /* ── Mobile bar & FAB (hidden by default, shown in media queries) ── */
  .ph-mob-bar    { display:none !important; }
  .ph-filter-fab { display:none !important; }

  /* ── TABLET 768–1100 ── */
  @media screen and (max-width:1100px) {
    .ph-body { grid-template-columns:230px 1fr; gap:22px; padding:32px 24px 80px; }
    .ph-cat-strip { padding:0 24px clamp(24px,3vw,40px); }
    .ph-hero-content { padding:0 24px 32px; }
  }

  /* ── TABLET ≤900 ── */
  @media screen and (max-width:900px) {
    .ph-hero { min-height:80vh; min-height:80svh; }
    .ph-body { grid-template-columns:1fr !important; padding:16px 20px 80px; }
    .ph-sidebar { display:none !important; }
    .ph-filter-fab { display:flex !important; }
    .ph-mob-bar    { display:flex !important; }
    .ph-cat-card { height:82px; width:120px; }
    .ph-cat-card-icon { font-size:1.2rem; }
    .ph-cat-strip { padding:0 20px clamp(20px,3vw,36px); }
    .ph-hero-content { padding:0 20px 28px; }
    .ph-grid { grid-template-columns:repeat(2,1fr); gap:16px; }
  }

  /* ── MOBILE ≤639 ── */
  @media screen and (max-width:639px) {
    .ph-hero { min-height:100vh; min-height:100svh; }
    .ph-hero-content { padding:0 16px 22px; }
    .ph-title { font-size:clamp(2rem,9vw,2.6rem); letter-spacing:-.022em; }
    .ph-sub   { font-size:.08rem; margin-bottom:24px; }
    .ph-stats { gap:16px; margin-bottom:28px; }
    .ph-stat-num { font-size:1.5rem; }
    .ph-stat-lbl { font-size:0.92rem; }
    .ph-cat-strip { padding:0 16px clamp(18px,4vw,28px); }
    .ph-cat-row   { gap:8px; }
    .ph-cat-card  { height:76px; width:96px; border-radius:10px; }
    .ph-cat-card-lbl  { font-size:0.88rem; }
    .ph-cat-card-icon { font-size:1.2rem; margin-bottom:2px; }
    .ph-cat-card-badge { font-size:0.7rem; padding:1px 6px; }
    .ph-body { padding:14px 14px 72px !important; }
    .ph-grid { grid-template-columns:1fr !important; gap:13px; }
    .ph-results-header { margin-bottom:16px; }
    .ph-count-text { font-size:.04rem; }
    .ph-count-num { font-size:1.45rem; }
    .ph-cta { flex-direction:column; border-radius:18px; padding:24px 20px; margin-top:40px; }
    .ph-cta-btn { width:100%; justify-content:center; padding:14px 22px; font-size:1.16rem; }
    .ph-card-img { height:195px; }
    .ph-sort-btn { font-size:1.16rem; }
    .ph-pill { font-size:1rem; padding:8px 15px; }
  }

  /* ── VERY SMALL ≤380 ── */
  @media screen and (max-width:380px) {
    .ph-cat-card  { height:62px; width:80px; }
    .ph-cat-card-lbl  { font-size:0.7rem; }
    .ph-cat-card-icon { font-size:.02rem; }
    .ph-title { font-size:1.85rem; }
    .ph-sub { font-size:.04rem; }
  }
`;

/* ── PackageCard ────────────────────────────────────────── */
function PackageCard({ pkg, delay }: { pkg: typeof packages[0]; delay: number }) {
  const router  = useRouter();
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [vis,     setVis]     = useState(false);
  const [hovered, setHovered] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const el = wrapRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: .04 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current; if (!el) return;
    const r  = el.getBoundingClientRect();
    const x  = ((e.clientX - r.left) / r.width  - .5) * 10;
    const y  = ((e.clientY - r.top)  / r.height - .5) * -7;
    el.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateZ(6px)`;
  };
  const onLeave = () => {
    const el = cardRef.current; if (!el) return;
    el.style.transition = 'transform .6s cubic-bezier(.23,1,.32,1)';
    el.style.transform  = 'none';
    setTimeout(() => { if (el) el.style.transition = 'transform .08s linear'; }, 600);
  };

  return (
    <div ref={wrapRef} style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(28px)', transition: `opacity .55s ease ${delay}ms, transform .55s cubic-bezier(.23,1,.32,1) ${delay}ms` }}>
      {exiting && (
          <div style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              background: '#ffffff',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '32px',
              animation: 'pkgFadeIn 0.3s ease forwards',
              pointerEvents: 'none'
          }}>
              <div style={{ position: 'relative', width: 80, height: 80 }}>
                  <div style={{ position: 'absolute', inset: 0, border: '2px solid rgba(192, 57, 43, 0.1)', borderTopColor: '#C0392B', borderRadius: '50%', animation: 'tpSpinOuter 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite' }} />
                  <div style={{ position: 'absolute', inset: 12, border: '2px solid rgba(212, 132, 42, 0.1)', borderBottomColor: '#D4842A', borderRadius: '50%', animation: 'tpSpinInner 2s linear infinite reverse' }} />
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 10, height: 10, borderRadius: '50%', background: '#C0392B', boxShadow: '0 0 12px rgba(192, 57, 43, 0.4)', animation: 'tpPulse 1.5s ease-in-out infinite' }} />
              </div>
              <div style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: '0.87rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#666', fontWeight: 600, margin: 0 }}>
                      Curating Journey...
                  </p>
              </div>
              <style>{`
                  @keyframes tpSpinOuter { to { transform: rotate(360deg); } }
                  @keyframes tpSpinInner { to { transform: rotate(360deg); } }
                  @keyframes tpPulse { 0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); } 50% { opacity: 1; transform: translate(-50%, -50%) scale(1.3); } }
              `}</style>
          </div>
      )}
      <div ref={cardRef} className="ph-card"
        onClick={() => { setExiting(true); setTimeout(() => router.push(`/tours/${pkg.id}`), 800); }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); onLeave(); }}
        onMouseMove={onMove}
        style={{ boxShadow: hovered ? `0 24px 56px rgba(0,0,0,.14), 0 0 0 2px ${pkg.accent}55` : '0 3px 18px rgba(0,0,0,.07)' }}
      >
        {/* Image */}
        <div className="ph-card-img">
          <div className="ph-card-img-bg" style={{ backgroundImage:`url(${pkg.heroImage})` }} />
          <div className="ph-card-img-grad" />
          {/* Badge */}
          <div style={{ position:'absolute', top:12, left:12, background:pkg.badgeColor, color:'#fff', fontFamily:'var(--font-accent)', fontSize:'0.88rem', fontWeight:800, letterSpacing:'.09em', textTransform:'uppercase', padding:'5px 13px', borderRadius:50, boxShadow:`0 3px 10px ${pkg.badgeColor}55` }}>{pkg.badge}</div>
          {/* Rating */}
          <div style={{ position:'absolute', top:12, right:12, background:'rgba(0,0,0,.52)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,.14)', borderRadius:50, padding:'4px 11px', fontFamily:'var(--font-accent)', fontSize:'1.12rem', color:C.gold, fontWeight:700, display:'flex', alignItems:'center', gap:5 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill={C.gold}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            {pkg.rating}
          </div>
          {/* Price */}
          <div style={{ position:'absolute', bottom:12, right:12, background:'rgba(255,255,255,.96)', borderRadius:10, padding:'6px 14px' }}>
            <span style={{ fontFamily:'var(--font-accent)', fontSize:'0.9rem', fontWeight:700, color:C.muted, textTransform:'uppercase' }}>From </span>
            <span style={{ fontFamily:'var(--font-heading)', fontSize:'1.22rem', fontWeight:800, color:C.dark }}>${pkg.price.toLocaleString()}</span>
          </div>
          {/* Difficulty */}
          <div style={{ position:'absolute', bottom:12, left:12, background:'rgba(0,0,0,.48)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,.16)', borderRadius:50, padding:'4px 12px', fontFamily:'var(--font-accent)', fontSize:'0.84rem', fontWeight:600, color:'rgba(255,255,255,.88)', textTransform:'uppercase', letterSpacing:'.07em' }}>{pkg.difficulty}</div>
        </div>
        {/* Body */}
        <div className="ph-card-body">
          <div style={{ fontFamily:'var(--font-accent)', fontSize:'0.86rem', fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:pkg.accent, marginBottom:5 }}>{pkg.subtitle}</div>
          <h3 style={{ fontFamily:'var(--font-heading)', fontSize:'1.35rem', fontWeight:800, color:C.dark, margin:'0 0 11px', letterSpacing:'-.01em' }}>{pkg.title}</h3>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap', marginBottom:11 }}>
            {[{ i:'🕐', t:pkg.duration },{ i:'👥', t:pkg.group }].map(m => (
              <span key={m.t} style={{ display:'flex', alignItems:'center', gap:5, fontFamily:'var(--font-body)', fontSize:'1rem', color:C.muted }}>{m.i} {m.t}</span>
            ))}
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:5, marginBottom:15 }}>
            {pkg.highlights.slice(0,3).map(h => (
              <div key={h} style={{ display:'flex', alignItems:'flex-start', gap:8 }}>
                <div style={{ width:5, height:5, borderRadius:'50%', background:pkg.accent, flexShrink:0, marginTop:6 }} />
                <span style={{ fontFamily:'var(--font-body)', fontSize:'0.99rem', color:C.muted, lineHeight:1.55 }}>{h}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop:'auto', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <span style={{ fontFamily:'var(--font-body)', fontSize:'0.98rem', color:C.muted }}>{pkg.reviews} reviews</span>
            <span style={{ background: hovered ? pkg.accent : 'transparent', border:`2px solid ${pkg.accent}`, color: hovered ? C.white : pkg.accent, fontFamily:'var(--font-accent)', fontSize:'0.9rem', fontWeight:800, letterSpacing:'.09em', textTransform:'uppercase', padding:'9px 18px', borderRadius:50, display:'inline-flex', alignItems:'center', gap:6, transition:'background .25s, color .25s' }}>
              View
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── AnimatedCounter ─────────────────────────────────────── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let start: number;
      const step = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / 1400, 1);
        setVal(Math.floor(p * p * to));
        if (p < 1) requestAnimationFrame(step);
        else setVal(to);
      };
      requestAnimationFrame(step);
    }, { threshold: .4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ── Main ───────────────────────────────────────────────── */
export default function PackagesPage() {
  const [category,   setCategory]   = useState('all');
  const [difficulty, setDifficulty] = useState('All');
  const [sortBy,     setSortBy]     = useState('default');
  const [search,     setSearch]     = useState('');
  const [drawer,     setDrawer]     = useState(false);
  const [heroBg,     setHeroBg]     = useState(CATS[0].img);

  /* Lock body scroll while drawer open */
  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawer]);

  /* Update hero bg when category changes */
  useEffect(() => {
    const cat = CATS.find(c => c.key === category);
    if (cat) setHeroBg(cat.img);
  }, [category]);

  /* Filtering */
  const filtered = packages
    .filter(p => category === 'all' || p.category === category)
    .filter(p => difficulty === 'All' || p.difficulty.toLowerCase() === difficulty.toLowerCase())
    .filter(p => {
      const q = search.trim().toLowerCase();
      if (!q) return true;
      return p.title.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q) || p.highlights.some(h => h.toLowerCase().includes(q));
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc')  return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating')     return b.rating - a.rating;
      if (sortBy === 'duration')   return a.days - b.days;
      return 0;
    });

  const hasFilters = !!(search || difficulty !== 'All' || category !== 'all');
  const clearAll   = useCallback(() => { setSearch(''); setDifficulty('All'); setCategory('all'); setSortBy('default'); setDrawer(false); }, []);

  /* active chips */
  const chips: { label: string; clear: () => void }[] = [];
  if (category   !== 'all') chips.push({ label: CATS.find(c=>c.key===category)?.label ?? '', clear: () => setCategory('all') });
  if (difficulty !== 'All') chips.push({ label: difficulty, clear: () => setDifficulty('All') });
  if (search)               chips.push({ label: `"${search}"`,  clear: () => setSearch('') });

  /* Sidebar content reusable */
  const SidebarContent = ({ onClose }: { onClose?: () => void }) => (
    <>
      {/* Search */}
      <div className="ph-sb-search">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text" placeholder="Search packages…" value={search}
          onChange={e => setSearch(e.target.value)}
          autoFocus={!!onClose}
        />
      </div>

      {/* Difficulty */}
      <p className="ph-section-lbl">Difficulty</p>
      <div className="ph-pills" style={{ marginBottom:18 }}>
        {DIFFS.map(d => (
          <button key={d} className={`ph-pill${difficulty===d?' active':''}`} onClick={() => setDifficulty(d)}>{d}</button>
        ))}
      </div>

      {/* Sort */}
      <div className="ph-sep" />
      <p className="ph-section-lbl">Sort By</p>
      <div className="ph-sort-btns">
        {SORTS.map(s => (
          <button key={s.key} className={`ph-sort-btn${sortBy===s.key?' active':''}`} onClick={() => setSortBy(s.key)}>
            {s.label}
            {sortBy===s.key && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.crimson} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            )}
          </button>
        ))}
      </div>

      {onClose && (
        <>
          <div className="ph-sep"/>
          <button onClick={onClose} style={{ width:'100%', padding:'13px', background:`linear-gradient(135deg,${C.darkRed},${C.crimson})`, color:C.white, border:'none', borderRadius:50, fontFamily:'var(--font-accent)', fontSize:'0.92rem', fontWeight:800, letterSpacing:'.12em', textTransform:'uppercase', cursor:'pointer', boxShadow:'0 6px 20px rgba(196,30,58,.3)' }}>
            Show {filtered.length} Package{filtered.length!==1?'s':''}
          </button>
        </>
      )}
    </>
  );

  return (
    <>
      <style>{CSS}</style>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="ph-hero">
        <div className="ph-hero-bg" style={{ backgroundImage:`url(${heroBg})` }} />
        <div className="ph-hero-overlay" />

        {/* Decorative dots */}
        <div style={{ position:'absolute', top:'18%', right:'8%', width:180, height:180, borderRadius:'50%', border:'1px solid rgba(201,169,110,.12)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'22%', right:'9.5%', width:100, height:100, borderRadius:'50%', border:'1px solid rgba(201,169,110,.18)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'22%', left:'4%', width:120, height:120, borderRadius:'50%', border:'1px solid rgba(255,255,255,.06)', pointerEvents:'none' }} />

        <div className="ph-hero-content">
          {/* Eyebrow */}
          <div className="ph-eyebrow">
            <div className="ph-eyebrow-line" />
            <span className="ph-eyebrow-text">Curated Sri Lanka Journeys</span>
          </div>

          {/* Title */}
          <h1 className="ph-title">
            Find Your<br/>
            <span>Perfect Journey</span>
          </h1>

          {/* Subtitle */}
          <p className="ph-sub">
            From ancient temple trails to leopard safaris, moonlit beach villas and highland tea estates — every package is crafted by experts who live and breathe Sri Lanka.
          </p>

          {/* Stats */}
          <div className="ph-stats">
            {[
              { to:50, suffix:'+', label:'Curated Packages' },
              { to:15, suffix:'+', label:'Years Experience' },
              { to:5000, suffix:'+', label:'Happy Travellers' },
              { to:98, suffix:'%', label:'Satisfaction Rate' },
            ].map(s => (
              <div key={s.label}>
                <div className="ph-stat-num"><Counter to={s.to} suffix={s.suffix}/></div>
                <div className="ph-stat-lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Category cards strip (overlaps bottom of hero) */}
        <div className="ph-cat-strip" style={{ paddingBottom: 'clamp(28px,4vw,52px)' }}>
          <div className="ph-cat-row">
            {CATS.map((cat, i) => {
              const count = cat.key === 'all' ? packages.length : packages.filter(p => p.category === cat.key).length;
              const active = category === cat.key;
              return (
                <div key={cat.key} className={`ph-cat-card${active?' active':''}`}
                  onClick={() => setCategory(cat.key)}
                  style={{ animationDelay: `${i*80}ms` }}
                >
                  <div className="ph-cat-card-bg" style={{ backgroundImage:`url(${cat.img})` }} />
                  <div className="ph-cat-card-overlay" />
                  {active && <div style={{ position:'absolute', inset:0, background: `${cat.color}44`, borderRadius:12 }} />}
                  <div className="ph-cat-card-body">
                    <div className="ph-cat-card-icon">{cat.icon}</div>
                    <div className="ph-cat-card-lbl">{cat.label}</div>
                  </div>
                  <div className="ph-cat-card-badge">{count}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BODY: Sidebar + Results
      ══════════════════════════════════════ */}
      <div style={{ background: C.ivory }}>

        {/* Mobile top bar — shown/hidden purely via CSS media query */}
        <div className="ph-mob-bar" style={{ background:C.white, borderBottom:'1px solid rgba(0,0,0,.08)', padding:'10px 16px', gap:10, position:'sticky', top:0, zIndex:90, boxShadow:'0 2px 16px rgba(0,0,0,.06)', alignItems:'center' }}>
          <div style={{ position:'relative', flex:1 }}>
            <svg style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" placeholder="Search packages…" value={search} onChange={e => setSearch(e.target.value)}
              style={{ width:'100%', padding:'9px 12px 9px 33px', border:'1.5px solid rgba(0,0,0,.1)', borderRadius:50, fontFamily:'var(--font-body)', fontSize:'0.96rem', color:C.dark, background:C.ivory, outline:'none', boxSizing:'border-box' }} />
          </div>
          {/* ph-filter-fab: CSS controls display – no inline display style here */}
          <button className="ph-filter-fab" onClick={() => setDrawer(true)} style={{
            alignItems:'center', gap:6, padding:'9px 16px', borderRadius:50, border:'none', cursor:'pointer', flexShrink:0,
            background: hasFilters ? C.crimson : C.dark, color:C.white,
            fontFamily:'var(--font-accent)', fontSize:'0.84rem', fontWeight:700, letterSpacing:'.09em', textTransform:'uppercase',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
            Filters{hasFilters?' ●':''}
          </button>
        </div>

        <div className="ph-body">

          {/* ── Desktop Sidebar ── */}
          <aside className="ph-sidebar">
            <div className="ph-sidebar-card">
              <div className="ph-sidebar-title">
                Filters
                {hasFilters && <button className="ph-sidebar-clear" onClick={clearAll}>Clear all</button>}
              </div>
              <SidebarContent />
            </div>
          </aside>

          {/* ── Results ── */}
          <div>
            {/* Active chips */}
            {chips.length > 0 && (
              <div className="ph-chips">
                {chips.map(chip => (
                  <span key={chip.label} className="ph-chip">
                    {chip.label}
                    <button onClick={chip.clear} aria-label="Remove filter">✕</button>
                  </span>
                ))}
                {chips.length > 1 && (
                  <button onClick={clearAll} style={{ fontFamily:'var(--font-accent)', fontSize:'0.77rem', fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', padding:'5px 11px', borderRadius:50, cursor:'pointer', border:`1.5px solid rgba(196,30,58,.3)`, background:'transparent', color:C.crimson }}>
                    Clear all
                  </button>
                )}
              </div>
            )}

            {/* Count + Sort info */}
            <div className="ph-results-header">
              <div>
                <span className="ph-count-num">{filtered.length}</span>
                <span className="ph-count-text">{filtered.length === 1 ? 'package' : 'packages'}{category !== 'all' ? ` · ${CATS.find(c=>c.key===category)?.label}` : ''}</span>
              </div>
              {sortBy !== 'default' && (
                <span style={{ fontFamily:'var(--font-accent)', fontSize:'0.8rem', fontWeight:600, color:C.muted, letterSpacing:'.06em' }}>
                  Sorted by: {SORTS.find(s=>s.key===sortBy)?.label}
                </span>
              )}
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="ph-grid">
                {filtered.map((pkg, i) => <PackageCard key={pkg.id} pkg={pkg} delay={i * 50} />)}
              </div>
            ) : (
              <div style={{ textAlign:'center', padding:'80px 16px', background:C.white, borderRadius:20, boxShadow:'0 3px 18px rgba(0,0,0,.06)' }}>
                <div style={{ fontSize:'3.5rem', marginBottom:16 }}>🔍</div>
                <h3 style={{ fontFamily:'var(--font-heading)', fontSize:'1.4rem', fontWeight:700, color:C.dark, margin:'0 0 10px' }}>No packages found</h3>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'1.12rem', color:C.muted, marginBottom:24 }}>Try adjusting your filters.</p>
                <button onClick={clearAll} style={{ background:`linear-gradient(135deg,${C.darkRed},${C.crimson})`, color:C.white, border:'none', cursor:'pointer', fontFamily:'var(--font-accent)', fontSize:'0.9rem', fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', padding:'13px 28px', borderRadius:50, boxShadow:'0 6px 20px rgba(196,30,58,.28)' }}>
                  Show All Packages
                </button>
              </div>
            )}

            {/* Bottom CTA */}
            <div className="ph-cta">
              <div>
                <div style={{ fontFamily:'var(--font-accent)', fontSize:'0.76rem', fontWeight:700, letterSpacing:'.22em', textTransform:'uppercase', color:C.gold, marginBottom:8 }}>Can&apos;t find what you need?</div>
                <h3 style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(1.35rem,2.5vw,1.9rem)', fontWeight:800, color:C.white, margin:'0 0 8px', letterSpacing:'-.02em' }}>
                  Build Your Own <span style={{ background:`linear-gradient(90deg,${C.gold},#E8C990)`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Custom Journey</span>
                </h3>
                <p style={{ fontFamily:'var(--font-body)', fontSize:'1.12rem', color:'rgba(255,255,255,.58)', margin:0, lineHeight:1.7 }}>
                  Fully bespoke itineraries tailored to your dates, interests and budget.
                </p>
              </div>
              <a href="/#contact" className="ph-cta-btn">
                Request Custom Tour
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile Filter Drawer ── */}
      {drawer && (
        <div style={{ position:'fixed', inset:0, zIndex:400 }}>
          <div onClick={() => setDrawer(false)} style={{ position:'absolute', inset:0, background:'rgba(0,0,0,.55)', backdropFilter:'blur(4px)' }} />
          <div onClick={e => e.stopPropagation()} style={{ position:'absolute', bottom:0, left:0, right:0, background:C.white, borderRadius:'22px 22px 0 0', padding:'20px 20px 40px', animation:'slideUp .28s cubic-bezier(.2,.8,.2,1)', boxShadow:'0 -8px 40px rgba(0,0,0,.15)', maxHeight:'85svh', overflowY:'auto' }}>
            <div style={{ width:36, height:4, borderRadius:2, background:'rgba(0,0,0,.13)', margin:'0 auto 20px' }} />
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:22 }}>
              <span style={{ fontFamily:'var(--font-heading)', fontSize:'1.3rem', fontWeight:800, color:C.dark }}>Filters</span>
              {hasFilters && <button onClick={clearAll} style={{ fontFamily:'var(--font-accent)', fontSize:'0.82rem', fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:C.crimson, background:'none', border:'none', cursor:'pointer' }}>Clear All</button>}
            </div>
            <SidebarContent onClose={() => setDrawer(false)} />
          </div>
        </div>
      )}

    </>
  );
}

