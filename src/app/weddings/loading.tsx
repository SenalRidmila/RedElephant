export default function WeddingsLoading() {
    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 9998,
            background: 'linear-gradient(135deg, #100D0B 0%, #0E0B09 50%, #0C0907 100%)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 32,
        }}>
            {/* Warm ambient glow */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(180,120,40,0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            {/* Elegant ring spinner */}
            <div style={{ position: 'relative', width: 80, height: 80 }}>
                {/* Outer ring */}
                <div style={{
                    position: 'absolute', inset: 0,
                    border: '1.5px solid rgba(212,175,55,0.12)',
                    borderTopColor: 'rgba(212,175,55,0.75)',
                    borderRadius: '50%',
                    animation: 'weddingSpinOuter 2s linear infinite',
                }} />
                {/* Middle ring */}
                <div style={{
                    position: 'absolute', inset: 10,
                    border: '1px solid rgba(212,175,55,0.06)',
                    borderBottomColor: 'rgba(242,215,120,0.4)',
                    borderRadius: '50%',
                    animation: 'weddingSpinInner 1.5s linear infinite reverse',
                }} />
                {/* Centre diamond */}
                <div style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%) rotate(45deg)',
                    width: 7, height: 7,
                    background: 'rgba(212,175,55,0.85)',
                    boxShadow: '0 0 14px rgba(212,175,55,0.5)',
                    animation: 'weddingDiamondPulse 2s ease-in-out infinite',
                }} />
            </div>

            {/* Label */}
            <div style={{ textAlign: 'center' }}>
                <p style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '0.9rem',
                    letterSpacing: '0.4em',
                    textTransform: 'uppercase',
                    color: 'rgba(212,175,55,0.4)',
                    margin: 0,
                }}>
                    Weddings &amp; Events
                </p>
            </div>

            <style>{`
                @keyframes weddingSpinOuter {
                    to { transform: rotate(360deg); }
                }
                @keyframes weddingSpinInner {
                    to { transform: rotate(360deg); }
                }
                @keyframes weddingDiamondPulse {
                    0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) rotate(45deg) scale(1); }
                    50%       { opacity: 1;   transform: translate(-50%, -50%) rotate(45deg) scale(1.5); }
                }
            `}</style>
        </div>
    );
}
