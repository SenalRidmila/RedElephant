'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/* ─── Slide data ─── */
const slides = [
    {
        src: '/assets/hero-image-1.webp',
        alt: 'Sri Lanka Tea Estates',
        label: 'Cultural Triangle',
        headline: ['Discover', 'Sri Lanka'],
        sub: 'Ancient wonders rise from emerald jungles',
        accent: '#C0392B',
        posD: 'center center',
        posM: '50% center', 
    },
    {
        src: '/assets/hero-image-2.webp',
        alt: 'Unawatuna Beach — turquoise waters',
        label: 'Coastal Bliss',
        headline: ['Golden', 'Shores'],
        sub: 'Pristine beaches, whale-watching cruises and coral reefs kissed by the Indian Ocean',
        accent: '#C9A96E',
        posD: 'center center',
        posM: '60% center', /* Keep beach subject in frame */
    },
    {
        src: '/assets/yala-national-park-1.webp',
        alt: 'Yala National Park — leopard safari',
        label: 'Wildlife Safari',
        headline: ['Wild', 'Encounters'],
        sub: "Spot leopards, elephants and blue whales in the world's most biodiverse island nation",
        accent: '#D4842A',
        posD: 'center 40%',
        posM: 'center 30%', /* Keep leopard in frame on mobile */
    },
    {
        src: '/assets/culture-package/esela-perahera.webp',
        alt: 'Kandy Esala Perahera — the grand cultural procession',
        label: 'Living Culture',
        headline: ['Feel the', 'Spirit'],
        sub: 'Fire-breathers, Kandyan dancers and adorned elephants — culture that truly lives',
        accent: '#8B4513',
        posD: 'center center',
        posM: 'center 20%', /* Focus on dancers/elephants */
    },
];

const DURATION = 5500;

const STATS = [
    { value: '15+', label: 'Years Experience' },
    { value: '4.9★', label: 'Guest Rating' },
    { value: '2,400+', label: 'Happy Travellers' },
    { value: '50+', label: 'Curated Routes' },
];

