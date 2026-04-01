"use client";

import React, { useEffect, useState, useRef } from "react";
import { api } from "~/trpc/react";
import ContentCard from "../cards/ContentCard";
import VisitaIglesiaCard from "../cards/VisitaIglesiaCard";
import styles from "./VerticalFeed.module.css";

const VerticalFeed: React.FC = () => {
  const { data: posts, isLoading } = api.post.getAll.useQuery();
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const totalScrollableHeight = scrollHeight - clientHeight;
    const progress = (scrollTop / (totalScrollableHeight || 1)) * 100;
    setScrollProgress(progress);
  };

  const scrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navTo = (direction: 'next' | 'prev') => {
    if (!containerRef.current) return;
    const { scrollTop, clientHeight } = containerRef.current;
    const targetY = direction === 'next' 
      ? scrollTop + clientHeight 
      : scrollTop - clientHeight;
    
    containerRef.current.scrollTo({
      top: targetY,
      behavior: "smooth"
    });
  };

  // Dynamic Date Checking (2026 Triduum)
  const getCurrentTriduumDay = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth(); // 3 is April
    const year = today.getFullYear();
    if (year !== 2026 || month !== 3) return null;
    if (day === 2) return "THURSDAY";
    if (day === 3) return "FRIDAY";
    if (day === 4) return "SATURDAY";
    return null;
  };

  if (isLoading) {
    return (
      <div className="feed-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ opacity: 0.5 }}>Preparing your Faith Feed...</p>
      </div>
    );
  }

  const currentDay = getCurrentTriduumDay();
  const todayScriptures = posts?.filter(p => p.scheduledDay === currentDay && currentDay !== null) ?? [];
  const filteredGeneralPosts = posts?.filter(p => !p.scheduledDay) ?? [];
  const firstStationIndex = filteredGeneralPosts.findIndex(p => p.type === "STATION");

  return (
    <main 
      className="feed-container" 
      onScroll={handleScroll} 
      ref={containerRef}
    >
      {/* Top Horizontal Progress Indicator */}
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Floating Bottom Center Navigation Controls */}
      <div className={styles.navContainer}>
        <button 
          className={styles.navBtn} 
          onClick={() => navTo('prev')}
          aria-label="Previous card"
          style={{ background: 'none', border: 'none' }}
        >
          ▴
        </button>
        <button 
          className={styles.navBtn} 
          onClick={() => navTo('next')}
          aria-label="Next card"
          style={{ background: 'none', border: 'none' }}
        >
          ▾
        </button>
      </div>

      {/* Section Header: Today's Word (Only if relevant) */}
      {todayScriptures.length > 0 && (
        <section 
          className={styles.sectionHeaderCard}
          style={{ backgroundImage: "url('/backgrounds/header.jpg')" }}
        >
          <div className={styles.headerOverlay} />
          <div className="glass" style={{ padding: '2rem', borderRadius: '24px', textAlign: 'center', width: '80%', zIndex: 2 }}>
            <span className={styles.typeBadge}>Liturgy</span>
            <h1>Today's Word</h1>
            <p style={{ opacity: 0.6 }}>Daily Reflections and Scripture</p>
          </div>
        </section>
      )}

      {/* Today's Scriptures */}
      {todayScriptures.map((post) => (
        <ContentCard key={post.id} post={post} />
      ))}

      {/* General Devotions (Visita Iglesia Guide -> Stations) */}
      {filteredGeneralPosts.map((post, index) => (
        <React.Fragment key={post.id}>
          {index === 0 && <VisitaIglesiaCard />}
          <ContentCard post={post} />
        </React.Fragment>
      ))}

      {/* End of Feed: Minimalist Return to Start */}
      <section 
        className={styles.endCard}
        style={{ backgroundImage: "url('/backgrounds/outro.jpg')" }}
      >
        <div className={styles.headerOverlay} style={{ opacity: 0.6 }} />
        <div style={{ zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
          <button 
            className="glass" 
            onClick={scrollToTop}
            style={{ 
              padding: '1.25rem 3rem', 
              borderRadius: '50px', 
              color: 'var(--accent-gold)', 
              fontWeight: 800,
              fontSize: '0.85rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              border: '1px solid var(--accent-gold)',
              background: 'rgba(255, 255, 255, 0.05)',
              boxShadow: '0 0 25px rgba(255, 202, 40, 0.15)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
             ↑ BEGIN THE JOURNEY AGAIN
          </button>
          <div style={{ 
            fontSize: '0.65rem', 
            opacity: 0.5, 
            letterSpacing: '0.1em', 
            fontWeight: 300, 
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic'
          }}>
            A 2026 Holy Week Offering by Vince Gio Acedillo
          </div>
        </div>
      </section>
    </main>
  );
};

export default VerticalFeed;
