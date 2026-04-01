"use client";

import React, { useEffect, useState } from "react";
import styles from "./ContentCard.module.css";

const VisitaIglesiaCard: React.FC = () => {
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const checkStandalone = window.matchMedia('(display-mode: standalone)').matches 
      || (window.navigator as any).standalone 
      || document.referrer.includes('android-app://');
    setIsStandalone(checkStandalone);
  }, []);

  return (
    <section 
      className={`${styles.card} shimmer`}
      style={{ 
        backgroundImage: "url('/backgrounds/header.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className={styles.overlay} />
      <div className={styles.content} style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <div className={styles.focusIcon} style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⛪</div>
        
        <span className={styles.typeBadge} style={{ color: 'var(--accent-gold)', opacity: 0.6 }}>
          Visita Iglesia Guide 2026
        </span>
        
        <h1 className={styles.reflectionTitle} style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>
          Visitation of 7 Churches
        </h1>
        
        <p className={styles.reflectionBody} style={{ fontSize: '1rem', opacity: 0.8, marginBottom: '2rem' }}>
          An invitation to be closer to God and meditate on the great value of His ultimate sacrifice.
        </p>

        {/* ISO 9241 Scannable Guide Blocks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', maxWidth: '340px', margin: '0 auto' }}>
          <div className="glass" style={{ padding: '1rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem', textAlign: 'left' }}>
            <span style={{ fontSize: '1.5rem' }}>📖</span>
            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-gold)' }}>Prelude</h4>
              <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>Opening prayers & blessing.</p>
            </div>
          </div>

          <div className="glass" style={{ padding: '1rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem', textAlign: 'left' }}>
            <span style={{ fontSize: '1.5rem' }}>⛪</span>
            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-gold)' }}>The Journey</h4>
              <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>7 Church visits with reflection.</p>
            </div>
          </div>

          <div className="glass" style={{ padding: '1rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem', textAlign: 'left' }}>
            <span style={{ fontSize: '1.5rem' }}>🕊️</span>
            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-gold)' }}>Closing</h4>
              <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>Concluding prayers & praises.</p>
            </div>
          </div>
        </div>

        {/* Enhanced Self-Descriptiveness CTA */}
        <div style={{ marginTop: '2.5rem' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, opacity: 0.5, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Tap the <span style={{ color: 'var(--accent-gold)' }}>▴</span> Up or <span style={{ color: 'var(--accent-gold)' }}>▾</span> Down buttons below
          </p>
          <p style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.5rem', letterSpacing: '0.05em' }}>
            TO BEGIN YOUR PILGRIMAGE
          </p>
        </div>

        {/* PWA Install Tip - Only show if not already installed/standalone */}
        {!isStandalone && (
          <div className="glass" style={{ 
            marginTop: '2rem', 
            padding: '1rem', 
            borderRadius: '16px', 
            border: '1px dashed var(--accent-gold)',
            background: 'rgba(255, 202, 40, 0.05)',
            width: '100%',
            maxWidth: '340px',
            margin: '2rem auto 0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1.2rem' }}>📲</span>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-gold)', letterSpacing: '0.05em' }}>
                STAY CONNECTED OFFLINE
              </h4>
            </div>
            <p style={{ fontSize: '0.75rem', opacity: 0.8, lineHeight: '1.4' }}>
              Add to <strong>Home Screen</strong> to use this guide as an app, even in churches without signal.
            </p>
            <div style={{ marginTop: '0.75rem', fontSize: '0.7rem', opacity: 0.6, fontWeight: 600 }}>
              TIP: Tap <span style={{ color: 'var(--accent-gold)' }}>Share</span> (iOS) or <span style={{ color: 'var(--accent-gold)' }}>Menu ⋮</span> (Android) and choose <strong>"Add to Home Screen"</strong>.
            </div>
          </div>
        )}

        {/* Elegant Attribution Footer */}
        <div style={{ marginTop: 'auto', paddingTop: '3rem', fontSize: '0.6rem', opacity: 0.2, letterSpacing: '0.05em', fontWeight: 600 }}>
          © 2026 VINCE GIO ACEDILLO. ALL RIGHTS RESERVED.
        </div>
      </div>
    </section>
  );
};

export default VisitaIglesiaCard;
