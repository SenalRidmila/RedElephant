'use client';

import React from 'react';

const C = {
    dark: '#0A0705',
    cream: '#F8F5F0',
    gold: '#C9A96E',
    crimson: '#C41E3A',
    muted: '#8A8074',
    white: '#FFFFFF',
    border: 'rgba(0,0,0,0.06)'
};

const SECTIONS = [
    {
        title: "1. Acceptance of Terms",
        p: "By using our website and services, you agree to comply with and be bound by these terms and conditions. If you do not agree to these terms, please do not use our services."
    },
    {
        title: "2. Booking and Payments",
        p: "All bookings are subject to availability and these terms. Payments must be made in accordance with our booking policy. We reserve the right to cancel any booking for which payment is not received in a timely manner."
    },
    {
        title: "3. User Conduct",
        p: "You agree to use our services only for lawful purposes. You must not use our website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website."
    },
    {
        title: "4. Intellectual Property",
        p: "All content on our website, including text, images, logos, and designs, is the property of Red Elephant Travels & Tours and is protected by intellectual property laws. You must not use any content from our website without our prior written consent."
    },
    {
        title: "5. Limitation of Liability",
        p: "Red Elephant Travels & Tours will not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of our services or website. We do not guarantee the completeness or accuracy of any information on our website."
    },
    {
        title: "6. Changes to Terms",
        p: "We reserve the right to modify these terms and conditions at any time. Any changes will be posted on our website and will take effect immediately upon posting."
    }
];

export default function TermsConditionsPage() {
    return (
        <main style={{ background: C.cream, minHeight: '100vh', paddingBottom: 120 }}>
            <style>{`
                .policy-card {
                    background: ${C.white};
                    padding: 60px;
                    border-radius: 32px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.03);
                    border: 1px solid ${C.border};
                    margin-top: -60px;
                    position: relative;
                    z-index: 10;
                }
                .policy-title {
                    font-family: var(--font-heading);
                    font-size: 1.6rem;
                    color: ${C.dark};
                    margin-bottom: 24px;
                    font-weight: 800;
                    letter-spacing: -0.01em;
                }
                .policy-text {
                    font-family: var(--font-body);
                    font-size: 1.15rem;
                    line-height: 1.9;
                    color: ${C.muted};
                    margin-bottom: 48px;
                    font-weight: 300;
                }
                @media (max-width: 640px) {
                    .policy-card { padding: 40px 24px; margin-top: -40px; }
                    .policy-title { font-size: 1.4rem; }
                    .policy-text { font-size: 1rem; }
                }
            `}</style>

            {/* HEADER */}
            <section style={{ 
                padding: '160px 24px 120px', textAlign: 'center', background: C.dark, color: C.white,
                overflow: 'hidden', position: 'relative'
            }}>
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'url(/assets/about-hero.webp)',
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    opacity: 0.25, filter: 'grayscale(0.5)'
                }} />
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                        <div style={{ width: 40, height: 1, background: C.gold }} />
                        <span style={{ 
                            fontFamily: 'var(--font-accent)', fontSize: '0.85rem', color: C.gold, 
                            letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700 
                        }}>Legal Agreement</span>
                        <div style={{ width: 40, height: 1, background: C.gold }} />
                    </div>
                    <h1 style={{ 
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', 
                        margin: 0, fontWeight: 900, letterSpacing: '-0.02em' 
                    }}>Terms & Conditions</h1>
                </div>
            </section>

            {/* CONTENT */}
            <section style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
                <div className="policy-card">
                    {SECTIONS.map((sec, i) => (
                        <div key={i}>
                            <h2 className="policy-title">{sec.title}</h2>
                            <p className="policy-text">{sec.p}</p>
                            {i < SECTIONS.length - 1 && <div style={{ height: 1, background: C.border, marginBottom: 48 }} />}
                        </div>
                    ))}
                    <div style={{ marginTop: 40, borderTop: `1px solid ${C.border}`, padding: '40px 0 0', textAlign: 'center' }}>
                         <p style={{ color: C.muted, fontFamily: 'var(--font-body)', fontSize: '1.2rem' }}>Last updated: March 20, 2026</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
