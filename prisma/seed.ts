import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Final 7-Church Guide Format (Deduplicated)...");

  // Clear existing posts
  await prisma.post.deleteMany();

  const commonPrayers = `Our Father, who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.

Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. 
Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.

Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.`;

  const triduumScriptures = [
    {
      type: "SCRIPTURE",
      scheduledDay: "THURSDAY",
      title: "Holy Thursday",
      scriptureRef: "John 13:1",
      content: "Before the feast of Passover, Jesus knew that his hour had come to pass from this world to the Father. He loved them to the end.",
      author: "Jesus loved “to the end.” How far does my love go?",
      imageUrl: "/backgrounds/headerthursday.jpeg",
    },
    {
      type: "SCRIPTURE",
      scheduledDay: "FRIDAY",
      title: "Good Friday",
      scriptureRef: "John 19:30",
      content: "When Jesus had taken the wine, he said, 'It is finished.' And bowing his head, he handed over the spirit.",
      author: "It is finished. He gave everything for you.",
    },
    {
      type: "SCRIPTURE",
      scheduledDay: "SATURDAY",
      title: "Holy Saturday",
      scriptureRef: "Matthew 27:66",
      content: "So they went and made the tomb secure by sealing the stone and setting the guard.",
      author: "In the silence, God is working. Trust the wait.",
    },
    {
      type: "SCRIPTURE",
      scheduledDay: "EASTER",
      title: "Easter Sunday",
      scriptureRef: "John 20:1-9",
      content: "On the first day of the week, Mary of Magdala came to the tomb early in the morning... and saw the stone removed from the tomb. So she ran and went to Simon Peter... 'They have taken the Lord from the tomb, and we don’t know where they put him.'",
      author: "He is Risen! The tomb is empty. The world is reborn.",
    }
  ];

  const churches = [
    {
      stationNumber: 1,
      title: "Jesus in the Garden of Gethsemane",
      content: "Father, if it is possible, let this cup pass from me; yet not as I will, but as you will.",
      scriptureRef: "Matthew 26:36-39",
      author: "In the Garden of Gethsemane, Jesus experiences deep sorrow and distress, showing His true humanity. He understands fear, pain, and uncertainty just as we do in our daily lives. Yet despite His anguish, He chooses to trust completely in the Father's will. This reminds us that faith is not the absence of fear, but the courage to surrender to God even in difficult moments. Many times, we struggle to accept situations that are beyond our control. We may question God or feel abandoned in our trials. However, Jesus shows us that prayer is our refuge and strength. Through sincere prayer, we find the grace to continue and the peace that comes from trusting God.",
      prayerResponse: `▲ Prayer:\nLord Jesus, in Your agony, You chose obedience to the Father. In my fears and struggles, help me trust in God's will. Teach me to surrender everything to You and to remain faithful in prayer. Amen.\n\n${commonPrayers}`,
      imageUrl: "/backgrounds/station1.jpg",
    },
    {
      stationNumber: 2,
      title: "Jesus Before the Sanhedrin",
      content: "They were looking for false testimony against Jesus... but they found none.",
      scriptureRef: "Matthew 26:59–63",
      author: "Jesus stands before the Sanhedrin, facing false accusations and unjust judgment. He is innocent, yet He is treated as guilty and undeserving of respect. In His silence, we see His humility and complete trust in the Father's plan. In our lives, we may also experience being misunderstood, judged, or wrongly accused. These moments can tempt us to react with anger or defensiveness. However, Jesus teaches us to remain calm and grounded in truth. His example invites us to respond with patience and dignity. When we trust in God's justice, we can endure trials without losing our peace.",
      prayerResponse: `▲ Prayer:\nLord Jesus, when You were falsely accused, You remained calm and faithful. Help me to respond with humility when I am judged or misunderstood. Teach me patience and trust in Your justice. Amen.\n\n${commonPrayers}`,
      imageUrl: "/backgrounds/station2.jpg",
    },
    {
      stationNumber: 3,
      title: "Jesus Before Pontius Pilate",
      content: "For this I was born... to testify to the truth.",
      scriptureRef: "John 18:37-38",
      author: "Jesus stands before Pilate as the embodiment of truth, yet He is rejected by those in power. Pilate struggles between doing what is right and pleasing the crowd. This reflects the struggles we face when making difficult decisions. Sometimes, we know what is right but are afraid of the consequences. We may choose comfort, approval, or convenience over truth. Jesus challenges us to stand firm in our values and beliefs. He reminds us that truth is not determined by popularity but by faithfulness to God. By following His example, we learn to live with integrity and courage.",
      prayerResponse: `▲ Prayer:\nLord Jesus, You are the Truth. Help me to stand for what is right, even when it is difficult. Give me courage to live according to Your Word and never deny You. Amen.\n\n${commonPrayers}`,
      imageUrl: "/backgrounds/station3.jpg",
    },
    {
      stationNumber: 4,
      title: "Jesus is Scourged and Mocked",
      content: "They stripped Him and put a scarlet robe on Him... and mocked Him.",
      scriptureRef: "Matthew 27:28-29",
      author: "Jesus endures physical pain and deep humiliation at the hands of others. He is mocked, beaten, and treated without dignity. Yet He does not respond with hatred or revenge. Instead, He accepts His suffering with love and obedience. In our lives, we may experience pain, rejection, or embarrassment. These moments can make us feel small or unworthy. However, Jesus shows us that suffering can have meaning when united with love. His example teaches us compassion for others who suffer. It also reminds us to treat every person with kindness and respect.",
      prayerResponse: `▲ Prayer:\nLord Jesus, You endured pain and mockery for me. Help me to be patient in suffering and kind in my words and actions. Teach me to love even in difficult situations. Amen.\n\n${commonPrayers}`,
      imageUrl: "/backgrounds/station4.jpg",
    },
    {
      stationNumber: 5,
      title: "Jesus Carries the Cross",
      content: "Carrying the cross Himself, He went out to the place of the Skull.",
      scriptureRef: "John 19:17",
      author: "Jesus carries His cross with determination and love, even as He grows weak along the way. The weight of the cross represents the burdens of humanity, including our sins and struggles. In our own lives, we all carry crosses— problems, responsibilities, and hardships. At times, these burdens can feel overwhelming and exhausting. We may be tempted to give up or lose hope. However, Jesus teaches us perseverance and trust. He reminds us that we do not carry our crosses alone. With faith, every burden can become a path toward growth and grace.",
      prayerResponse: `▲ Prayer:\nLord Jesus, You carried Your cross with great love. Help me to carry my burdens with faith and trust. Strengthen me when I feel weak and remind me that You are always with me. Amen.\n\n${commonPrayers}`,
      imageUrl: "/backgrounds/station5.jpg",
    },
    {
      stationNumber: 6,
      title: "Jesus is Crucified on the Cross",
      content: "Father, forgive them; for they do not know what they are doing.",
      scriptureRef: "Luke 23:33-34",
      author: "On the Cross, Jesus offers the ultimate sacrifice of love. Even in His suffering, He chooses to forgive those who hurt Him. This reveals the depth of His mercy and compassion. Forgiveness is often difficult, especially when we are deeply hurt. We may hold on to anger, resentment, or pain. Yet Jesus invites us to let go and choose love instead. His example challenges us to forgive not just once, but continually. Through forgiveness, we find healing and freedom in our hearts.",
      prayerResponse: `▲ Prayer:\nLord Jesus, You forgave even those who hurt You. Teach me to forgive others and to love without limits. Help me to live a life that reflects Your mercy and sacrifice. Amen.\n\n${commonPrayers}`,
      imageUrl: "/backgrounds/station6.jpg",
    },
    {
      stationNumber: 7,
      title: "Jesus is Laid in the Tomb",
      content: "They laid Jesus there.",
      scriptureRef: "John 19:41-42",
      author: "Jesus is laid in the tomb, and a deep silence falls over the world. It seems like the end, a moment filled with sorrow and uncertainty. The disciples are left waiting, not fully understanding what will come next. In our own lives, we also experience moments of waiting and darkness. These are times when answers are unclear and hope feels distant. Yet this moment teaches us to trust in God's hidden work. Even in silence, God is preparing something greater. The tomb is not the end, but the beginning of new life and resurrection.",
      prayerResponse: `▲ Prayer:\nLord Jesus, as You rested in the tomb, hope was not lost. In my moments of waiting and uncertainty, strengthen my faith. Help me trust in Your promises and believe in the new life You bring. Amen.\n\n${commonPrayers}`,
      imageUrl: "/backgrounds/station7.jpg",
    },
  ];

  const posts = [
    // Guide CARD is handled by VisitaIglesiaCard component, so we don't need a Post for it.
    {
      type: "REFLECT",
      title: "Opening Prayer",
      content: "Sign of the Cross:\nIn the name of the Father, and of the Son, and of the Holy Spirit. Amen.\n\nOpening Prayer:\nLord Jesus Christ, I begin this sacred Visita Iglesia with a humble heart. As I journey through these churches, help me to accompany You in Your Passion.\n\nOpen my mind to Your Word and my heart to Your love. May this pilgrimage deepen my faith, strengthen my hope, and renew my love for You. Amen.",
      author: "Vince Gio Acedillo",
      imageUrl: "/backgrounds/intro.jpg",
    },
    ...triduumScriptures,
    ...churches.map((c) => ({
      type: "STATION",
      ...c,
    })),
    {
      type: "REFLECT",
      title: "Closing Prayer",
      content: "Lord Jesus, thank You for allowing me to walk with You in Your Passion through this Visita Iglesia. May these reflections remain in my heart and guide my life. Help me grow in faith, hope, and love each day. Amen.\n\n† Final Sign of the Cross:\nIn the name of the Father, and of the Son, and of the Holy Spirit. Amen.",
      author: "Vince Gio Acedillo",
      imageUrl: "/backgrounds/outro.jpg",
    },
  ];

  for (const post of posts) {
    await prisma.post.create({
      data: post,
    });
  }

  console.log(`Seeding complete! ${posts.length} posts added.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
