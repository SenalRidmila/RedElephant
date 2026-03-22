import Image from 'next/image';

export const metadata = {
    title: 'About Us | Red Elephant Travels & Tours',
    description: 'Learn about the passionate team behind Sri Lanka\'s premier luxury travel experiences.',
};

export default function AboutPage() {
    return (
        <main style={{ background: 'var(--color-dark)', minHeight: '100vh', overflowX: 'hidden' }}>

            {/* 1. HERO SECTION */}
            <section style={{
                position: 'relative',
                height: '75vh',
                minHeight: '600px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                paddingTop: '80px',
            }}>
                {/* Background image */}
                <div style={{ position: 'absolute', inset: 0 }}>
                    <Image
                        src="/assets/travel-in-Sri-Lanka.webp"
                        alt="Sri Lanka landscape"
                        fill
                        style={{ objectFit: 'cover', transform: 'scale(1.05)' }}
                        priority
                    />
                </div>
                
                {/* Gradient Overlay */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, rgba(26,23,20,0.4), rgba(26,23,20,0.8) 70%, var(--color-dark))',
                }} />

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '800px', padding: '0 24px' }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '24px',
                    }}>
                        <span style={{ width: '40px', height: '1px', background: 'var(--color-gold)' }} />
                        <span style={{
                            fontFamily: 'var(--font-accent)', fontSize: '0.87rem', fontWeight: 700,
                            letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--color-gold)',
                        }}>Our Story</span>
                        <span style={{ width: '40px', height: '1px', background: 'var(--color-gold)' }} />
                    </div>
                    
                    <h1 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(3rem, 6vw, 5rem)',
                        fontWeight: 900,
                        color: 'white',
                        lineHeight: 1.1,
                        letterSpacing: '-0.02em',
                        marginBottom: '32px',
                        textShadow: '0 20px 40px rgba(0,0,0,0.5)'
                    }}>
                        Crafting <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--color-gold)' }}>unforgettable</span> journeys since 2009.
                    </h1>

                    <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                        color: 'rgba(255,255,255,0.7)',
                        lineHeight: 1.8,
                        maxWidth: '640px',
                        margin: '0 auto',
                    }}>
                        We believe that travel is the ultimate artisan craft. For over a decade, we have been tailoring the most extraordinary, bespoke experiences across the paradise island of Sri Lanka.
                    </p>
                </div>
            </section>

            {/* 2. THE PHILOSOPHY (Split Layout) */}
            <section style={{ padding: 'clamp(80px, 12vw, 140px) 24px', background: 'var(--color-dark)' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(40px, 8vw, 100px)', alignItems: 'center' }}>
                    
                    {/* Image side */}
                    <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: '24px', overflow: 'hidden' }}>
                        <Image src="/assets/culture-and-heritage-top-banner.webp" alt="Sri Lankan Culture" fill style={{ objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(201,169,110,0.2)', borderRadius: '24px', zIndex: 2 }} />
                    </div>

                    {/* Text side */}
                    <div>
                        <h2 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                            fontWeight: 800,
                            color: 'white',
                            lineHeight: 1.1,
                            marginBottom: '32px',
                        }}>
                            More than a <span style={{ color: 'var(--color-primary)' }}>destination.</span><br />
                            A feeling.
                        </h2>
                        
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.15rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '24px' }}>
                            Red Elephant Travels was born from a profound love for our island home. Sri Lanka isn't just a place you visit; it's an emotion you feel. From the mist-draped tea estates to the golden, sun-kissed coastlines, this island pulses with a rhythm unlike any other on Earth.
                        </p>
                        
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.15rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '40px' }}>
                            Our mission is simple: to share this deep, authentic love with our guests. We don't just sell tour packages. We design living, breathing adventures that connect you intimately with the soul of Sri Lanka.
                        </p>

                        <div style={{ display: 'flex', gap: '32px' }}>
                            <div>
                                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-gold)' }}>15+</div>
                                <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.87rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginTop: '8px' }}>Years Experience</div>
                            </div>
                            <div>
                                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-gold)' }}>5000+</div>
                                <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.87rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginTop: '8px' }}>Happy Travelers</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. OUR VALUES (3 Column Grid) */}
            <section style={{ padding: 'clamp(80px, 12vw, 140px) 24px', background: '#141210' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 800, color: 'white', marginBottom: '24px' }}>
                            The <span style={{ color: 'var(--color-gold)' }}>Red Elephant</span> Standard
                        </h2>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.15rem', color: 'rgba(255,255,255,0.5)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
                            We operate on three foundational pillars that guarantee an extraordinary, stress-free, and inspiring holiday.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                        gap: '40px',
                    }}>
                        {[
                            { 
                                title: 'Uncompromising Luxury', 
                                desc: 'We handpick every boutique hotel, eco-lodge, and private villa. From thread counts to private chefs, we obsess over details so you don\'t have to.',
                                icon: '✨'
                            },
                            { 
                                title: 'Authentic Local Insights', 
                                desc: 'Experience Sri Lanka like an insider. We bypass tourist traps and open doors to private estates, secret beaches, and genuine local communities.',
                                icon: '🌴'
                            },
                            { 
                                title: 'Sustainable & Ethical', 
                                desc: 'We fiercely protect our island. All our tours prioritize eco-friendly partners, support local artisans, and respect the natural wildlife habitats.',
                                icon: '🍃'
                            }
                        ].map(value => (
                            <div key={value.title} className="about-value-card" style={{
                                padding: '48px 32px',
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(255,255,255,0.05)',
                                borderRadius: '24px',
                                transition: 'transform 0.3s ease, background 0.3s ease',
                                cursor: 'default',
                            }}>
                                <div style={{
                                    width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(201,169,110,0.1)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem',
                                    marginBottom: '32px', border: '1px solid rgba(201,169,110,0.2)'
                                }}>
                                    {value.icon}
                                </div>
                                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, color: 'white', marginBottom: '16px' }}>
                                    {value.title}
                                </h3>
                                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.17rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8 }}>
                                    {value.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. MEET THE TEAM */}
            <section style={{ padding: 'clamp(80px, 12vw, 140px) 24px', background: 'var(--color-dark)' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '16px',
                        }}>
                            <span style={{ width: '30px', height: '1px', background: 'var(--color-primary)' }} />
                            <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.87rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-primary)' }}>Leadership</span>
                            <span style={{ width: '30px', height: '1px', background: 'var(--color-primary)' }} />
                        </div>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 800, color: 'white', marginBottom: '24px' }}>
                            Meet the <span style={{ color: 'var(--color-gold)' }}>Visionaries</span>
                        </h2>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.15rem', color: 'rgba(255,255,255,0.5)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
                            The passionate travel experts and founders behind Red Elephant Travels, dedicated to crafting your perfect Sri Lankan adventure.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                        gap: '32px',
                    }}>
                        {[
                            { name: 'John Doe', role: 'Chief Executive Officer', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80&auto=format&fit=crop' },
                            { name: 'Jane Smith', role: 'Head of Operations', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80&auto=format&fit=crop' },
                            { name: 'David Johnson', role: 'Lead Tour Architect', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80&auto=format&fit=crop' },
                            { name: 'Sarah Williams', role: 'Client Experience Director', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80&auto=format&fit=crop' },
                        ].map((member, i) => (
                            <div key={i} className="team-card" style={{
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(255,255,255,0.05)',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                transition: 'transform 0.4s ease, border-color 0.4s ease',
                                cursor: 'default',
                            }}>
                                <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5', overflow: 'hidden' }}>
                                    <div className="team-img-wrapper" style={{ position: 'absolute', inset: 0, transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)' }}>
                                        <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,18,16,0.95), transparent 60%)', zIndex: 1 }} />
                                    
                                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px', zIndex: 2 }}>
                                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', fontWeight: 700, color: 'white', marginBottom: '8px' }}>
                                            {member.name}
                                        </h3>
                                        <p style={{ fontFamily: 'var(--font-accent)', fontSize: '0.9rem', color: 'var(--color-gold)', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0, fontWeight: 700 }}>
                                            {member.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. FINAL CTA */}
            <section className="about-cta-section" style={{ padding: 'clamp(80px, 12vw, 140px) 24px', background: '#110F0D', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ width: '60px', height: '60px', margin: '0 auto 32px', background: 'var(--color-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, color: 'white', marginBottom: '24px' }}>
                        Ready to write your Sri Lankan Chapter?
                    </h2>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '48px' }}>
                        Our expert travel designers are standing by to curate an itinerary that exceeds every imagination. 
                    </p>
                    <a href="/#contact" className="about-cta-btn" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '18px 40px',
                        background: 'var(--gradient-primary)',
                        color: 'white',
                        fontFamily: 'var(--font-accent)',
                        fontSize: '0.97rem',
                        fontWeight: 800,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        borderRadius: '50px',
                        boxShadow: 'var(--shadow-red)',
                        transition: 'all 0.3s ease',
                    }}>
                        Design My Journey
                    </a>
                </div>
            </section>

            <style>{`
                .about-value-card:hover {
                    transform: translateY(-8px);
                    background: rgba(255,255,255,0.04) !important;
                }
                .about-cta-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 20px 40px rgba(196,30,58,0.5) !important;
                }
                .team-card:hover {
                    transform: translateY(-8px);
                    border-color: rgba(201,169,110,0.3) !important;
                }
                .team-card:hover .team-img-wrapper {
                    transform: scale(1.08);
                }
            `}</style>
        </main>
    );
}
