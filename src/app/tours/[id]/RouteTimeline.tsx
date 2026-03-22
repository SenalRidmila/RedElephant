'use client';

/**
 * RouteTimeline — adventure-package layout
 *
 * Desktop grid per row:  [LEFT slot] | [ROAD 64px] | [RIGHT slot]
 * Even index (0,2,4…): TEXT left, IMAGE right
 * Odd  index (1,3,5…): IMAGE left, TEXT right
 * Car follows viewport centre.  Mobile: accordion.
 */

import { useEffect, useRef, useState } from 'react';
import { DayItinerary } from '../../data/packages';

interface Props {
    itinerary: DayItinerary[];
    accent: string;
    isMobile: boolean;
    px: number;
}

const ROAD_BG = '#1c1c2e';
const ROAD_W = 64;

export default function RouteTimeline({ itinerary, accent, isMobile, px }: Props) {
    const [carPct, setCarPct] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let raf: number | null = null;
        const update = () => {
            const el = containerRef.current;
            if (el) {
                const rect = el.getBoundingClientRect();
                const mid = window.innerHeight / 2;
                const pct = Math.min(100, Math.max(0, ((mid - rect.top) / rect.height) * 100));
                setCarPct(pct);
            }
            raf = null;
        };
        const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
    }, []);

    /* ─── MOBILE ─── */
    if (isMobile) {
        return (
            <div style={{ background: '#f2ede8', padding: '32px 16px 40px' }}>
                <SectionHeader accent={accent} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {itinerary.map((day, i) => (
                        <MobileCard key={i} day={day} idx={i} accent={accent} />
                    ))}
                </div>
            </div>
        );
    }

    /* ─── DESKTOP ─── */
    return (
        <div style={{ background: '#f2ede8', width: '100%' }}>
            <div style={{
                maxWidth: 1480,
                margin: '0 auto',
                padding: `64px ${px}px 80px`,
                boxSizing: 'border-box',
            }}>
                <SectionHeader accent={accent} />

                <div ref={containerRef} style={{ position: 'relative' }}>

                    {/* ══ CENTRE ROAD STRIP ══ */}
                    <div style={{
                        position: 'absolute',
                        left: '50%', top: 0, bottom: 0,
                        transform: 'translateX(-50%)',
                        width: ROAD_W,
                        zIndex: 1,
                        pointerEvents: 'none',
                    }}>
                        {/* asphalt */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: ROAD_BG,
                            borderRadius: ROAD_W / 2,
                            boxShadow: '0 0 0 2px rgba(255,255,255,.05), 0 8px 40px rgba(0,0,0,.35)',
                        }}>
                            {/* amber kerb — left */}
                            <div style={{
                                position: 'absolute', left: 0, top: 0, bottom: 0, width: 5,
                                borderRadius: `${ROAD_W / 2}px 0 0 ${ROAD_W / 2}px`,
                                backgroundImage: 'repeating-linear-gradient(to bottom,#f59e0b 0,#f59e0b 14px,#fff 14px,#fff 28px)',
                                opacity: .55,
                            }} />
                            {/* amber kerb — right */}
                            <div style={{
                                position: 'absolute', right: 0, top: 0, bottom: 0, width: 5,
                                borderRadius: `0 ${ROAD_W / 2}px ${ROAD_W / 2}px 0`,
                                backgroundImage: 'repeating-linear-gradient(to bottom,#f59e0b 0,#f59e0b 14px,#fff 14px,#fff 28px)',
                                opacity: .55,
                            }} />
                            {/* centre dashes */}
                            <div style={{
                                position: 'absolute', left: '50%', top: 0, bottom: 0, width: 3,
                                transform: 'translateX(-50%)',
                                backgroundImage: 'repeating-linear-gradient(to bottom,rgba(255,255,255,.55) 0,rgba(255,255,255,.55) 18px,transparent 18px,transparent 34px)',
                            }} />
                        </div>

                        {/* START badge */}
                        <div style={{
                            position: 'absolute', top: -26, left: '50%',
                            transform: 'translateX(-50%)',
                            background: accent, color: '#fff',
                            borderRadius: 20, padding: '6px 18px', whiteSpace: 'nowrap',
                            fontFamily: 'var(--font-accent)', fontSize: '0.9rem', fontWeight: 900,
                            letterSpacing: '.14em', textTransform: 'uppercase',
                            boxShadow: `0 6px 22px ${accent}66`, zIndex: 8,
                        }}>✈ START</div>

                        {/* FINISH badge */}
                        <div style={{
                            position: 'absolute', bottom: -26, left: '50%',
                            transform: 'translateX(-50%)',
                            background: '#111', border: '1.5px solid #444', color: '#ccc',
                            borderRadius: 20, padding: '6px 18px', whiteSpace: 'nowrap',
                            fontFamily: 'var(--font-accent)', fontSize: '0.9rem', fontWeight: 900,
                            letterSpacing: '.14em', textTransform: 'uppercase',
                            boxShadow: '0 6px 22px rgba(0,0,0,.5)', zIndex: 8,
                        }}>🏁 FINISH</div>

                        {/* SAFARI JEEP */}
                        <div style={{
                            position: 'absolute',
                            left: '50%', top: `${carPct}%`,
                            transform: 'translateX(-50%) translateY(-50%)',
                            width: 44, height: 83,
                            zIndex: 10,
                            transition: 'top 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
                            willChange: 'top',
                            filter: `drop-shadow(0 6px 18px ${accent}99) drop-shadow(0 2px 8px rgba(0,0,0,.7))`,
                            pointerEvents: 'none',
                        }}>
                            <CarSVG accent={accent} />
                        </div>
                    </div>

                    {/* ══ ROWS ══ */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {itinerary.map((day, i) => (
                            <TimelineRow key={i} day={day} idx={i} accent={accent} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════
   Single alternating row
   Even (0,2,4): TEXT left | road | IMAGE right
   Odd  (1,3,5): IMAGE left | road | TEXT right
   ═══════════════════════════════════════════════════ */
function TimelineRow({ day, idx, accent }: { day: DayItinerary; idx: number; accent: string }) {
    const flip = idx % 2 === 1;
    const src = (day as any).image as string | undefined;
    const location = ((day as any).location as string) || `Area ${idx + 1}`;
    const activity = ((day as any).activity as string) || day.highlights[0] || '—';

    const ImageBlock = (
        <div style={{
            width: '100%',
            borderRadius: 18, overflow: 'hidden',
            boxShadow: '0 12px 44px rgba(0,0,0,.15)',
            background: '#ddd', aspectRatio: '16/10',
        }}>
            {src
                ? <img src={src} alt={day.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                : <div style={{ width: '100%', height: '100%', minHeight: 220, background: `linear-gradient(135deg,${accent}22,${accent}08)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '3rem' }}>🏝</span>
                </div>
            }
        </div>
    );

    const TextBlock = (
        <div style={{
            width: '100%',
            background: '#fff', borderRadius: 18,
            padding: '26px 28px',
            boxShadow: '0 4px 24px rgba(0,0,0,.07)',
            border: `1.5px solid ${accent}18`,
        }}>
            <span style={{
                display: 'inline-block',
                fontFamily: 'var(--font-accent)', fontSize: '0.87rem', fontWeight: 700,
                letterSpacing: '.18em', textTransform: 'uppercase',
                color: accent, background: `${accent}12`,
                border: `1px solid ${accent}28`,
                borderRadius: 50, padding: '4px 13px', marginBottom: 10,
            }}>
                {location.toUpperCase()} / AREA {String(idx + 1).padStart(2, '0')}
            </span>
            <h3 style={{
                fontFamily: 'var(--font-heading)', fontSize: '1.55rem', fontWeight: 900,
                color: '#1a1a2e', margin: '0 0 10px', letterSpacing: '-.02em', lineHeight: 1.15,
            }}>
                {day.title}
            </h3>
            <p style={{
                fontFamily: 'var(--font-body)', fontSize: '1rem',
                color: '#666', lineHeight: 1.75, margin: '0 0 18px',
            }}>
                {day.description}
            </p>
            <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px',
                borderTop: '1px solid rgba(0,0,0,.06)', paddingTop: 14,
            }}>
                <div>
                    <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.84rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#999', marginBottom: 4 }}>Attraction</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.17rem', fontWeight: 600, color: '#1a1a2e' }}>{day.highlights[0] || '—'}</div>
                </div>
                <div>
                    <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.84rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#999', marginBottom: 4 }}>Activity</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.17rem', fontWeight: 600, color: '#1a1a2e' }}>{activity}</div>
                </div>
            </div>
        </div>
    );

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: `1fr ${ROAD_W}px 1fr`,
            minHeight: 260, alignItems: 'center', padding: '28px 0',
        }}>
            {/* LEFT slot */}
            <div style={{ paddingRight: 36, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                {flip ? ImageBlock : TextBlock}
            </div>

            {/* CENTRE: Day badge */}
            <div style={{ position: 'relative', zIndex: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{
                    width: 58, height: 58, borderRadius: '50%',
                    background: `linear-gradient(135deg,${accent},${accent}CC)`,
                    border: '3.5px solid #fff',
                    boxShadow: `0 4px 22px ${accent}66, 0 0 0 5px ${accent}22`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', zIndex: 5,
                }}>
                    <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.64rem', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', opacity: .8 }}>Day</span>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 900, lineHeight: 1 }}>{day.day}</span>
                </div>
            </div>

            {/* RIGHT slot */}
            <div style={{ paddingLeft: 36, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                {flip ? TextBlock : ImageBlock}
            </div>
        </div>
    );
}

/* ─── Section heading ─── */
function SectionHeader({ accent }: { accent: string }) {
    return (
        <div style={{ marginBottom: 48 }}>
            <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: `${accent}14`, border: `1px solid ${accent}30`,
                borderRadius: 50, padding: '5px 16px', marginBottom: 16,
            }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: accent }} />
                <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: accent }}>
                    Itinerary
                </span>
            </div>
            <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.4rem,3.5vw,2.2rem)',
                fontWeight: 900, color: '#1a1a2e',
                margin: '0 0 8px', letterSpacing: '-.02em',
            }}>
                Your Adventure Begins Here
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.17rem', color: '#888', margin: 0 }}>
                Follow the route day by day across Sri Lanka&apos;s most thrilling destinations.
            </p>
        </div>
    );
}

/* ─── Mobile accordion card ─── */
function MobileCard({ day, idx, accent }: { day: DayItinerary; idx: number; accent: string }) {
    const [open, setOpen] = useState(idx === 0);
    const src = (day as any).image as string | undefined;
    const loc = ((day as any).location as string) || `Area ${idx + 1}`;
    const act = ((day as any).activity as string) || day.highlights[0] || '—';

    return (
        <div style={{
            background: '#fff', borderRadius: 16, overflow: 'hidden',
            boxShadow: '0 2px 14px rgba(0,0,0,.08)',
            border: `2px solid ${open ? accent : 'transparent'}`,
            transition: 'border-color .3s',
        }}>
            <button
                onClick={() => setOpen(o => !o)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 'none', cursor: 'pointer', padding: '14px 16px', textAlign: 'left' }}
            >
                <div style={{
                    width: 46, height: 46, borderRadius: 12,
                    background: open ? accent : `${accent}18`,
                    border: `2px solid ${accent}35`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, transition: 'background .25s',
                }}>
                    <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.62rem', fontWeight: 700, color: open ? 'rgba(255,255,255,.7)' : accent }}>Day</span>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 900, color: open ? '#fff' : '#1a1a2e' }}>{day.day}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: accent, opacity: .8 }}>
                        {loc.toUpperCase()} / AREA {String(idx + 1).padStart(2, '0')}
                    </div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.18rem', fontWeight: 800, color: '#1a1a2e', lineHeight: 1.25, marginTop: 1 }}>{day.title}</div>
                </div>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: `${accent}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .3s', flexShrink: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </div>
            </button>
            <div style={{ maxHeight: open ? 600 : 0, overflow: 'hidden', transition: 'max-height .45s cubic-bezier(.23,1,.32,1)' }}>
                {src && <img src={src} alt={day.title} style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }} />}
                <div style={{ padding: '14px 16px 20px' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.17rem', color: '#666', lineHeight: 1.78, margin: '0 0 14px' }}>{day.description}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px', borderTop: '1px solid rgba(0,0,0,.06)', paddingTop: 12 }}>
                        <div>
                            <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#999', marginBottom: 3 }}>Attraction</div>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.14rem', fontWeight: 600, color: '#1a1a2e' }}>{day.highlights[0] || '—'}</div>
                        </div>
                        <div>
                            <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#999', marginBottom: 3 }}>Activity</div>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.14rem', fontWeight: 600, color: '#1a1a2e' }}>{act}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ════════════════════════════════════════════════════════
   SAFARI 4×4 JEEP — top-down bird's-eye (Red Elephant branded)
   - Roof rack with luggage rails
   - Spare tyre mounted on roof
   - Right-side snorkel
   - Round halogen headlights
   - Chunky off-road tyres with tread marks
   - LED light bar on cabin roof
   - Accent colour stripe down the flank
   ════════════════════════════════════════════════════════ */
function CarSVG({ accent }: { accent: string }) {
    return (
        <svg viewBox="0 0 80 150" xmlns="http://www.w3.org/2000/svg" width="48" height="90" style={{ transform: 'rotate(180deg)', display: 'block' }}>
            <defs>
                <filter id="car-shadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="12" stdDeviation="8" floodColor={accent} floodOpacity="0.35" />
                    <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#000" floodOpacity="0.5" />
                </filter>
                <linearGradient id="body-paint" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#E2E2E6" />
                    <stop offset="20%" stopColor="#FFFFFF" />
                    <stop offset="80%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#E2E2E6" />
                </linearGradient>
                <linearGradient id="glass" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0B0E14" />
                    <stop offset="100%" stopColor="#131A26" />
                </linearGradient>
            </defs>

            <g filter="url(#car-shadow)">
                {/* ── WIDE ALL-TERRAIN WHEELS ── */}
                {[
                    { x: 1, y: 30 }, { x: 63, y: 30 },
                    { x: 1, y: 98 }, { x: 63, y: 98 }
                ].map((w, i) => (
                    <g key={i}>
                        <rect x={w.x} y={w.y} width="16" height="28" rx="4" fill="#0A0A0A" />
                        {/* Wheel treads */}
                        {[4, 10, 16, 22].map(dy => (
                            <rect key={dy} x={w.x} y={w.y + dy} width="16" height="1.5" fill="#1A1A1A" />
                        ))}
                    </g>
                ))}

                {/* ── MAIN CHASSIS (Premium Pearl White SUV Shape) ── */}
                <path d="M 12 36 Q 12 24, 25 24 L 55 24 Q 68 24, 68 36 L 68 122 Q 68 132, 55 132 L 25 132 Q 12 132, 12 122 Z" fill="url(#body-paint)" />

                {/* Body contours & highlights */}
                <path d="M 16 38 L 64 38 L 64 120 L 16 120 Z" fill="rgba(0,0,0,0.06)" />
                <path d="M 17 38 L 20 38 L 20 120 L 17 120 Z" fill="rgba(255,255,255,0.8)" />
                
                {/* ── GLASS (Panoramic Windshield, Roof, Rear) ── */}
                <path d="M 17 56 Q 17 50, 24 48 L 56 48 Q 63 50, 63 56 L 63 108 Q 63 114, 56 116 L 24 116 Q 17 114, 17 108 Z" fill="url(#glass)" />
                
                {/* Panoramic edge reflections */}
                <path d="M 20 49 L 60 49 L 58 52 L 22 52 Z" fill="rgba(255,255,255,0.15)" />

                {/* ── PREMIUM ACCENT STRIPE ── */}
                <rect x="36" y="24" width="8" height="108" fill={accent} opacity="0.95" />

                {/* ── MATTE BLACK ROOF RACK WITH GEAR ── */}
                <rect x="22" y="64" width="36" height="42" rx="4" fill="#141414" />
                <rect x="24" y="66" width="32" height="38" rx="2" fill="none" stroke="#2A2A2A" strokeWidth="2" />
                
                {/* Safari spare tyre mounted on roof */}
                <circle cx="40" cy="85" r="11" fill="#050505" />
                <circle cx="40" cy="85" r="5" fill="#1A1A1A" />
                <circle cx="40" cy="85" r="2.5" fill="#444" />
                <circle cx="40" cy="85" r="1" fill="#AAA" />
                
                {/* Light bars on rack */}
                <rect x="28" y="62" width="24" height="4" rx="2" fill="#0A0A0A" />
                <circle cx="32" cy="64" r="1.5" fill="#FFF" opacity="0.95" />
                <circle cx="36" cy="64" r="1.5" fill="#FFF" opacity="0.95" />
                <circle cx="40" cy="64" r="1.5" fill="#FFF" opacity="0.95" />
                <circle cx="44" cy="64" r="1.5" fill="#FFF" opacity="0.95" />
                <circle cx="48" cy="64" r="1.5" fill="#FFF" opacity="0.95" />

                {/* ── FRONT BULL-BAR & BUMPER ── */}
                <rect x="22" y="20" width="36" height="6" rx="2" fill="#1E1E1E" />
                <rect x="16" y="14" width="48" height="5" rx="1.5" fill="#111" />
                
                {/* ── MODERN LED HEADLIGHTS ── */}
                <rect x="18" y="22" width="14" height="6" rx="2" fill="#0A0A0A" />
                <rect x="48" y="22" width="14" height="6" rx="2" fill="#0A0A0A" />
                {/* Bright white LED bulbs */}
                <circle cx="21" cy="25" r="3" fill="#FFF" filter="drop-shadow(0 0 4px #FFF)" />
                <circle cx="28" cy="25" r="3" fill="#FFF" filter="drop-shadow(0 0 4px #FFF)" />
                <circle cx="52" cy="25" r="3" fill="#FFF" filter="drop-shadow(0 0 4px #FFF)" />
                <circle cx="59" cy="25" r="3" fill="#FFF" filter="drop-shadow(0 0 4px #FFF)" />

                {/* Illumination glow beams */}
                <path d="M 18 20 L 26 -20 L -4 -20 Z" fill="url(#glass)" opacity="0.4" />
                <path d="M 62 20 L 84 -20 L 54 -20 Z" fill="url(#glass)" opacity="0.4" />

                {/* ── REAR BUMPER & NEON TAIL LIGHTS ── */}
                <rect x="22" y="132" width="36" height="6" rx="2" fill="#1E1E1E" />
                
                {/* Tail LED blocks */}
                <rect x="16" y="128" width="16" height="5" rx="2" fill="#AA0000" />
                <rect x="48" y="128" width="16" height="5" rx="2" fill="#AA0000" />
                <rect x="17" y="129" width="14" height="2.5" rx="1" fill="#FF4444" filter="drop-shadow(0 0 2px #FF0000)" />
                <rect x="49" y="129" width="14" height="2.5" rx="1" fill="#FF4444" filter="drop-shadow(0 0 2px #FF0000)" />
            </g>
        </svg>
    )
}
