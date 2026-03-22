'use client';

import { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPackageById } from '../../data/packages';
import RouteTimeline from './RouteTimeline';
import SriLankaMap from './SriLankaMap';
import FaqSection from './FaqSection';
import styles from './page.module.css';

const dark = '#1A1714';
const gold = '#C9A96E';
const cream = '#F8F5F0';
const muted = '#8A8074';

/* ── icons ── */
const Check = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
);
const XIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
);
const ArrowLeft = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
);

/* ── useReveal ── */
function useReveal() {
    const ref = useRef<HTMLDivElement>(null);
    const [vis, setVis] = useState(false);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.06 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return { ref, vis };
}

/* ── useWindowWidth ── */
function useWindowWidth() {
    const [w, setW] = useState(0);
    useEffect(() => {
        const update = () => setW(window.innerWidth);
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);
    return w;
}

/* ═══════════════════════════════════════════════════════════════ */
export default function TourDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;
    const pkg = getPackageById(id);

    const ww = useWindowWidth();
    const isMobile = ww > 0 && ww <= 768;
    const isTablet = ww > 0 && ww <= 1024;
    const isSmall = ww > 0 && ww <= 480;

    const [coverOpacity, setCoverOpacity] = useState(1);
    const [exiting, setExiting] = useState(false);
    const exitTarget = useRef('');
    const heroBgRef = useRef<HTMLDivElement>(null);
    const mobileBarRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const rafId = useRef<number | null>(null);
    const mouseRaf = useRef<number | null>(null);
    const lastScrollY = useRef(0);
    const mouseX = useRef(0.5);
    const mouseY = useRef(0.5);
    const [guests, setGuests] = useState(2);
    const [selectedHeroImg, setSelectedHeroImg] = useState<string | null>(null);

    const { ref: overviewRef, vis: overviewVis } = useReveal();
    const { ref: highlightRef, vis: highlightVis } = useReveal();
    const { ref: mapRef, vis: mapVis } = useReveal();
    const { ref: inclRef, vis: inclVis } = useReveal();

    useLayoutEffect(() => {
        if (typeof window === 'undefined') return;
        history.scrollRestoration = 'manual';
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, []);

    useEffect(() => {
        document.body.style.overflow = (coverOpacity > 0 || exiting) ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [coverOpacity, exiting]);

    useEffect(() => {
        const t = setTimeout(() => setCoverOpacity(0), 60);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        if (!exiting) return;
        const t = setTimeout(() => { history.scrollRestoration = 'auto'; router.push(exitTarget.current); }, 350);
        return () => clearTimeout(t);
    }, [exiting, router]);

    const navigate = useCallback((href: string) => { exitTarget.current = href; setExiting(true); }, []);

    useEffect(() => {
        const update = () => {
            const sy = window.scrollY;
            if (heroBgRef.current) {
                const tx = (mouseX.current - 0.5) * -16;
                const ty = (mouseY.current - 0.5) * -8;
                heroBgRef.current.style.transform = `translateY(${sy * 0.28}px) translate(${tx}px,${ty}px)`;
            }
            if (mobileBarRef.current) {
                mobileBarRef.current.style.transform = sy > 400 ? 'translateY(0)' : 'translateY(100%)';
            }
            lastScrollY.current = sy;
            rafId.current = null;
        };
        const onScroll = () => { if (rafId.current === null) rafId.current = requestAnimationFrame(update); };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => { window.removeEventListener('scroll', onScroll); if (rafId.current !== null) cancelAnimationFrame(rafId.current); };
    }, []);

    const onHeroMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = heroRef.current?.getBoundingClientRect(); if (!rect) return;
        mouseX.current = (e.clientX - rect.left) / rect.width;
        mouseY.current = (e.clientY - rect.top) / rect.height;
        if (mouseRaf.current === null) {
            mouseRaf.current = requestAnimationFrame(() => {
                if (heroBgRef.current) {
                    heroBgRef.current.style.transform = `translateY(${lastScrollY.current * 0.28}px) translate(${(mouseX.current - 0.5) * -16}px,${(mouseY.current - 0.5) * -8}px)`;
                }
                mouseRaf.current = null;
            });
        }
    }, []);

    /* ── responsive values (JS, not CSS) ── */
    const px = isMobile ? 20 : 56;
    const bodyPaddingT = isMobile ? 36 : 72;
    const bodyPaddingB = isMobile ? 108 : 120;
    const heroH = isMobile ? '72vh' : '88vh';
    const heroMinH = isMobile ? '440px' : '520px';
    const heroBottom = isMobile ? 24 : 72;
    const gridCols = isTablet ? '1fr' : '1fr 340px';
    const gridGap = isTablet ? 40 : 64;
    const factsGrid = isSmall ? 'repeat(2,1fr)' : 'repeat(3,1fr)';
    const inclCols = (ww > 0 && ww <= 560) ? '1fr' : '1fr 1fr';
    const hlCols = (ww > 0 && ww <= 560) ? '1fr' : 'repeat(auto-fill,minmax(240px,1fr))';
    const titleSize = isMobile ? 'clamp(1.65rem,7.5vw,2.5rem)' : 'clamp(2rem,6vw,5.5rem)';

    if (!pkg) {
        return (
            <>
                <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: cream, padding: 24 }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', fontWeight: 800, color: dark, marginBottom: 16 }}>404</div>
                        <p style={{ fontFamily: 'var(--font-body)', color: muted, marginBottom: 24 }}>Tour package not found.</p>
                        <button onClick={() => navigate('/')} style={{ background: dark, color: 'white', padding: '12px 28px', borderRadius: 50, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-accent)', fontSize: '0.84rem', letterSpacing: '.1em', textTransform: 'uppercase' }}>← Back</button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div style={{ width: '100%', maxWidth: '100vw', position: 'relative', boxSizing: 'border-box' }}>

                {/* cover */}
                <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: dark, opacity: exiting ? 1 : coverOpacity, pointerEvents: (coverOpacity > 0 || exiting) ? 'all' : 'none', transition: exiting ? 'opacity .32s ease' : 'opacity .5s ease' }} />

                {/* ══ HERO ══ */}
                <div ref={heroRef} onMouseMove={onHeroMouse} style={{ position: 'relative', height: heroH, minHeight: heroMinH, overflow: 'hidden', width: '100%', boxSizing: 'border-box' }}>
                    <div ref={heroBgRef} style={{ position: 'absolute', top: '-18%', bottom: '-18%', left: 0, right: 0, willChange: 'transform' }}>
                        {Array.from(new Set([pkg.heroImage, ...pkg.galleryImages])).map((img: string, i: number) => (
                            <div key={i} style={{
                                position: 'absolute', inset: 0,
                                backgroundImage: `url(${img})`,
                                backgroundSize: 'cover', backgroundPosition: 'center',
                                opacity: (selectedHeroImg || pkg.heroImage) === img ? 1 : 0,
                                transition: 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                                willChange: 'opacity'
                            }} />
                        ))}
                    </div>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(10,8,6,.28) 0%,rgba(10,8,6,.66) 58%,rgba(10,8,6,.94) 100%)' }} />
                    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg,${pkg.accent}20 0%,transparent 55%)` }} />
                    <div style={{ position: 'absolute', top: '28%', right: '8%', width: 130, height: 130, borderRadius: '50%', border: `1px solid ${pkg.accent}44`, animation: 'tdRipple 4.5s ease-out infinite', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', top: '28%', right: '8%', width: 130, height: 130, borderRadius: '50%', border: `1px solid ${pkg.accent}28`, animation: 'tdRipple 4.5s ease-out 1.8s infinite', pointerEvents: 'none' }} />


                    <div style={{ position: 'absolute', bottom: heroBottom, left: 0, right: 0, maxWidth: 1440, margin: '0 auto', paddingLeft: isMobile ? 20 : 56, paddingRight: isMobile ? 20 : 56, boxSizing: 'border-box', zIndex: 3 }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: `${pkg.badgeColor}22`, border: `1px solid ${pkg.badgeColor}55`, backdropFilter: 'blur(8px)', borderRadius: 50, padding: '5px 14px', marginBottom: 14, animation: 'tdFadeUp .7s ease both' }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: pkg.badgeColor, animation: 'tdPulse 2s ease-in-out infinite' }} />
                            <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: pkg.badgeColor }}>{pkg.badge}</span>
                        </div>
                        <div style={{ fontFamily: 'var(--font-accent)', fontSize: 'clamp(.58rem,1.5vw,.72rem)', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: gold, marginBottom: 10, animation: 'tdFadeUp .7s ease .1s both' }}>{pkg.subtitle}</div>
                        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, color: 'white', fontSize: titleSize, margin: '0 0 14px', lineHeight: 1.05, letterSpacing: '-.03em', maxWidth: isMobile ? '100%' : 700, animation: 'tdFadeUp .8s ease .15s both' }}>
                            {pkg.title}<br />
                            <span style={{ background: `linear-gradient(90deg,${gold},#E8C990,${gold})`, backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'tdShimmer 4s linear infinite' }}>
                                {pkg.tagline.split(' ').slice(0, 3).join(' ')}
                            </span>
                        </h1>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20, animation: 'tdFadeUp .8s ease .22s both' }}>
                            {[{ icon: '🕐', text: pkg.duration }, { icon: '👥', text: pkg.group }, { icon: '⚡', text: pkg.difficulty }, { icon: '📍', text: pkg.bestTime }].map(m => (
                                <div key={m.text} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.16)', borderRadius: 50, padding: '6px 13px', fontFamily: 'var(--font-body)', fontSize: 'clamp(.68rem,2vw,.8rem)', color: 'rgba(255,255,255,.9)' }}>
                                    <span>{m.icon}</span>{m.text}
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: isMobile ? 12 : 20, animation: 'tdFadeUp .8s ease .32s both' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                                {[1, 2, 3, 4, 5].map(i => (
                                    <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill={i <= Math.floor(pkg.rating) ? gold : 'rgba(255,255,255,.2)'}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                ))}
                                <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.86rem', color: 'white', fontWeight: 700 }}>{pkg.rating}</span>
                                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.84rem', color: 'rgba(255,255,255,.5)' }}>({pkg.reviews} reviews)</span>
                            </div>
                            <div>
                                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'rgba(255,255,255,.45)', textTransform: 'uppercase', letterSpacing: '.1em' }}>From </span>
                                <span style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '1.65rem' : '2.2rem', fontWeight: 900, color: 'white', letterSpacing: '-.02em' }}>${pkg.price.toLocaleString()}</span>
                                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.84rem', color: 'rgba(255,255,255,.45)', marginLeft: 5 }}>{pkg.priceLabel}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ══ GALLERY STRIP ══ */}
                <div style={{ width: '100%', background: dark, boxSizing: 'border-box' }}>
                    <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '0 16px 16px' : '0', boxSizing: 'border-box' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1fr', gap: 3, height: isMobile ? '190px' : '340px', ...(isMobile ? { borderRadius: 12, overflow: 'hidden' } : {}) }}>
                            {pkg.galleryImages.slice(0, 3).map((img: string, i: number) => {
                                const isActive = (selectedHeroImg || pkg.heroImage) === img || (!selectedHeroImg && i === 0 && pkg.heroImage === img) || (selectedHeroImg === img);
                                return (
                                    <div
                                        key={i}
                                        onClick={() => setSelectedHeroImg(img)}
                                        style={{
                                            position: 'relative', overflow: 'hidden', cursor: 'pointer',
                                            outline: isActive ? `2px solid ${pkg.accent}` : '2px solid transparent',
                                            outlineOffset: '-2px',
                                            ...(isMobile && i > 0 ? { display: 'none' } : {})
                                        }}
                                    >
                                        <div
                                            style={{ position: 'absolute', inset: 0, backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform .5s cubic-bezier(.23,1,.32,1)' }}
                                            onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.transform = 'scale(1.07)')}
                                            onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.transform = 'scale(1)')}
                                        />
                                        {/* Active indicator */}
                                        {isActive && <div style={{ position: 'absolute', bottom: 8, right: 8, width: 8, height: 8, borderRadius: '50%', background: pkg.accent, boxShadow: `0 0 8px ${pkg.accent}` }} />}
                                        {/* Hover hint */}
                                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)', transition: 'background .3s' }}
                                            onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = 'rgba(0,0,0,0.12)')}
                                            onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = 'rgba(0,0,0,0)')}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ══ MODERN INTRO (from adventure-package layout) ══ */}
                <div style={{ background: dark, width: '100%', boxSizing: 'border-box' }}>
                    <div style={{
                        maxWidth: 1440, margin: '0 auto', paddingLeft: px, paddingRight: px, paddingTop: isMobile ? 40 : 64, paddingBottom: isMobile ? 40 : 64, boxSizing: 'border-box',
                        display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 28 : 64, alignItems: 'center'
                    }}>
                        {/* left: identity column */}
                        <div>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: `${pkg.accent}22`, border: `1px solid ${pkg.accent}44`, borderRadius: 50, padding: '5px 14px', marginBottom: 16 }}>
                                <div style={{ width: 5, height: 5, borderRadius: '50%', background: pkg.accent, animation: 'tdPulse 2s ease-in-out infinite' }} />
                                <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: pkg.accent }}>{pkg.category.toUpperCase()} • SRI LANKA</span>
                            </div>
                            <p style={{ fontFamily: 'var(--font-accent)', fontSize: isMobile ? '.7rem' : '.82rem', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: gold, marginBottom: 10 }}>{pkg.subtitle}</p>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '2.2rem' : 'clamp(2.4rem,5vw,4rem)', fontWeight: 900, color: 'white', margin: '0 0 20px', letterSpacing: '-.03em', lineHeight: 1.05 }}>
                                {pkg.title.split(' ').map((w, i) => i === 0 ? w : <span key={i}><br /><span style={{ background: `linear-gradient(90deg,${gold},#E8C990)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{w}</span></span>)}
                            </h2>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <div style={{ width: 6, height: 6, borderRadius: '50%', background: pkg.accent, animation: 'tdPulse 2s ease-in-out infinite' }} />
                                <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)' }}>
                                    {pkg.duration}
                                </span>
                            </div>
                        </div>
                        {/* right: description column */}
                        <div>
                            <p style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '1.1rem' : '1.3rem', fontWeight: 600, color: 'rgba(255,255,255,.75)', lineHeight: 1.5, margin: '0 0 22px', fontStyle: 'italic' }}>
                                {pkg.tagline}
                            </p>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: isMobile ? '.85rem' : '.95rem', color: 'rgba(255,255,255,.45)', lineHeight: 1.85, margin: '0 0 28px' }}>
                                {pkg.overview.slice(0, 240)}…
                            </p>
                            <a href="/#contact" onClick={(e) => { e.preventDefault(); navigate(`/?package=${encodeURIComponent(`${pkg.title} – ${pkg.days} Days`)}&guests=${guests}#contact`); }} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: `linear-gradient(135deg,${pkg.accent},${pkg.accent}BB)`, color: 'white', textDecoration: 'none', fontFamily: 'var(--font-accent)', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', padding: '14px 26px', borderRadius: 50, boxShadow: `0 6px 22px ${pkg.accent}55` }}>
                                INQUIRE NOW
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* ══ BODY (cream background) — unified sticky-card layout ══ */}
                {(() => {
                    // ─── refs & state for the "card dives under timeline" effect ───
                    // We hoist these into an IIFE-rendered component trick via inner component
                    return <BodySection pkg={pkg} isMobile={isMobile} isTablet={isTablet}
                        px={px} bodyPaddingT={bodyPaddingT} bodyPaddingB={bodyPaddingB}
                        gridCols={gridCols} gridGap={gridGap}
                        factsGrid={factsGrid} hlCols={hlCols} inclCols={inclCols}
                        overviewRef={overviewRef} overviewVis={overviewVis}
                        highlightRef={highlightRef} highlightVis={highlightVis}
                        mapRef={mapRef} mapVis={mapVis}
                        inclRef={inclRef} inclVis={inclVis}
                        guests={guests} setGuests={setGuests}
                        accent={pkg.accent} cream={cream} dark={dark} muted={muted} gold={gold}
                        navigate={navigate}
                    />;
                })()}

                {/* ══ MOBILE BOOKING BAR ══ */}
                {isTablet && (
                    <div ref={mobileBarRef} style={{
                        display: 'flex', position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
                        background: dark,
                        padding: '12px 20px env(safe-area-inset-bottom,12px)',
                        alignItems: 'center', justifyContent: 'space-between', gap: 12,
                        transform: 'translateY(100%)',
                        transition: 'transform .4s cubic-bezier(.23,1,.32,1)',
                        boxShadow: '0 -6px 40px rgba(0,0,0,.3)',
                        flexWrap: 'wrap',
                    }}>
                        {/* left: price summary */}
                        <div style={{ minWidth: 0 }}>
                            <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.66rem', color: 'rgba(255,255,255,.45)', textTransform: 'uppercase', letterSpacing: '.1em' }}>From per person</div>
                            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', fontWeight: 900, color: 'white', letterSpacing: '-.01em' }}>${pkg.price.toLocaleString()}</div>
                        </div>
                        {/* right: two buttons */}
                        <div style={{ display: 'flex', gap: 10, flexShrink: 0, flexWrap: 'wrap' }}>
                            <a href="/#contact" onClick={(e) => { e.preventDefault(); navigate(`/?package=${encodeURIComponent(`${pkg.title} – ${pkg.days} Days`)}&guests=${guests}#contact`); }} style={{ background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.18)', color: 'white', textDecoration: 'none', fontFamily: 'var(--font-accent)', fontSize: '0.74rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', padding: '11px 16px', borderRadius: 50 }}>
                                Enquire
                            </a>
                            <a href="/#contact" onClick={(e) => { e.preventDefault(); navigate(`/?package=${encodeURIComponent(`${pkg.title} – ${pkg.days} Days`)}&guests=${guests}#contact`); }} style={{ background: `linear-gradient(135deg,${pkg.accent},${pkg.accent}CC)`, color: 'white', textDecoration: 'none', fontFamily: 'var(--font-accent)', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', padding: '12px 22px', borderRadius: 50, boxShadow: `0 5px 18px ${pkg.accent}55` }}>
                                Book Now
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

/* ── Section label ── */
function SectionLabel({ children, accent }: { children: React.ReactNode; accent: string }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ width: 24, height: 2.5, background: accent, borderRadius: 2, flexShrink: 0 }} />
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.1rem,3vw,1.8rem)', fontWeight: 800, color: dark, margin: 0, letterSpacing: '-.01em' }}>{children}</h2>
        </div>
    );
}

function IncludedItem({ text, isIncluded, accent, isMobile, index, vis }: { text: string; isIncluded: boolean; accent: string; isMobile: boolean; index: number; vis: boolean }) {
    const [hover, setHover] = useState(false);
    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 15,
                padding: isMobile ? '12px 14px' : '15px 18px',
                background: hover ? (isIncluded ? `${accent}08` : '#E0525208') : 'transparent',
                borderRadius: 14,
                opacity: vis ? 1 : 0,
                transform: vis ? (hover ? 'translateX(6px)' : 'translateX(0)') : 'translateX(-20px)',
                transition: `all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) ${vis ? index * 0.05 : 0}s`,
                border: hover ? `1px solid ${isIncluded ? accent + '40' : '#E0525240'}` : '1px solid transparent',
            }}
        >
            <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: isIncluded ? (hover ? accent : `${accent}1A`) : (hover ? '#E05252' : '#E052521A'),
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                color: hover ? 'white' : (isIncluded ? accent : '#E05252'),
                transition: 'all 0.35s ease',
            }}>
                {isIncluded ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg> : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>}
            </div>
            <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: isMobile ? '.88rem' : '.95rem',
                color: hover ? '#1A1714' : (isIncluded ? '#4A4038' : '#8A8074'),
                lineHeight: 1.4,
                transition: 'color 0.3s ease',
            }}>
                {text}
            </span>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════════
   BodySection — unified flex layout with "card dives under timeline"
   ══════════════════════════════════════════════════════════════════ */
