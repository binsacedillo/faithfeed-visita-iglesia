import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding St. Alphonsus Liguori Devotions...");

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
      imageUrl: "/backgrounds/thursday.jpg",
    },
    {
      type: "SCRIPTURE",
      scheduledDay: "FRIDAY",
      title: "Good Friday",
      scriptureRef: "John 19:30",
      content: "When Jesus had taken the wine, he said, 'It is finished.' And bowing his head, he handed over the spirit.",
      author: "It is finished. He gave everything for you.",
      imageUrl: "/backgrounds/friday.jpg",
    },
    {
      type: "SCRIPTURE",
      scheduledDay: "SATURDAY",
      title: "Holy Saturday",
      scriptureRef: "Matthew 27:66",
      content: "So they went and made the tomb secure by sealing the stone and setting the guard.",
      author: "In the silence, God is working. Trust the wait.",
      imageUrl: "/backgrounds/saturday.jpg",
    },
    {
      type: "SCRIPTURE",
      scheduledDay: "EASTER",
      title: "Easter Sunday",
      scriptureRef: "John 20:1-9",
      content: "On the first day of the week, Mary of Magdala came to the tomb early in the morning... and saw the stone removed from the tomb. So she ran and went to Simon Peter... 'They have taken the Lord from the tomb, and we don’t know where they put him.'",
      author: "He is Risen! The tomb is empty. The world is reborn.",
      imageUrl: "/backgrounds/easter.jpg",
    }
  ];

  const easterSeasonEntries = [
    {
      type: "SCRIPTURE",
      scheduledDay: "EASTER_SEASON",
      title: "Easter Season Gospel",
      scriptureRef: "John 14:6",
      content: "Jesus said to him, 'I am the way and the truth and the life. No one comes to the Father except through me.'",
      author: "Let the Risen Christ lead your path this week.",
      prayerText: "Lord Jesus, You are the way when I feel lost, the truth when I am confused, and the life when I am tired. Keep my heart close to You in this Easter Season.",
      prayerResponse: "Risen Lord, renew my hope and teach me to walk in Your light each day. Amen.",
      imageUrl: "/backgrounds/easter.jpg",
    },
    {
      type: "SCRIPTURE",
      scheduledDay: "EASTER_SEASON",
      title: "Easter Season Promise",
      scriptureRef: "Matthew 28:20",
      content: "And behold, I am with you always, until the end of the age.",
      author: "He is with us in ordinary routines and hidden struggles.",
      prayerText: "Risen Jesus, stay with me in my studies, work, family life, and quiet moments. Let me never forget Your faithful presence.",
      prayerResponse: "Lord, make my life a witness of Your resurrection peace. Amen.",
      imageUrl: "/backgrounds/easter.jpg",
    },
    {
      type: "REFLECT",
      scheduledDay: "EASTER_SEASON",
      title: "Prayer for the Fifty Days",
      content: "Risen Christ, breathe new life into what is weary in me. Heal what is wounded, strengthen what is weak, and kindle joy where there is fear. May Your victory over death shape my words, choices, and love for others. Amen.",
      author: "Easter Season Prayer",
      imageUrl: "/backgrounds/easter.jpg",
    },
  ];

  const stationsOfCross = [
    {
      stationNumber: 1,
      category: "STATIONS_OF_CROSS",
      title: "Pilate Condemns Jesus to Die",
      content: "Consider how Jesus Christ, after being scourged and crowned with thorns, was unjustly condemned by Pilate to die on the cross.",
      prayerResponse: "My adorable Jesus, it was not Pilate; no, it was my sins that condemned You to die. I beseech You, by the merits of this sorrowful journey, to assist my soul on its journey to eternity. I love You, beloved Jesus; I love You more than I love myself. With all my heart I repent of ever having offended You. Grant that I may love You always; and then do with me as You will.",
      scriptureRef: "Mark 15:15",
      prayerText: "So Pilate, wishing to satisfy the crowd, released Barabbas to them and, after he had Jesus scourged, handed him over to be crucified.",
      imageUrl: "/backgrounds/liguori_station1.png",
    },
    {
      stationNumber: 2,
      category: "STATIONS_OF_CROSS",
      title: "Jesus Accepts His Cross",
      content: "Consider Jesus as He walked this road with the cross on His shoulders, thinking of us, and offering to His Father in our behalf, the death He was about to suffer.",
      prayerResponse: "My most beloved Jesus, I embrace all the sufferings You have destined for me until death. I beg You, by all You suffered in carrying Your cross, to help me carry mine with Your perfect peace and resignation. I love You, Jesus, my love; I repent of ever having offended You. Never let me separate myself from You again. Grant that I may love You always; and then do with me as You will.",
      scriptureRef: "John 19:17",
      prayerText: "And carrying the cross himself he went out to what is called the Place of the Skull, in Hebrew, Golgotha.",
      imageUrl: "/backgrounds/liguori_station2.png",
    },
    {
      stationNumber: 3,
      category: "STATIONS_OF_CROSS",
      title: "Jesus Falls the First Time",
      content: "Consider the first fall of Jesus. Loss of blood from the scourging and crowing with thorns had so weakened Him that He could hardly walk; and yet He had to carry that great load upon His shoulders. As the soldiers struck Him cruelly, He fell several times under the heavy cross.",
      prayerResponse: "My beloved Jesus, it was not the weight of the cross but the weight of my sins which made You suffer so much. By the merits of this first fall, save me from falling into mortal sin. I love You, O my Jesus, with all my heart; I am sorry that I am sorry that I have offended You. May I never offend You again. Grant that I may love You always; and then do with me as You will.",
      scriptureRef: "Isaiah 53:4",
      prayerText: "Yet it was our infirmities that he bore, our sufferings that he endured, while we thought of him as stricken, as one smitten by God and afflicted.",
      imageUrl: "/backgrounds/liguori_station3.png",
    },
    {
      stationNumber: 4,
      category: "STATIONS_OF_CROSS",
      title: "Jesus Meets His Afflicted Mother",
      content: "Consider how the Son met his Mother on His way to Calvary. Jesus and Mary gazed at each other and their looks became as so many arrows to wound those hearts which loved each other so tenderly.",
      prayerResponse: "My most loving Jesus, by the pain You suffered in this meeting grant me the grace of being truly devoted to Your most holy Mother. And You, my Queen, who was overwhelmed with sorrow, obtain for me by Your prayers a tender and a lasting remembrance of the passion of Your divine Son. I love You, Jesus, my Love, above all things. I repent of ever having offended You. Never allow me to offend You again. Grant that I may love You always; and then do with me as You will.",
      scriptureRef: "John 19:25-26",
      prayerText: "Standing by the cross of Jesus were his mother and his mother’s sister… When Jesus saw his mother and the disciple there whom he loved, he said to his mother, “Woman, behold, your son.”",
      imageUrl: "/backgrounds/liguori_station4.png",
    },
    {
      stationNumber: 5,
      category: "STATIONS_OF_CROSS",
      title: "Simon Helps Jesus Carry the Cross",
      content: "Consider how weak and weary Jesus was. At each step He was at the point of expiring. Fearing that He would die on the way when they wished Him to die the infamous death of the cross, they forced Simon of Cyrene to help carry the cross after Our Lord.",
      prayerResponse: "My beloved Jesus I will not refuse the cross as Simon did: I accept it and embrace it. I accept in particular the death that is destined for me with all the pains that may accompany it. I unite it to Your death and I offer it to You. You have died for love of me; I will die for love of You and to please You. Help me by Your grace. I love You, Jesus, my Love; I repent of ever having offended You. Never let me offend You again. Grant that I may love You always; and then do with me as You will.",
      scriptureRef: "Mark 15:21",
      prayerText: "They pressed into service a passer-by, Simon, a Cyrenian, who was coming in from the country, the father of Alexander and Rufus, to carry his cross.",
      imageUrl: "/backgrounds/liguori_station5.png",
    },
    {
      stationNumber: 6,
      category: "STATIONS_OF_CROSS",
      title: "Veronica Offers Her Veil to Jesus",
      content: "Consider the compassion of the holy woman, Veronica. Seeing Jesus in such distress, His face bathed in sweat and blood, she presented Him with her veil. Jesus wiped His face, and left upon the cloth the image of his sacred countenance.",
      prayerResponse: "My beloved Jesus, Your face was beautiful before You began this journey; but, now, it no longer appears beautiful and is disfigured with wounds and blood. Alas, my soul also was once beautiful when it received Your grace in Baptism; but I have since disfigured it with my sins. You alone, my Redeemer, can restore it to its former beauty. Do this by the merits of Your passion; and then do with me as You will.",
      scriptureRef: "Isaiah 53:3",
      prayerText: "He was spurned and avoided by men, a man of suffering, accustomed to infirmity, one of those from whom people hide their faces, spurned, and we held him in no esteem.",
      imageUrl: "/backgrounds/liguori_station6.png",
    },
    {
      stationNumber: 7,
      category: "STATIONS_OF_CROSS",
      title: "Jesus Falls the Second Time",
      content: "Consider how the second fall of Jesus under His cross renews the pain in all the wounds of the head and members of our afflicted Lord.",
      prayerResponse: "My most gentle Jesus, how many times You have forgiven me; and how many times I have fallen again and begun again to offend You! By the merits of this second fall, give me the grace to persevere in Your love until death. Grant, that in all my temptations, I may always have recourse to You. I love You, Jesus, my Love with all my heart; I am sorry that I have offended You. Never let me offend You again. Grant that I may love You always; and then do with me as You will.",
      scriptureRef: "Isaiah 53:7",
      prayerText: "Though harshly treated, he submitted and opened not his mouth; Like a lamb led to slaughter or a sheep before shearers, he was silent and opened not his mouth.",
      imageUrl: "/backgrounds/liguori_station7.png",
    },
    {
      stationNumber: 8,
      category: "STATIONS_OF_CROSS",
      title: "Jesus Speaks to the Women",
      content: "Consider how the women wept with compassion seeing Jesus so distressed and dripping with blood as he walked along. Jesus said to them, “Weep not so much for me, but rather for Your children.”",
      prayerResponse: "My Jesus, laden with sorrows, I weep for the sins which I have committed against You because of the punishment I deserve for them; and, still more, because of the displeasure they have caused You who have loved me with an infinite love. It is Your love, more than the fear of hell, which makes me weep for my sins. My Jesus, I love You more than myself; I am sorry that I have offended You. Never allow me to offend You again. Grant that I may love You always; and then do with me as You will.",
      scriptureRef: "Luke 23:28",
      prayerText: "Jesus turned to them and said, “Daughters of Jerusalem, do not weep for me; weep instead for yourselves and for your children.”",
      imageUrl: "/backgrounds/liguori_station8.png",
    },
    {
      stationNumber: 9,
      category: "STATIONS_OF_CROSS",
      title: "Jesus Falls the Third Time",
      content: "Consider how Jesus Christ fell for the third time. He was extremely weak and the cruelty of His executioners was excessive; they tried to hasten His steps though He hardly had strength to move.",
      prayerResponse: "My outraged Jesus, by the weakness You suffered in going to Calvary, give me enough strength to overcome all human respect and all my evil passions which have led me to despise Your friendship. I love You, Jesus my Love, with all my heart; I am sorry for ever having offended You. Never permit me to offend You again. Grant that I may love You always; and then do with me as You will.",
      scriptureRef: "Psalm 22:15",
      prayerText: "Like water my life drains away; all my bones are disjointed. My heart has become like wax, it melts away within me.",
      imageUrl: "/backgrounds/liguori_station9.png",
    },
    {
      stationNumber: 10,
      category: "STATIONS_OF_CROSS",
      title: "Jesus Is Stripped of His Garments",
      content: "Consider how Jesus was violently stripped of His clothes by His executioners. The inner garments adhered to his lacerated flesh and the soldiers tore them off so roughly that the skin came with them.",
      prayerResponse: "My innocent Jesus, by the torment You suffered in being stripped of Your garments, help me to strip myself of all attachment for the things of earth that I may place all my love in You who are so worthy of my love. I love You, O Jesus, with all my heart; I am sorry for ever having offended You. Never let me offend You again. Grant that I may love You always; and then do with me as You will.",
      scriptureRef: "John 19:23-24",
      prayerText: "When the soldiers had crucified Jesus, they took his clothes and divided them into four shares…",
      imageUrl: "/backgrounds/liguori_station10.png",
    },
    {
      stationNumber: 11,
      category: "STATIONS_OF_CROSS",
      title: "Jesus Is Nailed to the Cross",
      content: "Consider Jesus, thrown down upon the cross, He stretched out His arms and offered to His eternal Father the sacrifice of His life for our salvation. They nailed His hands and feet, and then, raising the cross, left Him to die in anguish.",
      prayerResponse: "My despised Jesus, nail my heart to the cross that it may always remain there to love You and never leave You again. I love You more than myself; I am sorry for ever having offended You. Never permit me to offend You again. Grant that I may love You always; and then do with me as You will.",
      scriptureRef: "Luke 23:33",
      prayerText: "When they came to the place called the Skull, they crucified him and the criminals there, one on his right, the other on his left.",
      imageUrl: "/backgrounds/station11.png",
    },
    {
      stationNumber: 12,
      category: "STATIONS_OF_CROSS",
      title: "Jesus Dies Upon the Cross",
      content: "Consider how Your Jesus, after three hours of agony on the cross, is finally overwhelmed with suffering and, abandoning Himself to the weight of His body, bows His head and dies.",
      prayerResponse: "My dying Jesus, I devoutly kiss the cross on which You would die for love of me. I deserve, because of my sins, to die a terrible death; but Your death is my hope. By the merits of Your death, give me the grace to die embracing Your feet and burning with love of You. I yield my soul into Your hands. I love You with my whole heart. I am sorry that I have offended You. Never let me offend You again. Grant that I may love You always; and then do with me as You will.",
      scriptureRef: "John 19:30",
      prayerText: "When Jesus had taken the wine, he said, “It is finished.” And bowing his head, he handed over the spirit.",
      imageUrl: "/backgrounds/station12.png",
    },
    {
      stationNumber: 13,
      category: "STATIONS_OF_CROSS",
      title: "Jesus Is Taken Down from the Cross",
      content: "Consider how, after Our Lord had died, He was taken down from the cross by two of His disciples, Joseph and Nicodemus, and placed in the arms of His afflicted Mother. She received Him with unutterable tenderness and pressed Him close to her bosom.",
      prayerResponse: "O Mother of Sorrows, for the love of Your Son, accept me as Your servant and pray to Him for me, And You, my Redeemer, since you have died for me, allow me to love You, for I desire only You and nothing more. I love You, Jesus my Love, and I am sorry that I have offended You. Never let me offend You again. Grant that I may love You always; and then do with me as You will.",
      scriptureRef: "John 19:38",
      prayerText: "After this, Joseph of Arimathea, secretly a disciple of Jesus for fear of the Jews, asked Pilate if he could remove the body of Jesus. And Pilate permitted it. So he came and took his body.",
      imageUrl: "/backgrounds/station13.png",
    },
    {
      stationNumber: 14,
      category: "STATIONS_OF_CROSS",
      title: "Jesus Is Placed in the Sepulcher",
      content: "Consider how the disciples carried the body of Jesus to its burial, while His holy Mother went with them and arranged it in the sepulcher with her own hands. They then closed the tomb and all departed.",
      prayerResponse: "Oh, my buried Jesus, I kiss the stone that closes You in. But You gloriously did rise again on the third day. I beg You by Your resurrection that I may be raised gloriously on the last day, to be united with You in heaven, to praise You and love You forever. I love You, Jesus, and I repent of ever having offended You. Grant that I may love You always; and then do with me as You will.",
      scriptureRef: "Mark 15:46",
      prayerText: "He bought a linen cloth, took him down, wrapped him in the linen cloth and laid him in a tomb that had been hewn out of the rock. Then he rolled a stone against the entrance to the tomb.",
      imageUrl: "/backgrounds/station14.png",
    },
  ];

  const churches = [
    {
      stationNumber: 1,
      category: "VISITA_IGLESIA",
      title: "Jesus in the Garden of Gethsemane",
      content: "Father, if it is possible, let this cup pass from me; yet not as I will, but as you will.",
      scriptureRef: "Matthew 26:36-39",
      author: "In the Garden of Gethsemane, Jesus experiences deep sorrow and distress, showing His true humanity. He understands fear, pain, and uncertainty just as we do in our daily lives. Yet despite His anguish, He chooses to trust completely in the Father's will. This reminds us that faith is not the absence of fear, but the courage to surrender to God even in difficult moments. Many times, we struggle to accept situations that are beyond our control. We may question God or feel abandoned in our trials. However, Jesus shows us that prayer is our refuge and strength. Through sincere prayer, we find the grace to continue and the peace that comes from trusting God.",
      prayerResponse: `▲ Prayer:\nLord Jesus, in Your agony, You chose obedience to the Father. In my fears and struggles, help me trust in God's will. Teach me to surrender everything to You and to remain faithful in prayer. Amen.\n\n${commonPrayers}`,
      imageUrl: "/backgrounds/station1.jpg",
    },
    {
      stationNumber: 2,
      category: "VISITA_IGLESIA",
      title: "Jesus Before the Sanhedrin",
      content: "They were looking for false testimony against Jesus... but they found none.",
      scriptureRef: "Matthew 26:59–63",
      author: "Jesus stands before the Sanhedrin, facing false accusations and unjust judgment. He is innocent, yet He is treated as guilty and undeserving of respect. In His silence, we see His humility and complete trust in the Father's plan. In our lives, we may also experience being misunderstood, judged, or wrongly accused. These moments can tempt us to react with anger or defensiveness. However, Jesus teaches us to remain calm and grounded in truth. His example invites us to respond with patience and dignity. When we trust in God's justice, we can endure trials without losing our peace.",
      prayerResponse: `▲ Prayer:\nLord Jesus, when You were falsely accused, You remained calm and faithful. Help me to respond with humility when I am judged or misunderstood. Teach me patience and trust in Your justice. Amen.\n\n${commonPrayers}`,
      imageUrl: "/backgrounds/station2.jpg",
    },
    {
      stationNumber: 3,
      category: "VISITA_IGLESIA",
      title: "Jesus Before Pontius Pilate",
      content: "For this I was born... to testify to the truth.",
      scriptureRef: "John 18:37-38",
      author: "Jesus stands before Pilate as the embodiment of truth, yet He is rejected by those in power. Pilate struggles between doing what is right and pleasing the crowd. This reflects the struggles we face when making difficult decisions. Sometimes, we know what is right but are afraid of the consequences. We may choose comfort, approval, or convenience over truth. Jesus challenges us to stand firm in our values and beliefs. He reminds us that truth is not determined by popularity but by faithfulness to God. By following His example, we learn to live with integrity and courage.",
      prayerResponse: `▲ Prayer:\nLord Jesus, You are the Truth. Help me to stand for what is right, even when it is difficult. Give me courage to live according to Your Word and never deny You. Amen.\n\n${commonPrayers}`,
      imageUrl: "/backgrounds/station3.jpg",
    },
    {
      stationNumber: 4,
      category: "VISITA_IGLESIA",
      title: "Jesus is Scourged and Mocked",
      content: "They stripped Him and put a scarlet robe on Him... and mocked Him.",
      scriptureRef: "Matthew 27:28-29",
      author: "Jesus endures physical pain and deep humiliation at the hands of others. He is mocked, beaten, and treated without dignity. Yet He does not respond with hatred or revenge. Instead, He accepts His suffering with love and obedience. In our lives, we may experience pain, rejection, or embarrassment. These moments can make us feel small or unworthy. However, Jesus shows us that suffering can have meaning when united with love. His example teaches us compassion for others who suffer. It also reminds us to treat every person with kindness and respect.",
      prayerResponse: `▲ Prayer:\nLord Jesus, You endured pain and mockery for me. Help me to be patient in suffering and kind in my words and actions. Teach me to love even in difficult situations. Amen.\n\n${commonPrayers}`,
      imageUrl: "/backgrounds/station4.jpg",
    },
    {
      stationNumber: 5,
      category: "VISITA_IGLESIA",
      title: "Jesus Carries the Cross",
      content: "Carrying the cross Himself, He went out to the place of the Skull.",
      scriptureRef: "John 19:17",
      author: "Jesus carries His cross with determination and love, even as He grows weak along the way. The weight of the cross represents the burdens of humanity, including our sins and struggles. In our own lives, we all carry crosses— problems, responsibilities, and hardships. At times, these burdens can feel overwhelming and exhausting. We may be tempted to give up or lose hope. However, Jesus teaches us perseverance and trust. He reminds us that we do not carry our crosses alone. With faith, every burden can become a path toward growth and grace.",
      prayerResponse: `▲ Prayer:\nLord Jesus, You carried Your cross with great love. Help me to carry my burdens with faith and trust. Strengthen me when I feel weak and remind me that You are always with me. Amen.\n\n${commonPrayers}`,
      imageUrl: "/backgrounds/station5.jpg",
    },
    {
      stationNumber: 6,
      category: "VISITA_IGLESIA",
      title: "Jesus is Crucified on the Cross",
      content: "Father, forgive them; for they do not know what they are doing.",
      scriptureRef: "Luke 23:33-34",
      author: "On the Cross, Jesus offers the ultimate sacrifice of love. Even in His suffering, He chooses to forgive those who hurt Him. This reveals the depth of His mercy and compassion. Forgiveness is often difficult, especially when we are deeply hurt. We may hold on to anger, resentment, or pain. Yet Jesus invites us to let go and choose love instead. His example challenges us to forgive not just once, but continually. Through forgiveness, we find healing and freedom in our hearts.",
      prayerResponse: `▲ Prayer:\nLord Jesus, You forgave even those who hurt You. Teach me to forgive others and to love without limits. Help me to live a life that reflects Your mercy and sacrifice. Amen.\n\n${commonPrayers}`,
      imageUrl: "/backgrounds/station6.jpg",
    },
    {
      stationNumber: 7,
      category: "VISITA_IGLESIA",
      title: "Jesus is Laid in the Tomb",
      content: "They laid Jesus there.",
      scriptureRef: "John 19:41-42",
      author: "Jesus is laid in the tomb, and a deep silence falls over the world. It seems like the end, a moment filled with sorrow and uncertainty. The disciples are left waiting, not fully understanding what will come next. In our own lives, we also experience moments of waiting and darkness. These are times when answers are unclear and hope feels distant. Yet this moment teaches us to trust in God's hidden work. Even in silence, God is preparing something greater. The tomb is not the end, but the beginning of new life and resurrection.",
      prayerResponse: `▲ Prayer:\nLord Jesus, as You rested in the tomb, hope was not lost. In my moments of waiting and uncertainty, strengthen my faith. Help me trust in Your promises and believe in the new life You bring. Amen.\n\n${commonPrayers}`,
      imageUrl: "/backgrounds/station7.jpg",
    },
  ];

  const posts = [
    {
      type: "REFLECT",
      category: "GENERAL",
      title: "Opening Prayer",
      content: "My Lord, Jesus Christ, You have made this journey to die for me with unspeakable love; and I have so many times ungratefully abandoned You. | But now I love You with all my heart; and, because I love You, I am sincerely sorry for ever having offended You. Pardon me, my God, and permit me to accompany You on this journey. You go to die for love of me; I want, my beloved Redeemer, to die for love of You. My Jesus, I will live and die always united to You.",
      author: "St. Alphonsus Liguori",
      imageUrl: "/backgrounds/guide.jpg",
    },
    ...triduumScriptures.map(s => ({ ...s, category: "GENERAL" })),
    ...easterSeasonEntries.map(s => ({ ...s, category: "GENERAL" })),
    ...churches.map((c) => ({
      type: "STATION",
      ...c,
    })),
    ...stationsOfCross.map((s) => ({
      type: "STATION",
      ...s,
    })),
    {
      type: "REFLECT",
      category: "GENERAL",
      title: "Easter Prayer of Hope",
      content: "Risen Jesus, You have conquered sin and death. Let Your light rise in my heart, Your peace settle my fears, and Your joy shape my words and choices. Teach me to live as a witness of resurrection hope, and to carry that hope into every ordinary day.",
      author: "Easter Season Prayer",
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
