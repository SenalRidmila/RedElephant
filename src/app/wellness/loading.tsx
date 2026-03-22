export default function WellnessLoading() {
    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 9998,
            background: 'linear-gradient(135deg, #0F1A14 0%, #0C1510 50%, #0A1209 100%)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 32,
        }}>
            {/* Ambient glow */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(72,120,80,0.12) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            {/* Lotus / Mandala spinner */}
            <div style={{ position: 'relative', width: 80, height: 80 }}>
                {/* Outer ring */}
                <div style={{
                    position: 'absolute', inset: 0,
                    border: '1.5px solid rgba(120,180,100,0.15)',
                    borderTopColor: 'rgba(120,190,100,0.7)',
                    borderRadius: '50%',
                    animation: 'wellnessSpinOuter 2s linear infinite',
                }} />
                {/* Middle ring */}
                <div style={{
                    position: 'absolute', inset: 10,
                    border: '1.5px solid rgba(120,180,100,0.08)',
                    borderBottomColor: 'rgba(180,220,120,0.5)',
                    borderRadius: '50%',
                    animation: 'wellnessSpinInner 1.4s linear infinite reverse',
                }} />
                {/* Centre dot */}
                <div style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 8, height: 8,
                    borderRadius: '50%',
                    background: 'rgba(150,210,120,0.8)',
                    boxShadow: '0 0 12px rgba(120,200,100,0.6)',
                    animation: 'wellnessPulse 2s ease-in-out infinite',
                }} />
            </div>

            {/* Label */}
            <div style={{ textAlign: 'center' }}>
                <p style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '0.9rem',
                    letterSpacing: '0.4em',
                    textTransform: 'uppercase',
                    color: 'rgba(150,200,120,0.5)',
                    margin: 0,
                }}>
                    Wellness &amp; Spa
                </p>
            </div>

            <style>{`
                @keyframes wellnessSpinOuter {
                    to { transform: rotate(360deg); }
                }
                @keyframes wellnessSpinInner {
                    to { transform: rotate(360deg); }
                }
                @keyframes wellnessPulse {
                    0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
                    50%       { opacity: 1;   transform: translate(-50%, -50%) scale(1.4); }
                }
            `}</style>
        </div>
    );
}
