"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import styles from "./ContentCard.module.css";

interface ContentCardProps {
  post: {
    id: string;
    type: string;
    title: string;
    content: string;
    author?: string | null;
    scriptureRef?: string | null;
    imageUrl?: string | null;
    stationNumber?: number | null;
    prayerText?: string | null;
    prayerResponse?: string | null;
    introText?: string | null;
    outroText?: string | null;
  };
  customBackground?: string;
}

const ContentCard: React.FC<ContentCardProps> = ({ post, customBackground }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [showScripture, setShowScripture] = useState(false);
  const [showReflection, setShowReflection] = useState(false);
  const [showOutro, setShowOutro] = useState(false);
  
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, [post.id]);

  const renderContent = () => {
    return (
      <div 
        className={`${styles.content} ${isVisible ? "fade-up" : ""}`}
        ref={contentRef}
      >
        {post.stationNumber && (
          <div className={styles.stationHeader}>
            <div className={styles.stationNumber}>{post.stationNumber}</div>
            <span className={styles.typeBadge}>Visita Iglesia | Visit {post.stationNumber}</span>
            <h2 className={styles.reflectionTitle}>{post.title}</h2>
          </div>
        )}

        {/* Liturgy Daily Entries */}
        {!post.stationNumber && post.type === "SCRIPTURE" && (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <span className={styles.typeBadge}>{post.title}</span>
            <h3 className={styles.goldHeader} style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>{post.scriptureRef}</h3>
            <p className={`${styles.scriptureTextVerbatim}`}>{post.content}</p>
            <div className={styles.salutationBox}>
              <p className={styles.bodyText} style={{ fontStyle: 'italic' }}>{post.author}</p>
            </div>
          </div>
        )}

        {/* Regular Reflections */}
        {!post.stationNumber && post.type === "REFLECT" && (
          <>
            <span className={styles.typeBadge}>
              {post.title.toLowerCase().includes('prayer') ? 'Prayer' : 'Reflection'}
            </span>
            <h2 className={styles.reflectionTitle}>{post.title}</h2>
            <p className={styles.reflectionBody}>{post.content}</p>
          </>
        )}

        {/* STATION ONLY SECTIONS */}
        {post.stationNumber === 1 && post.introText && (
          <div className={styles.drawerSection}>
            <button className={`glass ${styles.drawerToggle}`} onClick={() => setShowIntro(!showIntro)}>
              {showIntro ? "✕ Close Invitation" : "📖 Invitation & Opening Prayer"}
            </button>
            <div className={`${styles.drawerContent} ${showIntro ? styles.open : ""}`}>
              <p className={styles.bodyText}>{post.introText}</p>
            </div>
          </div>
        )}

        {post.stationNumber && post.prayerResponse && (
          <div className={styles.salutationBox} style={{ marginTop: '1.5rem' }}>
            {post.prayerResponse.split('\n').map((line, i) => (
              <p 
                key={i} 
                className={styles.salutationText}
                style={line.startsWith('▲') ? { fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '0.5rem' } : {}}
              >
                {line}
              </p>
            ))}
          </div>
        )}

        {post.stationNumber && post.scriptureRef && (
          <div className={styles.drawerSection}>
            <button className={`glass ${styles.drawerToggle}`} onClick={() => setShowScripture(!showScripture)}>
              {showScripture ? "✕ Close Scripture" : "🕯️ Read Holy Word"}
            </button>
            <div className={`${styles.drawerContent} ${showScripture ? styles.open : ""}`}>
              <h3 className={styles.goldHeader}>{post.scriptureRef}</h3>
              <p className={`${styles.scriptureTextVerbatim} serif`}>“{post.content}”</p>
            </div>
          </div>
        )}

        {post.stationNumber && post.author && (
          <div className={styles.drawerSection}>
            <button className={`glass ${styles.drawerToggle}`} onClick={() => setShowReflection(!showReflection)}>
              {showReflection ? "✕ Close Reflection" : "✧ Open Reflection"}
            </button>
            <div className={`${styles.drawerContent} ${showReflection ? styles.open : ""}`}>
              <h3 className={styles.sectionHeader}>Reflection</h3>
              <p className={styles.bodyText}>{post.author}</p>
            </div>
          </div>
        )}

        {post.stationNumber === 7 && post.outroText && (
          <div className={styles.drawerSection}>
            <button className={`glass ${styles.drawerToggle}`} onClick={() => setShowOutro(!showOutro)}>
              {showOutro ? "✕ Close Final Prayers" : "🕊️ Final Prayers & Divine Praises"}
            </button>
            <div className={`${styles.drawerContent} ${showOutro ? styles.open : ""}`}>
              <p className={styles.bodyText}>{post.outroText}</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const bgImage = customBackground ?? post.imageUrl;

  return (
    <section className={`${styles.card} ${post.stationNumber ? styles.stationCard : ''}`}>
      {bgImage && (
        <Image 
          src={bgImage} 
          alt={post.title} 
          fill 
          sizes="100vw"
          priority={post.type === "SCRIPTURE"} // Faster loading for essential liturgy
          style={{ objectFit: 'cover' }}
          className={styles.bgImage}
        />
      )}
      <div className={styles.overlay} />
      {renderContent()}
    </section>
  );
};

export default ContentCard;
