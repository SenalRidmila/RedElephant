export default function TourLoading() {
    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 9998,
            background: '#ffffff',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 32,
        }}>
            {/* Spinning Rings */}
            <div style={{ position: 'relative', width: 80, height: 80 }}>
                {/* Outer ring */}
                <div style={{
                    position: 'absolute', inset: 0,
                    border: '2px solid rgba(192, 57, 43, 0.1)',
                    borderTopColor: '#C0392B',
                    borderRadius: '50%',
                    animation: 'tourSpinOuter 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite',
                }} />
                {/* Middle ring */}
                <div style={{
                    position: 'absolute', inset: 12,
                    border: '2px solid rgba(212, 132, 42, 0.1)',
                    borderBottomColor: '#D4842A',
                    borderRadius: '50%',
                    animation: 'tourSpinInner 2s linear infinite reverse',
                }} />
                {/* Centre dot */}
                <div style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 10, height: 10,
                    borderRadius: '50%',
                    background: '#C0392B',
                    boxShadow: '0 0 12px rgba(192, 57, 43, 0.4)',
                    animation: 'tourPulse 1.5s ease-in-out infinite',
                }} />
            </div>

            {/* Label */}
            <div style={{ textAlign: 'center' }}>
                <p style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontSize: '0.87rem',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: '#666',
                    fontWeight: 600,
                    margin: 0,
                }}>
                    Curating Journey...
                </p>
            </div>

            <style>{`
                @keyframes tourSpinOuter {
                    to { transform: rotate(360deg); }
                }
                @keyframes tourSpinInner {
                    to { transform: rotate(360deg); }
                }
                @keyframes tourPulse {
                    0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
                    50%       { opacity: 1; transform: translate(-50%, -50%) scale(1.3); }
                }
            `}</style>
        </div>
    );
}
