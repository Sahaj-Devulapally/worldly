// "Did you know?" facts shown after a right answer. Three per country, shown in turn.
self.FACTS = Object.assign(self.FACTS || {}, {
  dz: [
    "Algeria is Africa's largest country by area, and more than 80% of it is covered by the Sahara.",
    "Algerians speak Arabic and Tamazight (Berber), which became an official language in 2016. French is also widely used.",
    "Algeria won independence from France in 1962 after an eight-year war.",
  ],
  ao: [
    "Portuguese is Angola's official language. Angola was a Portuguese colony until 1975.",
    "Angola is one of Africa's biggest oil producers.",
    "The popular dance styles kizomba and semba both come from Angola.",
  ],
  bj: [
    "The Kingdom of Dahomey, in what is now Benin, was famous for its all-female army regiment, the Agojie.",
    "Benin is seen as the birthplace of Vodun (voodoo), and celebrates it with a national holiday every January.",
    "Porto-Novo is Benin's official capital, but most government business happens in Cotonou.",
  ],
  bw: [
    "The Okavango Delta is a river that fans out into the Kalahari Desert and never reaches the sea.",
    "Botswana is one of the world's biggest producers of diamonds.",
    "Botswana's currency, the pula, means \"rain\" in Setswana, a sign of how precious rain is there.",
  ],
  bf: [
    "Burkina Faso means \"land of the upright people\". Until 1984 the country was called Upper Volta.",
    "Ouagadougou hosts FESPACO, Africa's largest film festival, every two years.",
    "Burkina Faso is one of Africa's largest cotton producers.",
  ],
  bi: [
    "Burundi moved its political capital from Bujumbura to Gitega in 2019.",
    "Burundi's ritual royal drumming is on UNESCO's list of intangible cultural heritage.",
    "Lake Tanganyika, on Burundi's border, is the world's second-deepest lake.",
  ],
  cm: [
    "Cameroon is called \"Africa in miniature\" because it has desert, rainforest, mountains, savanna and beaches.",
    "Cameroon has two official languages, French and English, and around 250 local languages.",
    "Mount Cameroon is West Africa's highest peak and an active volcano.",
  ],
  cv: [
    "Cabo Verde's islands had no people living on them until the Portuguese arrived in the 1400s.",
    "Singer Cesária Évora made Cabo Verde's soulful morna music world-famous.",
    "A large Cabo Verdean community lives abroad, especially in the USA and Portugal.",
  ],
  cf: [
    "The Central African Republic is named for its position near the very centre of the continent.",
    "Sango is spoken by most people in the Central African Republic and is official alongside French.",
    "In Dzanga-Sangha reserve, dozens of forest elephants gather in a single forest clearing.",
  ],
  td: [
    "Chad is named after Lake Chad, which has shrunk by about 90% since the 1960s.",
    "More than 100 languages are spoken in Chad. French and Arabic are the official ones.",
    "Chad's Ennedi Plateau has huge natural rock arches and thousands of years of rock art.",
  ],
  km: [
    "Comoros is one of the world's top producers of ylang-ylang, a flower used in perfume.",
    "The coelacanth, a fish once thought extinct for millions of years, lives in the waters around Comoros.",
    "Comoros has had around 20 coups or attempted coups since independence from France in 1975.",
  ],
  cd: [
    "The Congo River is the deepest river in the world, over 200 m deep in places.",
    "DR Congo is the only place where wild bonobos live. They are among humans' closest relatives.",
    "Kinshasa is one of the biggest French-speaking cities in the world.",
  ],
  dj: [
    "Lake Assal in Djibouti is the lowest point in Africa, about 155 m below sea level, and one of the saltiest lakes on Earth.",
    "Djibouti hosts military bases of several countries, including the USA, France, China and Japan, because of its position on a major shipping route.",
    "French and Arabic are Djibouti's official languages, while Somali and Afar are widely spoken.",
  ],
  eg: [
    "The Great Pyramid of Giza was the tallest human-made structure on Earth for nearly 4,000 years.",
    "Almost all Egyptians live along the Nile, on about 5% of the country's land.",
    "Egyptian Arabic is understood across the Arab world, thanks to Egypt's films and TV.",
  ],
  gq: [
    "Equatorial Guinea is the only African country with Spanish as an official language.",
    "The capital, Malabo, is on Bioko Island, not on the mainland.",
    "Oil found in the 1990s transformed Equatorial Guinea's economy almost overnight.",
  ],
  er: [
    "Asmara is famous for its 1930s Italian modernist buildings and is a UNESCO World Heritage Site.",
    "Eritrea has no single official language. Tigrinya, Arabic and English are all widely used.",
    "Eritrea became independent from Ethiopia in 1993 after a 30-year struggle.",
  ],
  sz: [
    "The country changed its name from Swaziland to Eswatini in 2018.",
    "Eswatini is one of the world's last absolute monarchies.",
    "Umhlanga, the Reed Dance, is a famous yearly ceremony with tens of thousands of participants.",
  ],
  et: [
    "Ethiopia has its own calendar with 13 months. It runs about seven to eight years behind the calendar used in most countries.",
    "Coffee is believed to have first come from Ethiopia.",
    "Ethiopia was never colonised, apart from an Italian occupation from 1936 to 1941.",
  ],
  ga: [
    "Almost 90% of Gabon is covered by rainforest.",
    "In Gabon's Loango National Park, elephants walk on the beach and hippos swim in the sea.",
    "French is Gabon's official language.",
  ],
  gm: [
    "The Gambia is mainland Africa's smallest country: a thin strip along the Gambia River, surrounded by Senegal.",
    "Kunta Kinteh Island is linked to the transatlantic slave trade and the story told in Alex Haley's \"Roots\".",
    "English is the official language of The Gambia.",
  ],
  gh: [
    "In 1957 Ghana became the first sub-Saharan African colony to win independence.",
    "Kente, the colourful woven cloth, comes from Ghana's Ashanti and Ewe peoples.",
    "Lake Volta in Ghana is one of the largest artificial lakes in the world.",
  ],
  gn: [
    "Guinea is called the \"water tower of West Africa\": the Niger, Senegal and Gambia rivers all start there.",
    "Guinea has the world's largest reserves of bauxite, the ore used to make aluminium.",
    "French is Guinea's official language, while Pular, Maninka and Susu are widely spoken.",
  ],
  gw: [
    "Guinea-Bissau's Bijagós islands are home to rare saltwater hippos.",
    "Cashew nuts are Guinea-Bissau's main export.",
    "Portuguese is official, but most people in Guinea-Bissau speak Kriol, a Portuguese-based creole.",
  ],
  ci: [
    "Côte d'Ivoire is the world's largest producer of cocoa.",
    "The Basilica of Our Lady of Peace in Yamoussoukro is one of the largest churches in the world.",
    "The name means \"Ivory Coast\", after the old ivory trade. The government asks that the French name be used.",
  ],
  ke: [
    "Many of the world's best long-distance runners come from Kenya.",
    "Every year, huge herds of wildebeest migrate into Kenya's Maasai Mara.",
    "Swahili and English are Kenya's official languages. \"Safari\" is a Swahili word meaning \"journey\".",
  ],
  ls: [
    "Lesotho is completely surrounded by South Africa.",
    "Lesotho is the only country whose land lies entirely above 1,000 m.",
    "The Basotho blanket and the cone-shaped mokorotlo hat are Lesotho's national symbols.",
  ],
  lr: [
    "Liberia was founded by freed Black Americans in the 1820s and became independent in 1847.",
    "Monrovia is named after US President James Monroe, and Liberia's flag is modelled on the US flag.",
    "Ellen Johnson Sirleaf of Liberia became Africa's first elected female head of state in 2006.",
  ],
  ly: [
    "More than 90% of Libya is desert.",
    "Leptis Magna in Libya is one of the best-preserved Roman cities in the world.",
    "Libya has Africa's largest proven oil reserves.",
  ],
  mg: [
    "Around 90% of Madagascar's wildlife lives nowhere else on Earth, including every species of lemur.",
    "Madagascar's first settlers sailed from Borneo, and the Malagasy language is related to languages of Indonesia.",
    "Madagascar produces most of the world's vanilla.",
  ],
  mw: [
    "Lake Malawi has more fish species than any other lake in the world.",
    "Malawi's nickname is \"the warm heart of Africa\".",
    "Chichewa and English are Malawi's main languages.",
  ],
  ml: [
    "Timbuktu was a famous centre of Islamic learning in the Middle Ages, with libraries of ancient manuscripts.",
    "Mansa Musa, emperor of Mali in the 1300s, is often called one of the richest people in history.",
    "The Great Mosque of Djenné is the largest mud-brick building in the world.",
  ],
  mr: [
    "Mauritania's Richat Structure, the \"Eye of the Sahara\", is a 40 km wide ring of rock that is easy to see from space.",
    "In 1981 Mauritania became the last country in the world to abolish slavery.",
    "Mauritania's iron-ore trains, up to about 2.5 km long, are among the longest in the world.",
  ],
  mu: [
    "The dodo lived only on Mauritius and was extinct by the late 1600s.",
    "Mauritian Creole is the most widely spoken language in Mauritius, but English and French are used too.",
    "Nobody lived on Mauritius until European sailors settled it.",
  ],
  ma: [
    "The University of al-Qarawiyyin in Fez, founded in 859, is often called the oldest operating university in the world.",
    "Morocco is only about 14 km from Spain across the Strait of Gibraltar.",
    "Arabic and Amazigh (Berber) are Morocco's official languages, and French is widely used.",
  ],
  mz: [
    "Mozambique's flag shows an AK-47 rifle, one of very few flags with a modern weapon.",
    "Portuguese is Mozambique's official language.",
    "Mozambique joined the Commonwealth in 1995 even though it was never a British colony.",
  ],
  na: [
    "The Namib is thought to be the oldest desert in the world, and its red dunes are some of the tallest anywhere.",
    "Namibia was the first country to put protecting the environment into its constitution.",
    "Several Namibian languages, such as Khoekhoe, use click sounds as consonants.",
  ],
  ne: [
    "Niger is named after the Niger River, which flows through its southwest.",
    "Niger is one of the world's largest producers of uranium.",
    "At the Gerewol festival, young Wodaabe men in elaborate make-up compete in a beauty contest.",
  ],
  ng: [
    "Nigeria has more people than any other country in Africa.",
    "Nollywood, Nigeria's film industry, makes more films each year than almost any other country.",
    "More than 500 languages are spoken in Nigeria. Hausa, Yoruba and Igbo are the largest.",
  ],
  cg: [
    "Brazzaville and Kinshasa face each other across the Congo River. Apart from Rome and Vatican City, they are the closest pair of capital cities in the world.",
    "Brazzaville is named after the explorer Pierre Savorgnan de Brazza.",
    "French is official in the Republic of the Congo, while Lingala and Kituba are national languages.",
  ],
  rw: [
    "Rwanda is known as \"the land of a thousand hills\".",
    "Rwanda banned plastic bags in 2008, and on the last Saturday of each month everyone joins a community clean-up called Umuganda.",
    "Rwanda's parliament has the highest share of women of any parliament in the world.",
  ],
  sn: [
    "Dakar was for many years the finish line of the famous Paris–Dakar Rally.",
    "Lac Rose near Dakar is a lake that turns pink because of algae.",
    "Wolof is the most widely spoken language in Senegal, while French is official.",
  ],
  sc: [
    "Seychelles is Africa's smallest country, both in area and in population.",
    "The coco de mer palm, native to Seychelles, has the largest seed of any plant.",
    "Aldabra Atoll in Seychelles is home to around 100,000 giant tortoises.",
  ],
  sl: [
    "Freetown was founded in 1792 as a settlement for formerly enslaved people.",
    "Krio, an English-based creole, is spoken by most people in Sierra Leone.",
    "The name comes from the Portuguese \"Serra Leoa\", meaning \"Lion Mountains\".",
  ],
  so: [
    "Somalia has the longest coastline of any country on mainland Africa.",
    "Somalia is called a \"nation of poets\" because of its strong tradition of spoken poetry.",
    "Somalia has one of the largest camel populations in the world.",
  ],
  za: [
    "South Africa has three capitals: Pretoria (government), Cape Town (parliament) and Bloemfontein (courts).",
    "South Africa has 12 official languages, including South African Sign Language.",
    "Nelson Mandela became South Africa's first Black president in 1994, after 27 years in prison.",
  ],
  ss: [
    "South Sudan became independent in 2011, making it the world's newest widely recognised country.",
    "The Sudd, on the White Nile in South Sudan, is one of the largest wetlands in the world.",
    "English is South Sudan's official language.",
  ],
  sd: [
    "Sudan has more pyramids than Egypt: over 200, built by the ancient Kingdom of Kush.",
    "The Blue Nile and the White Nile meet in Khartoum.",
    "Sudan was Africa's largest country until South Sudan became independent in 2011.",
  ],
  st: [
    "São Tomé and Príncipe is Africa's second-smallest country, after Seychelles.",
    "Nobody lived on the islands until the Portuguese arrived around 1470.",
    "In the early 1900s São Tomé was the world's largest producer of cocoa.",
  ],
  tz: [
    "Mount Kilimanjaro in Tanzania is Africa's highest mountain, at 5,895 m.",
    "Tanzania was formed in 1964 when Tanganyika and Zanzibar united.",
    "Almost everyone in Tanzania speaks Swahili, which is a big part of the national identity.",
  ],
  tg: [
    "Togo's coastline is only about 56 km long.",
    "Lomé's Akodésséwa market is one of the world's largest markets for voodoo charms and remedies.",
    "Koutammakou, land of the Batammariba people and their mud tower-houses, is a UNESCO World Heritage Site.",
  ],
  tn: [
    "Ancient Carthage, Rome's great rival, stood just outside modern Tunis.",
    "Scenes of the planet Tatooine in Star Wars were filmed in Tunisia. There's even a real town called Tataouine.",
    "Tunisia's revolution in 2010–11 started the Arab Spring.",
  ],
  ug: [
    "Uganda is home to about half of the world's mountain gorillas.",
    "The White Nile begins at Lake Victoria, near Jinja in Uganda.",
    "Winston Churchill called Uganda \"the pearl of Africa\".",
  ],
  zm: [
    "Victoria Falls, on the Zambia–Zimbabwe border, is locally called Mosi-oa-Tunya, \"the smoke that thunders\".",
    "Zambia is one of Africa's biggest copper producers.",
    "Zambia was called Northern Rhodesia until it became independent in 1964.",
  ],
  zw: [
    "Zimbabwe is named after Great Zimbabwe, a medieval stone city. The name means \"houses of stone\" in Shona.",
    "Zimbabwe has 16 official languages.",
    "During hyperinflation in 2008, Zimbabwe printed a 100 trillion dollar banknote.",
  ],
});
