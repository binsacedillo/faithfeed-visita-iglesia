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
    category?: string | null;
    stationNumber?: number | null;
    prayerText?: string | null;
    prayerResponse?: string | null;
    introText?: string | null;
    outroText?: string | null;
  };
  customBackground?: string;
}

const ContentCard: React.FC<ContentCardProps> = ({ post: rawPost, customBackground }) => {
  const isPrayer = rawPost.title?.toLowerCase().includes("prayer");
  const post = rawPost.title === "Prayer to Jesus Christ Crucified" || rawPost.title === "Easter Prayer of Hope"
    ? {
        ...rawPost,
        title: "Easter Prayer of Hope",
        content:
          "Almighty and Ever-Living God, by the Resurrection of Your Son, You have shattered the darkness of death and opened the way to eternal life. We beseech You: let the light of the Risen Christ shine brightly within us. May the hope of the Empty Tomb banish our fears, heal our wounds, and kindle in us a joy that the world cannot take away. Make us witnesses of Your New Life in every word we speak and every deed we perform. Amen.",
        author: "Easter Season Prayer",
      }
    : rawPost;
  const [isVisible, setIsVisible] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [showScripture, setShowScripture] = useState(false);
  const [showReflection, setShowReflection] = useState(false);
  const [showOutro, setShowOutro] = useState(false);
  
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, [post.id]);

  const toRoman = (num: number) => {
    const roman = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV"];
    return roman[num] ?? num;
  };

  const renderContent = () => {
    return (
      <div 
        className={`${styles.content} ${isVisible ? "fade-up" : ""}`}
        ref={contentRef}
      >
        {post.stationNumber && (
          <div className={styles.stationHeader}>
            <div className={styles.stationNumber}>{toRoman(post.stationNumber)}</div>
            <span className={styles.typeBadge}>
              {post.category === "STATIONS_OF_CROSS" 
                ? `Stations of the Cross` 
                : `Visita Iglesia | Visit ${post.stationNumber}`}
            </span>
            <h2 className={styles.reflectionTitle}>{post.title}</h2>
            <div style={{ height: '1px', background: 'var(--accent-gold)', width: '30px', margin: '0.5rem auto 1.5rem', opacity: 0.3 }} />
          </div>
        )}

        {/* Liturgy Daily Entries */}
        {!post.stationNumber && post.type === "SCRIPTURE" && (
          <div className={styles.scripturePanel}>
            <span className={styles.typeBadge}>{post.title}</span>
            <h3 className={styles.goldHeader} style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{post.scriptureRef}</h3>
            <p className={`${styles.scriptureTextVerbatim}`}>{post.content}</p>

            {post.author && (
              <div className={styles.scriptureMeta}>
                <p className={styles.bodyText} style={{ fontStyle: 'italic' }}>{post.author}</p>
              </div>
            )}

            {(post.prayerText || post.prayerResponse) && (
              <div className={styles.scripturePrayer}>
                <h4 className={styles.sectionHeader}>Prayer</h4>
                {post.prayerText && <p className={styles.bodyText}>{post.prayerText}</p>}
                {post.prayerResponse && <p className={styles.salutationText} style={{ marginTop: '0.75rem' }}>{post.prayerResponse}</p>}
              </div>
            )}
          </div>
        )}

        {/* Regular Reflections & Prayers */}
        {!post.stationNumber && post.type === "REFLECT" && (
          <div className={isPrayer ? styles.prayerLayout : styles.reflectionLayout}>
            {isPrayer && (
              <div className={styles.prayerIcon}>
                {post.title?.toLowerCase().includes("easter") ? "🌅" : "🕊️"}
              </div>
            )}
            <h2 className={styles.reflectionTitle}>{post.title}</h2>
            <div className={isPrayer ? styles.prayerBody : styles.reflectionBody}>
              {post.content}
            </div>
            {isPrayer && (
              <div className={styles.prayerRef}>
                {post.author}
              </div>
            )}
          </div>
        )}

        {/* Liguori Versicles/Responses & Reflections */}
        {post.stationNumber && post.category === "STATIONS_OF_CROSS" && (
          <div className={styles.liguoriContent}>
            <div className={styles.versicleBlock}>
              <p>
                <span className={styles.label}>V:</span> 
                We adore You, O Christ, and we praise You. 
                <span className={styles.instruction}>(Genuflect)</span>
              </p>
              <p>
                <span className={styles.label}>R:</span> 
                Because, by Your holy cross, You have redeemed the world. 
                <span className={styles.instruction}>(Rise)</span>
              </p>
            </div>

            {post.scriptureRef && (
              <div className={styles.drawerSection}>
                <button className={`glass ${styles.drawerToggle}`} onClick={() => setShowScripture(!showScripture)}>
                  {showScripture ? "✕ Close Scripture" : "🕯️ Read Holy Word"}
                </button>
                <div className={`${styles.drawerContent} ${showScripture ? styles.open : ""}`}>
                  <h3 className={styles.goldHeader}>{post.scriptureRef}</h3>
                  <p className={`${styles.scriptureTextVerbatim} serif`}>“{post.prayerText}”</p>
                </div>
              </div>
            )}
            
            <div className={styles.consideration}>
              <p style={{ fontStyle: 'italic', opacity: 0.8 }}>Consideration</p>
              <p style={{ marginTop: '0.5rem' }}>{post.content}</p>
            </div>

            <div className={styles.prayerResponse}>
              <span className={styles.label} style={{ display: 'block', marginBottom: '0.5rem' }}>Prayer</span>
              <p>{post.prayerResponse}</p>
            </div>

            <div className={styles.commonFooter}>
              <p>(Our Father, Hail Mary, Glory be.)</p>
            </div>
          </div>
        )}

        {/* Visita Iglesia / Regular Style (Existing) */}
        {post.stationNumber && post.category !== "STATIONS_OF_CROSS" && (
          <>
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

            {post.prayerResponse && (
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

            {post.scriptureRef && (
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

            {post.author && (
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
          </>
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
