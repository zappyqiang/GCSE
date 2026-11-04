(function () {
var G = GAME;
G.configure({
  key: "re", subject: "Religious Studies", spec: "AQA 8062 · 2 papers", title: "Religious Studies course", tiered: false,
  specUrl: "https://www.aqa.org.uk/subjects/religious-studies/gcse/religious-studies-a-8062", channel: "Mr Ward RE",
  intro: "Beliefs, teachings and practices of Christianity and Islam, plus the big ethical themes: relationships, life issues, crime and punishment, and peace and conflict.",
  finalName: "Final assessment", sheetName: "Key terms", sheetNote: "AQA Specification A has two papers: beliefs and practices of two religions, and four thematic studies. Your school may study different religions or themes, so revise the ones you have been taught."
});
G.sheet = [
  { h: "Christianity key terms", rows: [
    ["Trinity", "God as Father, Son and Holy Spirit"], ["Incarnation", "God becoming human in Jesus"], ["Atonement", "Making amends: Jesus' death reconciles humans and God"], ["Resurrection", "Jesus rising from the dead"], ["Sacrament", "A sign of God's grace, for example baptism"], ["Agape", "Selfless Christian love"]
  ] },
  { h: "Islam key terms", rows: [
    ["Tawhid", "The oneness of God"], ["Risalah", "Prophethood"], ["Akhirah", "Life after death"], ["Five Pillars", "Shahadah, Salah, Zakat, Sawm, Hajj"], ["Sunni", "The largest branch of Islam"], ["Shi'a", "Second largest branch, follows Ali's family"], ["Jihad", "Struggle in the way of God"]
  ] },
  { h: "Themes: key terms", rows: [
    ["Sanctity of life", "Life is holy and belongs to God"], ["Euthanasia", "Ending life to relieve suffering"], ["Just war", "Criteria for a war to be morally justified"], ["Pacifism", "Opposition to all war"], ["Retribution", "Punishment as repayment"], ["Rehabilitation", "Reforming offenders"]
  ] }
];

G.topic("Christian beliefs", "✝️", "Paper 1", [
{ t: "The nature of God", icon: "☁️",
  c: ["Christians believe in one God who is omnipotent (all-powerful), omniscient (all-knowing) and omnibenevolent (all-loving).", "The Trinity: Father, Son (Jesus) and Holy Spirit.", "Creation: some read Genesis literally, others as symbolic with evolution.", "The problem of evil asks how a good, all-powerful God allows suffering."],
  k: "One God, three persons.",
  q: [["m", "Omnipotent means", "all-powerful", "all-knowing", "all-loving", "eternal", "God can do anything."],
      ["m", "The Trinity includes", "Father, Son and Holy Spirit", "Moses and Abraham", "Peter and Paul", "angels", "Three persons in one."],
      ["t", "All Christians interpret Genesis in the same way.", false, "Views range from literal to symbolic."]] },

{ t: "Jesus, salvation and afterlife", icon: "🕊️",
  c: ["The incarnation is God becoming human in Jesus. Crucifixion, resurrection and ascension are central.", "Salvation is being saved from sin. Catholics emphasise faith and works; many Protestants stress faith and grace.", "Christians believe in life after death, heaven and hell; Catholics also believe in purgatory.", "The Day of Judgement is when God judges everyone."],
  k: "Jesus' death and rising bring salvation.",
  q: [["m", "The incarnation means", "God became human", "Jesus rose to heaven", "Holy Spirit came", "Moses' law", "Jesus is God in human form."],
      ["m", "The resurrection happened", "three days after the crucifixion", "at birth", "at baptism", "on the cross", "Christians celebrate Easter."],
      ["t", "Catholics believe in purgatory.", true, "A place of purification before heaven."]] },

{ t: "Christian practices", icon: "⛪",
  c: ["Worship can be liturgical, non-liturgical or informal, and includes private prayer.", "Sacraments such as baptism and Eucharist are central; Quakers do not use them.", "Pilgrimage sites include Lourdes and Jerusalem; festivals include Christmas and Easter.", "The Church helps the poor through charities such as Christian Aid and the Trussell Trust."],
  k: "Worship, sacrament and service.",
  q: [["m", "Baptism is", "a sacrament of welcome into the church", "a pilgrimage", "a prayer for peace", "a festival", "Water is used."],
      ["m", "Christian Aid is", "a charity", "a prayer", "a Bible book", "a sacrament", "It fights poverty."],
      ["t", "Pilgrimage involves a journey to a holy place.", true, "Lourdes is an example."]] }
]);

G.topic("Islamic beliefs", "☪️", "Paper 1", [
{ t: "Key beliefs: Tawhid and prophets", icon: "🕌",
  c: ["Tawhid is the oneness of Allah. Shirk (associating partners with Allah) is the greatest sin.", "Muslims believe in angels (Jibril), the books (the Qur'an), prophets (Adam to Muhammad) and the Day of Judgement.", "Muhammad is the final prophet (Seal of the Prophets).", "The Qur'an is the word of Allah revealed to Muhammad."],
  k: "One God, many messengers, one final prophet.",
  q: [["m", "Tawhid means", "oneness of Allah", "prayer", "charity", "pilgrimage", "It is the central belief."],
      ["m", "Muslims call the angel who delivered revelation", "Jibril", "Mikail", "Isa", "Adam", "He gave Muhammad the Qur'an."],
      ["t", "Muhammad is regarded as the final prophet.", true, "He is the Seal of the Prophets."]] },

{ t: "The Five Pillars", icon: "🧱",
  c: ["Shahadah (declaration of faith), Salah (prayer five times a day), Zakat (charity, 2.5 percent), Sawm (fasting in Ramadan), Hajj (pilgrimage to Makkah).", "Shi'a Muslims add the Ten Obligatory Acts including Khums.", "Salah requires wudu (washing) and facing the Qibla.", "Hajj is required once for those who are able."],
  k: "Faith, prayer, charity, fasting, pilgrimage.",
  q: [["o", "Order the pillars as usually listed.", ["Shahadah", "Salah", "Zakat", "Sawm", "Hajj"]],
      ["m", "Zakat is usually what percentage of savings?", "2.5%", "10%", "25%", "50%", "It purifies wealth."],
      ["t", "Muslims pray five times a day.", true, "Salah is a daily duty."]] },

{ t: "Festivals, jihad and Sunni/Shi'a", icon: "🌙",
  c: ["Eid ul-Fitr marks the end of Ramadan; Eid ul-Adha remembers Ibrahim's sacrifice.", "Jihad means struggle: the greater jihad is the inner struggle; the lesser jihad is defence of Islam.", "Sunni and Shi'a differ on leadership after Muhammad: Sunni accept elected caliphs; Shi'a follow Ali and the Imams.", "Ashura is important for Shi'a Muslims."],
  k: "Greater jihad is personal struggle.",
  q: [["m", "Eid ul-Fitr marks the end of", "Ramadan", "Hajj", "Muharram", "Ashura", "It celebrates fasting."],
      ["m", "The greater jihad is", "the personal struggle to be a good Muslim", "a war", "a pilgrimage", "a prayer", "It is inner."],
      ["t", "Shi'a Muslims follow Ali and the Imams.", true, "Leadership is a key difference."]] }
]);

G.topic("Ethical themes", "🧭", "Paper 2", [
{ t: "Relationships and families", icon: "💞",
  c: ["Christians see marriage as a lifelong covenant; Muslims see it as a contract and a duty.", "Attitudes to divorce vary: Catholics oppose it, other churches may allow it with sorrow.", "Views on contraception differ: Catholics forbid artificial methods; many Protestants accept it.", "Equality of men and women is stressed by many, though roles may differ in some traditions."],
  k: "Religion shapes views on family life.",
  q: [["m", "A covenant is", "a binding promise", "a sin", "a prayer", "a festival", "Marriage vows are covenant-like."],
      ["t", "All Christians have the same view on divorce.", false, "Catholics generally oppose it."],
      ["m", "Catholics forbid", "artificial contraception", "marriage", "prayer", "charity", "They allow natural methods."]] },

{ t: "Religion and life", icon: "🌱",
  c: ["The sanctity of life says life is sacred. Pro-life views oppose abortion; pro-choice views stress the mother's right.", "Euthanasia: voluntary means the patient requests it. Many religions oppose it, with the hospice movement as an alternative.", "Christians and Muslims believe humans are stewards of the Earth and should care for animals and the environment.", "The quality of life argument is used by some to support euthanasia."],
  k: "Life is sacred; stewards care for creation.",
  q: [["m", "Sanctity of life means", "life is sacred", "life is cheap", "life is short", "life is a gift of money", "It belongs to God."],
      ["m", "Stewardship means", "caring for the Earth for God", "owning nature", "ignoring nature", "destroying nature", "Humans are caretakers."],
      ["t", "Voluntary euthanasia is requested by the patient.", true, "It differs from involuntary euthanasia."]] },

{ t: "Crime, punishment and peace", icon: "🕊️",
  c: ["Aims of punishment: retribution, deterrence, reformation, protection. Religious groups often stress forgiveness.", "Christians often oppose the death penalty; some Muslims support it for serious crimes.", "Just war theory (Aquinas) requires a just cause, legitimate authority, right intention, last resort, proportionality.", "Pacifists such as Quakers reject war; Christians and Muslims also teach peacemaking."],
  k: "Just war: right cause, right authority, right intention.",
  q: [["m", "Which is a just war criterion?", "last resort", "revenge", "profit", "speed", "All peaceful options must fail first."],
      ["m", "Pacifism is the belief that", "all war is wrong", "wars are glorious", "only defence is wrong", "armies are needed", "Quakers are pacifists."],
      ["t", "Rehabilitation aims to reform offenders.", true, "It tries to change behaviour."]] }
]);
})();
