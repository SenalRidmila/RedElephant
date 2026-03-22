'use client';

import React, { useState } from 'react';

const C = {
    dark: '#0A0705',
    cream: '#F8F5F0',
    gold: '#C9A96E',
    crimson: '#C41E3A',
    muted: '#8A8074',
    white: '#FFFFFF',
    border: 'rgba(0,0,0,0.06)'
};

const FAQS = [
    {
        q: "What is the best time to visit Sri Lanka?",
        a: "Sri Lanka is a year-round destination, but the best time depends on which coast you plan to visit. For the West and South coasts, December to April is ideal. For the East coast, May to September offers the best weather."
    },
    {
        q: "Do I need a visa to enter Sri Lanka?",
        a: "Yes, most travelers require an Electronic Travel Authorization (ETA) to enter Sri Lanka. You can apply online before your trip at the official government website. It's a quick process for most nationalities."
    },
    {
        q: "Are your tours customizable?",
        a: "Absolutely! We specialize in bespoke journeys. While we have curated packages, every itinerary can be tailored to your specific interests, budget, and travel dates."
    },
    {
        q: "What should I pack for my trip?",
        a: "Pack light, breathable cotton clothing for the heat. If you're visiting the Hill Country (Nuwara Eliya), bring a light sweater/jacket as it can get chilly. Don't forget comfortable walking shoes for ancient sites and a reusable water bottle."
    },
    {
        q: "Is it safe to travel in Sri Lanka?",
        a: "Sri Lanka is generally a very safe country for tourists. The local people are known for their hospitality. Like any travel destination, we recommend standard precautions and following local advisories."
    }
];

export default function FAQPage() {
    const [openIdx, setOpenIdx] = useState<number | null>(0);

    return (
        <main style={{ background: C.cream, minHeight: '100vh', paddingBottom: 120 }}>
            <style>{`
                @keyframes slideDown {
                    from { opacity: 0; max-height: 0; }
                    to { opacity: 1; max-height: 500px; }
                }
                .faq-item {
                    background: ${C.white};
                    border-radius: 20px;
                    margin-bottom: 16px;
                    overflow: hidden;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.02);
                    transition: all 0.3s ease;
                    border: 1px solid ${C.border};
                }
                .faq-item.active {
                    box-shadow: 0 20px 40px rgba(0,0,0,0.05);
                    border-color: ${C.gold}44;
                }
                .faq-trigger {
                    width: 100%;
                    padding: 28px 32px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: none;
                    border: none;
                    cursor: pointer;
                    text-align: left;
                }
                .faq-trigger h3 {
                    margin: 0;
                    font-family: var(--font-heading);
                    font-size: 1.25rem;
                    color: ${C.dark};
                    font-weight: 700;
                    padding-right: 20px;
                }
                .faq-icon {
                    width: 24px;
                    height: 24px;
                    background: ${C.cream};
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    color: ${C.gold};
                    transition: transform 0.3s ease;
                }
                .active .faq-icon { transform: rotate(45deg); color: ${C.crimson}; }
                
                .faq-content {
                    padding: 0 32px 32px;
                    font-family: var(--font-body);
                    font-size: 1.05rem;
                    line-height: 1.8;
                    color: ${C.muted};
                    animation: slideDown 0.4s ease forwards;
                }
            `}</style>

            {/* HEADER */}
            <section style={{ 
                padding: '120px 24px 80px', textAlign: 'center', maxWidth: 800, margin: '0 auto' 
            }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <div style={{ width: 30, height: 1, background: C.gold }} />
                    <span style={{ 
                        fontFamily: 'var(--font-accent)', fontSize: '0.8rem', color: C.gold, 
                        letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700 
                    }}>Common Inquiries</span>
                    <div style={{ width: 30, height: 1, background: C.gold }} />
                </div>
                <h1 style={{ 
                    fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
                    color: C.dark, margin: '0 0 20px', fontWeight: 900 
                }}>Frequently Asked Questions</h1>
                <p style={{ 
                    fontFamily: 'var(--font-body)', fontSize: '1.2rem', color: C.muted, 
                    maxWidth: 600, margin: '0 auto' 
                }}>Everything you need to know about planning your extraordinary Sri Lankan journey with us.</p>
            </section>

            {/* FAQ LIST */}
            <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
                {FAQS.map((faq, i) => (
                    <div key={i} className={`faq-item ${openIdx === i ? 'active' : ''}`}>
                        <button className="faq-trigger" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                            <h3>{faq.q}</h3>
                            <div className="faq-icon">
                                {openIdx === i ? '✕' : '+'}
                            </div>
                        </button>
                        {openIdx === i && (
                            <div className="faq-content">
                                {faq.a}
                            </div>
                        )}
                    </div>
                ))}
            </section>

            {/* CTA */}
            <section style={{ marginTop: 80, textAlign: 'center' }}>
                <p style={{ color: C.muted, fontFamily: 'var(--font-body)' }}>Still have questions?</p>
                <a href="/contact" style={{ 
                    display: 'inline-block', color: C.crimson, fontWeight: 700, 
                    textDecoration: 'none', borderBottom: `2px solid ${C.crimson}`,
                    fontFamily: 'var(--font-accent)', fontSize: '0.9rem', paddingBottom: 4,
                    textTransform: 'uppercase', letterSpacing: '0.1em'
                }}>
                    Contact our support team
                </a>
            </section>
        </main>
    );
}
