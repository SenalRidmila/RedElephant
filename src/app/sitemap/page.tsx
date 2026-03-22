'use client';

import React from 'react';
import Link from 'next/link';

const C = {
    dark: '#0A0705',
    cream: '#F8F5F0',
    gold: '#C9A96E',
    crimson: '#C41E3A',
    muted: '#8A8074',
    white: '#FFFFFF',
    border: 'rgba(0,0,0,0.06)'
};

const SITE_STRUCTURE = [
    {
        title: "Main Navigation",
        links: [
            { label: "Home", href: "/" },
            { label: "About Us", href: "/about" },
            { label: "Tour Packages", href: "/packages" },
            { label: "Wellness", href: "/wellness" },
            { label: "Weddings", href: "/weddings" },
            { label: "Contact Us", href: "/contact" }
        ]
    },
    {
        title: "Support & Legal",
        links: [
            { label: "FAQ", href: "/faq" },
            { label: "Booking Policy", href: "/booking-policy" },
            { label: "Privacy Policy", href: "/privacy-policy" },
            { label: "Terms & Conditions", href: "/terms-and-conditions" }
        ]
    },
    {
        title: "Destinations",
        links: [
            { label: "Cultural Classic", href: "/tours/cultural-classic" },
            { label: "Nature & Wildlife", href: "/tours/nature-wildlife" },
            { label: "Beach Escape", href: "/tours/beach-escape" }
        ]
    }
];

export default function SitemapPage() {
    return (
        <main style={{ background: C.cream, minHeight: '100vh', paddingBottom: 120 }}>
            <style>{`
                .map-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 40px;
                    background: ${C.white};
                    padding: 60px;
                    border-radius: 32px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.03);
                    border: 1px solid ${C.border};
                    margin-top: -60px;
                    position: relative;
                    z-index: 10;
                }
                .map-title {
                    font-family: var(--font-heading);
                    font-size: 1.5rem;
                    color: ${C.dark};
                    margin-bottom: 24px;
                    font-weight: 800;
                    letter-spacing: -0.01em;
                }
                .map-link {
                    display: block;
                    font-family: var(--font-body);
                    font-size: 1.1rem;
                    color: ${C.muted};
                    text-decoration: none;
                    margin-bottom: 12px;
                    transition: all 0.3s;
                    padding-left: 0;
                }
                .map-link:hover {
                    color: ${C.crimson};
                    transform: translateX(8px);
                }
                @media (max-width: 640px) {
                    .map-grid { padding: 40px 24px; margin-top: -40px; gap: 32px; }
                    .map-title { font-size: 1.3rem; }
                    .map-link { font-size: 1rem; }
                }
            `}</style>

            {/* HEADER */}
            <section style={{ 
                padding: '160px 24px 120px', textAlign: 'center', background: C.dark, color: C.white,
                overflow: 'hidden', position: 'relative'
            }}>
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'url(/assets/cultural-heritage.webp)',
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    opacity: 0.2, filter: 'grayscale(0.5)'
                }} />
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                        <div style={{ width: 40, height: 1, background: C.gold }} />
                        <span style={{ 
                            fontFamily: 'var(--font-accent)', fontSize: '0.85rem', color: C.gold, 
                            letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700 
                        }}>Site Structure</span>
                        <div style={{ width: 40, height: 1, background: C.gold }} />
                    </div>
                    <h1 style={{ 
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', 
                        margin: 0, fontWeight: 900, letterSpacing: '-0.02em' 
                    }}>Sitemap</h1>
                </div>
            </section>

            {/* CONTENT */}
            <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
                <div className="map-grid">
                    {SITE_STRUCTURE.map((site, i) => (
                        <div key={i}>
                            <h2 className="map-title">{site.title}</h2>
                            <div>
                                {site.links.map((link, j) => (
                                    <Link key={j} href={link.href} className="map-link">
                                        • {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
