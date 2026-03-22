'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';

const crimson = '#C41E3A';
const dark = '#1A1714';
const muted = '#8A8074';
const gold = '#C9A96E';

const posts = [
    {
        id: 'sigiriya', category: 'Culture', categoryColor: '#B97C3A',
        title: "Climbing Sigiriya: The Complete Traveller's Guide",
        excerpt: 'Everything you need to know before ascending the legendary Lion Rock — from best times to hidden frescoes most visitors miss.',
        image: '/assets/sigiriya-home-1.webp', author: 'Amara Perera', date: 'Feb 18, 2026', readTime: '7 min', featured: true,
        tourLink: '/tours/cultural-classic',
        body: [
            { type: 'intro', text: "Rising 200 metres above the central plains, Sigiriya is more than an ancient fortress — it is one of Asia's most dramatic archaeological wonders. Built by King Kasyapa in the 5th century AD, this UNESCO World Heritage Site draws hundreds of thousands of visitors each year, yet many still arrive unprepared for its sheer scale and beauty." },
            { type: 'heading', text: 'When to Visit' },
            { type: 'paragraph', text: "The ideal window is between January and April, when rainfall is minimal and morning mists clear by 7 AM. We recommend arriving at the ticket counter before 6:30 AM — not only to avoid the midday heat, but to experience the rock bathed in golden sunrise light, with barely another soul on the staircases." },
            { type: 'heading', text: 'The Mirror Wall & Frescoes' },
            { type: 'paragraph', text: "Halfway up the western face, a sheltered gallery houses the famous Sigiriya Frescoes — voluptuous celestial maidens painted with remarkable precision. The adjacent Mirror Wall, once polished so smooth it reflected the king's image as he walked past, still bears graffiti-poems dating back 1,500 years." },
            { type: 'heading', text: "The Lion's Paw Terrace" },
            { type: 'paragraph', text: "At the base of the final ascent, two colossal lion paws carved from the living rock guard the entrance to the summit. Originally, a full lion's head framed the narrow staircase — visitors literally walked through the lion's jaws to reach the palace above. Today only the paws remain, but they are still breathtaking." },
            { type: 'heading', text: 'The Summit Palace' },
            { type: 'paragraph', text: "The flat summit stretches across 1.6 hectares — an astonishing engineering feat for its time. You'll find the foundations of the royal palace, a throne carved into the rock, swimming pools fed by a sophisticated hydraulic system, and panoramic views that stretch to the distant Knuckles Range." },
            { type: 'quote', text: "Stand at the summit at dawn and you understand why Kasyapa chose this rock — it is not a fortress, it is a throne in the sky." },
        ],
    },
    {
        id: 'whales', category: 'Wildlife', categoryColor: '#D4842A',
        title: '10 Best Whale Watching Spots in Sri Lanka',
        excerpt: 'Blue whales just kilometres from shore — we reveal the secret coves where marine giants gather.',
        image: '/assets/kalpitiya-dolphin.webp', author: 'Ravi Silva', date: 'Feb 12, 2026', readTime: '5 min', featured: false,
        tourLink: '/tours/wildlife-safari',
        body: [
            { type: 'intro', text: "Sri Lanka is one of the very few places on Earth where you can see the largest animal that has ever lived — the blue whale — from a small boat just 5 kilometres offshore. The deep continental shelf drops sharply along the island's southern coast, creating a superhighway for migrating cetaceans." },
            { type: 'heading', text: 'Mirissa: The Classic Choice' },
            { type: 'paragraph', text: "Between November and April, Mirissa harbour becomes the whale-watching capital of Asia. Early-morning departures take you to the feeding grounds within an hour. Blue whales, sperm whales, Bryde's whales and playful pods of spinner dolphins are regularly sighted." },
            { type: 'heading', text: 'Trincomalee: The Eastern Secret' },
            { type: 'paragraph', text: "From May to September, when the monsoon shifts, the action moves to the east coast. Trincomalee's deep natural harbour has been a naval asset for centuries — and it sits right on the whale migration route. Fewer boats, fewer tourists, equally spectacular encounters." },
            { type: 'heading', text: 'Kalpitiya: Dolphins by the Thousand' },
            { type: 'paragraph', text: "The shallow waters of Kalpitiya lagoon host what is arguably the largest concentration of spinner dolphins in the world. Pods of 500–1,000 animals are common. On exceptional days, the ocean surface erupts with over 2,000 dolphins leaping in unison — an unforgettable spectacle." },
            { type: 'quote', text: "In Sri Lanka, you don't chase the whales. You wait, and the ocean delivers them to you." },
        ],
    },
    {
        id: 'tea', category: 'Nature', categoryColor: '#52B788',
        title: 'The Tea Trails of Nuwara Eliya',
        excerpt: 'Walk through a living landscape — misty ridges, silver cascades and the scent of fresh-plucked Pekoe.',
        image: '/assets/hill-country-home-1.webp', author: 'Priya Jay', date: 'Feb 5, 2026', readTime: '6 min', featured: false,
        tourLink: '/tours/highland-retreat',
        body: [
            { type: 'intro', text: "Above 1,800 metres, where the air turns crisp and the green deepens to emerald, lies Sri Lanka's tea country — a patchwork of manicured estates, cloud forest and colonial bungalows unchanged since the 1880s. Walking these trails is stepping into a living painting." },
            { type: 'heading', text: 'Pedro Estate Walk' },
            { type: 'paragraph', text: "Begin at the Pedro Tea Factory — one of the oldest in the region — and wind through hectares of clipped tea bushes that cascade down the hillside. Pluckers in bright saris move rhythmically between the rows, their fingers selecting only the bud and two leaves that define Ceylon's finest orange pekoe." },
            { type: 'heading', text: 'Lovers Leap Waterfall' },
            { type: 'paragraph', text: "A hidden trail from the factory leads to this 30-metre cascade, named after a local legend of star-crossed lovers. The mist from the falls catches the morning light, creating miniature rainbows that dance above the tea bushes below." },
            { type: 'heading', text: 'The Hill Club Experience' },
            { type: 'paragraph', text: "End your day with afternoon tea at the legendary Hill Club, where jacket-and-tie dress codes persist, fires crackle in stone hearths, and the scones arrive with clotted cream and locally made strawberry preserve. Time, quite literally, stands still." },
            { type: 'quote', text: "Tea is not just a beverage here — it is the landscape, the livelihood, and the soul of the highlands." },
        ],
    },
    {
        id: 'galle', category: 'Heritage', categoryColor: '#9B7EBD',
        title: 'Galle Fort After Dark: A Colonial Time Capsule',
        excerpt: 'When day-trippers leave, the old Dutch fort transforms into candlelit tables and sea breezes.',
        image: '/assets/galle-1.webp', author: 'Amara Perera', date: 'Jan 28, 2026', readTime: '4 min', featured: false,
        tourLink: '/tours/coastal-escape',
        body: [
            { type: 'intro', text: "By day, Galle Fort bustles with tourists, gem sellers and tuk-tuks. But after 6 PM, when the last tour bus rumbles out through the Main Gate, a remarkable transformation begins. The 400-year-old Dutch colonial fortress becomes an intimate, candlelit village where you can hear the Indian Ocean lapping at the ramparts." },
            { type: 'heading', text: 'Sunset at Flag Rock' },
            { type: 'paragraph', text: "Walk along the southern rampart to Flag Rock, where locals and visitors gather on the grassy bastions to watch the sun melt into the Indian Ocean. Street vendors sell roasted corn and ice cream. It is the most democratic, most beautiful sunset viewpoint on the island." },
            { type: 'heading', text: 'The Dining Scene' },
            { type: 'paragraph', text: "Inside the fort walls, a constellation of restaurants has quietly become one of Sri Lanka's finest dining districts. From Michelin-trained chefs serving contemporary Sri Lankan cuisine in restored Dutch warehouses, to tiny hole-in-the-wall roti shops, the range is extraordinary." },
            { type: 'heading', text: 'Midnight Rampart Walk' },
            { type: 'paragraph', text: "After dinner, walk the full circuit of the ramparts under starlight. The lighthouse beam sweeps across the dark water every few seconds. The only sounds are waves, cicadas, and your own footsteps on 17th-century stone. It is one of the most atmospheric experiences in all of South Asia." },
            { type: 'quote', text: "Galle Fort doesn't belong to any century. It is timeless — and it is most itself after dark." },
        ],
    },
];

