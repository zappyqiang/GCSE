(function () {
var G = GAME;
G.configure({
  key: "history", subject: "History", spec: "AQA 8145 · 2 papers", title: "History course", tiered: false,
  specUrl: "https://www.aqa.org.uk/subjects/history/gcse/history-8145", channel: "Mr Allsop History",
  intro: "Four popular AQA options plus the exam skills that unlock marks: Germany 1890 to 1945, Conflict and tension 1918 to 1939, Health and the people, and Elizabethan England.",
  finalName: "Final assessment", sheetName: "Timelines and terms", sheetNote: "Schools choose different options, so only revise the ones you are studying. The skills unit applies to every option."
});
G.sheet = [
  { h: "Germany 1890 to 1945: key dates", rows: [
    ["1914 to 1918", "First World War"], ["Nov 1918", "Kaiser abdicates; Weimar Republic begins"], ["1919", "Treaty of Versailles"], ["1923", "Hyperinflation; Munich Putsch"], ["Jan 1933", "Hitler becomes Chancellor"], ["Mar 1933", "Enabling Act"], ["Aug 1934", "Hindenburg dies; Hitler becomes Führer"], ["1935", "Nuremberg Laws"], ["Nov 1938", "Kristallnacht"], ["1942", "Wannsee Conference"]
  ] },
  { h: "Conflict and tension 1918 to 1939: key dates", rows: [
    ["Jan 1919", "Paris Peace Conference begins"], ["1920", "League of Nations starts"], ["1923", "Corfu incident"], ["1931", "Japan invades Manchuria"], ["1935", "Italy invades Abyssinia"], ["1936", "Germany remilitarises the Rhineland"], ["Mar 1938", "Anschluss"], ["Sept 1938", "Munich Agreement"], ["Aug 1939", "Nazi-Soviet Pact"], ["1 Sept 1939", "Germany invades Poland"]
  ] },
  { h: "Health and the people: key ideas", rows: [
    ["Four humours", "Hippocrates and Galen: balance of blood, phlegm, yellow bile and black bile"], ["1348", "Black Death reaches England"], ["1543", "Vesalius publishes On the Fabric of the Human Body"], ["1628", "Harvey explains blood circulation"], ["1796", "Jenner tests the smallpox vaccine"], ["1854", "John Snow and the Broad Street pump"], ["1861", "Pasteur's germ theory"], ["1928", "Fleming discovers penicillin"], ["1948", "NHS founded"]
  ] },
  { h: "Elizabethan England: key dates", rows: [
    ["1558", "Elizabeth I becomes queen"], ["1559", "Religious Settlement"], ["1569", "Revolt of the Northern Earls"], ["1587", "Execution of Mary, Queen of Scots"], ["1588", "Spanish Armada"], ["1601", "Poor Law Act"], ["1603", "Elizabeth dies"]
  ] }
];

G.topic("Historical skills", "🧭", "All papers", [
{ t: "Source utility", icon: "📜",
  c: ["Utility questions ask how useful a source is for a given enquiry. Do not just say it is biased.", "Use content (what it says), provenance (who made it, when, why) and context (what you know).", "Even a biased or propaganda source can be useful because it shows attitudes of the time.", "Reach a judgement: say how useful it is and why, not just that it is."],
  k: "Content, provenance, context, then judge.",
  q: [["s", "Is this content, provenance or context?", { "Content": ["What the poster shows", "Details in the writing"], "Provenance": ["Who created the source", "The date and purpose"], "Context": ["Wider events I know about", "What was happening at the time"] }],
      ["t", "A biased source is always useless.", false, "Bias can reveal attitudes and purpose, which is useful."],
      ["m", "Provenance means", "the origin, author, date and purpose of a source", "the contents of a source", "a historian's opinion", "a timeline", "It is about where the source comes from."]] },

{ t: "Interpretations", icon: "🔍",
  c: ["Interpretations are later accounts by historians or others that explain the past differently.", "To explain why they differ, consider the writer's purpose, the evidence they used, and when they wrote.", "To judge how convincing an interpretation is, test it against your own knowledge.", "Support your view with specific events, dates and facts."],
  k: "Different views come from different evidence and purposes.",
  q: [["m", "Why might two historians disagree?", "They may emphasise different evidence", "One is always wrong", "History is made up", "They never read sources", "Selection and emphasis differ."],
      ["t", "To judge an interpretation, compare it with your own knowledge.", true, "Check what it includes or leaves out."],
      ["o", "Order a good interpretation answer.", ["State the main view", "Use own knowledge to support or challenge it", "Comment on the author and purpose", "Reach a judgement"]]] },

{ t: "Causes, consequences and change", icon: "⛓️",
  c: ["Causation: why did something happen? Separate short-term triggers from long-term causes.", "Consequences: the results of an event. Some are immediate, some long term.", "Change and continuity: what changed, what stayed the same, and how fast?", "Significance: how important was it, and to whom? Use criteria like impact, duration and lasting effects."],
  k: "Link every point back to the question.",
  q: [["m", "A trigger is", "an event that sets things off", "a long-term cause", "a type of source", "a consequence only", "It was the immediate cause."],
      ["m", "Continuity means", "something stayed the same", "something changed", "something ended", "something was invented", "It is the opposite of change."],
      ["t", "Significance depends on who is asked and which criteria are used.", true, "Explain why it mattered."]] }
]);

G.topic("Germany 1890 to 1945", "🇩🇪", "Paper 1", [
{ t: "Kaiser Wilhelm II and the First World War", icon: "👑",
  c: ["Wilhelm II ruled Germany as Kaiser from 1888. Germany was a powerful, militarised empire.", "The Reichstag was elected, but the Kaiser chose the Chancellor and controlled the army.", "Germany fought in the First World War from 1914. By 1918 there were shortages, strikes and the naval mutiny at Kiel.", "On 9 November 1918 the Kaiser abdicated and Germany became a republic."],
  k: "War losses and unrest ended the Kaiser's rule.",
  q: [["m", "Who was Germany's Kaiser in 1914?", "Wilhelm II", "Hitler", "Ebert", "Hindenburg", "Wilhelm II ruled from 1888 to 1918."],
      ["m", "In November 1918 the Kaiser", "abdicated", "won the war", "was elected", "invaded France", "Germany became a republic."],
      ["t", "The Kiel mutiny took place in 1918.", true, "Sailors refused orders, sparking revolution."]] },

{ t: "The Weimar Republic and the Treaty of Versailles", icon: "📉",
  c: ["The Weimar Republic had a new democratic constitution with proportional representation, which led to weak coalitions.", "The Treaty of Versailles (1919) blamed Germany (War Guilt Clause), demanded £6.6 billion reparations, limited the army to 100,000 and took land.", "Germans called it a Diktat and the politicians who signed, the 'November Criminals'.", "Extremists on the left (Spartacists) and right (Kapp Putsch 1920) attacked the new republic."],
  k: "Weimar was weak from the start, and Versailles made it hated.",
  q: [["p", "Match the Versailles term.", [["War Guilt Clause", "Germany accepted blame"], ["Reparations", "Payment for damage, £6.6 billion"], ["Army limit", "100,000 men"], ["Anschluss ban", "No union with Austria"]]],
      ["m", "Which led to weak governments in Weimar?", "proportional representation", "a powerful Kaiser", "a one-party state", "no elections", "Many parties meant coalitions."],
      ["t", "Germans called the treaty a Diktat.", true, "They felt it was forced on them."]] },

{ t: "Hyperinflation and the Stresemann years", icon: "💸",
  c: ["In January 1923 France and Belgium occupied the Ruhr when Germany missed reparations. Workers went on passive resistance.", "Germany printed more money, causing hyperinflation. Savings became worthless and prices soared.", "Gustav Stresemann introduced the Rentenmark, agreed the Dawes Plan (1924) and the Young Plan (1929), and signed the Locarno Pact (1925).", "Germany joined the League of Nations in 1926. The Golden Twenties saw culture and prosperity, though it relied on US loans."],
  k: "Stresemann stabilised Weimar, but on American money.",
  q: [["m", "Which event began hyperinflation in 1923?", "occupation of the Ruhr", "the Munich Putsch", "Kristallnacht", "the Enabling Act", "The government printed money to pay striking workers."],
      ["m", "The Dawes Plan (1924)", "organised US loans and eased reparations", "stopped all payments", "gave land to France", "removed the Kaiser", "It helped the economy recover."],
      ["o", "Order these events.", ["Treaty of Versailles", "Occupation of the Ruhr", "Rentenmark introduced", "Locarno Pact", "Wall Street Crash"]]] },

{ t: "Hitler's rise to power", icon: "🗳️",
  c: ["The Nazi Party failed in the 1923 Munich Putsch. Hitler was jailed, wrote Mein Kampf, and chose to win power legally.", "The Wall Street Crash (1929) and mass unemployment (6 million by 1932) made extremist parties popular.", "Nazi propaganda, the SA, promises of work and bread and blaming scapegoats won votes. They became the largest party in July 1932.", "Hindenburg appointed Hitler Chancellor on 30 January 1933 after political intrigue by Papen."],
  k: "Depression plus propaganda plus political deals.",
  q: [["m", "When did Hitler become Chancellor?", "January 1933", "November 1923", "August 1934", "1939", "Hindenburg appointed him."],
      ["m", "Which event boosted support for the Nazis in 1929?", "Wall Street Crash", "Locarno Pact", "Treaty of Versailles", "Reichstag fire", "Unemployment soared."],
      ["t", "After the Munich Putsch Hitler decided to win power through elections.", true, "The Nazis changed to a legal strategy."]] },

{ t: "Nazi control and dictatorship", icon: "🛡️",
  c: ["The Reichstag fire (27 February 1933) let Hitler blame communists and pass an emergency decree.", "The Enabling Act (March 1933) allowed Hitler to make laws without the Reichstag. By mid-1933 other parties and trade unions were banned.", "The Night of the Long Knives (June 1934) removed Röhm and the SA leadership. After Hindenburg died in August 1934 Hitler became Führer, and the army swore an oath to him.", "Control used the SS, Gestapo, concentration camps, courts and propaganda led by Goebbels."],
  k: "Fear plus propaganda equals control.",
  q: [["m", "The Enabling Act allowed Hitler to", "make laws without the Reichstag", "ban the army", "end the war", "elect a president", "It created a dictatorship."],
      ["m", "Who led Nazi propaganda?", "Goebbels", "Himmler", "Göring", "Röhm", "Goebbels was Minister for Propaganda."],
      ["s", "Which organisation?", { "SS": ["Himmler led it", "Black uniforms and camps"], "SA": ["Brownshirts", "Röhm led it"] }]] },

{ t: "Life in Nazi Germany", icon: "🧒",
  c: ["Women were encouraged to focus on Kinder, Küche, Kirche (children, kitchen, church). Young people joined the Hitler Youth or League of German Girls.", "Schools taught Nazi ideas and racial science. Opponents included the Edelweiss Pirates and Swing Youth.", "Jews were persecuted through boycotts, the 1935 Nuremberg Laws, Kristallnacht (9 to 10 November 1938) and later the Holocaust.", "Unemployment fell through rearmament, public works and the Reich Labour Service, though official figures hid some groups."],
  k: "Nazi policy shaped every part of daily life.",
  q: [["m", "The Nuremberg Laws (1935)", "removed German citizenship from Jews", "banned the SS", "ended unemployment", "created the Hitler Youth", "They were racist laws."],
      ["m", "Kristallnacht took place in", "November 1938", "March 1933", "June 1934", "1945", "Synagogues and shops were attacked."],
      ["p", "Match the group.", [["Hitler Youth", "Nazi organisation for boys"], ["League of German Girls", "Nazi organisation for girls"], ["Edelweiss Pirates", "Youth who resisted the Nazis"], ["Swing Youth", "Loved jazz and swing music"]]]] }
]);

G.topic("Conflict and tension 1918 to 1939", "⚔️", "Paper 1", [
{ t: "The peace treaties", icon: "🕊️",
  c: ["At the Paris Peace Conference (1919) the Big Three were Wilson (USA), Clemenceau (France) and Lloyd George (Britain).", "Wilson wanted fair treatment and his Fourteen Points. Clemenceau wanted revenge and security. Lloyd George wanted a compromise.", "The Treaty of Versailles punished Germany; other treaties dealt with Austria, Hungary, Bulgaria and Turkey.", "Many people disliked the settlement: Germany felt humiliated, and some thought it too harsh or too lenient."],
  k: "The Big Three wanted different things.",
  q: [["p", "Match the leader.", [["Wilson", "USA"], ["Clemenceau", "France"], ["Lloyd George", "Britain"]]],
      ["m", "Who wanted Germany severely punished?", "Clemenceau", "Wilson", "Lloyd George", "Stalin", "France had suffered huge damage."],
      ["t", "The USA joined the League of Nations.", false, "The US Senate rejected the treaty."]] },

{ t: "The League of Nations", icon: "🌍",
  c: ["The League was set up in 1920 to keep peace through collective security, disarmament and arbitration.", "The USA never joined. The League had no army and relied on members. Germany and the USSR joined later.", "Successes in the 1920s included the Aland Islands and helping refugees.", "It failed in the 1930s over Manchuria (1931) and Abyssinia (1935) because Britain and France would not act firmly."],
  k: "Powerful in theory, weak in practice.",
  q: [["m", "Which crisis involved Japan?", "Manchuria", "Abyssinia", "Corfu", "Sudetenland", "Japan invaded in 1931."],
      ["m", "Why was the League weak?", "no army and key powers missing", "too many troops", "it was run by Hitler", "it had no members", "The USA never joined."],
      ["t", "The League was founded in 1920.", true, "It began after the First World War."]] },

{ t: "Hitler's foreign policy", icon: "🧨",
  c: ["Hitler aimed to tear up Versailles, build up the army, unite German speakers and win Lebensraum (living space) in the east.", "He left the League in 1933, introduced conscription in 1935, and remilitarised the Rhineland in 1936.", "The Anglo-German Naval Agreement (1935) let Germany build a navy. The Anschluss with Austria came in March 1938.", "Britain and France followed appeasement, giving in to avoid war."],
  k: "Each step went unpunished, so Hitler pushed further.",
  q: [["o", "Order Hitler's steps.", ["Left League of Nations", "Conscription", "Rhineland", "Anschluss", "Invaded Poland"]],
      ["m", "Lebensraum means", "living space", "peace treaty", "new army", "friendship", "Hitler wanted land in the east."],
      ["t", "Remilitarising the Rhineland broke the Treaty of Versailles.", true, "The area was meant to be demilitarised."]] },

{ t: "Appeasement and the Munich Agreement", icon: "🤝",
  c: ["Appeasement was Britain's policy, led by Neville Chamberlain, of giving Hitler some demands to keep peace.", "Reasons: fear of another war, the Depression, sympathy for Germany's grievances and weak armed forces.", "At Munich (September 1938) Britain, France, Italy and Germany agreed Germany could take the Sudetenland. Czechoslovakia was not invited.", "In March 1939 Hitler took the rest of Czechoslovakia, so appeasement was shown to have failed."],
  k: "Appeasement bought time but encouraged Hitler.",
  q: [["m", "Who was Britain's Prime Minister at Munich?", "Chamberlain", "Churchill", "Lloyd George", "Baldwin", "Chamberlain returned promising 'peace for our time'."],
      ["m", "The Sudetenland was part of", "Czechoslovakia", "Poland", "Austria", "France", "It had many German speakers."],
      ["t", "Czechoslovakia attended the Munich conference.", false, "It was excluded."]] },

{ t: "The outbreak of war in 1939", icon: "💥",
  c: ["In August 1939 Hitler and Stalin signed the Nazi-Soviet Pact, agreeing not to fight and secretly to divide Poland.", "This removed the risk of a two-front war for Germany.", "Britain and France had promised to defend Poland. On 1 September 1939 Germany invaded Poland.", "Britain and France declared war on 3 September."],
  k: "The pact cleared the way for the invasion of Poland.",
  q: [["m", "When did Germany invade Poland?", "1 September 1939", "3 March 1938", "11 November 1918", "9 May 1945", "That triggered war."],
      ["m", "The Nazi-Soviet Pact was between", "Germany and the USSR", "Britain and France", "USA and Japan", "Italy and Spain", "It was signed in August 1939."],
      ["t", "Britain declared war on Germany on 3 September 1939.", true, "France did the same that day."]] }
]);

G.topic("Health and the people", "🩺", "Paper 2", [
{ t: "Medieval medicine", icon: "🏰",
  c: ["Medieval people believed in the four humours: blood, phlegm, yellow bile and black bile. Illness meant imbalance.", "Treatments included bloodletting, purging and herbal remedies. The Church supported Galen's ideas and God's will.", "Hospitals were run by monasteries. Public health was poor, with dirty streets and water.", "The Black Death (1348) killed about a third of the population. People blamed God, bad air, or outsiders."],
  k: "Four humours plus the Church shaped medieval treatment.",
  q: [["m", "Which humour is linked to blood?", "sanguine (blood)", "phlegm", "black bile", "yellow bile", "The four were blood, phlegm, yellow bile and black bile."],
      ["m", "Whose ideas did the medieval Church support?", "Galen", "Pasteur", "Jenner", "Lister", "Galen's theories were taught for centuries."],
      ["t", "The Black Death reached England in 1348.", true, "It killed millions across Europe."]] },

{ t: "The Medical Renaissance", icon: "🔭",
  c: ["Vesalius (1543) corrected Galen's anatomy by dissection. Harvey (1628) showed blood circulates, pumped by the heart.", "Ambroise Paré improved surgery with ligatures. The printing press spread ideas faster.", "Despite new knowledge, treatments changed little: the cause of disease was still unknown.", "The Royal Society (1660) encouraged experiments. Hospitals and apothecaries grew."],
  k: "New ideas about the body, but causes unknown.",
  q: [["p", "Match the person.", [["Vesalius", "Detailed human anatomy"], ["Harvey", "Circulation of blood"], ["Paré", "Ligatures for amputations"], ["Galen", "Ancient Roman doctor"]]],
      ["m", "Which invention helped spread new ideas?", "printing press", "telephone", "X-ray", "radio", "Books reached more people."],
      ["t", "By 1700 doctors understood the cause of disease.", false, "Germ theory came in the 1860s."]] },

{ t: "Edward Jenner and vaccination", icon: "💉",
  c: ["Smallpox killed many in the 1700s. In 1796 Edward Jenner tested cowpox on James Phipps and showed protection.", "Jenner did not know how it worked, so some doctors resisted and some people feared the practice.", "Parliament made vaccination compulsory in 1853 for babies, and smallpox was declared eradicated worldwide in 1980.", "The method inspired later vaccines by Pasteur."],
  k: "Jenner found that it worked, not why.",
  q: [["m", "In 1796 Jenner tested a smallpox vaccine using", "cowpox", "penicillin", "chloroform", "carbolic acid", "He inoculated James Phipps."],
      ["m", "Smallpox was declared eradicated in", "1980", "1796", "1900", "2000", "It is a rare success."],
      ["t", "Jenner knew how vaccination worked.", false, "Germ theory had not yet been developed."]] },

{ t: "Germ theory and surgery", icon: "🔬",
  c: ["In 1861 Louis Pasteur published germ theory: microbes cause disease. Robert Koch identified specific bacteria.", "Surgery faced three problems: pain, infection and blood loss. Anaesthetics (ether, chloroform, 1846 to 1847) solved pain.", "Joseph Lister used carbolic acid spray from 1865 to stop infection. Later aseptic surgery kept things germ-free.", "Blood groups discovered in 1901 helped transfusions."],
  k: "Pain, infection, blood loss: three problems solved in turn.",
  q: [["m", "Who developed antiseptic surgery?", "Lister", "Harvey", "Fleming", "Snow", "He used carbolic acid."],
      ["m", "Chloroform was introduced by", "Simpson", "Jenner", "Lister", "Pare", "James Simpson used it from 1847."],
      ["s", "Which problem did this solve?", { "Pain": ["Anaesthetics", "Chloroform"], "Infection": ["Carbolic acid", "Aseptic surgery"], "Blood loss": ["Blood groups", "Transfusions"] }]] },

{ t: "Public health and the NHS", icon: "🚰",
  c: ["Rapid industrial growth meant overcrowded towns, dirty water and cholera. John Snow showed in 1854 that a Broad Street pump spread cholera.", "The Public Health Act of 1875 forced councils to provide clean water, sewers and rubbish collection.", "In the 20th century the Liberal reforms, the Beveridge Report (1942) and the NHS (1948) brought free healthcare.", "Later changes included vaccination campaigns, anti-smoking laws and lifestyle advice."],
  k: "From dirty towns to healthcare for all.",
  q: [["m", "When was the NHS founded?", "1948", "1875", "1918", "1965", "Aneurin Bevan led its creation."],
      ["m", "John Snow's 1854 research was about", "cholera", "smallpox", "plague", "malaria", "He traced it to the Broad Street pump."],
      ["t", "The 1875 Public Health Act required councils to provide clean water.", true, "It forced action on sanitation."]] },

{ t: "Twentieth-century medical breakthroughs", icon: "💊",
  c: ["In 1928 Alexander Fleming noticed penicillin killed bacteria. Florey and Chain developed it for mass production in the 1940s with US funding.", "Magic bullets such as Salvarsan 606 (Ehrlich and Hata, 1909) treated syphilis.", "Later advances include X-rays, keyhole surgery, transplants (first heart transplant 1967) and the human genome.", "War, government funding and technology drove progress."],
  k: "Fleming noticed it; Florey and Chain made it work.",
  q: [["m", "Who discovered penicillin?", "Fleming", "Pasteur", "Koch", "Jenner", "He noticed mould killed bacteria in 1928."],
      ["m", "Who developed penicillin for mass production?", "Florey and Chain", "Lister and Simpson", "Snow and Chadwick", "Koch and Ehrlich", "They worked in the early 1940s."],
      ["t", "War helped speed up development of penicillin.", true, "Wartime need and funding mattered."]] }
]);

G.topic("Elizabethan England", "👸", "Paper 2", [
{ t: "Elizabeth's court and government", icon: "🏰",
  c: ["Elizabeth I became queen in 1558. She ruled with the help of the Privy Council and advisers such as William Cecil.", "She travelled on royal progresses to gain support. Marriage was a political issue; she never married.", "Parliament met to grant taxes and pass laws, but Elizabeth controlled when it met.", "Her image was as the Virgin Queen, 'Gloriana'."],
  k: "Elizabeth ruled through advisers and image.",
  q: [["m", "Who was Elizabeth's chief adviser?", "William Cecil", "Francis Drake", "Walter Raleigh", "Robert Dudley", "He served as Secretary of State."],
      ["t", "Elizabeth I married and had children.", false, "She never married."],
      ["m", "A royal progress was a", "journey around the country", "type of tax", "battle", "church service", "It helped her gain support."]] },

{ t: "The Religious Settlement", icon: "⛪",
  c: ["In 1559 Parliament passed the Act of Supremacy and Act of Uniformity. Elizabeth became Supreme Governor of the Church of England.", "The settlement was a compromise between Protestants and Catholics to keep peace.", "Puritans wanted a purer, simpler church. Catholics were at first tolerated, then harshly treated.", "After the 1570 papal bull and plots, laws punished priests and recusants (those not attending church)."],
  k: "A middle way, to keep the peace.",
  q: [["m", "Elizabeth's title in the church was", "Supreme Governor", "Pope", "Archbishop", "Cardinal", "She avoided 'Supreme Head'."],
      ["m", "Puritans wanted", "a simpler Protestant church", "to return to Rome", "no religion", "more bishops", "They disliked ceremony."],
      ["t", "The Religious Settlement was in 1559.", true, "It was an early priority."]] },

{ t: "Threats: Mary Queen of Scots and Spain", icon: "🗡️",
  c: ["Mary, Queen of Scots, was Catholic with a claim to the English throne. She fled to England in 1568 and was held captive.", "Plots included the Revolt of the Northern Earls (1569), the Ridolfi Plot (1571) and the Babington Plot (1586).", "Mary was executed in 1587 after the Babington Plot, discovered by Walsingham.", "Spain, led by Philip II, sent the Armada in 1588. Fireships, bad weather and English tactics defeated it."],
  k: "Catholic plots and Spain tested Elizabeth.",
  q: [["m", "Who uncovered the Babington Plot?", "Walsingham", "Cecil", "Drake", "Essex", "He ran Elizabeth's spy network."],
      ["m", "When was the Spanish Armada?", "1588", "1559", "1603", "1569", "It was defeated."],
      ["o", "Order the events.", ["Religious Settlement", "Northern Earls' revolt", "Babington Plot", "Execution of Mary", "Spanish Armada"]]] },

{ t: "Exploration, trade and poverty", icon: "⛵",
  c: ["Francis Drake circumnavigated the globe (1577 to 1580). Raleigh tried to found a colony at Roanoke in the 1580s.", "Trading companies such as the Muscovy and East India Company grew.", "Poverty rose because of population growth, inflation and enclosures. Vagabonds were seen as a threat.", "The Poor Law Act (1601) set up parish poor relief, with the 'impotent' poor helped and sturdy beggars punished."],
  k: "Adventure abroad, poverty at home.",
  q: [["m", "Who sailed around the world 1577 to 1580?", "Francis Drake", "Walter Raleigh", "John Hawkins", "Martin Frobisher", "He returned with treasure."],
      ["m", "The Poor Law Act was passed in", "1601", "1558", "1588", "1536", "It organised poor relief."],
      ["t", "Vagabonds were treated leniently.", false, "Punishment included whipping."]] },

{ t: "Everyday life and the Globe", icon: "🎭",
  c: ["Rich Elizabethans built grand houses such as Hardwick Hall. Poorer people lived in small, crowded homes.", "Leisure included hunting, bear-baiting, games and theatre. The Globe (1599) and The Theatre drew crowds.", "Playwrights like Shakespeare and Marlowe wrote for mixed audiences. Puritans disliked theatres.", "Plague outbreaks often closed theatres."],
  k: "Theatre drew everyone, from groundlings to nobles.",
  q: [["m", "The Globe theatre opened in", "1599", "1558", "1603", "1660", "It was associated with Shakespeare."],
      ["t", "Puritans supported the theatre.", false, "They saw it as immoral."],
      ["m", "Groundlings stood", "in the yard", "in the gallery", "backstage", "on the stage", "They paid the cheapest price."]] }
]);
})();