export default function HeroSection() {
    const [current, setCurrent] = useState(0);
    const [nextIdx, setNextIdx] = useState<number | null>(null);
    const [phase, setPhase] = useState<'idle' | 'wipe'>('idle');
    const [textOut, setTextOut] = useState(false);
    const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const wipeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    const slide = slides[current];
    const nextSlide = nextIdx !== null ? slides[nextIdx] : null;

    /* ─── Transition ─── */
    const goTo = useCallback((idx: number) => {
        if (phase !== 'idle' || idx === current) return;
        if (timerRef.current) clearInterval(timerRef.current);
        setTextOut(true);
        setNextIdx(idx);
        setPhase('wipe');
        wipeRef.current = setTimeout(() => {
            setCurrent(idx);
            setNextIdx(null);
            setPhase('idle');
            setTimeout(() => setTextOut(false), 60);
        }, 860);
    }, [current, phase]);

    /* ─── Auto-advance ─── */
    const startTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setCurrent(c => {
                const n = (c + 1) % slides.length;
                setTextOut(true);
                setNextIdx(n);
                setPhase('wipe');
                wipeRef.current = setTimeout(() => {
                    setCurrent(n);
                    setNextIdx(null);
                    setPhase('idle');
                    setTimeout(() => setTextOut(false), 60);
                }, 860);
                return c;
            });
        }, DURATION);
    }, []);

    useEffect(() => {
        startTimer();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (wipeRef.current) clearTimeout(wipeRef.current);
        };
    }, [startTimer]);

    /* ─── Mouse parallax ─── */
    const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const r = heroRef.current?.getBoundingClientRect();
        if (!r) return;
        setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
    }, []);

    /* ─── Scroll down ─── */
    const scrollDown = () => {
        const el = document.querySelector('main > section:nth-child(2), main > div:nth-child(2)');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
    };

    const px = (mouse.x - 0.5) * -16;
    const py = (mouse.y - 0.5) * -8;

    return (
        <section
            id="hero"
            ref={heroRef}
            aria-label="Hero Slideshow"
            onMouseMove={onMouseMove}
            style={{
                position: 'relative',
                width: '100%',
                height: '100dvh',
                minHeight: 620,
                maxHeight: 1080,
                overflow: 'hidden',
                background: '#0a0a0a',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* ══ BACKGROUND (current slide) ══ */}
            <img
                key={`bg-${current}`}
                className="hero-anim-bg"
                src={slide.src}
                alt=""
                style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    '--pos-d': slide.posD,
                    '--pos-m': slide.posM,
                    transform: `scale(1.08) translate(${px}px,${py}px)`,
                    transition: 'transform .1s linear',
                    zIndex: 1,
                    animation: `kb-hero ${DURATION + 1000}ms ease-out forwards`,
                } as React.CSSProperties}
            />

            {/* ══ WIPE-IN (next slide) ══ */}
            {nextSlide && phase === 'wipe' && (
                <div
                    key={`wipe-${nextIdx}`}
                    style={{
                        position: 'absolute', inset: 0, zIndex: 4,
                        clipPath: 'inset(0 100% 0 0)',
                        animation: 'wipe-in 0.86s cubic-bezier(.76,0,.24,1) forwards',
                    }}
                >
                    <img className="hero-anim-bg" src={nextSlide.src} alt="" style={{
                        position: 'absolute', inset: 0,
                        width: '100%', height: '100%',
                        objectFit: 'cover',
                        '--pos-d': nextSlide.posD,
                        '--pos-m': nextSlide.posM,
                    } as React.CSSProperties} />
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(135deg,rgba(0,0,0,.7) 0%,rgba(0,0,0,.2) 55%,rgba(0,0,0,.5) 100%)',
                    }} />
                </div>
            )}

            {/* ══ GRADIENT OVERLAYS ══ */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(135deg,rgba(0,0,0,.72) 0%,rgba(0,0,0,.25) 55%,rgba(0,0,0,.55) 100%)' }} />
            <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: `linear-gradient(110deg,${slide.accent}50 0%,transparent 45%)`, transition: 'background 1s ease', pointerEvents: 'none' }} />
            {/* heavy bottom fade so stats bar reads well */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to top,rgba(0,0,0,.85) 0%,rgba(0,0,0,.1) 38%)', pointerEvents: 'none' }} />

            {/* ══ LEFT ACCENT BAR ══ */}
            <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, zIndex: 10,
                background: `linear-gradient(to bottom,transparent,${slide.accent},transparent)`,
                transition: 'background .8s ease',
            }} />

            {/* ══ MAIN CONTENT — fills flex space between top and bottom strip ══ */}
            <div style={{
                position: 'relative', zIndex: 10,
                flex: 1,
                display: 'flex',
                alignItems: 'flex-start',
                /* Clear navbar (72px) + breathing room; clamp keeps it sane on all heights */
                padding: 'clamp(88px,13vh,160px) clamp(20px,6vw,80px) 24px',
                boxSizing: 'border-box',
            }}>
                <div style={{ maxWidth: 720, width: '100%', flexShrink: 0 }}>

                    {/* Eyebrow pill */}
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        background: 'rgba(255,255,255,.1)', backdropFilter: 'blur(12px)',
                        border: `1px solid ${slide.accent}66`,
                        borderRadius: 50, padding: '6px 16px', marginBottom: 20,
                        opacity: textOut ? 0 : 1,
                        transform: textOut ? 'translateY(-10px)' : 'translateY(0)',
                        transition: textOut ? 'opacity .22s ease, transform .22s ease' : 'opacity .5s ease .1s, transform .5s ease .1s',
                    }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: slide.accent, animation: 'pulse-dot 2s ease-in-out infinite' }} />
                        <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: slide.accent }}>
                            {slide.label} · Red Elephant Travels
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 style={{
                        fontFamily: 'var(--font-heading)', fontWeight: 900,
                        lineHeight: 0.92, letterSpacing: '-0.03em',
                        margin: '0 0 18px',
                        /* conservative clamp so it never overflows on small screens */
                        fontSize: 'clamp(2.8rem, 8vw, 7rem)',
                    }}>
                        <span style={{
                            display: 'block', color: 'white',
                            opacity: textOut ? 0 : 1,
                            transform: textOut ? 'translateY(18px)' : 'translateY(0)',
                            transition: textOut ? 'opacity .2s ease, transform .2s ease' : 'opacity .55s ease .18s, transform .55s ease .18s',
                        }}>
                            {slide.headline[0]}
                        </span>
                        <span style={{
                            display: 'block',
                            WebkitTextStroke: '2px rgba(255,255,255,.85)',
                            WebkitTextFillColor: 'transparent',
                            color: 'transparent',
                            opacity: textOut ? 0 : 1,
                            transform: textOut ? 'translateY(22px)' : 'translateY(0)',
                            transition: textOut ? 'opacity .2s ease .04s, transform .2s ease .04s' : 'opacity .55s ease .26s, transform .55s ease .26s',
                        }}>
                            {slide.headline[1]}
                        </span>
                    </h1>

                    {/* Sub-text */}
                    <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'clamp(.85rem, 1.6vw, 1.05rem)',
                        color: 'rgba(255,255,255,.72)',
                        lineHeight: 1.65, marginBottom: 28,
                        maxWidth: 420,
                        opacity: textOut ? 0 : 1,
                        transform: textOut ? 'translateY(12px)' : 'translateY(0)',
                        transition: textOut ? 'opacity .2s ease .06s, transform .2s ease .06s' : 'opacity .55s ease .35s, transform .55s ease .35s',
                    }}>
                        {slide.sub}
                    </p>

                    {/* CTA buttons */}
                    <div style={{
                        display: 'flex', gap: 12, flexWrap: 'wrap',
                        opacity: textOut ? 0 : 1,
                        transform: textOut ? 'translateY(12px)' : 'translateY(0)',
                        transition: textOut ? 'opacity .2s ease .08s, transform .2s ease .08s' : 'opacity .55s ease .44s, transform .55s ease .44s',
                    }}>
                        <a
                            href="#tour-packages"
                            onClick={e => {
                                e.preventDefault();
                                const el = document.getElementById('tour-packages');
                                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: 10,
                                background: slide.accent, color: 'white', textDecoration: 'none',
                                fontFamily: 'var(--font-accent)', fontSize: '0.82rem', fontWeight: 800,
                                letterSpacing: '.12em', textTransform: 'uppercase',
                                padding: '13px 28px', borderRadius: 50,
                                boxShadow: `0 8px 30px ${slide.accent}60`,
                                transition: 'transform .25s, box-shadow .25s',
                                whiteSpace: 'nowrap',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 14px 44px ${slide.accent}88`; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 8px 30px ${slide.accent}60`; }}
                        >
                            Explore Tours
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                        </a>
                        <a href="#contact" style={{
                            display: 'inline-flex', alignItems: 'center', gap: 10,
                            background: 'rgba(255,255,255,.1)', backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255,255,255,.22)',
                            color: 'white', textDecoration: 'none',
                            fontFamily: 'var(--font-accent)', fontSize: '0.82rem', fontWeight: 700,
                            letterSpacing: '.12em', textTransform: 'uppercase',
                            padding: '13px 28px', borderRadius: 50,
                            transition: 'background .25s',
                            whiteSpace: 'nowrap',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.18)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.1)'; }}
                        >
                            Plan My Trip
                        </a>
                    </div>
                </div>
            </div>

            {/* ══ BOTTOM STRIP: stats + dots — fixed height, no overlap ══ */}
            <div style={{
                position: 'relative', zIndex: 10,
                flexShrink: 0,
                padding: '0 clamp(20px,5vw,64px)',
                paddingBottom: 'max(18px, env(safe-area-inset-bottom, 18px))',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
            }}>
                {/* Stats bar */}
                <div style={{
                    display: 'flex', alignItems: 'stretch',
                    background: 'rgba(8,8,8,.6)', backdropFilter: 'blur(20px) saturate(1.4)',
                    border: '1px solid rgba(255,255,255,.1)',
                    borderRadius: 14,
                    overflow: 'hidden',
                    boxShadow: '0 8px 40px rgba(0,0,0,.5)',
                }}>
                    {STATS.map((s, i) => (
                        <div key={i} style={{
                            flex: 1, padding: 'clamp(10px,1.5vh,16px) 8px',
                            textAlign: 'center',
                            borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,.08)' : 'none',
                            minWidth: 0,
                        }}>
                            <div style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(.95rem,2vw,1.35rem)',
                                fontWeight: 900, color: 'white',
                                letterSpacing: '-.01em', lineHeight: 1,
                                whiteSpace: 'nowrap',
                            }}>{s.value}</div>
                            <div style={{
                                fontFamily: 'var(--font-accent)',
                                fontSize: 'clamp(.42rem,.9vw,.56rem)',
                                fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase',
                                color: 'rgba(255,255,255,.4)', marginTop: 4,
                                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                            }}>{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Dots + counter row */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    paddingBottom: 4,
                }}>
                    {slides.map((s, i) => (
                        <button
                            key={i}
                            onClick={() => { goTo(i); startTimer(); }}
                            aria-label={`Slide ${i + 1}`}
                            style={{
                                width: i === current ? 24 : 7, height: 7,
                                borderRadius: 4, border: 'none', cursor: 'pointer', padding: 0,
                                background: i === current ? slide.accent : 'rgba(255,255,255,.3)',
                                transition: 'all .4s cubic-bezier(.4,0,.2,1)',
                                boxShadow: i === current ? `0 0 10px ${slide.accent}88` : 'none',
                                flexShrink: 0,
                            }}
                        />
                    ))}
                    <span style={{
                        fontFamily: 'var(--font-accent)', fontSize: '0.68rem', fontWeight: 600,
                        letterSpacing: '.1em', color: 'rgba(255,255,255,.32)', marginLeft: 4,
                        whiteSpace: 'nowrap',
                    }}>
                        {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                    </span>
                </div>
            </div>

            {/* ══ PROGRESS LINE (very bottom) ══ */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'rgba(255,255,255,.07)', zIndex: 15 }}>
                <div
                    key={current}
                    style={{
                        height: '100%',
                        background: `linear-gradient(90deg,${slide.accent},${slide.accent}88)`,
                        animation: `progress-fill ${DURATION}ms linear`,
                    }}
                />
            </div>

            {/* ══ THUMBNAIL STRIP (desktop ≥ 960px) ══ */}
            <div className="hero-thumbs" style={{
                position: 'absolute', right: 24, top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 12,
                flexDirection: 'column', gap: 10,
            }}>
                {slides.map((s, i) => (
                    <button
                        key={i}
                        onClick={() => { goTo(i); startTimer(); }}
                        aria-label={s.alt}
                        style={{
                            width: 66, height: 50,
                            borderRadius: 10, overflow: 'hidden',
                            border: `2px solid ${i === current ? s.accent : 'rgba(255,255,255,.18)'}`,
                            cursor: 'pointer', padding: 0, background: 'none',
                            transition: 'border-color .4s, transform .3s, opacity .3s',
                            transform: i === current ? 'scale(1.08)' : 'scale(1)',
                            opacity: i === current ? 1 : 0.52,
                            boxShadow: i === current ? `0 0 0 3px ${s.accent}40, 0 4px 16px rgba(0,0,0,.5)` : 'none',
                            display: 'block',
                        }}
                        onMouseEnter={e => { if (i !== current) e.currentTarget.style.opacity = '0.82'; }}
                        onMouseLeave={e => { if (i !== current) e.currentTarget.style.opacity = '0.52'; }}
                    >
                        <img src={s.src} alt={s.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </button>
                ))}
            </div>

            {/* ══ SCROLL INDICATOR (desktop ≥ 960px) ══ */}
            <button
                onClick={scrollDown}
                aria-label="Scroll down"
                className="hero-scroll-hint"
                style={{
                    position: 'absolute', right: 28, bottom: 90,
                    zIndex: 12, background: 'none', border: 'none', cursor: 'pointer',
                    flexDirection: 'column', alignItems: 'center', gap: 6,
                    color: 'rgba(255,255,255,.45)',
                }}
            >
                <div style={{
                    width: 1, height: 44,
                    background: 'linear-gradient(to bottom,transparent,rgba(255,255,255,.45))',
                    animation: 'line-grow 1.8s ease-in-out infinite',
                }} />
                <span style={{ fontFamily: 'var(--font-accent)', fontSize: '.46rem', letterSpacing: '.22em', textTransform: 'uppercase', writingMode: 'vertical-rl' }}>
                    Scroll
                </span>
            </button>

            {/* ══ KEYFRAMES ══ */}
            <style>{`
                @keyframes wipe-in {
                    from { clip-path: inset(0 100% 0 0); }
                    to   { clip-path: inset(0 0% 0 0); }
                }
                @keyframes kb-hero {
                    from { transform: scale(1.0); }
                    to   { transform: scale(1.1); }
                }
                @keyframes progress-fill {
                    from { width: 0%; }
                    to   { width: 100%; }
                }
                @keyframes pulse-dot {
                    0%,100% { opacity:1; transform:scale(1); }
                    50%     { opacity:.5; transform:scale(1.5); }
                }
                @keyframes line-grow {
                    0%   { transform:scaleY(0); transform-origin:top; opacity:1; }
                    60%  { transform:scaleY(1); transform-origin:top; opacity:1; }
                    100% { transform:scaleY(1); transform-origin:top; opacity:0; }
                }
                /* ── Dynamic background position for mobile/desktop ── */
                .hero-anim-bg {
                    object-position: var(--pos-d, center);
                }
                @media (max-width: 768px) {
                    .hero-anim-bg {
                        object-position: var(--pos-m, center) !important;
                    }
                }

                /* ── Thumbnail strip + scroll hint: desktop only ──────── */
                .hero-thumbs       { display: none;  }
                .hero-scroll-hint  { display: none;  }
                @media (min-width: 960px) {
                    .hero-thumbs      { display: flex !important; }
                    .hero-scroll-hint { display: flex !important; }
                }

                /* ── Stats label smaller on very narrow screens ─────────── */
                @media (max-width: 400px) {
                    #hero .stat-label { display: none; }
                }

                /* ── iPhone safe-area bottom ──────────────────────────── */
                @supports (padding-bottom: env(safe-area-inset-bottom)) {
                    #hero .bottom-strip {
                        padding-bottom: calc(18px + env(safe-area-inset-bottom));
                    }
                }
            `}</style>
        </section>
    );
}