/* ─── Hooks ─── */
function useReveal() {
    const ref = useRef<HTMLDivElement>(null);
    const [vis, setVis] = useState(false);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.08 });
        obs.observe(el); return () => obs.disconnect();
    }, []);
    return { ref, vis };
}

/* ─── Article Reader Overlay ─── */
function ArticleReader({ post, onClose }: { post: typeof posts[0]; onClose: () => void }) {
    const [phase, setPhase] = useState<'entering' | 'open' | 'exiting'>('entering');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const t = setTimeout(() => setPhase('open'), 30);
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; clearTimeout(t); };
    }, []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClose = useCallback(() => {
        setPhase('exiting');
        setTimeout(onClose, 500);
    }, [onClose]);

    const isOpen = phase === 'open';

    return (
        <>
            <style>{`
                @keyframes articleSlideUp {
                    from { transform: translateY(100%); }
                    to   { transform: translateY(0); }
                }
                @keyframes articleSlideDown {
                    from { transform: translateY(0); }
                    to   { transform: translateY(100%); }
                }
                @keyframes articleFadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes articleLineDraw {
                    from { width: 0; }
                    to   { width: 60px; }
                }
                @keyframes articleQuoteFade {
                    from { opacity: 0; transform: scale(0.96); }
                    to   { opacity: 1; transform: scale(1); }
                }
            `}</style>

            {/* Backdrop */}
            <div
                onClick={handleClose}
                style={{
                    position: 'fixed', inset: 0, zIndex: 100000,
                    background: 'rgba(10,8,6,0.6)',
                    backdropFilter: 'blur(6px)',
                    opacity: phase === 'exiting' ? 0 : isOpen ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                    cursor: 'pointer',
                }}
            />

            {/* Reader panel */}
            <div style={{
                position: 'fixed', inset: 0, zIndex: 100001,
                display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
                pointerEvents: 'none',
            }}>
                <div
                    ref={scrollRef}
                    style={{
                        pointerEvents: 'auto',
                        width: '100%',
                        maxWidth: 860,
                        height: '92vh',
                        background: '#FDFCFA',
                        borderRadius: '28px 28px 0 0',
                        overflow: 'hidden',
                        overflowY: 'auto',
                        animationName: phase === 'exiting' ? 'articleSlideDown' : 'articleSlideUp',
                        animationDuration: phase === 'exiting' ? '0.45s' : '0.55s',
                        animationTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
                        animationFillMode: 'forwards',
                        boxShadow: '0 -20px 80px rgba(0,0,0,0.25)',
                    }}
                >
                    {/* ── Hero Image ── */}
                    <div style={{ position: 'relative', height: 'clamp(240px, 45vw, 420px)', overflow: 'hidden' }}>
                        <div style={{
                            position: 'absolute', inset: '-10%',
                            backgroundImage: `url(${post.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center 35%',
                            filter: 'brightness(0.7)',
                        }} />
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(to top, #FDFCFA 0%, rgba(253,252,250,0.4) 40%, transparent 80%)',
                        }} />
                        {/* Close button */}
                        <button
                            onClick={handleClose}
                            style={{
                                position: 'absolute', top: 20, right: 20,
                                width: 42, height: 42,
                                borderRadius: '50%',
                                background: 'rgba(0,0,0,0.35)',
                                backdropFilter: 'blur(12px)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: 'white',
                                cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.2rem',
                                transition: 'background 0.2s',
                                zIndex: 5,
                            }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(196,30,58,0.7)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.35)')}
                        >
                            ✕
                        </button>

                        {/* Category + read time */}
                        <div style={{
                            position: 'absolute', top: 22, left: 24,
                            display: 'flex', gap: 10, alignItems: 'center',
                            animation: isOpen ? 'articleFadeIn 0.5s ease 0.3s both' : undefined,
                        }}>
                            <span style={{
                                background: post.categoryColor,
                                color: 'white',
                                fontFamily: 'var(--font-accent)',
                                fontSize: '0.84rem', fontWeight: 800,
                                letterSpacing: '0.14em', textTransform: 'uppercase',
                                padding: '5px 14px', borderRadius: 50,
                                boxShadow: `0 4px 12px ${post.categoryColor}55`,
                            }}>{post.category}</span>
                            <span style={{
                                background: 'rgba(0,0,0,0.4)',
                                backdropFilter: 'blur(8px)',
                                border: '1px solid rgba(255,255,255,0.15)',
                                color: 'rgba(255,255,255,0.85)',
                                fontFamily: 'var(--font-accent)',
                                fontSize: '0.84rem', fontWeight: 700,
                                padding: '5px 12px', borderRadius: 50,
                            }}>{post.readTime} read</span>
                        </div>
                    </div>

                    {/* ── Content ── */}
                    <div style={{
                        maxWidth: 640,
                        margin: '-40px auto 0',
                        padding: '0 clamp(24px, 6vw, 60px) 80px',
                        position: 'relative',
                    }}>
                        {/* Title */}
                        <h1 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(1.7rem, 4vw, 2.6rem)',
                            fontWeight: 800,
                            color: dark,
                            lineHeight: 1.15,
                            letterSpacing: '-0.02em',
                            margin: '0 0 20px',
                            animation: isOpen ? 'articleFadeIn 0.6s ease 0.35s both' : undefined,
                        }}>
                            {post.title}
                        </h1>

                        {/* Author row */}
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: 12,
                            marginBottom: 32,
                            animation: isOpen ? 'articleFadeIn 0.5s ease 0.45s both' : undefined,
                        }}>
                            <div style={{
                                width: 36, height: 36, borderRadius: '50%',
                                background: `linear-gradient(135deg, ${post.categoryColor}, ${gold})`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontFamily: 'var(--font-heading)',
                                fontSize: '0.97rem', fontWeight: 700, color: 'white',
                            }}>{post.author.charAt(0)}</div>
                            <div>
                                <div style={{ fontFamily: 'var(--font-accent)', fontSize: '1rem', fontWeight: 700, color: dark }}>{post.author}</div>
                                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.94rem', color: muted }}>{post.date}</div>
                            </div>
                        </div>

                        {/* Divider line draw animation */}
                        <div style={{
                            height: 2, background: post.categoryColor, opacity: 0.3,
                            marginBottom: 36,
                            animation: isOpen ? 'articleLineDraw 0.8s ease 0.5s both' : undefined,
                        }} />

                        {/* Body content */}
                        {post.body.map((block, i) => {
                            const delay = 0.55 + i * 0.08;
                            if (block.type === 'intro') return (
                                <p key={i} style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 'clamp(1.05rem, 2vw, 1.15rem)',
                                    lineHeight: 1.85,
                                    color: '#3A3630',
                                    fontWeight: 400,
                                    marginBottom: 32,
                                    animation: isOpen ? `articleFadeIn 0.6s ease ${delay}s both` : undefined,
                                }}>{block.text}</p>
                            );
                            if (block.type === 'heading') return (
                                <h2 key={i} style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 'clamp(1.2rem, 2.5vw, 1.55rem)',
                                    fontWeight: 700,
                                    color: dark,
                                    margin: '40px 0 14px',
                                    letterSpacing: '-0.01em',
                                    animation: isOpen ? `articleFadeIn 0.5s ease ${delay}s both` : undefined,
                                }}>{block.text}</h2>
                            );
                            if (block.type === 'quote') return (
                                <blockquote key={i} style={{
                                    margin: '44px 0',
                                    padding: '28px 32px',
                                    background: `${post.categoryColor}08`,
                                    borderLeft: `4px solid ${post.categoryColor}`,
                                    borderRadius: '0 16px 16px 0',
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 'clamp(1.05rem, 2vw, 1.2rem)',
                                    fontStyle: 'italic',
                                    fontWeight: 400,
                                    color: '#4A4540',
                                    lineHeight: 1.7,
                                    animation: isOpen ? `articleQuoteFade 0.7s ease ${delay}s both` : undefined,
                                }}>"{block.text}"</blockquote>
                            );
                            return (
                                <p key={i} style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 'clamp(0.98rem, 1.8vw, 1.08rem)',
                                    lineHeight: 1.85,
                                    color: '#555048',
                                    margin: '0 0 24px',
                                    animation: isOpen ? `articleFadeIn 0.5s ease ${delay}s both` : undefined,
                                }}>{block.text}</p>
                            );
                        })}

                        {/* Bottom CTA */}
                        <div style={{
                            marginTop: 48,
                            padding: '32px',
                            background: `linear-gradient(135deg, ${dark} 0%, #2C1A10 100%)`,
                            borderRadius: 20,
                            textAlign: 'center',
                            animation: isOpen ? 'articleFadeIn 0.6s ease 1.2s both' : undefined,
                        }}>
                            <div style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: '1.3rem', fontWeight: 700,
                                color: 'white', marginBottom: 8,
                            }}>Ready to experience this yourself?</div>
                            <p style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '1.14rem', color: 'rgba(255,255,255,0.5)',
                                lineHeight: 1.6, margin: '0 0 20px',
                            }}>Let our team craft a personalised journey that brings this story to life.</p>
                            <Link
                                href={post.tourLink}
                                style={{
                                    display: 'inline-block',
                                    background: `linear-gradient(135deg, ${crimson}, #E8344A)`,
                                    color: 'white',
                                    textDecoration: 'none',
                                    fontFamily: 'var(--font-accent)',
                                    fontSize: '0.94rem', fontWeight: 700,
                                    letterSpacing: '0.14em', textTransform: 'uppercase',
                                    padding: '14px 32px', borderRadius: 50,
                                    boxShadow: `0 8px 24px ${crimson}55`,
                                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 12px 32px ${crimson}70`; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = `0 8px 24px ${crimson}55`; }}
                            >
                                Plan My Journey
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

/* ─── Side card ─── */
function SideCard({ post, delay, onClick }: { post: typeof posts[0]; delay: number; onClick: () => void }) {
    const { ref, vis } = useReveal();
    const [hov, setHov] = useState(false);
    return (
        <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(28px)', transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
            <div onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ display: 'flex', gap: '14px', background: 'white', borderRadius: '14px', padding: '14px', cursor: 'pointer', borderLeft: `3px solid ${hov ? post.categoryColor : 'transparent'}`, boxShadow: hov ? '0 12px 36px rgba(0,0,0,0.09)' : '0 2px 10px rgba(0,0,0,0.05)', transform: hov ? 'translateX(4px)' : 'none', transition: 'all 0.3s ease', alignItems: 'flex-start' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                    <div style={{ width: '100%', height: '100%', backgroundImage: `url(${post.image})`, backgroundSize: 'cover', backgroundPosition: 'center', transform: hov ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.5s ease' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'inline-block', fontFamily: 'var(--font-accent)', fontSize: '0.84rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: post.categoryColor, background: `${post.categoryColor}12`, padding: '2px 7px', borderRadius: '20px', marginBottom: '4px' }}>{post.category}</div>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.17rem', fontWeight: 700, color: dark, margin: '0 0 5px', lineHeight: 1.3, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const }}>{post.title}</h4>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.94rem', color: muted }}>{post.date} · {post.readTime} read</span>
                </div>
            </div>
        </div>
    );
}

/* ─── Main component ─── */
export default function TravelBlog() {
    const headRef = useRef<HTMLDivElement>(null);
    const [headVis, setHeadVis] = useState(false);
    const [featHov, setFeatHov] = useState(false);
    const [openPost, setOpenPost] = useState<typeof posts[0] | null>(null);

    useEffect(() => {
        const el = headRef.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setHeadVis(true); obs.disconnect(); } }, { threshold: 0.15 });
        obs.observe(el); return () => obs.disconnect();
    }, []);

    const featured = posts.find(p => p.featured)!;
    const rest = posts.filter(p => !p.featured);

    return (
        <section id="travel-blog" style={{ background: '#F0EDE7', padding: '100px 0 110px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '30px', right: 'clamp(20px,5vw,80px)', fontFamily: 'Georgia,serif', fontSize: 'clamp(8rem,16vw,14rem)', color: `${gold}07`, lineHeight: 1, pointerEvents: 'none', userSelect: 'none', fontWeight: 900 }}>"</div>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(20px,4vw,48px)', position: 'relative' }}>
                {/* Heading */}
                <div ref={headRef} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', marginBottom: '52px' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', opacity: headVis ? 1 : 0, transform: headVis ? 'none' : 'translateY(14px)', transition: 'all 0.6s ease' }}>
                            <div style={{ width: '28px', height: '2px', background: crimson }} />
                            <span style={{ fontFamily: 'var(--font-accent)', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: crimson }}>Travel Stories</span>
                        </div>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, color: dark, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1, opacity: headVis ? 1 : 0, transform: headVis ? 'none' : 'translateY(18px)', transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s' }}>
                            Dream. Read. <span style={{ color: crimson, fontStyle: 'italic' }}>Explore.</span>
                        </h2>
                    </div>
                    <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-accent)', fontSize: '0.94rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: dark, textDecoration: 'none', border: '1.5px solid rgba(0,0,0,0.15)', padding: '11px 22px', borderRadius: '50px', transition: 'all 0.25s ease' }}
                        onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.background = crimson; a.style.borderColor = crimson; a.style.color = 'white'; }}
                        onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.background = 'transparent'; a.style.borderColor = 'rgba(0,0,0,0.15)'; a.style.color = dark; }}
                    >All Articles <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></a>
                </div>
                {/* Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px', alignItems: 'start' }}>
                    {/* Featured */}
                    <div>
                        <div onClick={() => setOpenPost(featured)} onMouseEnter={() => setFeatHov(true)} onMouseLeave={() => setFeatHov(false)} style={{ borderRadius: '24px', overflow: 'hidden', cursor: 'pointer', background: 'white', boxShadow: featHov ? '0 28px 64px rgba(0,0,0,0.13)' : '0 6px 28px rgba(0,0,0,0.07)', transition: 'box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.23,1,0.32,1)', transform: featHov ? 'translateY(-5px)' : 'none' }}>
                            <div style={{ position: 'relative', height: '320px', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${featured.image})`, backgroundSize: 'cover', backgroundPosition: 'center', transform: featHov ? 'scale(1.06)' : 'scale(1)', transition: 'transform 0.8s cubic-bezier(0.23,1,0.32,1)' }} />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,14,10,0.75) 0%, transparent 55%)' }} />
                                <div style={{ position: 'absolute', top: '16px', left: '16px', background: crimson, color: 'white', fontFamily: 'var(--font-accent)', fontSize: '0.84rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: '50px', boxShadow: `0 4px 12px ${crimson}55` }}>✦ Featured Story</div>
                                <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '50px', padding: '4px 10px', fontFamily: 'var(--font-accent)', fontSize: '0.85rem', fontWeight: 700, color: 'rgba(255,255,255,0.82)', letterSpacing: '0.08em' }}>{featured.readTime} read</div>
                                <div style={{ position: 'absolute', bottom: '16px', left: '16px', fontFamily: 'var(--font-accent)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: gold }}>{featured.category}</div>
                            </div>
                            <div style={{ padding: '26px' }}>
                                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: dark, margin: '0 0 10px', letterSpacing: '-0.01em', lineHeight: 1.2 }}>{featured.title}</h3>
                                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.14rem', color: muted, lineHeight: 1.7, margin: '0 0 18px' }}>{featured.excerpt}</p>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `linear-gradient(135deg,${crimson},${gold})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontSize: '0.94rem', fontWeight: 700, color: 'white' }}>{featured.author.charAt(0)}</div>
                                        <div>
                                            <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.94rem', fontWeight: 700, color: dark }}>{featured.author}</div>
                                            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.94rem', color: muted }}>{featured.date}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-accent)', fontSize: '0.94rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: crimson }}>
                                        Read Story
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: featHov ? 'translateX(4px)' : 'none', transition: 'transform 0.3s ease' }}>
                                            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Sidebar */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {rest.map((post, i) => <SideCard key={post.id} post={post} delay={i * 90} onClick={() => setOpenPost(post)} />)}
                        {/* Newsletter */}
                        <div style={{ background: `linear-gradient(135deg,${dark} 0%,#2C1A10 100%)`, borderRadius: '18px', padding: '26px 22px', marginTop: '4px' }}>
                            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 800, color: 'white', marginBottom: '7px', letterSpacing: '-0.01em' }}>Travel Inspiration, Delivered</div>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.94rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: '0 0 14px' }}>Get our best stories, deals and destination guides every fortnight.</p>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <input type="email" placeholder="your@email.com" style={{ flex: 1, padding: '10px 13px', borderRadius: '9px', border: '1.5px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.06)', fontFamily: 'var(--font-body)', fontSize: '0.94rem', color: 'white', outline: 'none', minWidth: 0 }} onFocus={e => e.currentTarget.style.borderColor = gold} onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'} />
                                <button style={{ background: gold, color: dark, border: 'none', borderRadius: '9px', padding: '10px 14px', fontFamily: 'var(--font-accent)', fontSize: '0.94rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>Go</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Article Reader Overlay */}
            {openPost && <ArticleReader post={openPost} onClose={() => setOpenPost(null)} />}
        </section>
    );
}
