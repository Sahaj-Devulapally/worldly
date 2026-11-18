// "Did you know?" facts shown after a right answer. Three per country, shown in turn.
self.FACTS = Object.assign(self.FACTS || {}, {
  /* ---------- Asia ---------- */
  af: [
    "Afghanistan has two official languages: Pashto and Dari, a form of Persian.",
    "The giant Buddhas of Bamiyan, carved into a cliff in the 6th century, were destroyed in 2001.",
    "A narrow strip of land called the Wakhan Corridor links Afghanistan to China.",
  ],
  am: [
    "In 301 AD Armenia became the first country to make Christianity its state religion.",
    "Armenian has its own alphabet, created in 405 AD by the monk Mesrop Mashtots.",
    "Mount Ararat, Armenia's national symbol, can be seen from Yerevan but lies across the border in Turkey.",
  ],
  az: [
    "Azerbaijan is called the \"Land of Fire\": natural gas has fed flames on its hillsides for centuries.",
    "Baku sits about 28 m below sea level on the Caspian Sea, making it the lowest capital city in the world.",
    "Azerbaijan has around 400 mud volcanoes, more than any other country.",
  ],
  bh: [
    "Bahrain is a group of islands, linked to Saudi Arabia by the 25 km King Fahd Causeway.",
    "For thousands of years Bahrain was famous for pearl diving.",
    "Bahrain is thought to be the site of Dilmun, an ancient Bronze Age trading civilisation.",
  ],
  bd: [
    "The Sundarbans, shared with India, is the world's largest mangrove forest and is home to Bengal tigers.",
    "International Mother Language Day, 21 February, honours Bangladeshi students killed in 1952 while defending the Bengali language.",
    "Bangladesh became independent from Pakistan in 1971.",
  ],
  bt: [
    "Bhutan measures its progress with \"Gross National Happiness\".",
    "Bhutan absorbs more carbon dioxide than it produces, thanks to its forests.",
    "Archery is Bhutan's national sport.",
  ],
  bn: [
    "Brunei is ruled by a sultan from a royal family that has reigned for over 600 years.",
    "Kampong Ayer in Brunei is a \"water village\" of houses on stilts, home to thousands of people.",
    "Thanks to oil and gas, people in Brunei pay no personal income tax.",
  ],
  kh: [
    "Angkor Wat is the largest religious monument in the world, and it appears on Cambodia's flag.",
    "The Khmer alphabet has 74 letters, the most of any alphabet.",
    "Every rainy season, Cambodia's Tonlé Sap river reverses the direction it flows.",
  ],
  cn: [
    "Mandarin Chinese has more native speakers than any other language.",
    "All of China uses a single time zone, even though the country is wide enough for five.",
    "Paper, printing, gunpowder and the compass are known as China's \"Four Great Inventions\".",
  ],
  ge: [
    "Georgia has one of the oldest wine traditions in the world, around 8,000 years old, using clay jars called qvevri.",
    "Georgian has its own alphabet of 33 letters, used by no other language.",
    "Georgians call their country Sakartvelo.",
  ],
  in: [
    "India has more people than any other country.",
    "India's constitution recognises 22 languages. The central government mainly uses Hindi and English.",
    "Chess is thought to have started in India as a game called chaturanga.",
  ],
  id: [
    "Indonesia is made up of more than 17,000 islands.",
    "Indonesia has more Muslims than any other country.",
    "Komodo dragons, the largest lizards in the world, live only in Indonesia.",
  ],
  ir: [
    "Iran was known as Persia in the West until 1935, and its language is Persian (Farsi).",
    "Iranians celebrate Nowruz, the Persian New Year, on the first day of spring.",
    "Iran grows around 90% of the world's saffron.",
  ],
  iq: [
    "Writing was invented in ancient Mesopotamia, in what is now Iraq, over 5,000 years ago.",
    "The ruins of ancient Babylon are in Iraq, about 85 km south of Baghdad.",
    "Arabic and Kurdish are Iraq's official languages.",
  ],
  il: [
    "The shore of the Dead Sea, on Israel's border, is the lowest point on land, over 430 m below sea level.",
    "Hebrew was revived as an everyday spoken language in the late 1800s and 1900s, after centuries of mostly religious use.",
    "Jerusalem is holy to Judaism, Christianity and Islam.",
  ],
  jp: [
    "Japan is made up of more than 14,000 islands.",
    "Japanese uses three writing systems together: hiragana, katakana and kanji.",
    "A hot-spring inn in Japan, Nishiyama Onsen Keiunkan, has been running since 705 AD.",
  ],
  jo: [
    "Petra, a city carved into rose-red rock by the Nabataeans, is one of the New Seven Wonders of the World.",
    "Jordan's Wadi Rum desert has stood in for Mars in several films.",
    "Jordan is one of the most water-scarce countries in the world.",
  ],
  kz: [
    "Kazakhstan is the largest landlocked country in the world.",
    "Yuri Gagarin, the first person in space, launched from Baikonur in Kazakhstan in 1961.",
    "Apples are thought to have first grown wild in the mountains of Kazakhstan.",
  ],
  kw: [
    "The Kuwaiti dinar is the highest-valued currency unit in the world.",
    "Iraq invaded Kuwait in 1990, leading to the Gulf War.",
    "Kuwait has no rivers or natural lakes.",
  ],
  kg: [
    "More than 90% of Kyrgyzstan is mountains.",
    "The Epic of Manas, Kyrgyzstan's national poem, is one of the longest epic poems in the world.",
    "The red disc on Kyrgyzstan's flag shows the crown of a yurt, the traditional nomad tent.",
  ],
  la: [
    "Laos is the most heavily bombed country per person in history, from US bombing during the Vietnam War.",
    "Laos is the only landlocked country in Southeast Asia.",
    "Sticky rice is the staple food of Laos, usually eaten with your hands.",
  ],
  lb: [
    "Lebanon's flag shows a cedar tree. Lebanese cedar wood was prized by ancient kings.",
    "The Phoenicians, from what is now Lebanon, created an alphabet that led to the Greek and Latin alphabets.",
    "Lebanon's name comes from an ancient word for \"white\", after its snowy mountains.",
  ],
  my: [
    "The Petronas Twin Towers in Kuala Lumpur were the tallest buildings in the world from 1998 to 2004.",
    "Malaysia is split in two by the sea: the Malay Peninsula and part of the island of Borneo.",
    "Malaysia's king is chosen from nine state rulers and changes every five years.",
  ],
  mv: [
    "The Maldives is the lowest-lying country in the world, on average about 1.5 m above sea level.",
    "The Maldives is made of about 1,200 coral islands grouped into 26 atolls.",
    "In 2009 the Maldives government held a cabinet meeting underwater to draw attention to rising seas.",
  ],
  mn: [
    "Mongolia has fewer people per square kilometre than any other independent country.",
    "Genghis Khan founded the Mongol Empire, the largest connected land empire in history.",
    "Many Mongolians still live in gers, the round felt tents of nomadic herders.",
  ],
  mm: [
    "Myanmar moved its capital from Yangon to the newly built city of Naypyidaw in 2005.",
    "Bagan, in Myanmar, has more than 2,000 ancient Buddhist temples and pagodas.",
    "Myanmar is one of only three countries, with the USA and Liberia, that don't officially use the metric system.",
  ],
  np: [
    "Nepal's flag is the only national flag that isn't a rectangle.",
    "Eight of the world's ten highest mountains, including Everest, are in Nepal.",
    "Lumbini in Nepal is the birthplace of the Buddha.",
  ],
  kp: [
    "The Korean War (1950–53) ended with an armistice, not a peace treaty, so the two Koreas never formally made peace.",
    "Both Koreas write with Hangul, which North Korea calls Chosŏn'gŭl.",
    "Pyongyang's Ryugyong Hotel, a 105-storey pyramid, has never fully opened.",
  ],
  om: [
    "Oman is one of the oldest independent states in the Arab world.",
    "Frankincense from Oman's Dhofar region has been traded for thousands of years.",
    "Oman once ruled Zanzibar, and in the 1800s its sultan moved his capital there.",
  ],
  pk: [
    "K2, the second-highest mountain in the world, is in Pakistan.",
    "Urdu is Pakistan's national language, but Punjabi is the most common first language.",
    "Mohenjo-daro, built around 2500 BC by the Indus Valley Civilisation, was one of the world's first planned cities.",
  ],
  ps: [
    "Jericho is one of the oldest continuously inhabited cities in the world.",
    "Bethlehem is the traditional birthplace of Jesus.",
    "Palestinian embroidery, called tatreez, is on UNESCO's list of intangible cultural heritage.",
  ],
  ph: [
    "The Philippines is made up of more than 7,600 islands.",
    "The Philippines is named after King Philip II of Spain.",
    "More than 170 languages are spoken in the Philippines. Filipino and English are the official ones.",
  ],
  qa: [
    "In 2022 Qatar hosted the first FIFA World Cup held in the Arab world.",
    "Qatar is one of the world's biggest exporters of liquefied natural gas.",
    "Qatar is a peninsula, and its only land border is with Saudi Arabia.",
  ],
  sa: [
    "Saudi Arabia is the largest country in the world with no permanent rivers.",
    "Mecca and Medina, the two holiest cities of Islam, are in Saudi Arabia.",
    "The Rub' al Khali, or Empty Quarter, is the largest continuous sand desert in the world.",
  ],
  sg: [
    "Singapore has four official languages: English, Malay, Mandarin and Tamil.",
    "Singapore was briefly part of Malaysia before becoming independent in 1965.",
    "Singapore has grown by about a quarter by reclaiming land from the sea.",
  ],
  kr: [
    "Hangul, the Korean alphabet, was created in 1443 under King Sejong the Great.",
    "Until 2023, Koreans traditionally counted a baby as one year old at birth.",
    "The South Korean film \"Parasite\" was the first non-English-language film to win the Oscar for Best Picture.",
  ],
  lk: [
    "In 1960 Sri Lanka elected Sirimavo Bandaranaike, the world's first female prime minister.",
    "Sri Lanka is one of the world's biggest tea exporters. \"Ceylon tea\" comes from the island's old name.",
    "Sigiriya, an ancient rock fortress, rises about 180 m above the surrounding jungle.",
  ],
  sy: [
    "Damascus is one of the oldest continuously inhabited cities in the world.",
    "Aleppo was a major stop on the Silk Road.",
    "Ugarit in Syria produced one of the earliest known alphabets, around 1400 BC.",
  ],
  tw: [
    "Taipei 101 was the tallest building in the world from 2004 to 2010.",
    "Bubble tea was invented in Taiwan in the 1980s.",
    "Taiwan writes with traditional Chinese characters, not the simplified ones used in mainland China.",
  ],
  tj: [
    "More than 90% of Tajikistan is mountains, including some of the highest peaks in Central Asia.",
    "Tajik is a form of Persian, written in the Cyrillic alphabet.",
    "The Pamir Highway through Tajikistan is one of the highest international roads in the world.",
  ],
  th: [
    "Thailand is the only Southeast Asian country never colonised by a European power.",
    "Bangkok's full ceremonial name is the longest place name in the world.",
    "Thailand uses the Buddhist calendar, which is 543 years ahead of the Western one.",
  ],
  tl: [
    "Timor-Leste became independent in 2002, the first new country of the 21st century.",
    "Tetum and Portuguese are Timor-Leste's official languages.",
    "The reefs around Timor-Leste's Atauro Island have some of the highest numbers of reef fish species ever recorded.",
  ],
  tr: [
    "Istanbul sits on two continents, Europe and Asia, divided by the Bosphorus strait.",
    "Turkey switched from Arabic script to the Latin alphabet in 1928.",
    "Göbekli Tepe in Türkiye, around 11,000 years old, is one of the oldest known monumental sites in the world.",
  ],
  tm: [
    "The Darvaza gas crater, known as the \"Gates of Hell\", has been burning since 1971.",
    "About 80% of Turkmenistan is covered by the Karakum Desert.",
    "Ashgabat holds a world record for the most buildings clad in white marble.",
  ],
  ae: [
    "The Burj Khalifa in Dubai is the tallest building in the world, at 828 m.",
    "The UAE is a federation of seven emirates, including Abu Dhabi and Dubai.",
    "Close to 90% of people living in the UAE come from other countries.",
  ],
  uz: [
    "Uzbekistan is one of only two doubly landlocked countries: landlocked, and surrounded only by landlocked countries.",
    "Samarkand and Bukhara in Uzbekistan were great cities on the Silk Road.",
    "Plov, a rice dish cooked with meat and carrots, is Uzbekistan's national dish.",
  ],
  vn: [
    "Vietnamese is written in the Latin alphabet, with many accent marks to show its tones.",
    "Vietnam is the world's second-largest coffee producer, after Brazil.",
    "Son Doong in Vietnam is the largest known cave in the world.",
  ],
  ye: [
    "Shibam in Yemen is called the \"Manhattan of the desert\" for its mud-brick tower houses, some over 500 years old.",
    "Yemen's Socotra island is famous for its strange umbrella-shaped dragon's blood trees.",
    "Mocha coffee is named after the Yemeni port of Mocha, once the centre of the coffee trade.",
  ],

  /* ---------- Oceania ---------- */
  au: [
    "Australia is the only country that covers a whole continent.",
    "The Great Barrier Reef is the largest coral reef system in the world.",
    "Canberra was built as the capital as a compromise between rivals Sydney and Melbourne.",
  ],
  fj: [
    "Fiji has about 330 islands, and about a third of them have people living on them.",
    "Fiji won Olympic gold in rugby sevens in 2016 and 2020, its first Olympic medals.",
    "Kava, a drink made from a pepper-plant root, is central to Fijian ceremonies.",
  ],
  ki: [
    "Kiribati is the only country with land in all four hemispheres.",
    "In 1995 Kiribati moved the International Date Line so all its islands share the same day.",
    "\"Kiribati\" is pronounced \"Kiribass\". It's the local way of saying \"Gilberts\", the islands' old name.",
  ],
  mh: [
    "The USA tested nuclear weapons at Bikini and Enewetak atolls in the Marshall Islands from 1946 to 1958.",
    "The bikini swimsuit was named after Bikini Atoll.",
    "Marshallese navigators used charts made of sticks and shells to map ocean swells.",
  ],
  fm: [
    "Nan Madol, off the island of Pohnpei, is an ancient city of stone built on artificial islets.",
    "On the island of Yap, giant stone discs called rai are still used as traditional money.",
    "Micronesia has four states: Yap, Chuuk, Pohnpei and Kosrae.",
  ],
  nr: [
    "Nauru is the smallest island country in the world, about 21 km².",
    "Nauru has no official capital. Government offices are in the district of Yaren.",
    "In the 1970s, phosphate mining made Nauru one of the richest countries per person in the world.",
  ],
  nz: [
    "In 1893 New Zealand became the first country to give women the vote.",
    "Māori, English and New Zealand Sign Language are New Zealand's official languages.",
    "The Lord of the Rings films were shot in New Zealand.",
  ],
  pw: [
    "In 2009 Palau created the world's first shark sanctuary.",
    "Palau's Jellyfish Lake is home to millions of jellyfish with a sting too weak to hurt swimmers.",
    "Visitors to Palau sign the \"Palau Pledge\" in their passport, promising to protect the environment.",
  ],
  pg: [
    "More than 800 languages are spoken in Papua New Guinea, more than in any other country.",
    "Papua New Guinea shares the island of New Guinea with Indonesia.",
    "Tok Pisin, an English-based creole, is the most widely used language in Papua New Guinea.",
  ],
  ws: [
    "In 2011 Samoa skipped 30 December entirely, moving across the International Date Line to match Australia and New Zealand.",
    "Fa'a Samoa, \"the Samoan way\", is a way of life centred on family and village chiefs called matai.",
    "The English word \"tattoo\" comes from Polynesian words like the Samoan \"tatau\".",
  ],
  sb: [
    "The Battle of Guadalcanal (1942–43), in the Solomon Islands, was a turning point of World War II in the Pacific.",
    "More than 70 languages are spoken in the Solomon Islands. Pijin, an English-based creole, connects them all.",
    "Marovo Lagoon in the Solomon Islands is one of the largest saltwater lagoons in the world.",
  ],
  to: [
    "Tonga is a kingdom and the only Pacific island nation never formally colonised.",
    "Tonga is one of the first countries in the world to see each new day.",
    "The 2022 eruption of Hunga Tonga–Hunga Ha'apai was the biggest volcanic explosion recorded in more than a century.",
  ],
  tv: [
    "Tuvalu earns a large part of its income from its internet domain name, \".tv\".",
    "Tuvalu is the world's fourth-smallest country, with about 11,000 people.",
    "Tuvalu's highest point is only about 4.6 m above sea level.",
  ],
  vu: [
    "Bungee jumping was inspired by the \"land diving\" ritual of Pentecost Island in Vanuatu.",
    "Vanuatu has more than 100 languages, the most per person of any country.",
    "Mount Yasur in Vanuatu is one of the world's most accessible active volcanoes.",
  ],
});
