export interface LiturgicalPost {
  id: string;
  type: string;
  title: string;
  content: string;
  author: string | null;
  scriptureRef: string | null;
  imageUrl: string | null;
  category: string;
  scheduledDay: string | null;
  stationNumber: number | null;
  prayerText: string | null;
  prayerResponse: string | null;
  introText: string | null;
  outroText: string | null;
}

export const FALLBACK_POSTS: LiturgicalPost[] = [
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

export const EASTER_SEASON_SUPPLEMENTS: LiturgicalPost[] = [
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
