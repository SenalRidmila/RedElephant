'use client';

import React, { useState } from 'react';

const C = {
    dark: '#0A0705',
    cream: '#F8F5F0',
    gold: '#C9A96E',
    crimson: '#C41E3A',
    muted: '#8A8074',
    white: '#FFFFFF'
};

export default function ContactPage() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thank you for reaching out. Our travel experts will contact you shortly.');
        setFormState({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <main style={{ background: C.cream, minHeight: '100vh', color: C.dark }}>
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-up { animation: fadeUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
                .delay-1 { animation-delay: 0.1s; }
                .delay-2 { animation-delay: 0.2s; }
                .delay-3 { animation-delay: 0.3s; }

                .contact-card {
                    background: ${C.white};
                    padding: 40px;
                    border-radius: 24px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.03);
                    transition: transform 0.4s ease, box-shadow 0.4s ease;
                }
                .contact-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 60px rgba(0,0,0,0.06);
                }

                .input-group {
                    margin-bottom: 24px;
                }
                .input-group label {
                    display: block;
                    font-family: var(--font-accent);
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    margin-bottom: 8px;
                    color: ${C.muted};
                    font-weight: 700;
                }
                .input-group input, .input-group textarea {
                    width: 100%;
                    padding: 16px 20px;
                    border-radius: 12px;
                    border: 1.5px solid rgba(0,0,0,0.08);
                    background: ${C.cream}05;
                    font-family: var(--font-body);
                    font-size: 1rem;
                    transition: border-color 0.3s, background 0.3s;
                    outline: none;
                }
                .input-group input:focus, .input-group textarea:focus {
                    border-color: ${C.gold};
                    background: ${C.white};
                }

                .submit-btn {
                    background: linear-gradient(135deg, ${C.crimson}, #8B0000);
                    color: ${C.white};
                    border: none;
                    padding: 18px 40px;
                    border-radius: 50px;
                    font-family: var(--font-accent);
                    font-size: 0.9rem;
                    font-weight: 700;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: all 0.4s;
                    box-shadow: 0 10px 30px rgba(196, 30, 58, 0.3);
                    width: 100%;
                }
                .submit-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 15px 40px rgba(196, 30, 58, 0.45);
                }
            `}</style>

            {/* HERO */}
            <section style={{ 
                position: 'relative', height: '50vh', minHeight: 400, 
                background: C.dark, display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'url(/assets/index-hero.webp)',
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    opacity: 0.4, filter: 'grayscale(0.2)'
                }} />
                <div style={{ 
                    position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px'
                }}>
                    <div className="animate-up" style={{ 
                        display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 16 
                    }}>
                        <div style={{ width: 40, height: 1, background: C.gold }} />
                        <span style={{ 
                            fontFamily: 'var(--font-accent)', fontSize: '0.85rem', color: C.gold, 
                            letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700 
                        }}>Get In Touch</span>
                        <div style={{ width: 40, height: 1, background: C.gold }} />
                    </div>
                    <h1 className="animate-up delay-1" style={{ 
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
                        color: C.white, margin: 0, fontWeight: 900, letterSpacing: '-0.02em' 
                    }}>Contact Our Experts</h1>
                </div>
            </section>

            {/* CONTENT */}
            <section style={{ 
                maxWidth: 1200, margin: '-80px auto 120px', padding: '0 24px', 
                position: 'relative', zIndex: 10 
            }}>
                <div style={{ 
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                    gap: 32 
                }}>
                    {/* INFO COL */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                        <div className="contact-card animate-up delay-2">
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: 24, fontWeight: 800 }}>Office Headquarters</h3>
                            <p style={{ color: C.muted, lineHeight: 1.8, marginBottom: 0 }}>
                                Red Elephant Travels & Tours<br />
                                123 Luxury Avenue,<br />
                                Colombo 00700, Sri Lanka
                            </p>
                        </div>

                        <div className="contact-card animate-up delay-3">
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: 24, fontWeight: 800 }}>Connect Directly</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <div>
                                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: C.gold, fontWeight: 700, letterSpacing: '0.1em' }}>Phone</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>+94 11 234 5678</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: C.gold, fontWeight: 700, letterSpacing: '0.1em' }}>Email</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>hello@redelephant.com</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: C.gold, fontWeight: 700, letterSpacing: '0.1em' }}>WhatsApp</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>+94 77 123 4567</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FORM COL */}
                    <div className="contact-card animate-up delay-3" style={{ background: C.white }}>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: 32, fontWeight: 800 }}>Send Us a Message</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label>Full Name</label>
                                <input 
                                    type="text" required value={formState.name}
                                    onChange={e => setFormState({...formState, name: e.target.value})}
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="input-group">
                                <label>Email Address</label>
                                <input 
                                    type="email" required value={formState.email}
                                    onChange={e => setFormState({...formState, email: e.target.value})}
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div className="input-group">
                                <label>Subject</label>
                                <input 
                                    type="text" required value={formState.subject}
                                    onChange={e => setFormState({...formState, subject: e.target.value})}
                                    placeholder="Tour Inquiry"
                                />
                            </div>
                            <div className="input-group">
                                <label>Your Message</label>
                                <textarea 
                                    rows={5} required value={formState.message}
                                    onChange={e => setFormState({...formState, message: e.target.value})}
                                    placeholder="How can we help you plan your perfect journey?"
                                />
                            </div>
                            <button type="submit" className="submit-btn text-bold">Send Message</button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}
