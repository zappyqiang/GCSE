(function () {
var G = GAME;
G.configure({
  key: "sociology", subject: "Sociology", spec: "AQA 8192 · 2 papers", title: "Sociology course", tiered: false,
  specUrl: "https://www.aqa.org.uk/subjects/sociology/gcse/sociology-8192", channel: "tutor2u",
  intro: "How society works: families, education, crime and deviance, social stratification, and how sociologists research it.",
  finalName: "Final assessment", sheetName: "Key terms and thinkers", sheetNote: "Paper 1 covers the sociology of families and education. Paper 2 covers crime and deviance and social stratification. Always name the perspective and the sociologist."
});
G.sheet = [
  { h: "Key terms", rows: [
    ["Socialisation", "Learning the norms and values of society"], ["Primary socialisation", "Early learning, usually in the family"], ["Secondary socialisation", "Later learning, for example school, media, peers"], ["Norms", "Expected ways of behaving"], ["Values", "Beliefs about what is important"], ["Status", "Social position, ascribed or achieved"], ["Deviance", "Behaviour that breaks norms"], ["Crime", "Breaking the law"], ["Labelling", "Attaching a label that may affect behaviour"], ["Stratification", "Layers of inequality in society"]
  ] },
  { h: "Research methods", rows: [
    ["Questionnaire", "Cheap, quantitative, large samples; low response rates"], ["Structured interview", "Fixed questions, comparable results"], ["Unstructured interview", "Open, qualitative, rich detail"], ["Participant observation", "Researcher joins the group, valid but time-consuming"], ["Official statistics", "Secondary, quantitative, may be unreliable"], ["Pilot study", "Small trial run to test the method"]
  ] },
  { h: "Perspectives", rows: [
    ["Functionalism", "Society works like a body with parts that need each other"], ["Marxism", "Society benefits the powerful, class conflict"], ["Feminism", "Society is patriarchal"], ["Interactionism", "Society is shaped by small-scale interaction and labels"]
  ] }
];

G.topic("Families", "👪", "Paper 1", [
{ t: "Types of family", icon: "🏠",
  c: ["Nuclear families have two parents and children. Extended families include other relatives.", "Other types include lone-parent, reconstituted (step) and same-sex families.", "Families have changed because of divorce, cohabitation, smaller families and migration.", "Functionalist Parsons said the family performs primary socialisation and stabilises adult personalities."],
  k: "Family types are diverse.",
  q: [["m", "A reconstituted family includes", "step-parents or step-children", "only grandparents", "one parent", "no children", "Two families join."],
      ["m", "Primary socialisation mainly takes place in the", "family", "workplace", "media", "peer group", "It is early learning."],
      ["t", "The nuclear family is the only family type in the UK today.", false, "Many forms of family exist."]] },

{ t: "Marriage, divorce and roles", icon: "💍",
  c: ["Divorce rose after the Divorce Reform Act 1969 and easier divorce, women's independence and secularisation.", "Cohabitation and civil partnerships have grown; same-sex marriage was legalised in 2014 in England and Wales.", "Conjugal roles: joint roles share tasks; segregated roles divide them. Young and Willmott described the symmetrical family.", "Feminists argue women still do the 'dual burden' of work and housework."],
  k: "Roles are becoming more shared, but not equal.",
  q: [["m", "Joint conjugal roles mean", "partners share tasks", "man works only", "woman works only", "no work", "Tasks are shared."],
      ["m", "The dual burden means women", "do paid work and housework", "work part time", "have no job", "avoid housework", "They carry both."],
      ["t", "Divorce rates rose after the 1969 Divorce Reform Act.", true, "Divorce became easier."]] },

{ t: "Family diversity", icon: "🌈",
  c: ["Rapoport and Rapoport described five types of diversity: organisational, cultural, social class, life stage and generational.", "Beanpole families have many generations but few in each.", "Postmodernists say there is greater choice in family forms.", "Critics argue changes are exaggerated."],
  k: "More choice, more diversity.",
  q: [["m", "Which sociologists described family diversity?", "Rapoport and Rapoport", "Marx and Engels", "Becker", "Merton", "They listed five types."],
      ["t", "Beanpole families are long and thin.", true, "Few members in each generation."],
      ["m", "A postmodern view of family is that", "people have more choice", "everyone is nuclear", "families are disappearing", "choices are fixed", "Diversity is welcomed."]] }
]);

G.topic("Education", "🎓", "Paper 1", [
{ t: "Role of education", icon: "🏫",
  c: ["Functionalists say schools teach skills, values and sort people by talent (Durkheim, Parsons, Davis and Moore).", "Marxists (Bowles and Gintis) say schools prepare workers for capitalism through the hidden curriculum.", "Feminists say schools can reinforce gender roles.", "The formal curriculum is lessons; the hidden curriculum is unwritten lessons such as obedience."],
  k: "The hidden curriculum teaches without lessons.",
  q: [["m", "The hidden curriculum is", "lessons learned without being taught", "the timetable", "exam board rules", "homework", "It includes obedience and punctuality."],
      ["s", "Which perspective?", { "Functionalist": ["Sorts people by ability", "Teaches shared values"], "Marxist": ["Prepares a workforce for capitalism", "Reproduces class inequality"] }],
      ["t", "Bowles and Gintis were Marxists.", true, "They wrote about the correspondence principle."]] },

{ t: "Achievement and class, gender and ethnicity", icon: "📈",
  c: ["Middle-class pupils tend to achieve more due to cultural capital, material advantages and speech codes.", "Girls now outperform boys at GCSE; reasons include feminism, coursework and changing job markets.", "Ethnic groups differ: some Indian and Chinese pupils achieve highly, others lower; reasons include language, racism and class.", "Labelling can lead to a self-fulfilling prophecy."],
  k: "Labels can become reality.",
  q: [["m", "A self-fulfilling prophecy occurs when", "a label leads someone to act accordingly", "a plan fails", "tests are fair", "rules are broken", "The label comes true."],
      ["m", "Cultural capital refers to", "knowledge and skills linked to class", "money", "land", "laws", "Bourdieu used the term."],
      ["t", "Girls generally achieve more at GCSE than boys.", true, "Reasons are debated."]] },

{ t: "Schools and processes", icon: "🧑‍🏫",
  c: ["Streaming groups pupils by ability; setting groups by subject. Banding is groups of similar ability.", "Interactionists such as Becker, Hargreaves and Ball show how labelling and streaming affect pupils.", "Pupil subcultures include pro-school and anti-school (Willis's 'lads').", "Policies: comprehensive schools, academies, free schools and the National Curriculum."],
  k: "Teacher expectations matter.",
  q: [["m", "Streaming means pupils are grouped by", "overall ability", "age only", "random", "height", "All subjects are taught in the same group."],
      ["m", "Willis studied", "working-class boys' anti-school subculture", "teacher pay", "private schools", "exams", "He wrote Learning to Labour."],
      ["t", "Anti-school subcultures reject school values.", true, "Pupils gain status elsewhere."]] }
]);

G.topic("Crime and deviance", "🚔", "Paper 2", [
{ t: "Explaining crime", icon: "🕵️",
  c: ["Functionalist Durkheim said crime is inevitable and can have positive functions. Merton's strain theory says people use deviant means when blocked from goals.", "Marxists say laws benefit the powerful and ignore white-collar crime.", "Interactionists (Becker) focus on labelling: a deviant is someone to whom the label has been successfully applied.", "Subcultural theories say groups develop their own deviant values."],
  k: "Labels, strain and class shape crime.",
  q: [["m", "Strain theory is associated with", "Merton", "Becker", "Marx", "Willis", "Merton linked goals and means."],
      ["m", "Labelling theory is linked to", "Becker", "Durkheim", "Parsons", "Weber", "Becker studied outsiders."],
      ["t", "Marxists say the law serves the interests of the powerful.", true, "Rich crimes are less policed."]] },

{ t: "Crime data and trends", icon: "📊",
  c: ["Sources: police statistics (recorded crime) and victim surveys (Crime Survey for England and Wales).", "The dark figure of crime is unreported or unrecorded crime.", "Patterns: young males, urban areas and some ethnic groups are more likely to be convicted.", "Reasons include policing practices and labelling."],
  k: "Not all crime is recorded.",
  q: [["m", "The dark figure of crime is", "unrecorded crime", "murder", "night-time crime", "new laws", "It is missing from statistics."],
      ["s", "Official or victim survey?", { "Police recorded crime": ["Official statistics", "Only reported crime"], "Crime Survey": ["Asks victims directly", "Includes unreported crime"] }],
      ["t", "Police statistics show all crime.", false, "Many crimes are unreported."]] },

{ t: "Social control and punishment", icon: "⚖️",
  c: ["Formal social control is by police, courts and prison. Informal control comes from family, peers and media.", "Aims of punishment: retribution, deterrence, rehabilitation and protection.", "Prisons may harden offenders; community sentences may work better.", "Foucault (not required) and Marxists criticise state control."],
  k: "Control can be formal or informal.",
  q: [["s", "Formal or informal control?", { "Formal": ["Police", "Prison"], "Informal": ["Family disapproval", "Peer pressure"] }],
      ["m", "Rehabilitation aims to", "reform offenders", "scare the public", "take revenge", "ignore crime", "Offenders change."],
      ["t", "Deterrence aims to put people off offending.", true, "Fear of punishment prevents crime."]] }
]);

G.topic("Social stratification", "🪜", "Paper 2", [
{ t: "Class, wealth and poverty", icon: "💰",
  c: ["Stratification is a hierarchy of groups in society by class, gender, ethnicity and age.", "Income is money received; wealth is assets owned. Wealth is more unequal than income.", "Absolute poverty means lacking basics; relative poverty means falling below the living standard of most.", "Causes include unemployment, low pay, age and disability."],
  k: "Wealth is more unequal than income.",
  q: [["m", "Relative poverty means", "being poor compared with the typical standard of living", "lacking food and shelter", "being rich", "being unemployed", "It is relative to others."],
      ["m", "Wealth refers to", "assets owned", "weekly pay", "taxes", "benefits", "It includes property and savings."],
      ["t", "Social mobility is the movement between classes.", true, "It can be upward or downward."]] },

{ t: "Power and inequality", icon: "🏛️",
  c: ["Weber defined power as getting your way even against resistance. Authority is legitimate power: traditional, charismatic or legal-rational.", "Pressure groups seek to influence policy; insider groups work with government, outsider groups campaign publicly.", "Gender inequality has been reduced by laws such as the Equal Pay Act 1970 and Sex Discrimination Act 1975, but the pay gap remains.", "Racial inequality is addressed by the Race Relations Acts and the Equality Act 2010."],
  k: "Law helps, but inequality persists.",
  q: [["m", "Charismatic authority is based on", "personal qualities", "tradition", "law", "money", "A leader inspires followers."],
      ["m", "An insider pressure group", "works closely with government", "only protests", "is illegal", "is violent", "It has access to ministers."],
      ["t", "The Equality Act was passed in 2010.", true, "It brought together earlier laws."]] }
]);

G.topic("Research methods", "🔬", "Both papers", [
{ t: "Sampling and methods", icon: "🧪",
  c: ["A sample is a smaller group representing the target population. Types: random, stratified, quota, snowball.", "Quantitative data is numbers; qualitative data is words and meanings.", "Reliability means consistent results; validity means true picture; representativeness is how typical the sample is.", "Ethical issues: informed consent, confidentiality, avoiding harm."],
  k: "Choose methods that fit the research aim.",
  q: [["s", "Quantitative or qualitative?", { "Quantitative": ["Statistics", "Questionnaire with fixed answers"], "Qualitative": ["Unstructured interview", "Participant observation"] }],
      ["m", "Snowball sampling is useful for", "hard-to-reach groups", "large random surveys", "official statistics", "experiments", "Participants recommend others."],
      ["t", "A pilot study is a small trial run.", true, "It tests the method."]] }
]);
})();
