'use client';

import { useState } from 'react';
import { FaqItem } from '../../data/packages';

interface Props {
    faq: FaqItem[];
    accent: string;
    isMobile: boolean;
    contactHref?: string;
}

const dark = '#1A1714';
const cream = '#F8F5F0';
const muted = '#8A8074';

export default function FaqSection({ faq, accent, isMobile, contactHref }: Props) {
    const [openIdx, setOpenIdx] = useState<number | null>(null);

    return (
        <div style={{ marginTop: isMobile ? 48 : 72 }}>
            {/* header */}
            <div style={{ textAlign: 'center', marginBottom: isMobile ? 28 : 44 }}>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    background: `${accent}18`, border: `1px solid ${accent}40`,
                    borderRadius: 50, padding: '6px 16px', marginBottom: 14,
                }}>
                    <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: accent }}>FAQ</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '1.6rem' : 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 900, color: dark, margin: '0 0 10px', letterSpacing: '-.02em' }}>
                    Frequently Asked Questions
                </h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: isMobile ? '.85rem' : '.95rem', color: muted, margin: 0 }}>
                    Everything you need to know before you go
                </p>
            </div>

            {/* accordion */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 800, margin: '0 auto' }}>
                {faq.map((item, i) => {
                    const isOpen = openIdx === i;
                    return (
                        <div key={i} style={{
                            background: 'white',
                            borderRadius: 16,
                            overflow: 'hidden',
                            boxShadow: isOpen
                                ? `0 6px 28px rgba(0,0,0,.09), 0 0 0 1.5px ${accent}44`
                                : '0 2px 8px rgba(0,0,0,.055)',
                            transition: 'box-shadow .3s ease',
                        }}>
                            <button
                                onClick={() => setOpenIdx(isOpen ? null : i)}
                                style={{
                                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    gap: 14, background: 'none', border: 'none', cursor: 'pointer',
                                    textAlign: 'left', padding: isMobile ? '16px 18px' : '20px 24px',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, minWidth: 0 }}>
                                    {/* number */}
                                    <div style={{
                                        width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                                        background: isOpen ? accent : `${accent}15`,
                                        border: `1.5px solid ${accent}30`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        transition: 'background .3s',
                                    }}>
                                        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 900, color: isOpen ? 'white' : accent }}>
                                            {i + 1}
                                        </span>
                                    </div>
                                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '.92rem' : '1rem', fontWeight: 700, color: dark, lineHeight: 1.3 }}>
                                        {item.question}
                                    </span>
                                </div>

                                {/* +/- icon */}
                                <div style={{
                                    width: 32, height: 32, borderRadius: '50%',
                                    background: isOpen ? accent : `${accent}12`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0,
                                    transition: 'background .3s',
                                }}>
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                                        stroke={isOpen ? 'white' : accent}
                                        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                                        style={{ transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform .3s ease' }}>
                                        <line x1="12" y1="5" x2="12" y2="19" />
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                </div>
                            </button>

                            {/* answer */}
                            <div style={{ maxHeight: isOpen ? 400 : 0, overflow: 'hidden', transition: 'max-height .48s cubic-bezier(.23,1,.32,1)' }}>
                                <div style={{ padding: isMobile ? '0 18px 18px 68px' : '0 24px 22px 74px' }}>
                                    <p style={{ fontFamily: 'var(--font-body)', fontSize: isMobile ? '.84rem' : '.9rem', color: muted, lineHeight: 1.8, margin: 0 }}>
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* CTA strip */}
            <div style={{
                marginTop: isMobile ? 28 : 44,
                background: `linear-gradient(135deg,${dark} 0%,#2A2420 100%)`,
                borderRadius: 20, padding: isMobile ? '24px 20px' : '32px 40px',
                display: 'flex', flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'flex-start' : 'center',
                justifyContent: 'space-between', gap: 20,
            }}>
                <div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '1.2rem' : '1.5rem', fontWeight: 800, color: 'white', marginBottom: 6, letterSpacing: '-.01em' }}>
                        Still have questions?
                    </div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.97rem', color: 'rgba(255,255,255,.5)', margin: 0 }}>
                        Our team typically replies within 2 hours
                    </p>
                </div>
                <a href={contactHref || '/#contact'} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 9,
                    background: `linear-gradient(135deg,${accent},${accent}BB)`,
                    color: 'white', textDecoration: 'none',
                    fontFamily: 'var(--font-accent)', fontSize: '0.8rem', fontWeight: 800,
                    letterSpacing: '.12em', textTransform: 'uppercase',
                    padding: '14px 26px', borderRadius: 50,
                    boxShadow: `0 6px 22px ${accent}55`, flexShrink: 0,
                    transition: 'transform .2s, box-shadow .2s',
                }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = `0 10px 28px ${accent}66`; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'none'; el.style.boxShadow = `0 6px 22px ${accent}55`; }}
                >
                    Chat With Us
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                </a>
            </div>
        </div>
    );
}
