"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { api } from "~/trpc/react";
import ContentCard from "../cards/ContentCard";
import VisitaIglesiaCard from "../cards/VisitaIglesiaCard";
import StationsGuideCard from "../cards/StationsGuideCard";
import styles from "./VerticalFeed.module.css";

const VerticalFeed: React.FC = () => {
  const { data: posts, isLoading } = api.post.getAll.useQuery(undefined, {
    staleTime: 1000 * 60 * 5, // Keep data fresh for 5 minutes
    refetchOnWindowFocus: false, // Don't refetch when focusing the browser
    retry: 1, // Only retry once to avoid query loop on persistent errors
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentDay, setCurrentDay] = useState<string | null>(null);
  const [selectedDevotion, setSelectedDevotion] = useState<"VISITA_IGLESIA" | "STATIONS_OF_CROSS">("VISITA_IGLESIA");
  const [hasMounted, setHasMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasMounted(true);
    
    const getEaster = (year: number) => {
      const a = year % 19;
      const b = Math.floor(year / 100);
      const c = year % 100;
      const d = Math.floor(b / 4);
      const e = b % 4;
      const f = Math.floor((b + 8) / 25);
      const g = Math.floor((b - f + 1) / 3);
      const h = (19 * a + b - d - g + 15) % 30;
      const i = Math.floor(c / 4);
      const k = c % 4;
      const l = (32 + 2 * e + 2 * i - h - k) % 7;
      const m = Math.floor((a + 11 * h + 22 * l) / 451);
      const n0 = (h + l - 7 * m + 114);
      const month = Math.floor(n0 / 31) - 1;
      const day = (n0 % 31) + 1;
      return new Date(year, month, day);
    };

    const today = new Date();
    const currentYear = today.getFullYear();
    const easter = getEaster(currentYear);
    
    // Normalize to midnight for accurate comparison
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    
    const thu = new Date(easter); thu.setDate(easter.getDate() - 3);
    const wed = new Date(thu); wed.setDate(thu.getDate() - 1);
    const fri = new Date(easter); fri.setDate(easter.getDate() - 2);
    const sat = new Date(easter); sat.setDate(easter.getDate() - 1);

    const isSameDay = (d1: Date, time: number) => {
      const d1M = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate()).getTime();
      return d1M === time;
    };

    if (isSameDay(thu, todayMidnight) || isSameDay(wed, todayMidnight)) setCurrentDay("THURSDAY");
    else if (isSameDay(fri, todayMidnight)) setCurrentDay("FRIDAY");
    else if (isSameDay(sat, todayMidnight)) setCurrentDay("SATURDAY");
    else if (isSameDay(easter, todayMidnight)) setCurrentDay("EASTER");
    else setCurrentDay(null);
  }, []);

  const scrollRef = useRef<number | null>(null);

  const handleScroll = () => {
    if (scrollRef.current) return;

    scrollRef.current = window.requestAnimationFrame(() => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        const totalScrollableHeight = scrollHeight - clientHeight;
        const progress = (scrollTop / (totalScrollableHeight || 1)) * 100;
        setScrollProgress(progress);
      }
      scrollRef.current = null;
    });
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

  if (isLoading || !hasMounted) {
    return (
      <div className="feed-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--bg)' }}>
        <p style={{ opacity: 0.5, letterSpacing: '0.1em' }}>PREPARING YOUR SACRED FEED...</p>
      </div>
    );
  }

  const todayScriptures = posts?.filter(p => p.scheduledDay === currentDay && currentDay !== null) ?? [];
  const filteredGeneralPosts = posts?.filter(p => !p.scheduledDay && (p.category === selectedDevotion || p.category === "GENERAL")) ?? [];
  
  const isDevotionAvailable = currentDay === "THURSDAY" || currentDay === "FRIDAY";

  return (
    <main 
      className="feed-container" 
      onScroll={handleScroll} 
      ref={containerRef}
      data-theme={currentDay === "EASTER" ? "easter" : "default"}
    >
      {/* Devotion Switcher */}
      {isDevotionAvailable && (
        <div className={styles.devotionSwitcher}>
          <button 
            className={`${styles.switcherBtn} ${selectedDevotion === "VISITA_IGLESIA" ? styles.activeSwitcher : ""}`}
            onClick={() => setSelectedDevotion("VISITA_IGLESIA")}
          >
            ⛪ VISITA IGLESIA
          </button>
          <button 
            className={`${styles.switcherBtn} ${selectedDevotion === "STATIONS_OF_CROSS" ? styles.activeSwitcher : ""}`}
            onClick={() => setSelectedDevotion("STATIONS_OF_CROSS")}
          >
            ✝️ STATIONS OF THE CROSS
          </button>
        </div>
      )}

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

      {/* Section Header: Today's Word (Daily Liturgy Intro) */}
      {todayScriptures.length > 0 && (
        <section className={styles.sectionHeaderCard}>
          <Image 
            src={
              currentDay === "THURSDAY" ? "/backgrounds/headerthursday.jpeg" : 
              currentDay === "FRIDAY" ? "/backgrounds/fridayheader.jpg" :
              currentDay === "SATURDAY" ? "/backgrounds/saturdayheader.jpg" :
              currentDay === "EASTER" ? "/backgrounds/easterheader.jpg" : 
              "/backgrounds/header.jpeg"
            }
            alt="Liturgy Header"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            className={styles.bgImage}
          />
          <div className={styles.headerOverlay} />
          <div className="glass" style={{ padding: '3rem 2rem', borderRadius: '32px', textAlign: 'center', width: '85%', zIndex: 2, border: '1px solid var(--accent-gold)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem', filter: 'drop-shadow(0 0 10px rgba(255, 202, 40, 0.3))' }}>
              {currentDay === "THURSDAY" && "🍷"}
              {currentDay === "FRIDAY" && "✝️"}
              {currentDay === "SATURDAY" && "🕊️"}
              {currentDay === "EASTER" && "☀️"}
            </div>
            <span className={styles.typeBadge} style={{ color: 'var(--accent-gold)', letterSpacing: '0.3em' }}>
              {currentDay} LITURGY
            </span>
            <h1 style={{ fontSize: '2.75rem', marginTop: '0.5rem', marginBottom: '1.5rem' }}>Today's Word</h1>
            <div style={{ height: '2px', background: 'var(--accent-gold)', width: '60px', margin: '0 auto 1.5rem', opacity: 0.6 }} />
            <p style={{ opacity: 0.7, fontSize: '0.9rem', fontStyle: 'italic', letterSpacing: '0.05em' }}>
              Swipe down to begin the reflections
            </p>
          </div>
        </section>
      )}

      {/* Today's Scriptures */}
      {todayScriptures.map((post) => (
        <ContentCard 
          key={post.id} 
          post={post} 
          customBackground={
            currentDay === "THURSDAY" ? "/backgrounds/thursday.jpg" :
            currentDay === "FRIDAY" ? "/backgrounds/friday.jpg" : 
            currentDay === "SATURDAY" ? "/backgrounds/saturday.jpg" : 
            currentDay === "EASTER" ? "/backgrounds/easter.jpg" :
            undefined
          }
        />
      ))}

      {/* General Devotions (Visita Iglesia Guide / Stations Guide -> Content) */}
      {isDevotionAvailable && filteredGeneralPosts.map((post, index) => (
        <React.Fragment key={post.id}>
          {index === 0 && (
            selectedDevotion === "VISITA_IGLESIA" 
              ? <VisitaIglesiaCard /> 
              : <StationsGuideCard />
          )}
          <ContentCard post={post} />
        </React.Fragment>
      ))}

      {/* End of Feed: Minimalist Return to Start */}
      <section className={styles.endCard}>
        <Image 
          src={
            currentDay === "FRIDAY" ? "/backgrounds/friday.jpg" :
            currentDay === "SATURDAY" ? "/backgrounds/saturday.jpg" :
            currentDay === "EASTER" ? "/backgrounds/outro.jpg" : "/backgrounds/outro.jpg"
          }
          alt="Conclusion"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          className={styles.bgImage}
        />
        <div className={styles.headerOverlay} />
        <div style={{ zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
          <button 
            className={`glass ${styles.finaleBtn}`}
            onClick={scrollToTop}
          >
             ↑ BEGIN THE JOURNEY AGAIN
          </button>
          <div style={{ 
            fontSize: '0.85rem', 
            opacity: 1, 
            letterSpacing: '0.1em', 
            fontWeight: 400, 
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            textAlign: 'center',
            marginTop: '2rem',
            color: 'var(--text-primary)'
          }}>
            A {new Date().getFullYear()} Holy Week Offering by Vince Gio Acedillo
            <div style={{ 
              opacity: 1, 
              marginTop: '1.25rem', 
              color: 'var(--accent-gold)',
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '0.05em'
            }}>
              See you in next year's Holy Week
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default VerticalFeed;
