import { PrismaClient } from "../generated/prisma";
import triduumData from "./data/triduum.json";
import easterData from "./data/easter.json";
import pentecostData from "./data/pentecost.json";
import devotionsData from "./data/devotions.json";
import readingsData from "./data/liturgicalReadings.json";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding FaithFeed Liturgical Data (Neon PostgreSQL - Seasonal JSONs)...");

  // 1. Clear existing database records
  await prisma.post.deleteMany();
  await prisma.liturgicalReading.deleteMany();

  const commonPrayers = `Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.

Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. 
Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.

Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.`;

  // 2. Build the Posts Array by combining Triduum, Easter, Pentecost, and Devotions
  const posts = [
    {
      type: "REFLECT",
      category: "GENERAL",
      title: "Opening Prayer",
      content: "My Lord, Jesus Christ, You have made this journey to die for me with unspeakable love; and I have so many times ungratefully abandoned You. | But now I love You with all my heart; and, because I love You, I am sincerely sorry for ever having offended You. Pardon me, my God, and permit me to accompany You on this journey. You go to die for love of me; I want, my beloved Redeemer, to die for love of You. My Jesus, I will live and die always united to You.",
      author: "St. Alphonsus Liguori",
      imageUrl: "/backgrounds/guide.jpg"
    },
    ...triduumData.map(s => ({ ...s, category: "GENERAL" })),
    ...easterData.map(s => ({ ...s, category: "GENERAL" })),
    ...pentecostData.map(s => ({ ...s, category: "GENERAL" })),
    ...devotionsData.churches.map(c => ({
      type: "STATION",
      ...c,
      prayerResponse: `▲ Prayer:\nLord Jesus, in Your agony, You chose obedience to the Father. In my fears and struggles, help me trust in God's will. Teach me to surrender everything to You and to remain faithful in prayer. Amen.\n\n${commonPrayers}`
    })),
    ...devotionsData.stationsOfCross.map(s => ({
      type: "STATION",
      ...s
    })),
    {
      type: "REFLECT",
      category: "GENERAL",
      scheduledDay: "EASTER_SEASON",
      title: "Easter Prayer of Hope",
      content: "Risen Jesus, You have conquered sin and death. Let Your light rise in my heart, Your peace settle my fears, and Your joy shape my words and choices. Teach me to live as a witness of resurrection hope, and to carry that hope into every ordinary day.",
      author: "Easter Season Prayer",
      imageUrl: "/backgrounds/outro.jpg"
    }
  ];

  // 3. Seed Liturgical Readings
  for (const reading of readingsData) {
    await prisma.liturgicalReading.create({
      data: reading
    });
  }

  // 4. Seed Posts
  for (const post of posts) {
    await prisma.post.create({
      data: post
    });
  }

  console.log(`Seeding complete! Loaded ${posts.length} posts and ${readingsData.length} liturgical readings.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
