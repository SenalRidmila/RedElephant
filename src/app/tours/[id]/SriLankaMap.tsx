'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPoint } from '../../data/packages';

interface Props {
    mapPoints: MapPoint[];
    mapRoutePoints: string;
    accent: string;
    isMobile: boolean;
}

const dark = '#1A1714';
const cream = '#F8F5F0';
const muted = '#8A8074';
const gold = '#C9A96E';

interface PopupState {
    point: MapPoint;
    visible: boolean;
}

export default function SriLankaMapSection({ mapPoints, mapRoutePoints, accent, isMobile }: Props) {
    const router = useRouter();
    const [popup, setPopup] = useState<PopupState | null>(null);
    const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);
    const [closeHover, setCloseHover] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);

    const openPopup = (pt: MapPoint) => setPopup({ point: pt, visible: true });
    const closePopup = () => setPopup(null);

    return (
        <div style={{
            background: dark,
            borderRadius: 28,
            overflow: 'hidden',
            marginBottom: isMobile ? 36 : 60,
            position: 'relative',
            height: isMobile ? 'auto' : '100vh'
        }}>
            <style>{`
                .map-scroll::-webkit-scrollbar { width: 6px; }
                .map-scroll::-webkit-scrollbar-track { background: transparent; }
                .map-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
            `}</style>

            {/* header row */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: 0,
                height: '100%'
            }}>
                {/* text side */}
                <div className="map-scroll" style={{
                    padding: isMobile ? '36px 24px 24px' : '52px 48px',
                    height: isMobile ? 'auto' : '100%',
                    overflowY: isMobile ? 'visible' : 'auto',
                    boxSizing: 'border-box'
                }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 7,
                        background: `${accent}22`, border: `1px solid ${accent}44`,
                        borderRadius: 50, padding: '6px 16px', marginBottom: 18
                    }}>
                        <span style={{ fontSize: '1.12rem' }}>🗺</span>
                        <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: accent }}>
                            Sri Lanka
                        </span>
                    </div>

                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '2.1rem' : 'clamp(2.4rem,5vw,3.6rem)', fontWeight: 900, color: 'white', margin: '0 0 16px', letterSpacing: '-.02em', lineHeight: 1.1 }}>
                        Explore<br />
                        <span style={{ background: `linear-gradient(90deg,${gold},#E8C990)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Your Route
                        </span>
                    </h2>

                    <p style={{ fontFamily: 'var(--font-body)', fontSize: isMobile ? '.95rem' : '1.15rem', color: 'rgba(255,255,255,.65)', lineHeight: 1.75, margin: '0 0 28px', maxWidth: 460 }}>
                        Trace your journey across Sri Lanka's diverse landscapes. Tap any destination on the map to discover activities and local secrets.
                    </p>

                    {/* destination list */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {mapPoints.map((pt, i) => (
                            <button key={pt.id} onClick={() => openPopup(pt)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 12,
                                    background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)',
                                    borderRadius: 12, padding: '10px 14px', cursor: 'pointer',
                                    textAlign: 'left', transition: 'all .25s ease',
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLButtonElement).style.background = `${accent}22`;
                                    (e.currentTarget as HTMLButtonElement).style.borderColor = `${accent}55`;
                                    setHoveredPoint(pt.id);
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,.06)';
                                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,.1)';
                                    setHoveredPoint(null);
                                }}
                            >
                                <div style={{ width: 38, height: 38, borderRadius: '50%', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 900, color: 'white' }}>{i + 1}</span>
                                </div>
                                <div style={{ minWidth: 0 }}>
                                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700, color: 'white' }}>{pt.name}</div>
                                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.17rem', color: 'rgba(255,255,255,.65)' }}>{pt.type}</div>
                                </div>
                                <svg style={{ flexShrink: 0, marginLeft: 'auto' }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                            </button>
                        ))}
                    </div>
                </div>

                {/* map side */}
                <div style={{
                    position: 'relative',
                    minHeight: isMobile ? 320 : 'auto',
                    height: isMobile ? 'auto' : '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: isMobile ? '0 24px 36px' : '36px 48px 36px 36px',
                    boxSizing: 'border-box'
                }}>
                    <div style={{
                        position: 'relative',
                        height: isMobile ? 'auto' : '100%',
                        maxHeight: isMobile ? 'auto' : 'calc(100vh - 72px)',
                        aspectRatio: '100/134',
                        width: isMobile ? '100%' : 'auto',
                        maxWidth: '100%'
                    }}>
                        {/* Map image */}
                        <img
                            src="/assets/slmap.png"
                            alt="Sri Lanka Relief Map"
                            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', filter: 'brightness(0.7) saturate(0.8)' }}
                            onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                        />

                        {/* SVG overlay */}
                        <svg
                            viewBox="0 0 100 134"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        >
                            {/* Route polygon */}
                            {mapRoutePoints && (
                                <polyline
                                    points={mapRoutePoints}
                                    fill="none"
                                    stroke={accent}
                                    strokeWidth="0.8"
                                    strokeDasharray="2 1.5"
                                    opacity="0.7"
                                />
                            )}

                            {/* Location markers */}
                            {mapPoints.map((pt, i) => (
                                <g key={pt.id} className="map-marker"
                                    style={{
                                        cursor: 'pointer',
                                        transformOrigin: `${pt.cx}px ${pt.cy}px`,
                                        transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                        transform: hoveredPoint === pt.id ? 'scale(1.65)' : 'scale(1)',
                                        zIndex: hoveredPoint === pt.id ? 100 : 1
                                    }}
                                    onClick={() => openPopup(pt)}
                                    onMouseEnter={() => setHoveredPoint(pt.id)}
                                    onMouseLeave={() => setHoveredPoint(null)}
                                >
                                    {/* pulse ring */}
                                    <circle cx={pt.cx} cy={pt.cy} r="2.5" fill={accent} opacity="0.18">
                                        <animate attributeName="r" values="2.5;5;2.5" dur="2.5s" repeatCount="indefinite" />
                                        <animate attributeName="opacity" values="0.18;0;0.18" dur="2.5s" repeatCount="indefinite" />
                                    </circle>
                                    {/* dot */}
                                    <circle cx={pt.cx} cy={pt.cy} r="1.5" fill={accent} stroke="white" strokeWidth="0.6" />
                                    {/* number badge */}
                                    <circle cx={pt.cx} cy={pt.cy - 4.2} r="2" fill={dark} stroke={accent} strokeWidth="0.5" />
                                    <text x={pt.cx} y={pt.cy - 3.4} textAnchor="middle" dominantBaseline="middle"
                                        style={{ fontFamily: 'sans-serif', fontSize: '2.1px', fontWeight: 700, fill: 'white' }}>
                                        {i + 1}
                                    </text>
                                    {/* label */}
                                    <text x={pt.cx + 3.2} y={pt.cy + 0.3} textAnchor="start" dominantBaseline="middle"
                                        style={{ fontFamily: 'sans-serif', fontSize: '2.8px', fontWeight: 600, fill: 'white', textShadow: '0 1px 3px rgba(0,0,0,.8)' }}>
                                        {pt.name}
                                    </text>
                                </g>
                            ))}
                        </svg>
                    </div>
                </div>
            </div>

            {/* ── Popup overlay ── */}
            {popup && (
                <div
                    onClick={closePopup}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 9000,
                        background: 'rgba(0,0,0,.65)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: 20,
                        backdropFilter: 'blur(4px)',
                        animation: 'tdFadeUp .3s ease',
                    }}
                >
                    <div
                        onClick={e => e.stopPropagation()}
                        style={{
                            background: 'white',
                            borderRadius: 22,
                            overflow: 'hidden',
                            width: '100%',
                            maxWidth: 420,
                            boxShadow: '0 32px 80px rgba(0,0,0,.35)',
                        }}
                    >
                        {/* img */}
                        {popup.point.image && (
                            <div style={{ height: 220, overflow: 'hidden', position: 'relative' }}>
                                <img
                                    src={popup.point.image}
                                    alt={popup.point.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={e => { (e.currentTarget as HTMLImageElement).parentElement!.style.display = 'none'; }}
                                />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,transparent 50%,rgba(0,0,0,.5) 100%)' }} />
                                <div style={{ position: 'absolute', top: 16, right: 16 }}>
                                    <button
                                        onClick={closePopup}
                                        onMouseEnter={() => setCloseHover(true)}
                                        onMouseLeave={() => setCloseHover(false)}
                                        style={{
                                            width: 34, height: 34, borderRadius: '50%', background: 'rgba(0,0,0,.4)', border: '1px solid rgba(255,255,255,.3)',
                                            color: 'white', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            transition: 'transform 0.3s ease, background 0.3s ease',
                                            transform: closeHover ? 'rotate(90deg)' : 'none'
                                        }}>✕</button>
                                </div>
                            </div>
                        )}

                        {/* body */}
                        <div style={{ padding: '22px 24px 26px' }}>
                            <div style={{ display: 'inline-block', background: `${accent}18`, border: `1px solid ${accent}40`, borderRadius: 50, padding: '4px 12px', marginBottom: 10 }}>
                                <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: accent }}>
                                    {popup.point.type}
                                </span>
                            </div>
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.7rem', fontWeight: 900, color: dark, margin: '0 0 10px', letterSpacing: '-.02em' }}>
                                {popup.point.name}
                            </h3>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: muted, lineHeight: 1.7, margin: '0 0 20px' }}>
                                {popup.point.description}
                            </p>
                            <button onClick={() => { setIsNavigating(true); router.push(`/destinations/${popup.point.id}`); }} style={{
                                width: '100%', padding: '13px', borderRadius: 12, border: 'none', cursor: 'pointer',
                                background: dark, color: 'white', fontFamily: 'var(--font-accent)', fontSize: '0.84rem',
                                fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase',
                                transition: 'background .25s',
                            }}
                                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = accent; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = dark; }}
                            >
                                {isNavigating ? 'Loading...' : 'Visit Location \u2192'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Loading Overlay */}
            {isNavigating && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 10000,
                    background: 'rgba(26,23,20, 0.95)', backdropFilter: 'blur(15px)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white',
                    animation: 'tdFadeUp 0.3s ease'
                }}>
                    <style>{`
                        @keyframes spinLock { 100% { transform: rotate(360deg); } }
                    `}</style>
                    <div style={{
                        width: 60, height: 60, border: '3px solid rgba(255,255,255,0.05)',
                        borderTopColor: gold, borderRadius: '50%', animation: 'spinLock 1s cubic-bezier(0.4, 0, 0.2, 1) infinite'
                    }} />
                    <div style={{ marginTop: 24, fontFamily: 'var(--font-accent)', letterSpacing: '.3em', fontSize: '0.82rem', color: gold, textTransform: 'uppercase', fontWeight: 700 }}>
                        Preparing Journey...
                    </div>
                </div>
            )}
        </div>
    );
}
