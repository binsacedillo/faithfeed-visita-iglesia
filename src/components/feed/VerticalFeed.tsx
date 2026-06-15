"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { api } from "~/trpc/react";
import ContentCard from "../cards/ContentCard";
import VisitaIglesiaCard from "../cards/VisitaIglesiaCard";
import StationsGuideCard from "../cards/StationsGuideCard";
import styles from "./VerticalFeed.module.css";
import { FALLBACK_POSTS, EASTER_SEASON_SUPPLEMENTS } from "~/constants/feed";
import { getLiturgicalState } from "~/utils/liturgy";

const VerticalFeed: React.FC = () => {
  const { data: posts, isLoading, isError, refetch } = api.post.getAll.useQuery(undefined, {
    staleTime: 1000 * 60 * 5, // Keep data fresh for 5 minutes
    refetchOnWindowFocus: false, // Don't refetch when focusing the browser
    retry: 2,
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentDay, setCurrentDay] = useState<string | null>(null);
  const [currentSeason, setCurrentSeason] = useState<string | null>(null);
  const [liturgicalWeek, setLiturgicalWeek] = useState<number>(1);
  const [liturgicalCycle, setLiturgicalCycle] = useState<"A" | "B" | "C">("B");
  const [selectedDevotion, setSelectedDevotion] = useState<"VISITA_IGLESIA" | "STATIONS_OF_CROSS">("VISITA_IGLESIA");
  const [hasMounted, setHasMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasMounted(true);
    
    const searchParams = new URLSearchParams(window.location.search);
    const mockSeason = searchParams.get("mockSeason");

    const today = new Date();
    const liturgicalState = getLiturgicalState(today, mockSeason);
    setCurrentDay(liturgicalState.currentDay);
    setCurrentSeason(liturgicalState.currentSeason);
    setLiturgicalWeek(liturgicalState.weekOfSeason ?? 1);
    setLiturgicalCycle(liturgicalState.cycle ?? "B");
  }, []);

  const { data: liturgicalReading } = api.post.getLiturgicalReading.useQuery(
    {
      season: currentSeason ?? "",
      weekOfSeason: liturgicalWeek,
      dayOfWeek: currentDay ?? "",
      cycle: liturgicalCycle,
    },
    {
      enabled: hasMounted && !!currentSeason && !!currentDay,
      staleTime: 1000 * 60 * 5,
    }
  );


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

  const safePosts = posts && posts.length > 0 ? posts : FALLBACK_POSTS;
  const todayScriptures = safePosts.filter(p => p.scheduledDay === currentDay && currentDay !== null);
  const easterSeasonPosts = currentDay === "EASTER_SEASON"
    ? EASTER_SEASON_SUPPLEMENTS.filter((item) => !safePosts.some((post) => post.id === item.id))
    : [];

  const activeReadingPost = liturgicalReading ? {
    id: liturgicalReading.id,
    type: "SCRIPTURE",
    title: liturgicalReading.title,
    content: liturgicalReading.gospelText,
    scriptureRef: liturgicalReading.gospelRef,
    author: liturgicalReading.reflection,
    prayerText: liturgicalReading.prayerText,
    prayerResponse: liturgicalReading.prayerResponse,
    imageUrl: liturgicalReading.imageUrl,
    category: "GENERAL",
    closingPrayer: false,
    stationNumber: null,
    introText: null,
    outroText: null,
    scheduledDay: currentDay,
    createdAt: new Date(liturgicalReading.createdAt),
    updatedAt: new Date(liturgicalReading.updatedAt),
  } : null;

  const todayLiturgicalPosts = [
    ...todayScriptures,
    ...(activeReadingPost ? [activeReadingPost] : []),
    ...easterSeasonPosts
  ];
  const filteredGeneralPosts = safePosts.filter(p => !p.scheduledDay && (p.category === selectedDevotion || p.category === "GENERAL"));
  const ordinaryPosts = safePosts.filter(p => !p.scheduledDay && p.category === "GENERAL");
  
  const isDevotionAvailable = currentDay === "THURSDAY" || currentDay === "FRIDAY";
  const shouldUseOrdinaryTheme = currentSeason === "ORDINARY_TIME";
  const hasSeasonHeader = todayLiturgicalPosts.length > 0 || currentDay === "EASTER_SEASON" || currentDay === "ORDINARY_TIME" || currentDay === "PENTECOST" || !!currentSeason;

  const displayedGeneralPosts = isDevotionAvailable ? filteredGeneralPosts : ordinaryPosts;
  const theme = currentDay === "EASTER" || currentDay === "EASTER_SEASON"
    ? "easter"
    : currentDay === "PENTECOST"
      ? "pentecost"
      : shouldUseOrdinaryTheme
        ? "ordinary"
        : "default";

  return (
    <main 
      className="feed-container" 
      onScroll={handleScroll} 
      ref={containerRef}
      data-theme={theme}
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

      {isError && (
        <div className="glass" style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          zIndex: 2000,
          borderRadius: "16px",
          padding: "0.75rem 1rem",
          maxWidth: "280px",
          background: "rgba(0, 0, 0, 0.45)",
        }}>
          <p style={{ fontSize: "0.8rem", lineHeight: 1.4, marginBottom: "0.5rem" }}>
            Live feed is reconnecting. Showing a fallback devotion.
          </p>
          <button
            onClick={() => void refetch()}
            style={{
              border: "1px solid var(--accent-gold)",
              background: "transparent",
              color: "var(--accent-gold)",
              borderRadius: "999px",
              padding: "0.35rem 0.8rem",
              fontWeight: 700,
              fontSize: "0.75rem",
              cursor: "pointer",
            }}
          >
            Retry
          </button>
        </div>
      )}

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
      {hasSeasonHeader && (
        <section className={styles.sectionHeaderCard}>
          <Image 
            src={
              currentDay === "THURSDAY" ? "/backgrounds/headerthursday.jpeg" : 
              currentDay === "FRIDAY" ? "/backgrounds/fridayheader.jpg" :
              currentDay === "SATURDAY" ? "/backgrounds/saturdayheader.jpg" :
              currentDay === "EASTER" || currentDay === "EASTER_SEASON" ? "/backgrounds/easterheader.jpg" :
              currentDay === "PENTECOST" ? "/backgrounds/pentecostheader.jpg" :
              currentDay === "ORDINARY_TIME" ? "/backgrounds/header.jpeg" :
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
              {currentDay === "EASTER_SEASON" && "🌅"}
              {currentDay === "PENTECOST" && "🔥"}
              {currentDay === "ORDINARY_TIME" && "🌿"}
            </div>
            <span className={styles.typeBadge} style={{ color: 'var(--accent-gold)', letterSpacing: '0.3em' }}>
              {currentDay === "ORDINARY_TIME" ? "ORDINARY TIME" : 
               currentDay === "EASTER_SEASON" ? "EASTER SEASON" : 
               currentDay === "PENTECOST" ? "PENTECOST SUNDAY" : 
               `${currentDay} LITURGY`}
            </span>
            <h1 style={{ fontSize: '2.75rem', marginTop: '0.5rem', marginBottom: '1.5rem' }}>Today's Word</h1>
            <div style={{ height: '2px', background: 'var(--accent-gold)', width: '60px', margin: '0 auto 1.5rem', opacity: 0.6 }} />
            <p style={{ opacity: 0.7, fontSize: '0.9rem', fontStyle: 'italic', letterSpacing: '0.05em' }}>
              {currentDay === "ORDINARY_TIME"
                ? "Walk in daily discipleship and reflect with the Gospel"
                : currentDay === "EASTER_SEASON"
                  ? "Continue in resurrection joy through the weeks after Easter"
                  : currentDay === "PENTECOST"
                    ? "Celebrate the outpouring of the Holy Spirit and birth of the Church"
                    : "Swipe down to begin the reflections"}
            </p>
          </div>
        </section>
      )}

      {/* Today's Scriptures */}
      {todayLiturgicalPosts.map((post) => (
        <ContentCard 
          key={post.id} 
          post={post} 
          customBackground={
            currentDay === "THURSDAY" ? "/backgrounds/thursday.jpg" :
            currentDay === "FRIDAY" ? "/backgrounds/friday.jpg" : 
            currentDay === "SATURDAY" ? "/backgrounds/saturday.jpg" : 
            currentDay === "EASTER" || currentDay === "EASTER_SEASON" ? "/backgrounds/easter.jpg" :
            currentDay === "PENTECOST" ? "/backgrounds/pentecost.jpg" :
            currentDay === "ORDINARY_TIME" ? "/backgrounds/intro.jpg" :
            undefined
          }
        />
      ))}

      {/* General Devotions (Visita Iglesia Guide / Stations Guide -> Content) */}
      {displayedGeneralPosts.map((post, index) => (
        <React.Fragment key={post.id}>
          {index === 0 && isDevotionAvailable && (
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
            currentDay === "EASTER" || currentDay === "EASTER_SEASON" ? "/backgrounds/outro.jpg" :
            currentDay === "PENTECOST" ? "/backgrounds/pentecost.jpg" :
            currentDay === "ORDINARY_TIME" ? "/backgrounds/header.jpeg" :
            "/backgrounds/outro.jpg"
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
            {currentDay === "ORDINARY_TIME"
              ? `A ${new Date().getFullYear()} Daily Faith Offering by Vince Gio Acedillo`
              : currentDay === "PENTECOST"
                ? `A ${new Date().getFullYear()} Pentecost Offering by Vince Gio Acedillo`
                : `A ${new Date().getFullYear()} Holy Week Offering by Vince Gio Acedillo`}
            <div style={{ 
              opacity: 1, 
              marginTop: '1.25rem', 
              color: 'var(--accent-gold)',
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '0.05em'
            }}>
              {currentDay === "ORDINARY_TIME"
                ? "Keep walking with Christ in Ordinary Time"
                : currentDay === "PENTECOST"
                  ? "Go forth and renew the face of the earth"
                  : "See you in next year's Holy Week"}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default VerticalFeed;
