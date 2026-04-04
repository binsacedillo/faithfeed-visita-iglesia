"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { api } from "~/trpc/react";
import ContentCard from "../cards/ContentCard";
import VisitaIglesiaCard from "../cards/VisitaIglesiaCard";
import StationsGuideCard from "../cards/StationsGuideCard";
import styles from "./VerticalFeed.module.css";

const FALLBACK_POSTS = [
  {
    id: "fallback-opening-prayer",
    type: "REFLECT",
    title: "Opening Prayer",
    content:
      "Lord Jesus, as I enter this sacred space, I invite Your presence into my heart. Calm my restless thoughts, still my spirit, and open my soul to Your Word. Let this moment of prayer be a sanctuary where Your light renews my hope and Your love transforms my path. Stay with me, Lord, now and through every season. Amen.",
    author: "Faith Feed",
    scriptureRef: null,
    imageUrl: "/backgrounds/guide.jpg",
    category: "GENERAL",
    scheduledDay: null,
    stationNumber: null,
    prayerText: null,
    prayerResponse: null,
    introText: null,
    outroText: null,
  },
  {
    id: "fallback-daily-gospel",
    type: "SCRIPTURE",
    title: "Daily Gospel Reflection",
    content:
      "Remain in me, as I remain in you. Whoever remains in me and I in him will bear much fruit.",
    author: "John 15:4-5",
    scriptureRef: "John 15:4-5",
    imageUrl: "/backgrounds/intro.jpg",
    category: "GENERAL",
    scheduledDay: null,
    stationNumber: null,
    prayerText: null,
    prayerResponse: null,
    introText: null,
    outroText: null,
  },
  {
    id: "fallback-closing-prayer",
    type: "REFLECT",
    title: "Closing Prayer",
    content:
      "Thank You, Lord, for meeting me here. Let Your Word guide my ordinary days, and keep my heart close to Yours.",
    author: "Faith Feed",
    scriptureRef: null,
    imageUrl: "/backgrounds/outro.jpg",
    category: "GENERAL",
    scheduledDay: null,
    stationNumber: null,
    prayerText: null,
    prayerResponse: null,
    introText: null,
    outroText: null,
  },
];

const EASTER_SEASON_SUPPLEMENTS = [
  {
    id: "easter-season-scripture-1",
    type: "SCRIPTURE",
    title: "Easter Season Gospel",
    content:
      "Jesus said to him, \"I am the way and the truth and the life. No one comes to the Father except through me.\"",
    author: "Let the Risen Christ lead your path this week.",
    scriptureRef: "John 14:6",
    imageUrl: "/backgrounds/easter.jpg",
    category: "GENERAL",
    scheduledDay: "EASTER_SEASON",
    stationNumber: null,
    prayerText:
      "Lord Jesus, You are the way when I feel lost, the truth when I am confused, and the life when I am tired. Keep my heart close to You in this Easter Season.",
    prayerResponse:
      "Risen Lord, renew my hope and teach me to walk in Your light each day. Amen.",
    introText: null,
    outroText: null,
  },
  {
    id: "easter-season-scripture-2",
    type: "SCRIPTURE",
    title: "Easter Season Promise",
    content:
      "And behold, I am with you always, until the end of the age.",
    author: "He is with us in ordinary routines and hidden struggles.",
    scriptureRef: "Matthew 28:20",
    imageUrl: "/backgrounds/easter.jpg",
    category: "GENERAL",
    scheduledDay: "EASTER_SEASON",
    stationNumber: null,
    prayerText:
      "Risen Jesus, stay with me in my studies, work, family life, and quiet moments. Let me never forget Your faithful presence.",
    prayerResponse:
      "Lord, make my life a witness of Your resurrection peace. Amen.",
    introText: null,
    outroText: null,
  },
  {
    id: "easter-season-prayer-1",
    type: "REFLECT",
    title: "Prayer for the Fifty Days",
    content:
      "Risen Christ, breathe new life into what is weary in me. Heal what is wounded, strengthen what is weak, and kindle joy where there is fear. May Your victory over death shape my words, choices, and love for others. Amen.",
    author: "Easter Season Prayer",
    scriptureRef: null,
    imageUrl: "/backgrounds/easter.jpg",
    category: "GENERAL",
    scheduledDay: "EASTER_SEASON",
    stationNumber: null,
    prayerText: null,
    prayerResponse: null,
    introText: null,
    outroText: null,
  },
];

