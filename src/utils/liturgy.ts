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

export interface LiturgicalState {
  currentDay: string | null;
  currentSeason: "HOLY_WEEK" | "EASTER_SEASON" | "ORDINARY_TIME" | "PENTECOST" | null;
}

export const getLiturgicalState = (today: Date, mockSeason?: string | null): LiturgicalState => {
  if (mockSeason === "pentecost") {
    return {
      currentDay: "PENTECOST",
      currentSeason: "PENTECOST",
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

  if (isSameDay(thu, todayMidnight) || isSameDay(wed, todayMidnight)) {
    return { currentDay: "THURSDAY", currentSeason: "HOLY_WEEK" };
  }
  if (isSameDay(fri, todayMidnight)) {
    return { currentDay: "FRIDAY", currentSeason: "HOLY_WEEK" };
  }
  if (isSameDay(sat, todayMidnight)) {
    return { currentDay: "SATURDAY", currentSeason: "HOLY_WEEK" };
  }
  if (isSameDay(easter, todayMidnight)) {
    return { currentDay: "EASTER", currentSeason: "EASTER_SEASON" };
  }
  if (isSameDay(pentecost, todayMidnight)) {
    return { currentDay: "PENTECOST", currentSeason: "PENTECOST" };
  }
  if (isBetweenInclusive(today, easterMonday, new Date(pentecost.getTime() - 86400000))) {
    return { currentDay: "EASTER_SEASON", currentSeason: "EASTER_SEASON" };
  }
  if (isBetweenInclusive(today, ordinaryTimeStart, new Date(currentYear, 11, 31))) {
    return { currentDay: "ORDINARY_TIME", currentSeason: "ORDINARY_TIME" };
  }

  return { currentDay: null, currentSeason: null };
};