const CARD_W = 340;

function BodySection({ pkg, isMobile, isTablet, px, bodyPaddingT, bodyPaddingB,
    gridCols, gridGap, factsGrid, hlCols, inclCols,
    overviewRef, overviewVis, highlightRef, highlightVis,
    mapRef, mapVis, inclRef, inclVis,
    guests, setGuests, accent, cream, gold, navigate }: any) {

    return (
        <div style={{ background: cream, width: '100%', boxSizing: 'border-box' }}>

            {/* ROW 1: Overview and Highlights + Top Booking Card */}
            <div style={{
                maxWidth: 1440, margin: '0 auto',
                display: isTablet ? 'block' : 'flex',
                boxSizing: 'border-box',
                position: 'relative',
            }}>
                {/* ── LEFT 1 ── */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ padding: `${bodyPaddingT}px ${px}px ${isMobile ? 36 : 60}px`, boxSizing: 'border-box' }}>
                        {/* Overview */}
                        <div ref={overviewRef} style={{ marginBottom: isMobile ? 36 : 60, opacity: overviewVis ? 1 : 0, transform: overviewVis ? 'none' : 'translateY(28px)', transition: 'all .65s ease' }}>
                            <SectionLabel accent={accent}>Overview</SectionLabel>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: isMobile ? '.9rem' : '1rem', color: '#5A5248', lineHeight: 1.85, margin: '0 0 24px', wordBreak: 'break-word' }}>{pkg.overview}</p>
                            <div style={{ display: 'grid', gridTemplateColumns: factsGrid, gap: isMobile ? 10 : 12, marginTop: 28 }}>
                                {[
                                    { label: 'Duration', value: pkg.duration, icon: '⏱' },
                                    { label: 'Group Size', value: pkg.group, icon: '👥' },
                                    { label: 'Difficulty', value: pkg.difficulty, icon: '⚡' },
                                    { label: 'Departs', value: pkg.departures, icon: '✈️' },
                                    { label: 'Starts At', value: pkg.startLocation, icon: '📍' },
                                    { label: 'Best Time', value: pkg.bestTime, icon: '🌤' },
                                ].map((f: any) => (
                                    <div key={f.label} style={{ background: 'white', borderRadius: 14, padding: '14px 12px', boxShadow: '0 2px 10px rgba(0,0,0,.05)', minWidth: 0 }}>
                                        <div style={{ fontSize: '1.15rem', marginBottom: 5 }}>{f.icon}</div>
                                        <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.67rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#8A8074', marginBottom: 3 }}>{f.label}</div>
                                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 700, color: '#1A1714', wordBreak: 'break-word' }}>{f.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Highlights */}
                        <div ref={highlightRef} style={{ marginBottom: 0, opacity: highlightVis ? 1 : 0, transform: highlightVis ? 'none' : 'translateY(28px)', transition: 'all .65s ease .08s' }}>
                            <SectionLabel accent={accent}>Tour Highlights</SectionLabel>
                            <div style={{ display: 'grid', gridTemplateColumns: hlCols, gap: 12 }}>
                                {pkg.highlights.map((h: string, i: number) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 11, background: 'white', borderRadius: 12, padding: '13px 15px', boxShadow: '0 2px 8px rgba(0,0,0,.05)', borderLeft: `3px solid ${accent}`, minWidth: 0 }}>
                                        <div style={{ width: 20, height: 20, borderRadius: '50%', background: `${accent}18`, border: `1.5px solid ${accent}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent, flexShrink: 0, marginTop: 1 }}><Check /></div>
                                        <span style={{ fontFamily: 'var(--font-body)', fontSize: isMobile ? '.82rem' : '.88rem', color: '#4A4038', lineHeight: 1.5, wordBreak: 'break-word' }}>{h}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT 1: Top Sticky Card ── */}
                {!isTablet && (
                    <div style={{
                        width: CARD_W + px + (gridGap / 2),
                        flexShrink: 0,
                        paddingTop: bodyPaddingT,
                        paddingLeft: gridGap / 2,
                        paddingRight: px,
                        paddingBottom: isMobile ? 36 : 60,
                        boxSizing: 'border-box',
                        alignSelf: 'stretch',
                    }}>
                        <div style={{ position: 'sticky', top: 96, zIndex: 10 }}>
                            <BookingCard pkg={pkg} guests={guests} setGuests={setGuests} navigate={navigate} />
                        </div>
                    </div>
                )}
            </div>

            {/* ROW 2: Timeline + Map (Full Area) */}
            <div style={{ maxWidth: 1440, margin: '0 auto', paddingLeft: px, paddingRight: px, boxSizing: 'border-box' }}>
                <div style={{ position: 'relative', zIndex: 20 }}>
                    <RouteTimeline itinerary={pkg.itinerary} accent={accent} isMobile={isMobile} px={px} />
                </div>

                {pkg.mapPoints && pkg.mapPoints.length > 0 && (
                    <div ref={mapRef} style={{
                        position: 'relative',
                        zIndex: 20, /* Above the card */
                        marginBottom: isMobile ? 36 : 60,
                        opacity: mapVis ? 1 : 0,
                        transform: mapVis ? 'none' : 'translateY(28px)',
                        transition: 'all .65s ease .1s',
                    }}>
                        <SriLankaMap mapPoints={pkg.mapPoints} mapRoutePoints={pkg.mapRoutePoints || ''} accent={accent} isMobile={isMobile} />
                    </div>
                )}
            </div>

            {/* ROW 3: What's Included + FAQ + Bottom Sticky Card */}
            <div style={{
                maxWidth: 1440, margin: '0 auto',
                display: isTablet ? 'block' : 'flex',
                boxSizing: 'border-box',
                position: 'relative',
            }}>
                {/* ── LEFT 3 ── */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ padding: `0 ${px}px ${bodyPaddingB}px`, boxSizing: 'border-box' }}>
                        <div ref={inclRef} style={{ marginBottom: isMobile ? 36 : 60, opacity: inclVis ? 1 : 0, transform: inclVis ? 'none' : 'translateY(28px)', transition: 'all .65s ease .08s' }}>
                            <SectionLabel accent={accent}>What&apos;s Included</SectionLabel>
                            <div style={{ display: 'grid', gridTemplateColumns: inclCols, gap: isMobile ? 24 : 32, marginTop: 24 }}>
                                {/* Included */}
                                <div style={{ background: '#FFFFFF', borderRadius: 24, padding: isMobile ? 20 : 32, border: `1px solid ${accent}25`, boxShadow: '0 12px 40px rgba(0,0,0,.04)', position: 'relative', overflow: 'hidden' }}>
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 4, background: `linear-gradient(90deg, ${accent}, ${accent}40)` }} />
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                                        <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${accent}15`, color: accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                        </div>
                                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: dark }}>Included</div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                        {pkg.included.map((item: string, i: number) => (
                                            <IncludedItem key={i} text={item} isIncluded={true} accent={accent} isMobile={isMobile} index={i} vis={inclVis} />
                                        ))}
                                    </div>
                                </div>
                                {/* Not Included */}
                                <div style={{ background: '#FFFFFF', borderRadius: 24, padding: isMobile ? 20 : 32, border: `1px solid #E0525225`, boxShadow: '0 12px 40px rgba(0,0,0,.04)', position: 'relative', overflow: 'hidden' }}>
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 4, background: `linear-gradient(90deg, #E05252, #E0525240)` }} />
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                                        <div style={{ width: 44, height: 44, borderRadius: '50%', background: `#E0525215`, color: '#E05252', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                        </div>
                                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: dark }}>Not Included</div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                        {pkg.excluded.map((item: string, i: number) => (
                                            <IncludedItem key={i} text={item} isIncluded={false} accent={accent} isMobile={isMobile} index={i} vis={inclVis} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {pkg.faq && pkg.faq.length > 0 && (
                            <FaqSection faq={pkg.faq} accent={accent} isMobile={isMobile} contactHref={`/?package=${encodeURIComponent(`${pkg.title} – ${pkg.days} Days`)}&guests=${guests}#contact`} />
                        )}
                    </div>
                </div>

                {/* ── RIGHT 3: Bottom Sticky Card ── */}
                {!isTablet && (
                    <div style={{
                        width: CARD_W + px + (gridGap / 2),
                        flexShrink: 0,
                        paddingTop: 0,
                        paddingLeft: gridGap / 2,
                        paddingRight: px,
                        paddingBottom: bodyPaddingB,
                        boxSizing: 'border-box',
                        alignSelf: 'stretch',
                    }}>
                        <div style={{ position: 'sticky', top: 96, zIndex: 10 }}>
                            <BookingCard pkg={pkg} guests={guests} setGuests={setGuests} navigate={navigate} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}



/* ── Booking card ── */
function BookingCard({ pkg, guests, setGuests, navigate }: { pkg: any; guests: number; setGuests: (n: number) => void; navigate: (url: string) => void }) {
    const [hov, setHov] = useState(false);
    const total = pkg.price * guests;
    return (
        <div style={{ background: 'white', borderRadius: 22, overflow: 'hidden', boxShadow: '0 12px 56px rgba(0,0,0,.10)' }}>
            <div style={{ background: `linear-gradient(135deg,${dark} 0%,#2A2420 100%)`, padding: '28px 28px 24px' }}>
                <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.84rem', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: gold, marginBottom: 8 }}>Starting From</div>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', fontWeight: 900, color: 'white', letterSpacing: '-.02em', display: 'block', marginBottom: 6 }}>${pkg.price.toLocaleString()}</span>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.97rem', color: 'rgba(255,255,255,.5)' }}>{pkg.priceLabel}</div>
            </div>
            <div style={{ padding: '24px 28px' }}>
                <div style={{ marginBottom: 18 }}>
                    <label style={{ fontFamily: 'var(--font-accent)', fontSize: '0.84rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: muted, display: 'block', marginBottom: 10 }}>Number of Guests</label>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid rgba(0,0,0,.1)', borderRadius: 11, overflow: 'hidden' }}>
                        <button onClick={() => setGuests(Math.max(1, guests - 1))} style={{ width: 46, height: 46, background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.4rem', color: dark }}>−</button>
                        <div style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 700, color: dark }}>{guests}</div>
                        <button onClick={() => setGuests(Math.min(12, guests + 1))} style={{ width: 46, height: 46, background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.4rem', color: dark }}>+</button>
                    </div>
                </div>
                <div style={{ background: cream, borderRadius: 11, padding: '16px 18px', marginBottom: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '1.14rem', color: muted }}>Estimated Total</span>
                        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: dark }}>${total.toLocaleString()}</span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: muted, marginTop: 5 }}>For {guests} guest{guests !== 1 ? 's' : ''} · Final price on booking</div>
                </div>
                <a href="/#contact" onClick={(e) => { e.preventDefault(); navigate(`/?package=${encodeURIComponent(`${pkg.title} – ${pkg.days} Days`)}&guests=${guests}#contact`); }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, background: hov ? pkg.accent : dark, color: 'white', textDecoration: 'none', fontFamily: 'var(--font-accent)', fontSize: '0.82rem', fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', padding: 15, borderRadius: 12, boxShadow: hov ? `0 8px 26px ${pkg.accent}55` : '0 5px 20px rgba(0,0,0,.16)', transition: 'all .3s ease', marginBottom: 12 }}>
                    Book This Tour
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </a>
                <a href="/#contact" onClick={(e) => { e.preventDefault(); navigate(`/?package=${encodeURIComponent(`${pkg.title} – ${pkg.days} Days`)}&guests=${guests}#contact`); }} style={{ display: 'block', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '0.98rem', color: muted, textDecoration: 'none' }}>
                    or <span style={{ color: pkg.accent, textDecoration: 'underline' }}>Ask a Question</span>
                </a>
                <div style={{ borderTop: '1px solid rgba(0,0,0,.07)', marginTop: 20, paddingTop: 18, display: 'flex', flexDirection: 'column', gap: 11 }}>
                    {[{ icon: '🔒', text: 'Free cancellation up to 30 days before' }, { icon: '💳', text: '10% deposit to confirm your booking' }, { icon: '🌐', text: 'Price matched to any verified quote' }].map(b => (
                        <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ fontSize: '1rem' }}>{b.icon}</span>
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.94rem', color: muted }}>{b.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
