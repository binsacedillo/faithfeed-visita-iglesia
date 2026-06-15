export const getEaster = (year: number): Date => {
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

export const isSameDay = (d1: Date, time: number): boolean => {
  const d1M = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate()).getTime();
  return d1M === time;
};

export const isBetweenInclusive = (date: Date, start: Date, end: Date): boolean => {
  const dateM = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const startM = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
  const endM = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
  return dateM >= startM && dateM <= endM;
};

export const getAdventStart = (year: number): Date => {
  const christmas = new Date(year, 11, 25);
  const dayOfWeek = christmas.getDay();
  // Advent starts 4 Sundays before Christmas.
  // We find the Sunday before Christmas, then go back 3 weeks (21 days).
  const daysToSubtract = (dayOfWeek === 0 ? 7 : dayOfWeek) + 21;
  const advent1 = new Date(year, 11, 25);
  advent1.setDate(christmas.getDate() - daysToSubtract);
  return new Date(advent1.getFullYear(), advent1.getMonth(), advent1.getDate());
};

export const getLiturgicalCycle = (date: Date): "A" | "B" | "C" => {
  const year = date.getFullYear();
  const adventStart = getAdventStart(year);
  
  // If we are on or after the 1st Sunday of Advent, we are in the next year's cycle
  const targetYear = date.getTime() >= adventStart.getTime() ? year + 1 : year;
  
  const remainder = (targetYear + 1) % 3;
  if (remainder === 0) return "C";
  if (remainder === 1) return "A";
  return "B";
};

export interface LiturgicalState {
  currentDay: string | null;
  currentSeason: "HOLY_WEEK" | "EASTER_SEASON" | "ORDINARY_TIME" | "PENTECOST" | "ADVENT" | "LENT" | "CHRISTMAS" | null;
  weekOfSeason?: number;
  cycle?: "A" | "B" | "C";
}

export const getLiturgicalState = (today: Date, mockSeason?: string | null): LiturgicalState => {
  const cycle = getLiturgicalCycle(today);
  const DAYS = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  const dayName = DAYS[today.getDay()] ?? null;

  if (mockSeason === "pentecost") {
    return {
      currentDay: "PENTECOST",
      currentSeason: "PENTECOST",
      cycle,
      weekOfSeason: 1,
    };
  }

  const currentYear = today.getFullYear();
  const easter = getEaster(currentYear);
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  
  const thu = new Date(easter); thu.setDate(easter.getDate() - 3);
  const wed = new Date(thu); wed.setDate(thu.getDate() - 1);
  const fri = new Date(easter); fri.setDate(easter.getDate() - 2);
  const sat = new Date(easter); sat.setDate(easter.getDate() - 1);
  const easterMonday = new Date(easter); easterMonday.setDate(easter.getDate() + 1);
  const pentecost = new Date(easter); pentecost.setDate(easter.getDate() + 49);
  const ordinaryTimeStart = new Date(pentecost); ordinaryTimeStart.setDate(pentecost.getDate() + 1);

  // Ash Wednesday is 46 days before Easter
  const ashWednesday = new Date(easter); ashWednesday.setDate(easter.getDate() - 46);

  // Advent start
  const adventStart = getAdventStart(currentYear);
  // Christmas is Dec 25
  const christmas = new Date(currentYear, 11, 25);
  // Epiphany is usually Sunday between Jan 2 and Jan 8, let's keep Baptism/Ordinary start simplified relative to Christmas.
  const baptismOfLord = new Date(currentYear, 0, 10); // Approximation for simplified calendar

  // Holy Week Triduum check
  if (isSameDay(thu, todayMidnight) || isSameDay(wed, todayMidnight)) {
    return { currentDay: "THURSDAY", currentSeason: "HOLY_WEEK", cycle };
  }
  if (isSameDay(fri, todayMidnight)) {
    return { currentDay: "FRIDAY", currentSeason: "HOLY_WEEK", cycle };
  }
  if (isSameDay(sat, todayMidnight)) {
    return { currentDay: "SATURDAY", currentSeason: "HOLY_WEEK", cycle };
  }
  if (isSameDay(easter, todayMidnight)) {
    return { currentDay: "EASTER", currentSeason: "EASTER_SEASON", cycle, weekOfSeason: 1 };
  }
  if (isSameDay(pentecost, todayMidnight)) {
    return { currentDay: "PENTECOST", currentSeason: "PENTECOST", cycle, weekOfSeason: 1 };
  }

  // Lent
  if (isBetweenInclusive(today, ashWednesday, new Date(thu.getTime() - 86400000))) {
    const diffTime = todayMidnight - ashWednesday.getTime();
    const diffDays = Math.floor(diffTime / 86400000);
    const weekOfSeason = Math.floor(diffDays / 7) + 1;
    return { currentDay: dayName, currentSeason: "LENT", cycle, weekOfSeason };
  }

  // Easter Season
  if (isBetweenInclusive(today, easterMonday, new Date(pentecost.getTime() - 86400000))) {
    const diffTime = todayMidnight - easter.getTime();
    const diffDays = Math.floor(diffTime / 86400000);
    const weekOfSeason = Math.floor(diffDays / 7) + 1;
    return { currentDay: "EASTER_SEASON", currentSeason: "EASTER_SEASON", cycle, weekOfSeason };
  }

  // Advent
  if (isBetweenInclusive(today, adventStart, new Date(christmas.getTime() - 86400000))) {
    const diffTime = todayMidnight - adventStart.getTime();
    const diffDays = Math.floor(diffTime / 86400000);
    const weekOfSeason = Math.floor(diffDays / 7) + 1;
    return { currentDay: dayName, currentSeason: "ADVENT", cycle, weekOfSeason };
  }

  // Ordinary Time
  if (isBetweenInclusive(today, ordinaryTimeStart, new Date(currentYear, 11, 31))) {
    const diffTime = todayMidnight - ordinaryTimeStart.getTime();
    const diffDays = Math.floor(diffTime / 86400000);
    // Pentecost is week 8/9 equivalent, Ordinary Time resumes around week 10
    const weekOfSeason = Math.floor(diffDays / 7) + 10; 
    return { currentDay: dayName, currentSeason: "ORDINARY_TIME", cycle, weekOfSeason };
  }

  // Ordinary Time (Before Lent)
  if (isBetweenInclusive(today, baptismOfLord, new Date(ashWednesday.getTime() - 86400000))) {
    const diffTime = todayMidnight - baptismOfLord.getTime();
    const diffDays = Math.floor(diffTime / 86400000);
    const weekOfSeason = Math.floor(diffDays / 7) + 1;
    return { currentDay: dayName, currentSeason: "ORDINARY_TIME", cycle, weekOfSeason };
  }

  return { currentDay: dayName, currentSeason: null, cycle };
};

