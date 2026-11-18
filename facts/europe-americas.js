// "Did you know?" facts shown after a right answer. Three per country, shown in turn.
self.FACTS = Object.assign(self.FACTS || {}, {
  /* ---------- Europe ---------- */
  al: [
    "Albanians call their country Shqipëria, often linked to the word for \"eagle\". A double-headed eagle is on the flag.",
    "Traditionally, Albanians nod to mean \"no\" and shake their heads to mean \"yes\".",
    "Albania is dotted with hundreds of thousands of concrete bunkers built under communist ruler Enver Hoxha.",
  ],
  ad: [
    "Andorra has two heads of state: the President of France and a Spanish bishop, the Bishop of Urgell.",
    "Catalan is Andorra's only official language.",
    "Andorra la Vella, at about 1,000 m, is the highest capital city in Europe.",
  ],
  at: [
    "Mozart was born in Salzburg, and Beethoven, Haydn and Schubert all worked in Vienna.",
    "Vienna's coffee-house culture is on UNESCO's list of intangible cultural heritage.",
    "About 60% of Austria is covered by the Alps.",
  ],
  by: [
    "Belarus shares the Białowieża Forest with Poland. It's one of Europe's last ancient forests and home to European bison.",
    "Belarusian and Russian are both official languages in Belarus.",
    "Belarus has more than 10,000 lakes.",
  ],
  be: [
    "Belgium has three official languages: Dutch, French and German.",
    "Brussels is home to the headquarters of the European Union and NATO.",
    "The saxophone was invented by Belgian Adolphe Sax in the 1840s.",
  ],
  ba: [
    "Mostar's Old Bridge, built in 1566, was destroyed in 1993 and rebuilt in 2004.",
    "Sarajevo hosted the 1984 Winter Olympics.",
    "World War I was triggered by the assassination of Archduke Franz Ferdinand in Sarajevo in 1914.",
  ],
  bg: [
    "The Cyrillic alphabet was developed in the First Bulgarian Empire in the 9th–10th centuries.",
    "In Bulgaria, nodding means \"no\" and shaking your head means \"yes\".",
    "Bulgaria's Rose Valley produces a large share of the world's rose oil, used in perfume.",
  ],
  hr: [
    "The necktie comes from Croatia: the word \"cravat\" comes from the scarves worn by Croatian soldiers.",
    "Croatia has more than 1,000 islands.",
    "Dubrovnik's old town was used to film King's Landing in Game of Thrones.",
  ],
  cy: [
    "Nicosia is the last divided capital city in Europe.",
    "In Greek myth, the goddess Aphrodite was born from the sea off Cyprus.",
    "Cyprus has been divided since 1974.",
  ],
  cz: [
    "Czechs drink more beer per person than people in any other country.",
    "Prague Castle is one of the largest castle complexes in the world.",
    "The word \"robot\" comes from a 1920 play by Czech writer Karel Čapek.",
  ],
  dk: [
    "LEGO comes from Denmark. The name comes from \"leg godt\", Danish for \"play well\".",
    "Denmark's flag, the Dannebrog, is said to be the oldest national flag still in use.",
    "Greenland, the world's largest island, is part of the Kingdom of Denmark.",
  ],
  ee: [
    "In 2005 Estonia became the first country to let people vote online in national elections.",
    "Skype was developed by engineers in Estonia.",
    "Estonian is related to Finnish, not to the languages of its Baltic neighbours.",
  ],
  fi: [
    "Finland has around 188,000 lakes.",
    "Finland has about 3 million saunas, for about 5.5 million people.",
    "Finnish and Swedish are both official languages in Finland.",
  ],
  fr: [
    "France is the most visited country in the world.",
    "Counting its overseas territories, France spans 12 time zones, more than any other country.",
    "The Eiffel Tower was built for the 1889 World's Fair and was meant to be temporary.",
  ],
  de: [
    "Germany has more than 20,000 castles.",
    "Johannes Gutenberg developed the printing press with movable type in Mainz around 1440.",
    "Germany's bread culture, with over 3,000 kinds of bread, is on UNESCO's heritage list.",
  ],
  gr: [
    "Greece has around 6,000 islands and islets, but only about 200 have people living on them.",
    "Democracy was developed in ancient Athens in the 5th century BC.",
    "The Olympic Games began in Olympia, Greece, in 776 BC.",
  ],
  hu: [
    "The Rubik's Cube was invented by Hungarian Ernő Rubik in 1974.",
    "Budapest was created in 1873 by joining three towns: Buda, Óbuda and Pest.",
    "Hungarian isn't related to most European languages. Its distant cousins are Finnish and Estonian.",
  ],
  is: [
    "Iceland's parliament, the Althing, founded in 930, is one of the oldest parliaments in the world.",
    "Icelanders use their father's (or mother's) first name as a surname: Jón's son is Jónsson and his daughter is Jónsdóttir.",
    "Iceland has no mosquitoes.",
  ],
  ie: [
    "Halloween grew out of Samhain, an ancient Celtic festival celebrated in Ireland.",
    "The harp is Ireland's national symbol and appears on its euro coins.",
    "Irish is Ireland's first official language, though most people speak English day to day.",
  ],
  it: [
    "Italy has more UNESCO World Heritage Sites than any other country.",
    "Two countries, Vatican City and San Marino, lie entirely inside Italy.",
    "Pizza Margherita is said to be named after Queen Margherita of Italy, in 1889.",
  ],
  xk: [
    "Kosovo declared independence from Serbia in 2008, but not every country recognises it.",
    "Kosovo has one of the youngest populations in Europe.",
    "Kosovo's flag shows the outline of the country. Cyprus is the only other country whose flag does that.",
  ],
  lv: [
    "Riga has one of the world's largest collections of Art Nouveau buildings.",
    "Latvia's Song and Dance Festival brings together tens of thousands of singers and dancers.",
    "About half of Latvia is covered by forest.",
  ],
  li: [
    "Liechtenstein is one of only two doubly landlocked countries: landlocked, and surrounded only by landlocked countries.",
    "Liechtenstein is one of the world's biggest makers of false teeth.",
    "Liechtenstein has had no army since 1868.",
  ],
  lt: [
    "Lithuanian is one of the oldest living Indo-European languages, keeping features close to ancient Sanskrit.",
    "In 1990 Lithuania became the first Soviet republic to declare independence.",
    "Lithuania's Hill of Crosses holds more than 100,000 crosses left by pilgrims.",
  ],
  lu: [
    "Luxembourg is the last grand duchy left in the world.",
    "Luxembourgish, French and German are all official languages in Luxembourg.",
    "In 2020 Luxembourg became the first country to make all public transport free.",
  ],
  mt: [
    "Maltese is the only Semitic language that's official in the EU, and it's written in the Latin alphabet.",
    "Malta's stone temples are older than Stonehenge and the Egyptian pyramids.",
    "The whole island of Malta was awarded the George Cross for bravery in World War II. It appears on the flag.",
  ],
  md: [
    "Moldova's Mileștii Mici wine cellars hold the largest wine collection in the world, about 2 million bottles.",
    "Romanian is Moldova's official language.",
    "Transnistria, a breakaway strip of Moldova, has its own government and currency, but almost no country recognises it.",
  ],
  mc: [
    "Monaco is the second-smallest country in the world, after Vatican City.",
    "The Monaco Grand Prix is raced through the streets of the city.",
    "Monaco's own citizens, the Monégasques, are a minority of the people living there.",
  ],
  me: [
    "Montenegro uses the euro even though it isn't in the European Union.",
    "Montenegro means \"black mountain\".",
    "The Bay of Kotor looks like a fjord, but it's actually a flooded river canyon.",
  ],
  nl: [
    "About a quarter of the Netherlands lies below sea level.",
    "There are more bicycles than people in the Netherlands.",
    "Amsterdam is the capital, but the government and parliament sit in The Hague.",
  ],
  mk: [
    "The country changed its name from Macedonia to North Macedonia in 2019, settling a dispute with Greece.",
    "Lake Ohrid is one of Europe's oldest lakes, more than a million years old.",
    "Mother Teresa was born in Skopje in 1910.",
  ],
  no: [
    "Thanks to its fjords, Norway has one of the longest coastlines in the world.",
    "Norway helped make salmon sushi popular in Japan in the 1980s.",
    "In northern Norway the sun doesn't set for weeks in summer: the \"midnight sun\".",
  ],
  pl: [
    "Marie Curie, born in Warsaw, was the first person to win Nobel Prizes in two different sciences.",
    "Warsaw's old town was almost completely destroyed in World War II and rebuilt brick by brick.",
    "The Wieliczka Salt Mine has chapels and statues carved entirely out of salt.",
  ],
  pt: [
    "Lisbon is one of the oldest cities in Western Europe, older than Rome.",
    "Portugal produces about half of the world's cork.",
    "Portugal and England signed an alliance in 1373. It's the oldest alliance in the world still in force.",
  ],
  ro: [
    "Romanian is a Romance language that comes from Latin, like Italian and Spanish.",
    "The Palace of the Parliament in Bucharest is one of the heaviest buildings in the world.",
    "Bran Castle is known as \"Dracula's Castle\", linked to the legend of Vlad the Impaler.",
  ],
  ru: [
    "Russia is the largest country in the world and spans 11 time zones.",
    "Lake Baikal in Siberia is the deepest lake in the world and holds about a fifth of the world's unfrozen fresh surface water.",
    "The Trans-Siberian Railway, from Moscow to Vladivostok, is the longest railway line in the world at about 9,300 km.",
  ],
  sm: [
    "San Marino says it's the world's oldest surviving republic, founded in 301 AD.",
    "San Marino is completely surrounded by Italy.",
    "San Marino is led by two Captains Regent, who are elected every six months.",
  ],
  rs: [
    "The inventor Nikola Tesla was Serbian, born in what is now Croatia.",
    "Serbian is regularly written in both the Cyrillic and Latin alphabets.",
    "Belgrade stands where the Sava river flows into the Danube.",
  ],
  sk: [
    "Slovakia has more than 180 castles and castle ruins.",
    "Bratislava is the only capital city that borders two other countries: Austria and Hungary.",
    "Slovakia makes more cars per person than any other country.",
  ],
  si: [
    "More than half of Slovenia is covered by forest.",
    "Slovenia's caves are home to the olm, a blind salamander that can live for 100 years.",
    "Slovene grammar has a special \"dual\" form for talking about exactly two of something.",
  ],
  es: [
    "Spanish has the second-most native speakers in the world, after Mandarin.",
    "Catalan, Galician and Basque are official languages in their regions of Spain.",
    "Work on the Sagrada Família in Barcelona began in 1882 and is still going on.",
  ],
  se: [
    "Sweden has about 267,000 islands, more than any other country.",
    "Most Nobel Prizes are awarded in Stockholm every December. The Peace Prize is awarded in Oslo.",
    "Sweden's \"right of public access\" lets anyone walk and camp almost anywhere in nature.",
  ],
  ch: [
    "Switzerland has four national languages: German, French, Italian and Romansh.",
    "Switzerland hasn't fought in an international war since 1815.",
    "Switzerland's code, CH, comes from its Latin name, Confoederatio Helvetica.",
  ],
  ua: [
    "Ukraine is the largest country entirely in Europe.",
    "Ukraine's flag shows blue sky above yellow wheat fields, and Ukraine is one of the world's biggest grain exporters.",
    "The Antonov An-225 Mriya, the largest cargo plane ever built, was made in Ukraine.",
  ],
  gb: [
    "The United Kingdom is made up of four nations: England, Scotland, Wales and Northern Ireland.",
    "The London Underground, opened in 1863, is the oldest underground railway in the world.",
    "Welsh, Scottish Gaelic and Irish are also spoken in parts of the UK.",
  ],
  va: [
    "Vatican City is the smallest country in the world, about 0.44 km².",
    "The Pope's Swiss Guard has protected the Vatican since 1506.",
    "Vatican City has an ATM with instructions in Latin.",
  ],

  /* ---------- North and Central America, Caribbean ---------- */
  ag: [
    "Antigua is said to have 365 beaches, \"one for every day of the year\".",
    "Barbuda's Codrington Lagoon has one of the largest frigatebird colonies in the world.",
    "Nelson's Dockyard in Antigua is a restored 18th-century British naval base and a UNESCO World Heritage Site.",
  ],
  bs: [
    "Christopher Columbus first landed in the Americas in the Bahamas in 1492.",
    "The Bahamas has around 700 islands and over 2,000 tiny cays.",
    "Pigs swim in the sea at Big Major Cay in the Bahamas.",
  ],
  bb: [
    "Barbados became a republic in 2021, replacing the British monarch as head of state.",
    "Rum is thought to have first been made in Barbados. Mount Gay rum has been made there since 1703.",
    "Singer Rihanna is from Barbados and has been named a National Hero.",
  ],
  bz: [
    "Belize is the only Central American country where English is the official language.",
    "The Great Blue Hole off Belize is a huge underwater sinkhole about 300 m wide.",
    "Belize's barrier reef is the longest in the Western Hemisphere.",
  ],
  ca: [
    "Canada has the longest coastline of any country.",
    "Canada has more lakes than the rest of the world combined.",
    "English and French are both official languages in Canada.",
  ],
  cr: [
    "Costa Rica abolished its army in 1948.",
    "Costa Rica has about 5% of the world's species of plants and animals.",
    "\"Pura vida\" (\"pure life\") is Costa Rica's famous everyday saying.",
  ],
  cu: [
    "Cuba is the largest island in the Caribbean.",
    "Classic 1950s American cars are still a common sight in Havana.",
    "The bee hummingbird, the smallest bird in the world, lives only in Cuba.",
  ],
  dm: [
    "Dominica's Boiling Lake is the second-largest hot lake in the world.",
    "Dominica's flag shows the Sisserou parrot, found only on the island.",
    "Dominica is home to the Kalinago, the last Indigenous Carib community in the Eastern Caribbean.",
  ],
  do: [
    "Santo Domingo, founded in 1496, is the oldest European city in the Americas.",
    "After the USA, more Major League Baseball players come from the Dominican Republic than from any other country.",
    "Merengue and bachata music both come from the Dominican Republic.",
  ],
  sv: [
    "El Salvador is the smallest country in Central America.",
    "In 2021 El Salvador became the first country to make Bitcoin legal tender.",
    "Pupusas, thick corn tortillas stuffed with fillings, are El Salvador's national dish.",
  ],
  gd: [
    "Grenada is called the \"Spice Isle\", and a nutmeg appears on its flag.",
    "Grenada has an underwater sculpture park off its coast.",
    "The USA invaded Grenada in 1983.",
  ],
  gt: [
    "Tikal in Guatemala was one of the largest cities of the ancient Maya.",
    "More than 20 Mayan languages are still spoken in Guatemala.",
    "Guatemala's currency, the quetzal, is named after its national bird.",
  ],
  ht: [
    "In 1804, after a revolt by enslaved people, Haiti became the first Black-led republic and the first independent country in Latin America.",
    "Haitian Creole and French are Haiti's official languages.",
    "The Citadelle Laferrière, on a Haitian mountaintop, is the largest fortress in the Americas.",
  ],
  hn: [
    "Copán in Honduras is a Maya city famous for its carved stone stairway of hieroglyphs.",
    "The phrase \"banana republic\" was coined by writer O. Henry about Honduras.",
    "Honduras's Bay Islands sit on the Mesoamerican Barrier Reef.",
  ],
  jm: [
    "Reggae music, made world-famous by Bob Marley, comes from Jamaica.",
    "Usain Bolt, the fastest sprinter ever recorded, is Jamaican.",
    "In 1988 Jamaica became the first tropical country to compete in Olympic bobsleigh.",
  ],
  mx: [
    "Mexico has more Spanish speakers than any other country.",
    "Corn, chillies and chocolate were all first cultivated in Mexico.",
    "Mexico City is built on a former lake, where the Aztec capital Tenochtitlan once stood, and it is slowly sinking.",
  ],
  ni: [
    "Lake Nicaragua, the largest lake in Central America, has sharks that swim up from the sea.",
    "Nicaragua is called \"the land of lakes and volcanoes\".",
    "Nicaragua's flag is one of only two national flags with the colour purple.",
  ],
  pa: [
    "The Panama Canal, opened in 1914, links the Atlantic and Pacific oceans.",
    "Panama hats actually come from Ecuador.",
    "Because of how Panama curves, you can watch the sun rise over the Pacific there.",
  ],
  kn: [
    "Saint Kitts and Nevis is the smallest country in the Americas, both in area and in population.",
    "Alexander Hamilton, a founding father of the USA, was born on Nevis.",
    "Saint Kitts and Nevis started selling citizenship to investors in 1984, one of the first countries to do so.",
  ],
  lc: [
    "Saint Lucia is the only country named after a woman: Saint Lucy of Syracuse.",
    "The Pitons, two steep volcanic peaks on Saint Lucia, are a UNESCO World Heritage Site.",
    "Saint Lucia has produced two Nobel Prize winners, Derek Walcott and Arthur Lewis, the most per person of any country.",
  ],
  vc: [
    "Parts of the Pirates of the Caribbean films were shot on St Vincent.",
    "La Soufrière volcano on St Vincent erupted in 2021.",
    "Mustique, one of the Grenadines, is a famous private-island retreat for celebrities.",
  ],
  tt: [
    "The steelpan, made from oil drums, was invented in Trinidad and is the national instrument.",
    "Trinidad's Pitch Lake is the largest natural deposit of asphalt in the world.",
    "Trinidad's Carnival is one of the biggest in the Caribbean, and calypso and soca music started there.",
  ],
  us: [
    "Yellowstone, created in 1872, was the world's first national park.",
    "The USA bought Alaska from Russia in 1867 for $7.2 million.",
    "Washington, D.C. isn't part of any state. It's a federal district.",
  ],

  /* ---------- South America ---------- */
  ar: [
    "Aconcagua in Argentina, at 6,961 m, is the highest mountain outside Asia.",
    "Tango was born in the late 1800s in Buenos Aires and Montevideo.",
    "Argentina's name comes from the Latin \"argentum\", meaning silver.",
  ],
  bo: [
    "Salar de Uyuni in Bolivia is the largest salt flat in the world.",
    "La Paz, at about 3,600 m, is the highest seat of government in the world.",
    "Bolivia recognises 37 official languages, including Spanish, Quechua, Aymara and Guaraní.",
  ],
  br: [
    "Brazil is the only country in South America where Portuguese is the main language.",
    "About 60% of the Amazon rainforest is in Brazil.",
    "Brazil has won the FIFA World Cup five times, more than any other country.",
  ],
  cl: [
    "Chile is over 4,000 km long, but on average only about 175 km wide.",
    "The Atacama Desert in Chile is one of the driest places on Earth.",
    "Easter Island (Rapa Nui), with its giant moai statues, is part of Chile.",
  ],
  co: [
    "Colombia is the only South American country with coasts on both the Pacific Ocean and the Caribbean Sea.",
    "Colombia has more species of birds than any other country.",
    "Colombia produces more emeralds than any other country.",
  ],
  ec: [
    "Ecuador is named after the equator, which runs through the country.",
    "The Galápagos Islands, which inspired Charles Darwin, belong to Ecuador.",
    "Ecuador uses the US dollar as its currency.",
  ],
  gy: [
    "Guyana is the only South American country with English as its official language.",
    "Kaieteur Falls in Guyana is one of the most powerful single-drop waterfalls in the world.",
    "Oil discoveries since 2015 have made Guyana's economy one of the fastest-growing in the world.",
  ],
  py: [
    "Most Paraguayans speak Guaraní, an Indigenous language that is official alongside Spanish.",
    "Paraguay's flag has a different emblem on each side.",
    "The Itaipú Dam, shared by Paraguay and Brazil, is one of the largest hydroelectric power plants in the world.",
  ],
  pe: [
    "Machu Picchu, the Inca mountain citadel, was built in the 1400s.",
    "The potato was first grown in Peru, which has thousands of varieties.",
    "Lake Titicaca, shared with Bolivia, is the highest lake in the world that big boats can sail on.",
  ],
  sr: [
    "Suriname is the smallest country in South America, and Dutch is its official language.",
    "More than 90% of Suriname is covered by forest.",
    "The historic centre of Paramaribo, with its wooden Dutch colonial buildings, is a UNESCO World Heritage Site.",
  ],
  uy: [
    "Uruguay hosted and won the first FIFA World Cup, in 1930.",
    "In 2013 Uruguay became the first country to fully legalise cannabis.",
    "Uruguayans drink mate, a herbal tea, everywhere, often carrying a thermos of hot water.",
  ],
  ve: [
    "Angel Falls in Venezuela is the tallest uninterrupted waterfall in the world, at 979 m.",
    "Venezuela has the largest proven oil reserves in the world.",
    "Venezuela means \"little Venice\", after the houses on stilts that early explorers saw on Lake Maracaibo.",
  ],
});
