"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./ContentCard.module.css";

const StationsGuideCard: React.FC = () => {
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const checkStandalone = window.matchMedia('(display-mode: standalone)').matches 
      || (window.navigator as any).standalone 
      || document.referrer.includes('android-app://');
    setIsStandalone(checkStandalone);
  }, []);

  return (
    <section className={`${styles.card} shimmer`}>
      <Image 
        src="/backgrounds/fridayheader.jpg"
        alt="Stations of the Cross Header"
        fill
        priority
        className={styles.bgImage}
        style={{ objectFit: 'cover' }}
      />
      <div className={styles.overlay} />
      <div className={styles.content} style={{ textAlign: 'center', paddingTop: '6rem' }}>
        <div className={styles.focusIcon} style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✝️</div>
        
        <span className={styles.typeBadge} style={{ color: 'var(--accent-gold)', opacity: 0.6 }}>
          Lent & Holy Week Devotion
        </span>
        
        <h1 className={styles.reflectionTitle} style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>
          Stations of the Cross
        </h1>
        
        <p className={styles.reflectionBody} style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '2.5rem', fontStyle: 'italic', maxWidth: '300px', margin: '0 auto 2.5rem' }}>
          Follow the footsteps of Jesus from His condemnation to His burial in the tomb.
        </p>

        {/* ISO 9241 Scannable Guide Blocks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '360px', margin: '0 auto' }}>
          {[
            { icon: '🙏', title: '14 Stations', desc: 'A complete journey of the Passion.' },
            { icon: '📖', title: 'Scripture & Prayer', desc: 'Meditate on the Word at every stop.' },
            { icon: '🕊️', title: 'Reflection', desc: 'Deepen your personal walk with Christ.' }
          ].map((item, i) => (
            <div key={i} className="glass" style={{ 
              padding: '1.25rem', 
              borderRadius: '20px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1.25rem', 
              textAlign: 'left',
              border: '1px solid rgba(255, 202, 40, 0.15)',
              background: 'rgba(255, 255, 255, 0.03)'
            }}>
              <span style={{ fontSize: '1.75rem', filter: 'drop-shadow(0 0 10px rgba(255, 202, 40, 0.3))' }}>{item.icon}</span>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-gold)', letterSpacing: '0.05em' }}>{item.title}</h4>
                <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '0.2rem', lineHeight: '1.4' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Self-Descriptiveness CTA */}
        <div style={{ marginTop: '2.5rem' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, opacity: 0.5, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Tap the <span style={{ color: 'var(--accent-gold)' }}>▴</span> Up or <span style={{ color: 'var(--accent-gold)' }}>▾</span> Down buttons below
          </p>
          <p style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.5rem', letterSpacing: '0.05em' }}>
            TO BEGIN THE STATIONS
          </p>
        </div>

        {/* Elegant Attribution Footer */}
        <div style={{ marginTop: 'auto', paddingTop: '3rem', fontSize: '0.6rem', opacity: 0.2, letterSpacing: '0.05em', fontWeight: 600 }}>
          © 2026 VINCE GIO ACEDILLO. ALL RIGHTS RESERVED.
        </div>
      </div>
    </section>
  );
};

export default StationsGuideCard;