const VerticalFeed: React.FC = () => {
  const { data: posts, isLoading, isError, refetch } = api.post.getAll.useQuery(undefined, {
    staleTime: 1000 * 60 * 5, // Keep data fresh for 5 minutes
    refetchOnWindowFocus: false, // Don't refetch when focusing the browser
    retry: 2,
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentDay, setCurrentDay] = useState<string | null>(null);
  const [currentSeason, setCurrentSeason] = useState<"HOLY_WEEK" | "EASTER_SEASON" | "ORDINARY_TIME" | null>(null);
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
    const easterMonday = new Date(easter); easterMonday.setDate(easter.getDate() + 1);
    const pentecost = new Date(easter); pentecost.setDate(easter.getDate() + 49);
    const ordinaryTimeStart = new Date(pentecost); ordinaryTimeStart.setDate(pentecost.getDate() + 1);

    const isSameDay = (d1: Date, time: number) => {
      const d1M = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate()).getTime();
      return d1M === time;
    };

    const isBetweenInclusive = (date: Date, start: Date, end: Date) => {
      const dateM = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
      const startM = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
      const endM = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
      return dateM >= startM && dateM <= endM;
    };

    if (isSameDay(thu, todayMidnight) || isSameDay(wed, todayMidnight)) {
      setCurrentDay("THURSDAY");
      setCurrentSeason("HOLY_WEEK");
    }
    else if (isSameDay(fri, todayMidnight)) {
      setCurrentDay("FRIDAY");
      setCurrentSeason("HOLY_WEEK");
    }
    else if (isSameDay(sat, todayMidnight)) {
      setCurrentDay("SATURDAY");
      setCurrentSeason("HOLY_WEEK");
    }
    else if (isSameDay(easter, todayMidnight)) {
      setCurrentDay("EASTER");
      setCurrentSeason("EASTER_SEASON");
    }
    else if (isBetweenInclusive(today, easterMonday, pentecost)) {
      setCurrentDay("EASTER_SEASON");
      setCurrentSeason("EASTER_SEASON");
    }
    else if (isBetweenInclusive(today, ordinaryTimeStart, new Date(currentYear, 11, 31))) {
      setCurrentDay("ORDINARY_TIME");
      setCurrentSeason("ORDINARY_TIME");
    }
    else {
      setCurrentDay(null);
      setCurrentSeason(null);
    }
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

  const safePosts = posts && posts.length > 0 ? posts : FALLBACK_POSTS;
  const todayScriptures = safePosts.filter(p => p.scheduledDay === currentDay && currentDay !== null);
  const easterSeasonPosts = currentDay === "EASTER_SEASON"
    ? EASTER_SEASON_SUPPLEMENTS.filter((item) => !safePosts.some((post) => post.id === item.id))
    : [];
  const todayLiturgicalPosts = [...todayScriptures, ...easterSeasonPosts];
  const filteredGeneralPosts = safePosts.filter(p => !p.scheduledDay && (p.category === selectedDevotion || p.category === "GENERAL"));
  const ordinaryPosts = safePosts.filter(p => !p.scheduledDay && p.category === "GENERAL");
  
  const isDevotionAvailable = currentDay === "THURSDAY" || currentDay === "FRIDAY";
  const shouldUseOrdinaryTheme = currentSeason === "ORDINARY_TIME";
  const hasSeasonHeader = todayLiturgicalPosts.length > 0 || currentDay === "EASTER_SEASON" || currentDay === "ORDINARY_TIME";
  const displayedGeneralPosts = isDevotionAvailable ? filteredGeneralPosts : ordinaryPosts;
  const theme = currentDay === "EASTER" || currentDay === "EASTER_SEASON"
    ? "easter"
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
              {currentDay === "ORDINARY_TIME" && "🌿"}
            </div>
            <span className={styles.typeBadge} style={{ color: 'var(--accent-gold)', letterSpacing: '0.3em' }}>
              {currentDay === "ORDINARY_TIME" ? "ORDINARY TIME" : currentDay === "EASTER_SEASON" ? "EASTER SEASON" : `${currentDay} LITURGY`}
            </span>
            <h1 style={{ fontSize: '2.75rem', marginTop: '0.5rem', marginBottom: '1.5rem' }}>Today's Word</h1>
            <div style={{ height: '2px', background: 'var(--accent-gold)', width: '60px', margin: '0 auto 1.5rem', opacity: 0.6 }} />
            <p style={{ opacity: 0.7, fontSize: '0.9rem', fontStyle: 'italic', letterSpacing: '0.05em' }}>
              {currentDay === "ORDINARY_TIME"
                ? "Walk in daily discipleship and reflect with the Gospel"
                : currentDay === "EASTER_SEASON"
                  ? "Continue in resurrection joy through the weeks after Easter"
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
                : "See you in next year's Holy Week"}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default VerticalFeed;
