import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'auditresto360 - L’audit 360° complet de votre restaurant';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Image Open Graph par défaut (partages réseaux / aperçus). */
export default function Og() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0A0A0A',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 64, fontWeight: 800, letterSpacing: '-0.03em' }}>
          <span style={{ color: '#FFFFFF' }}>audit</span>
          <span style={{ color: '#FF7A00' }}>resto360</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 60, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            L’audit 360° complet
          </div>
          <div style={{ fontSize: 60, fontWeight: 800, color: '#FF7A00', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            de votre restaurant
          </div>
          <div style={{ marginTop: 24, fontSize: 28, color: 'rgba(255,255,255,0.72)' }}>
            Hygiène, RH, conformité, gestion, carte, commercial. Audit conseil privé et indépendant.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          {['Hygiène & HACCP', 'Gestion', 'RH', 'Carte', 'Conformité'].map((t) => (
            <div
              key={t}
              style={{
                display: 'flex',
                border: '1px solid rgba(255,122,0,0.5)',
                color: '#FF9226',
                borderRadius: 999,
                padding: '8px 18px',
                fontSize: 22,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
