import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const chapterOneVocabulary = [
  'der Anzug — suit', 'der Apfelstrudel — apple cake', 'die Autobahn — highway', 'Bulgarisch — Bulgarian', 'zuordnen — to assign',
  'das Butterbrot — sandwich', 'das Frühstück — breakfast', 'Französisch — French', 'international — international',
  'Italienisch — Italian', 'Japanisch — Japanese', 'der/die Kranke — sick person', 'der Rucksack — backpack',
  'Russisch — Russian', 'Türkisch — Turkish', 'Ungarisch — Hungarian', 'der Walzer — waltz', 'das Würstchen — sausage',
  'andere — other', 'kennen — to know someone', 'sammeln — to collect', 'Hallo! — Hello!', 'Tschüs! — Bye!',
  'Bis bald! — See you soon!', 'danke — thank you', 'dir — you (informal)', 'du — you (informal)',
  'die Entschuldigung — apology / excuse me', 'es — it', 'gehen — to go / be going', 'gut — good',
  'heißen — to be named', 'hören — to hear', 'ich — I', 'die Person — person', 'sehr — very',
  'und — and', 'wer? — who?', 'wie? — how?', 'Wie geht’s? — How are you?', 'auch — also',
  'sein — to be', 'Auf Wiedersehen! — Goodbye!', 'das — this / that', 'die Frau — woman',
  'Gute Nacht! — Good night!', 'Guten Abend! — Good evening!', 'Guten Morgen! — Good morning!',
  'Guten Tag! — Good day / hello!', 'der Herr — gentleman / Mr', 'Ihnen — you (formal)',
  'die Kollegin — female colleague', 'mein / meine — my', 'der Name — name', 'Sie — you (formal)',
  'der Dialog — dialogue', 'die Antwort — answer', 'aus — from', 'Deutsch — German',
  'Deutschland — Germany', 'Englisch — English', 'in — in', 'kommen — to come from',
  'der Reiseführer — travel guide', 'Spanisch — Spanish', 'sprechen — to speak', 'das Telefon — telephone',
  'welche? / welches? — which?', 'wo? — where?', 'woher? — from where?', 'wohnen — to live',
  'sie — she / they', 'er — he', 'ergänzen — to complete', 'die Hausnummer — house number',
  'die Postleitzahl — postal code', 'die Webseite — website', 'das Interview — interview', 'notieren — to note',
  'der Partner — male partner', 'die Partnerin — female partner', 'raten — to guess',
  'vorstellen — to introduce', 'der Buchstabe — letter', 'laut — loud', 'die Zahl — number',
  'fragen — to ask', 'die Handynummer — mobile phone number', 'Ihr / Ihre — your (formal) / her',
  'die Telefonnummer — telephone number', 'das Alphabet — alphabet', 'erst — first', 'schreiben — to write',
  'bitte — please', 'buchstabieren — to spell', 'dein / deine — your (informal)', 'ein bisschen — a little',
  'die E-Mail-Adresse — email address', 'können — to be able to', 'langsam — slowly', 'nicht — not',
  'noch einmal — once more', 'variieren — to vary', 'verstehen — to understand', 'Wie bitte? — Excuse me? / Come again?',
  'Arabisch — Arabic', 'China — China', 'Chinesisch — Chinese', 'lernen — to learn', 'Österreich — Austria',
  'die Tabelle — table / chart', 'die USA — USA', 'Frankreich — France', 'Großbritannien — Great Britain',
  'Italien — Italy', 'Japan — Japan', 'das Land — country', 'Polen — Poland', 'Polnisch — Polish',
  'Rätoromanisch — Romansh', 'Russland — Russia', 'die Schweiz — Switzerland', 'Spanien — Spain',
  'die Sprache — language', 'die Türkei — Turkey', 'Schweden — Sweden', 'die Ukraine — Ukraine',
  'die E-Mail — email', 'Portugal — Portugal', 'Griechenland — Greece', 'Griechisch — Greek',
  'Irland — Ireland', 'Kanada — Canada', 'Maori — Maori', 'Mexiko — Mexico', 'Neuseeland — New Zealand',
  'Portugiesisch — Portuguese', 'Schwedisch — Swedish', 'Syrien — Syria', 'Thai — Thai',
  'Thailand — Thailand', 'der Film — film / movie', 'klar — clear',
];

const germanChapters = [
  { title: 'Guten Tag!', subtitle: 'Greetings & introductions', icon: '👋', teach: chapterOneVocabulary, grammar: [
    { title: 'Definite articles: der, die, das', rule: 'Every German noun has a grammatical gender. Learn the article together with the noun: der Herr, die Frau, das Telefon.', examples: ['der Name — the name (masculine)', 'die Sprache — the language (feminine)', 'das Land — the country (neuter)'] },
    { title: 'sein — to be', rule: 'Use sein to say who you are or what something is: ich bin, du bist, Sie sind.', examples: ['Ich bin Anna. — I am Anna.', 'Sie sind Herr Müller. — You are Mr Müller.'] },
    { title: 'heißen — to be named', rule: 'Use heißen to ask and tell names. The verb changes with the person: Wie heißt du? Ich heiße Anna.', examples: ['Wie heißt du? — What is your name? (informal)', 'Wie heißen Sie? — What is your name? (formal)'] },
    { title: 'du or Sie?', rule: 'Use du with friends and children. Use Sie with adults in formal situations; the formal pronoun is capitalized.', examples: ['Wie geht’s dir? — How are you? (informal)', 'Wie geht es Ihnen? — How are you? (formal)'] },
    { title: 'W-questions', rule: 'The question word comes first, then the verb, then the person: Wer bist du? Wo wohnst du? Woher kommst du?', examples: ['Wer? — Who?', 'Wo? — Where?', 'Woher? — From where?', 'Wie? — How?'] },
    { title: 'Present-tense verb pattern', rule: 'Most regular verbs change their ending. For wohnen: ich wohne, du wohnst, Sie wohnen.', examples: ['Ich wohne in Spanien. — I live in Spain.', 'Wo wohnst du? — Where do you live?'] },
    { title: 'Negation with nicht', rule: 'Put nicht before the part you want to make negative: Ich verstehe das nicht. — I do not understand that.', examples: ['Ich spreche nicht Deutsch. — I do not speak German.', 'Das ist nicht schlecht. — That is not bad.'] },
    { title: 'Possessives: mein and dein', rule: 'mein means my and dein means your (informal). They come before a noun: mein Name, dein Name.', examples: ['Mein Name ist Anna. — My name is Anna.', 'Wie ist dein Name? — What is your name?'] },
  ], prompt: 'Choose the friendly German greeting:', choices: ['Guten Tag!', 'Gute Zahl!', 'Danke Haus!', 'Bis gestern!'], answer: 0, hint: 'Use Guten Tag! during the day.', translation: 'Guten Tag!' },
  { title: 'Freunde, Kollegen und ich', subtitle: 'People, hobbies & jobs', icon: '🧑‍🤝‍🧑', teach: [
    'der Freund — male friend', 'die Freundin — female friend', 'der Kollege — colleague', 'die Kollegin — female colleague',
    'das Hobby — hobby', 'der Beruf — occupation', 'arbeiten — to work', 'lernen — to learn',
    'Musik hören — to listen to music', 'Sport machen — to do sport', 'Was machst du gern? — What do you like doing?',
    'Ich spiele gern Fußball. — I like playing football.', 'Das macht Spaß. — That is fun.',
  ], grammar: [
    { title: 'The verb gern', rule: 'Put gern after the verb to say that you like doing something: Ich spiele gern.', examples: ['Ich höre gern Musik. — I like listening to music.', 'Was machst du gern? — What do you like doing?'] },
    { title: 'Regular verbs: machen and spielen', rule: 'Regular verbs take endings such as ich mache, du machst, and er macht.', examples: ['Ich spiele Fußball. — I play football.', 'Du machst Sport. — You do sport.'] },
    { title: 'Questions with was', rule: 'Was means what. Use it at the beginning of a question: Was machst du?', examples: ['Was machst du? — What are you doing?', 'Was ist dein Hobby? — What is your hobby?'] },
  ], prompt: 'What does “das Hobby” mean?', choices: ['occupation', 'hobby', 'week', 'address'], answer: 1, hint: 'A Hobby is something you enjoy doing.', translation: 'hobby' },
  { title: 'In der Stadt', subtitle: 'Places & directions', icon: '🗺️', teach: [
    'der Bahnhof — train station', 'die Haltestelle — stop', 'die Straße — street', 'der Stadtplan — city map',
    'das Zentrum — city centre', 'der Supermarkt — supermarket', 'die Apotheke — pharmacy', 'links — left',
    'rechts — right', 'geradeaus — straight ahead', 'hier — here', 'dort — there',
    'Wo ist der Bahnhof? — Where is the train station?', 'Wie komme ich zum Zentrum? — How do I get to the centre?',
  ], grammar: [
    { title: 'Imperatives for directions', rule: 'Use the short command form to give simple directions: Gehen Sie geradeaus! Fahren Sie links!', examples: ['Gehen Sie geradeaus! — Go straight ahead!', 'Gehen Sie nach rechts! — Go to the right!'] },
    { title: 'zu + dative for destinations', rule: 'Use zu when saying where you are going: zum Bahnhof, zur Apotheke.', examples: ['Ich gehe zum Bahnhof. — I am going to the train station.', 'Wir gehen zur Apotheke. — We are going to the pharmacy.'] },
    { title: 'Wo? and Wie komme ich?', rule: 'Wo asks where. Wie komme ich ...? asks how to reach a place.', examples: ['Wo ist das Zentrum? — Where is the city centre?', 'Wie komme ich zum Hotel? — How do I get to the hotel?'] },
  ], prompt: 'You want someone to continue straight. What do you say?', choices: ['geradeaus', 'Gute Nacht', 'bis bald', 'schön'], answer: 0, hint: 'geradeaus means straight ahead.', translation: 'geradeaus' },
  { title: 'Guten Appetit!', subtitle: 'Food & shopping', icon: '🥨', teach: [
    'das Brot — bread', 'das Brötchen — bread roll', 'die Banane — banana', 'der Apfel — apple',
    'der Käse — cheese', 'die Suppe — soup', 'das Wasser — water', 'der Kaffee — coffee',
    'die Rechnung — bill', 'der Preis — price', 'kosten — to cost', 'kaufen — to buy',
    'Ich möchte ... — I would like ...', 'Was kostet das? — How much does that cost?', 'Die Rechnung, bitte. — The bill, please.',
  ], grammar: [
    { title: 'Accusative: einen and ein', rule: 'After möchte, a masculine noun uses einen: Ich möchte einen Kaffee. Feminine and neuter nouns keep eine or ein.', examples: ['Ich möchte einen Kaffee. — I would like a coffee.', 'Ich möchte eine Suppe. — I would like a soup.'] },
    { title: 'Polite requests with möchte', rule: 'möchte means would like. Use Ich möchte ... bitte when ordering politely.', examples: ['Ich möchte ein Brötchen, bitte. — I would like a bread roll, please.', 'Ich möchte Wasser. — I would like water.'] },
    { title: 'Asking about prices', rule: 'Use Was kostet das? for one item and Was kosten die ...? for plural items.', examples: ['Was kostet das? — How much does that cost?', 'Was kosten die Äpfel? — How much do the apples cost?'] },
  ], prompt: 'Complete: “Ich möchte ___, bitte.”', choices: ['ein Brötchen', 'links', 'Montag', 'krank'], answer: 0, hint: 'A Brötchen is a bread roll you can order.', translation: 'Ich möchte ein Brötchen, bitte.' },
  { title: 'Tag für Tag', subtitle: 'Daily routines & time', icon: '⏰', teach: [
    'aufstehen — to get up', 'frühstücken — to have breakfast', 'arbeiten — to work', 'lernen — to study',
    'nach Hause gehen — to go home', 'schlafen — to sleep', 'der Morgen — morning', 'der Abend — evening',
    'der Arbeitstag — workday', 'die Uhr — clock / time', 'um acht Uhr — at eight o’clock', 'heute — today',
    'Wann stehst du auf? — When do you get up?', 'Ich stehe um sieben Uhr auf. — I get up at seven.',
  ], grammar: [
    { title: 'Separable verbs', rule: 'In a main sentence, the prefix moves to the end: aufstehen becomes Ich stehe auf.', examples: ['Ich stehe um sieben Uhr auf. — I get up at seven.', 'Wann stehst du auf? — When do you get up?'] },
    { title: 'Time with um', rule: 'Use um before an exact time: um acht Uhr, um halb neun.', examples: ['Ich arbeite um acht Uhr. — I work at eight.', 'Der Kurs beginnt um neun Uhr. — The course begins at nine.'] },
    { title: 'Time questions with wann', rule: 'Wann means when and comes first in a question.', examples: ['Wann beginnt der Kurs? — When does the course begin?', 'Wann gehst du nach Hause? — When do you go home?'] },
  ], prompt: 'What does “aufstehen” mean?', choices: ['to get up', 'to pay', 'to travel', 'to fit'], answer: 0, hint: 'It describes starting your day by getting up.', translation: 'to get up' },
  { title: 'Zeit mit Freunden', subtitle: 'Plans & free time', icon: '🎉', teach: [
    'die Überraschung — surprise', 'der Film — film', 'das Konzert — concert', 'das Wochenende — weekend',
    'die Party — party', 'treffen — to meet', 'bezahlen — to pay', 'tanzen — to dance',
    'spazieren gehen — to go for a walk', 'Zeit haben — to have time', 'Was machen wir? — What are we doing?',
    'Hast du Zeit? — Do you have time?', 'Das klingt gut! — That sounds good!', 'Bis später! — See you later!',
  ], grammar: [
    { title: 'Making suggestions with wollen', rule: 'Use wollen to say what you want to do: Wir wollen ins Kino gehen.', examples: ['Wir wollen einen Film sehen. — We want to watch a film.', 'Was wollen wir machen? — What do we want to do?'] },
    { title: 'Invitations with hast du Zeit?', rule: 'Ask Hast du Zeit? before suggesting an activity. Answer with Ja, gern! or Leider nein.', examples: ['Hast du am Samstag Zeit? — Do you have time on Saturday?', 'Ja, gern! — Yes, gladly!'] },
    { title: 'Time expressions', rule: 'Use am with days and im with months or seasons: am Samstag, im Sommer.', examples: ['Am Wochenende treffe ich Freunde. — I meet friends at the weekend.', 'Im Sommer tanzen wir draußen. — In summer we dance outside.'] },
  ], prompt: 'Choose the phrase for “What are we doing?”', choices: ['Was machen wir?', 'Woher kommst du?', 'Wie heißen Sie?', 'Was kostet das?'], answer: 0, hint: 'machen means to do or make.', translation: 'Was machen wir?' },
  { title: 'Kontakte', subtitle: 'Phone, messages & appointments', icon: '📱', teach: [
    'die Telefonnummer — phone number', 'die Handynummer — mobile number', 'die Nachricht — message', 'die E-Mail — email',
    'der Termin — appointment', 'anrufen — to call', 'schreiben — to write', 'schicken — to send',
    'erreichen — to reach', 'besetzt — busy', 'später — later', 'heute Abend — this evening',
    'Wie ist deine Nummer? — What is your number?', 'Ich rufe dich später an. — I will call you later.',
  ], grammar: [
    { title: 'Separable verb anrufen', rule: 'anrufen separates in a main sentence: Ich rufe dich an. The prefix an goes to the end.', examples: ['Ich rufe dich später an. — I will call you later.', 'Ruf mich bitte an! — Please call me!'] },
    { title: 'Possessives: dein and Ihre', rule: 'Use dein for informal you and Ihre for formal you: deine Nummer, Ihre E-Mail-Adresse.', examples: ['Wie ist deine Telefonnummer? — What is your phone number?', 'Wie ist Ihre E-Mail-Adresse? — What is your email address?'] },
    { title: 'Time words in messages', rule: 'Use heute, morgen, später, and jetzt to make messages precise.', examples: ['Ich schreibe dir später. — I will write to you later.', 'Ich kann jetzt nicht sprechen. — I cannot speak now.'] },
  ], prompt: 'Which word means “phone number”?', choices: ['die Telefonnummer', 'die Jahreszeit', 'der Bahnhof', 'das Wetter'], answer: 0, hint: 'Telefon + Nummer gives the meaning.', translation: 'die Telefonnummer' },
  { title: 'Meine Wohnung', subtitle: 'Home & rooms', icon: '🏠', teach: [
    'die Wohnung — apartment', 'das Zimmer — room', 'das Wohnzimmer — living room', 'das Schlafzimmer — bedroom',
    'die Küche — kitchen', 'das Bad — bathroom', 'der Tisch — table', 'der Stuhl — chair',
    'das Bett — bed', 'die Tür — door', 'das Fenster — window', 'wohnen — to live',
    'Wie ist deine Wohnung? — What is your apartment like?', 'Das Wohnzimmer ist hell. — The living room is bright.',
  ], grammar: [
    { title: 'There is: es gibt', rule: 'Use es gibt to say that something exists. The noun after it is in the accusative.', examples: ['Es gibt ein Wohnzimmer. — There is a living room.', 'Es gibt einen Balkon. — There is a balcony.'] },
    { title: 'Location with in + dative', rule: 'Use in to describe where something is: im Wohnzimmer, in der Küche.', examples: ['Der Tisch steht im Wohnzimmer. — The table is in the living room.', 'Ich bin in der Küche. — I am in the kitchen.'] },
    { title: 'Adjectives after sein', rule: 'After sein, an adjective describes the room: Das Zimmer ist klein, hell, or ruhig.', examples: ['Das Zimmer ist klein. — The room is small.', 'Die Wohnung ist sehr schön. — The apartment is very beautiful.'] },
  ], prompt: 'Where do you sleep?', choices: ['im Schlafzimmer', 'im Bahnhof', 'im Restaurant', 'im Flughafen'], answer: 0, hint: 'The bedroom is das Schlafzimmer.', translation: 'im Schlafzimmer' },
  { title: 'Alles Arbeit?', subtitle: 'Work & occupations', icon: '💼', teach: [
    'der Beruf — occupation', 'die Arbeit — work', 'die Firma — company', 'das Büro — office',
    'der Chef / die Chefin — boss', 'der Mitarbeiter — employee', 'der Lehrer — teacher', 'die Ärztin — doctor',
    'der Ingenieur — engineer', 'arbeiten — to work', 'verdienen — to earn', 'beginnen — to begin',
    'Was sind Sie von Beruf? — What is your occupation?', 'Ich arbeite als Lehrerin. — I work as a teacher.',
  ], grammar: [
    { title: 'Occupations with als', rule: 'Use als to say what job someone does: Ich arbeite als Lehrer.', examples: ['Ich arbeite als Ärztin. — I work as a doctor.', 'Er arbeitet als Ingenieur. — He works as an engineer.'] },
    { title: 'Formal questions with Sie', rule: 'Use capitalized Sie with formal adults and match the verb ending: Was machen Sie?', examples: ['Was machen Sie beruflich? — What do you do professionally?', 'Wo arbeiten Sie? — Where do you work?'] },
    { title: 'Word order in statements', rule: 'The conjugated verb is usually in position two: Ich arbeite in einer Firma.', examples: ['Ich arbeite in einem Büro. — I work in an office.', 'Meine Kollegin beginnt um neun. — My colleague starts at nine.'] },
  ], prompt: 'Complete: “Was sind Sie von ___?”', choices: ['Beruf', 'Hobby', 'Stadt', 'Uhr'], answer: 0, hint: 'This polite question asks about someone’s occupation.', translation: 'Was sind Sie von Beruf?' },
  { title: 'Kleidung und Mode', subtitle: 'Clothes, colors & shopping', icon: '👕', teach: [
    'das Kleid — dress', 'der Rock — skirt', 'die Hose — trousers', 'das Hemd — shirt',
    'die Jacke — jacket', 'der Schuh — shoe', 'die Größe — size', 'die Farbe — color',
    'rot — red', 'blau — blue', 'schwarz — black', 'passen — to fit', 'tragen — to wear',
    'Wie viel kostet das? — How much does that cost?', 'Das passt mir gut. — That fits me well.',
  ], grammar: [
    { title: 'Adjective colors', rule: 'Use color words after the noun or with sein: ein rotes Kleid, Die Jacke ist blau.', examples: ['Die Hose ist schwarz. — The trousers are black.', 'Ich möchte ein rotes Kleid. — I would like a red dress.'] },
    { title: 'Dative with passen', rule: 'passen takes a dative person: Der Rock passt mir, aber er passt dir nicht.', examples: ['Die Jacke passt mir. — The jacket fits me.', 'Die Schuhe passen dir gut. — The shoes fit you well.'] },
    { title: 'Shopping questions', rule: 'Ask Wie viel kostet ...? about price and Welche Größe? about size.', examples: ['Welche Größe haben Sie? — What size do you have?', 'Wie viel kostet die Jacke? — How much does the jacket cost?'] },
  ], prompt: 'What does “passen” mean in “Der Rock passt mir”?', choices: ['to fit', 'to cook', 'to hear', 'to learn'], answer: 0, hint: 'The sentence talks about whether clothing fits.', translation: 'to fit' },
  { title: 'Gesund und munter', subtitle: 'Body & wellbeing', icon: '💚', teach: [
    'die Gesundheit — health', 'der Kopf — head', 'der Bauch — stomach', 'der Rücken — back',
    'die Hand — hand', 'der Fuß — foot', 'die Bauchschmerzen — stomach pain', 'krank — ill',
    'gesund — healthy', 'müde — tired', 'schlafen — to sleep', 'weh tun — to hurt',
    'Was fehlt Ihnen? — What is wrong with you? (formal)', 'Ich habe Kopfschmerzen. — I have a headache.',
  ], grammar: [
    { title: 'haben with symptoms', rule: 'Use haben to describe many symptoms: Ich habe Kopfschmerzen, Fieber, or Bauchschmerzen.', examples: ['Ich habe Kopfschmerzen. — I have a headache.', 'Hast du Fieber? — Do you have a fever?'] },
    { title: 'Modal verb sollen', rule: 'Use sollen to give advice: Du sollst schlafen. The second verb stays at the end.', examples: ['Du sollst viel trinken. — You should drink a lot.', 'Sie sollen zum Arzt gehen. — You should go to the doctor.'] },
    { title: 'weh tun', rule: 'Use weh tun to say that a body part hurts: Der Kopf tut weh.', examples: ['Mein Rücken tut weh. — My back hurts.', 'Tut dein Fuß weh? — Does your foot hurt?'] },
  ], prompt: 'Choose the useful advice for someone who is tired:', choices: ['Du sollst schlafen.', 'Du sollst kaufen.', 'Du sollst tanzen.', 'Du sollst fahren.'], answer: 0, hint: 'schlafen means to sleep.', translation: 'You should sleep.' },
  { title: 'Ab in den Urlaub!', subtitle: 'Travel & holidays', icon: '✈️', teach: [
    'die Städtereise — city trip', 'der Urlaub — holiday', 'der Koffer — suitcase', 'der Reisepass — passport',
    'das Ticket — ticket', 'der Flughafen — airport', 'der Bahnhof — train station', 'das Hotel — hotel',
    'die Reservierung — reservation', 'fahren — to travel / drive', 'fliegen — to fly', 'aufschreiben — to write down',
    'Wann fährt der Zug? — When does the train leave?', 'Ich möchte ein Zimmer reservieren. — I would like to reserve a room.',
  ], grammar: [
    { title: 'Future plans with fahren and fliegen', rule: 'Use the present tense with a time expression for planned travel: Im Juli fliege ich nach Berlin.', examples: ['Im Sommer fliege ich nach Spanien. — In summer I fly to Spain.', 'Morgen fahre ich nach München. — Tomorrow I travel to Munich.'] },
    { title: 'Prepositions for destinations', rule: 'Use nach with cities and countries without an article, and in die for countries with an article.', examples: ['Ich fahre nach Berlin. — I am travelling to Berlin.', 'Wir fliegen in die Schweiz. — We are flying to Switzerland.'] },
    { title: 'Polite travel requests', rule: 'Use möchte and bitte when booking a room, asking for a ticket, or requesting information.', examples: ['Ich möchte ein Zimmer reservieren. — I would like to reserve a room.', 'Ein Ticket nach Hamburg, bitte. — A ticket to Hamburg, please.'] },
  ], prompt: 'What is “die Städtereise”?', choices: ['city trip', 'workday', 'bread roll', 'phone call'], answer: 0, hint: 'Stadt means city and Reise means trip.', translation: 'city trip' },
];

const courses = {
  german: {
    name: 'German', flag: '🇩🇪', accent: 'plum', greeting: 'Guten Morgen!', progress: 34,
    chapters: germanChapters,
    lessons: [
      { title: 'Hallo, ich bin...', subtitle: 'Introductions & greetings', icon: '👋', done: true, minutes: '6 min' },
      { title: 'Zahlen & Alter', subtitle: 'Numbers and age', icon: '🔢', active: true, minutes: '8 min' },
      { title: 'Meine Familie', subtitle: 'Family & people', icon: '🏡', locked: true, minutes: '7 min' },
      { title: 'Im Café', subtitle: 'Order with confidence', icon: '🥨', locked: true, minutes: '9 min' },
    ],
    words: [
      { word: 'das Alter', meaning: 'age', example: 'Wie ist dein Alter?' },
      { word: 'sein', meaning: 'to be', example: 'Ich bin Student.' },
      { word: 'alt', meaning: 'old', example: 'Wie alt bist du?' },
      { word: 'die Zahl', meaning: 'number', example: 'Das ist eine Zahl.' },
      { word: 'hallo', meaning: 'hello', example: 'Hallo, ich bin Anna.' },
    ],
    exercises: [
      { type: 'choice', prompt: 'How do you say “I am 24 years old” in German?', choices: ['Ich habe 24 Jahre.', 'Ich bin 24 Jahre alt.', 'Ich ist vierundzwanzig.', 'Ich heiße 24.'], answer: 1, hint: 'German uses “sein” (to be) when talking about age.', translation: 'Ich bin 24 Jahre alt.' },
      { type: 'choice', prompt: 'What does “Wie alt bist du?” mean?', choices: ['Where do you live?', 'What is your name?', 'How old are you?', 'How are you?'], answer: 2, hint: '“Wie alt” asks about age.', translation: 'How old are you?' },
      { type: 'translate', prompt: 'Build the German phrase for “I am a student.”', choices: ['bin', 'Ich', 'Student', 'ein'], answer: 0, hint: 'Start with the subject: Ich.', translation: 'Ich bin ein Student.' },
      { type: 'choice', prompt: 'Choose the correct greeting for a new friend:', choices: ['Gute Nacht!', 'Hallo!', 'Tschüss!', 'Danke!'], answer: 1, hint: 'Use “Hallo!” when you meet someone.', translation: 'Hallo!' },
    ],
  },
  english: {
    name: 'English', flag: '🇬🇧', accent: 'blue', greeting: 'Good morning!', progress: 62,
    chapters: germanChapters,
    lessons: [
      { title: 'Hello, I am...', subtitle: 'Introductions & greetings', icon: '👋', done: true, minutes: '6 min' },
      { title: 'Numbers & age', subtitle: 'Numbers and age', icon: '🔢', active: true, minutes: '8 min' },
      { title: 'My family', subtitle: 'Family & people', icon: '🏡', locked: true, minutes: '7 min' },
      { title: 'At the café', subtitle: 'Order with confidence', icon: '☕', locked: true, minutes: '9 min' },
    ],
    words: [
      { word: 'age', meaning: 'how old someone is', example: 'What is your age?' },
      { word: 'be', meaning: 'to exist or describe', example: 'I am a student.' },
      { word: 'old', meaning: 'having lived for years', example: 'How old are you?' },
      { word: 'number', meaning: 'a counting symbol', example: 'What is your phone number?' },
      { word: 'hello', meaning: 'a greeting', example: 'Hello, I am Anna.' },
    ],
    exercises: [
      { type: 'choice', prompt: 'Choose the natural way to ask someone’s age:', choices: ['How many years have you?', 'How old are you?', 'What age you have?', 'You are how old?'], answer: 1, hint: 'Use “How old are you?” as a friendly, everyday question.', translation: 'How old are you?' },
      { type: 'choice', prompt: 'What does “I am 24 years old” tell us?', choices: ['A person’s name', 'A person’s age', 'A person’s address', 'A person’s job'], answer: 1, hint: 'The phrase gives a number of years.', translation: 'A person’s age.' },
      { type: 'choice', prompt: 'Complete: “Hello, ___ Anna.”', choices: ['am', 'is', 'are', 'be'], answer: 0, hint: 'Use “am” with I.', translation: 'Hello, I am Anna.' },
      { type: 'choice', prompt: 'Choose a friendly farewell:', choices: ['Hello!', 'Please!', 'Goodbye!', 'Sorry!'], answer: 2, hint: 'Say “Goodbye!” when leaving.', translation: 'Goodbye!' },
    ],
  },
};

function Icon({ children }) { return <span className="icon" aria-hidden="true">{children}</span>; }

function speakPhrase(text, language) {
  if (!('speechSynthesis' in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  const targetLanguage = language === 'German' ? 'de-DE' : 'en-US';
  utterance.lang = targetLanguage;
  utterance.rate = language === 'German' ? 0.88 : 0.94;
  const voices = window.speechSynthesis.getVoices();
  const matchingVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith(targetLanguage.slice(0, 2).toLowerCase()));
  if (matchingVoice) utterance.voice = matchingVoice;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function vocabularyEmoji(phrase) {
  const text = phrase.toLowerCase();
  const visualMap = [
    [['apple', 'apfel', 'fruit'], '🍎'],
    [['cake', 'strudel', 'kuchen'], '🍰'],
    [['bread', 'butterbrot', 'brot', 'sandwich'], '🥪'],
    [['breakfast', 'frühstück'], '🍳'],
    [['sausage', 'würstchen'], '🌭'],
    [['coffee', 'kaffee'], '☕'],
    [['water', 'wasser'], '💧'],
    [['food', 'essen'], '🍽️'],
    [['film', 'movie'], '🎬'],
    [['book', 'buch', 'textbook'], '📚'],
    [['letter', 'buchstabe', 'alphabet'], '🔤'],
    [['number', 'zahl', 'numbers'], '🔢'],
    [['phone', 'telefon', 'handy'], '📱'],
    [['email', 'e-mail', 'webseite', 'website'], '📧'],
    [['house', 'haus', 'home', 'wohnung'], '🏠'],
    [['city', 'stadt', 'country', 'land'], '🌍'],
    [['car', 'autobahn', 'highway'], '🚗'],
    [['backpack', 'rucksack'], '🎒'],
    [['person', 'frau', 'herr', 'kolleg', 'partner'], '🧑'],
    [['friend', 'freund'], '🧑‍🤝‍🧑'],
    [['language', 'sprache', 'deutsch', 'englisch'], '🗣️'],
    [['learn', 'lernen', 'study'], '🧠'],
    [['write', 'schreiben', 'notieren'], '✍️'],
    [['speak', 'sprechen'], '💬'],
    [['hear', 'hören', 'listen'], '👂'],
    [['understand', 'verstehen'], '💡'],
    [['question', 'fragen', 'wer?', 'wie?', 'wo?'], '❓'],
    [['hello', 'hallo', 'guten', 'good morning', 'good evening'], '👋'],
    [['bye', 'tschüs', 'wiedersehen', 'goodbye'], '🙋'],
    [['thank', 'danke'], '🙏'],
    [['sorry', 'entschuldigung', 'excuse'], '🙇'],
    [['good', 'gut'], '😊'],
    [['name', 'heißen'], '🏷️'],
    [['come', 'kommen', 'go', 'gehen'], '🚶'],
    [['live', 'wohnen'], '📍'],
    [['collect', 'sammeln'], '🧺'],
    [['know', 'kennen'], '✅'],
    [['other', 'andere'], '🔀'],
    [['not', 'nicht'], '🚫'],
    [['country', 'deutschland', 'frankreich', 'italien', 'japan', 'spanien'], '🗺️'],
    [['russia', 'russland', 'china', 'kanada', 'mexiko'], '🌐'],
  ];
  const match = visualMap.find(([keywords]) => keywords.some((keyword) => text.includes(keyword)));
  return match ? match[1] : '✨';
}

function normalizeSpeech(text) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ß/g, 'ss').replace(/[^\p{L}\p{N}\s]/gu, '').replace(/\s+/g, ' ').trim();
}

function speechMatches(spoken, target) {
  const heard = normalizeSpeech(spoken);
  const expected = normalizeSpeech(target);
  if (!heard || !expected) return false;
  if (heard === expected) return true;
  const heardWords = heard.split(' ');
  const expectedWords = expected.split(' ');
  const matchingWords = expectedWords.filter((word, index) => heardWords[index] === word).length;
  return matchingWords / expectedWords.length >= 0.8;
}

function apiBase() {
  return (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
}

function AuthScreen({ onAuthenticated }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    setError('');
    if (mode === 'register' && form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setBusy(true);
    try {
      const response = await fetch(`${apiBase()}/api/auth/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mode === 'register'
          ? { firstName: form.firstName, lastName: form.lastName, email: form.email, password: form.password }
          : { email: form.email, password: form.password }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.detail || data.message || 'Unable to authenticate. Please try again.');
      localStorage.setItem('phrasefusion-token', data.token);
      onAuthenticated(data.user);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-orbit auth-orbit-one" />
      <div className="auth-orbit auth-orbit-two" />
      <section className="auth-card">
        <div className="auth-logo"><span className="brand-mark">P</span><strong>Phrase<span>Fusion</span></strong></div>
        <div className="auth-cube" aria-hidden="true"><span>Hallo</span><b>hello</b><i>👋</i></div>
        <p className="eyebrow">YOUR LANGUAGE ADVENTURE</p>
        <h1>{mode === 'login' ? 'Welcome back!' : 'Start your streak.'}</h1>
        <p className="auth-lead">{mode === 'login' ? 'Keep your words moving and continue where you left off.' : 'Build confident German and English habits, one playful lesson at a time.'}</p>
        <form className="auth-form" onSubmit={submit}>
          {mode === 'register' && <div className="auth-name-row"><label>First name<input name="firstName" required value={form.firstName} onChange={update} autoComplete="given-name" /></label><label>Last name<input name="lastName" required value={form.lastName} onChange={update} autoComplete="family-name" /></label></div>}
          <label>Email address<input name="email" type="email" required value={form.email} onChange={update} autoComplete="email" /></label>
          <label>Password<input name="password" type="password" required value={form.password} onChange={update} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} minLength="8" /><small>{mode === 'register' && 'Use 8+ characters with uppercase, lowercase, a number, and a symbol.'}</small></label>
          {mode === 'register' && <label>Confirm password<input name="confirmPassword" type="password" required value={form.confirmPassword} onChange={update} autoComplete="new-password" /></label>}
          {error && <div className="auth-error" role="alert">{error}</div>}
          <button className="auth-submit" disabled={busy}>{busy ? 'Opening your lesson...' : mode === 'login' ? 'Log in →' : 'Create my account →'}</button>
        </form>
        <p className="auth-switch">{mode === 'login' ? 'New to PhraseFusion?' : 'Already learning with us?'} <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}> {mode === 'login' ? 'Create an account' : 'Log in'}</button></p>
      </section>
    </div>
  );
}

function App() {
  const [authReady, setAuthReady] = useState(false);
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState(localStorage.getItem('phrasefusion-language') || 'german');
  const [view, setView] = useState('learn');
  const [courseData, setCourseData] = useState(courses);
  const [showLesson, setShowLesson] = useState(false);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [activeExercises, setActiveExercises] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [apiStatus, setApiStatus] = useState('checking');
  const [xp, setXp] = useState(Number(localStorage.getItem('phrasefusion-xp') || 840));
  const [mastered, setMastered] = useState(Number(localStorage.getItem('phrasefusion-mastered') || 12));
  const [reviewed, setReviewed] = useState([]);
  const course = courseData[language];
  const lessonExercises = activeExercises || course.exercises;
  const exercise = lessonExercises[exerciseIndex];
  const isCorrect = selected === exercise.answer;
  const todayLabel = useMemo(() => new Intl.DateTimeFormat('en', { weekday: 'long', month: 'short', day: 'numeric' }).format(new Date()), []);

  useEffect(() => {
    const token = localStorage.getItem('phrasefusion-token');
    if (!token) {
      setAuthReady(true);
      return;
    }
    fetch(`${apiBase()}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((profile) => setUser(profile))
      .catch(() => localStorage.removeItem('phrasefusion-token'))
      .finally(() => setAuthReady(true));
  }, []);

  useEffect(() => {
    localStorage.setItem('phrasefusion-language', language);
    localStorage.setItem('phrasefusion-xp', xp);
    localStorage.setItem('phrasefusion-mastered', mastered);
  }, [language, xp, mastered]);

  useEffect(() => {
    const apiUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
    fetch(`${apiUrl}/api/courses`).then((response) => response.ok ? response.json() : Promise.reject())
      .then((remote) => {
        setCourseData((current) => Object.fromEntries(Object.entries(current).map(([key, value]) => [
          key, remote[key] ? { ...value, ...remote[key], chapters: value.chapters, exercises: value.exercises, words: value.words } : value,
        ])));
        setApiStatus('connected');
      })
      .catch(() => setApiStatus('offline'));
  }, []);

  function chooseLanguage(next) {
    setLanguage(next); setView('learn'); setShowLesson(false); setExerciseIndex(0); setSelected(null); setSubmitted(false);
  }

  function openLesson(exercises = null) {
    const lesson = exercises || [{ ...course.chapters[0], type: 'choice' }];
    setActiveLesson(lesson[0]); setActiveExercises(lesson); setExerciseIndex(0); setSelected(null); setSubmitted(false); setShowLesson(true);
  }

  function submitAnswer() {
    if (selected === null) return;
    setSubmitted(true);
    recordPracticeResult(isCorrect);
  }

  function recordPracticeResult(correct) {
    if (correct) { setXp((value) => value + 20); setMastered((value) => value + 1); }
    const token = localStorage.getItem('phrasefusion-token');
    fetch(`${apiBase()}/api/progress`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify({ language, correct }) }).catch(() => setApiStatus('offline'));
  }

  function nextExercise() {
    if (exerciseIndex === lessonExercises.length - 1) { setShowLesson(false); setActiveExercises(null); return; }
    setExerciseIndex((value) => value + 1); setSelected(null); setSubmitted(false);
  }

  if (!authReady) return <div className="auth-loading">Loading your learning space...</div>;
  if (!user) return <AuthScreen onAuthenticated={setUser} />;

  function logout() {
    const token = localStorage.getItem('phrasefusion-token');
    fetch(`${apiBase()}/api/auth/logout`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } }).catch(() => {});
    localStorage.removeItem('phrasefusion-token');
    setUser(null);
  }

  return (
    <div className={`app ${course.accent}`}>
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">P</span><span>Phrase<span>Fusion</span></span></div>
        <div className="sidebar-label">YOUR SPACE</div>
        <nav className="nav">
          <button className={`nav-item ${view === 'learn' ? 'active' : ''}`} onClick={() => setView('learn')}><Icon>⌂</Icon> Dashboard</button>
          <button className={`nav-item ${view === 'learn' ? 'active map-link' : ''}`} onClick={() => setView('learn')}><Icon>▱</Icon> Course map <span className="nav-dot" /></button>
          <button className={`nav-item ${view === 'practice' ? 'active' : ''}`} onClick={() => setView('practice')}><Icon>◎</Icon> Practice</button>
          <button className={`nav-item ${view === 'review' ? 'active' : ''}`} onClick={() => setView('review')}><Icon>◈</Icon> Flashcards <span className="nav-count">{course.words.length}</span></button>
          <button className={`nav-item ${view === 'community' ? 'active' : ''}`} onClick={() => setView('community')}><Icon>✦</Icon> AI tutor</button>
          <button className="nav-item" onClick={() => setView('settings')}><Icon>▥</Icon> Progress</button>
          <button className="nav-item" onClick={() => setView('settings')}><Icon>▤</Icon> Resources</button>
        </nav>
        <div className="sidebar-label courses-label">YOUR COURSES</div>
        <div className="course-switcher">
          {Object.entries(courseData).map(([key, item]) => <button key={key} className={`mini-course ${language === key ? 'selected' : ''}`} onClick={() => chooseLanguage(key)}><span className="course-flag">{item.flag}</span><span>{item.name}</span><span className="mini-arrow">›</span></button>)}
          <button className="add-course" onClick={() => setView('settings')}><span>＋</span> Add a language</button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar"><div className="breadcrumb"><span>My learning</span><b>/</b><strong>{course.name}</strong><span className={`api-status ${apiStatus}`}>{apiStatus === 'connected' ? '● Live' : apiStatus === 'offline' ? '● Demo mode' : '○ Connecting'}</span></div><div className="top-actions"><button className="icon-button">?</button><button className="icon-button">⌕</button><button className="notification">♢<i /></button><div className="top-streak"><span className="top-fire">🔥</span><div><strong>7</strong><small>day streak</small></div></div><button className={`top-settings ${view === 'settings' ? 'active' : ''}`} onClick={() => setView('settings')} aria-label="Open settings">⚙<span>Settings</span></button><button className="top-profile" onClick={() => setView('settings')} aria-label="Open profile"><span className="top-avatar">{user.firstName.slice(0, 1)}{user.lastName.slice(0, 1)}</span><span><strong>{user.firstName}</strong><small>{xp} XP · Explorer</small></span><b>⌄</b></button></div></header>
        {view === 'learn' && <LearnView course={course} todayLabel={todayLabel} xp={xp} mastered={mastered} onStart={() => openLesson()} onChapter={(chapter) => openLesson([{ ...chapter, type: 'choice' }])} />}
        {view === 'practice' && <PracticeView course={course} onStart={openLesson} />}
        {view === 'review' && <ReviewView course={course} reviewed={reviewed} setReviewed={setReviewed} />}
        {view === 'community' && <CommunityView />}
        {view === 'settings' && <SettingsView language={language} chooseLanguage={chooseLanguage} apiStatus={apiStatus} onLogout={logout} />}
      </main>

      {showLesson && <LessonWorkspace chapter={activeLesson} course={{ ...course, exercises: lessonExercises }} exercise={exercise} exerciseIndex={exerciseIndex} selected={selected} submitted={submitted} isCorrect={isCorrect} setSelected={setSelected} submitAnswer={submitAnswer} recordPracticeResult={recordPracticeResult} nextExercise={nextExercise} close={() => { setShowLesson(false); setActiveExercises(null); setActiveLesson(null); }} />}
    </div>
  );
}

function LearnView({ course, todayLabel, xp, mastered, onStart, onChapter }) {
  const units = course.chapters.slice(0, 12);
  const mapOrder = [0, 1, 2, 3, 7, 6, 5, 4, 8, 9, 10, 11];
  const germanImages = [
    'https://upload.wikimedia.org/wikipedia/commons/6/64/Brandenburger_Tor_abends.jpg',
    'https://cdn.pixabay.com/photo/2014/10/23/18/05/neuschwanstein-500688_1280.jpg',
    'https://images.unsplash.com/photo-1520637836862-4d197d17c42a?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85',
    'https://images.unsplash.com/photo-1500534623283-312a1e7f2f47?auto=format&fit=crop&w=900&q=85',
  ];
  return <div className="content course-map-page"><section className="course-map-heading"><div><div className="course-chip">▱ &nbsp; A1 · Netzwerk</div><h1>{course.name} <em>Course Map</em></h1><p>A structured learning journey based on Netzwerk A1 (Lessons 1–12)</p></div></section>
    <section className="course-summary"><div className="summary-book" style={{ backgroundImage: `url(${germanImages[0]})` }} /><div className="summary-title"><strong>Netzwerk A1</strong><span>Course Mapping</span></div><div className="summary-stat"><b className="stat-icon">▱</b><strong>{units.length}</strong><span>Units</span></div><div className="summary-stat"><b className="stat-icon">◎</b><strong>~60</strong><span>Lessons</span></div><div className="summary-stat"><b className="stat-icon">◷</b><strong>A1</strong><span>Level</span></div><div className="summary-progress"><strong>{course.progress}%</strong><span>Course Progress</span></div></section>
    <section className="course-map-grid">{mapOrder.map((unitIndex, position) => { const chapter = units[unitIndex]; return <article className={`map-card ${unitIndex === 0 ? 'current' : unitIndex > 1 ? 'locked' : ''}`} key={chapter.title} style={{ '--map-image': `url(${germanImages[unitIndex]})`, '--map-position': position }}><button onClick={() => onChapter(chapter)} disabled={unitIndex > 1} className="map-card-button"><span className="map-card-icon">{unitIndex > 1 ? '×' : ''}</span><span className="map-card-copy"><small>Unit {unitIndex + 1}</small><strong>{chapter.title}</strong><span>{chapter.subtitle}</span></span><i>{unitIndex === 0 ? '●' : '○'}</i></button></article>; })}</section>
    <section className="learning-goals"><div className="goal-heading"><span className="goal-image" style={{ backgroundImage: `url(${germanImages[1]})` }} /><div><strong>A1 Learning Goals</strong><small>By the end of this course, you will be able to:</small></div></div><div className="goal-pill"><span className="goal-image small" style={{ backgroundImage: `url(${germanImages[2]})` }} /><span>Communicate in<br />everyday situations</span></div><div className="goal-pill"><span className="goal-image small" style={{ backgroundImage: `url(${germanImages[3]})` }} /><span>Talk about yourself,<br />family & daily life</span></div><div className="goal-pill"><span className="goal-image small" style={{ backgroundImage: `url(${germanImages[4]})` }} /><span>Handle common<br />real-life tasks</span></div><div className="goal-pill"><span className="goal-image small" style={{ backgroundImage: `url(${germanImages[0]})` }} /><span>Understand basic<br />German culture</span></div></section>
  </div>;
}

function PracticeView({ course, onStart }) {
  return <div className="content inner-page"><p className="eyebrow">SMART PRACTICE</p><h1>Practice what matters.</h1><p className="page-lead">Short retrieval sessions target your weakest words and grammar, so every minute has a purpose.</p><div className="practice-grid"><div className="practice-feature"><span className="feature-emoji">🎯</span><h2>Weak spot workout</h2><p>4 exercises selected from your recent mistakes and due review cards.</p><button className="primary-button" onClick={onStart}>Start focused practice <span>→</span></button></div><div className="practice-feature warm"><span className="feature-emoji">🗣️</span><h2>Speak with confidence</h2><p>Read useful phrases aloud, then check your understanding with quick recall.</p><button className="secondary-button" onClick={onStart}>Start speaking drill</button></div></div><div className="section-heading"><div><p className="eyebrow">THIS WEEK</p><h2>Your learning signals</h2></div></div><div className="signal-grid"><div><strong>82%</strong><span>Recall accuracy</span></div><div><strong>18m</strong><span>Average daily practice</span></div><div><strong>12</strong><span>Due for review</span></div></div></div>;
}

function ReviewView({ course, reviewed, setReviewed }) {
  return <div className="content inner-page"><p className="eyebrow">SPACED REPETITION</p><h1>Make words stick.</h1><p className="page-lead">Review cards just before you forget them. Mark a word as known or bring it back tomorrow.</p><div className="review-count"><strong>{course.words.length - reviewed.length}</strong><span>cards ready today</span><button className="primary-button" onClick={() => setReviewed([])}>Reset today's review</button></div><div className="word-list">{course.words.map((item, index) => <article className={`word-card ${reviewed.includes(index) ? 'reviewed' : ''}`} key={item.word}><div className="word-symbol">{item.word.slice(0, 1).toUpperCase()}</div><div><h3>{item.word}</h3><p>{item.meaning}</p><small>{item.example}</small></div><button onClick={() => setReviewed((items) => items.includes(index) ? items.filter((value) => value !== index) : [...items, index])}>{reviewed.includes(index) ? 'Reviewed ✓' : 'Mark known'}</button></article>)}</div></div>;
}

function CommunityView() {
  return <div className="content inner-page"><p className="eyebrow">LEARN TOGETHER</p><h1>Small wins, shared.</h1><p className="page-lead">A calm community for encouragement, questions, and language practice — never pressure or noisy leaderboards.</p><div className="community-card"><div className="community-avatar">🌱</div><div><strong>Weekly prompt</strong><h2>What phrase made you smile this week?</h2><p>Share a phrase from your lesson and help another learner use it.</p><button className="primary-button">Write a response <span>→</span></button></div></div><div className="post-list"><article><span>🇩🇪</span><div><strong>Anna · German A1</strong><p>Today I finally remembered: <b>Ich bin 24 Jahre alt.</b> The age sentence clicked!</p><small>12 minutes ago · 4 encouraging replies</small></div></article><article><span>🇬🇧</span><div><strong>Sam · English A1</strong><p>My tip: say each new phrase while walking. It feels silly, but it works.</p><small>Yesterday · 8 encouraging replies</small></div></article></div></div>;
}

function SettingsView({ language, chooseLanguage, apiStatus, onLogout }) {
  return <div className="content inner-page"><p className="eyebrow">YOUR PREFERENCES</p><h1>Make PhraseFusion yours.</h1><p className="page-lead">Choose a comfortable pace. Effective learning is consistent, not exhausting.</p><div className="settings-list"><label><span>Learning language</span><select value={language} onChange={(event) => chooseLanguage(event.target.value)}><option value="german">German 🇩🇪</option><option value="english">English 🇬🇧</option></select></label><label><span>Daily goal</span><select defaultValue="5"><option value="5">5 minutes · Gentle</option><option value="10">10 minutes · Steady</option><option value="20">20 minutes · Focused</option></select></label><label><span>Backend connection</span><strong className={apiStatus}>{apiStatus === 'connected' ? 'Connected and syncing' : 'Using local demo data'}</strong></label><label><span>Learning approach</span><strong>Retrieval + spaced repetition</strong></label><button className="logout-button" onClick={onLogout}>Log out of PhraseFusion</button></div></div>;
}

function buildPracticeSets(chapter, language) {
  const entries = chapter.teach.map((item) => {
    const [target, meaning = ''] = item.split(' — ');
    return { target: target.trim(), meaning: meaning.trim() };
  }).filter((item) => item.target);
  const grammar = chapter.grammar || [];
  const languageName = language === 'German' ? 'German' : 'English';
  const allMeanings = entries.map((item) => item.meaning).filter(Boolean);
  const allTargets = entries.map((item) => item.target);
  const choicesFor = (correct, pool, fallback) => {
    const unique = [...new Set([correct, ...pool, ...fallback])].filter(Boolean);
    return unique.slice(0, 4);
  };
  const makeChoiceQuestion = (prompt, correct, pool, fallback, extra = {}) => {
    const choices = choicesFor(correct, pool, fallback);
    return { prompt, choices, answer: choices.indexOf(correct), ...extra };
  };
  const grammarQuestions = grammar.flatMap((item) => {
    const examples = (item.examples || []).map((example) => {
      const [target, meaning = ''] = example.split(' — ');
      return { target: target.trim(), meaning: meaning.trim() };
    });
    const example = examples[0];
    if (!example) return [];
    const questions = [
      makeChoiceQuestion(`Which pattern does “${item.title}” teach?`, item.title, grammar.map((pattern) => pattern.title), ['Useful phrases', 'Pronunciation'], { hint: item.rule, translation: item.title }),
      makeChoiceQuestion(`What does “${example.target}” mean?`, example.meaning, examples.map((value) => value.meaning), allMeanings, { hint: item.rule, translation: example.meaning }),
    ];
    if (item.title.toLowerCase().includes('article')) {
      questions.push(makeChoiceQuestion(`Choose the correct article: ___ ${example.target.replace(/^(der|die|das) /, '')}`, example.target.match(/^(der|die|das)/)?.[0], ['der', 'die', 'das', 'ein'], ['die', 'das', 'der'], { hint: item.rule, translation: example.target }));
    }
    if (item.title.toLowerCase().includes('negation')) {
      questions.push(makeChoiceQuestion('Which word makes this sentence negative?', 'nicht', ['nicht', 'sehr', 'auch', 'und'], ['nicht', 'sehr', 'auch', 'und'], { hint: item.rule, translation: 'nicht = not' }));
    }
    return questions;
  });
  const writing = entries.flatMap(({ target, meaning }) => [
    { prompt: `Write “${meaning}” in ${languageName}.`, target, accepted: [target.toLowerCase()], hint: meaning },
    { prompt: `Translate “${target}” into English.`, target: meaning, accepted: [meaning.toLowerCase()], hint: target },
  ]);
  const listening = entries.flatMap(({ target, meaning }) => [
    { phrase: target, ...makeChoiceQuestion('Listen and choose the meaning.', meaning, allMeanings.filter((value) => value !== meaning), ['Good morning', 'Thank you', 'Where?']) },
    { phrase: target, ...makeChoiceQuestion('Listen and choose the phrase you heard.', target, allTargets.filter((value) => value !== target), ['Hallo!', 'Danke!', 'Wie bitte?']) },
  ]);
  const speaking = entries.map(({ target, meaning }) => ({ prompt: `Say this ${languageName} phrase aloud, then check yourself:`, phrase: target, meaning }));
  const reading = entries.map(({ target, meaning }, index) => {
    const next = entries[(index + 1) % entries.length];
    return { passage: `A: ${target}\\nB: ${next.target}`, ...makeChoiceQuestion('Read the phrase and choose the matching translation.', meaning, allMeanings.filter((value) => value !== meaning), ['Good evening', 'I do not understand', 'What is your name?']) };
  });
  return {
    writing: [...writing, ...grammarQuestions.map((question) => ({ prompt: `Write the key answer for this grammar point: ${question.translation}`, target: question.choices[question.answer], accepted: [question.choices[question.answer].toLowerCase()], hint: question.hint }))],
    listening: [...listening, ...grammarQuestions.map((question) => ({ ...question, phrase: question.translation, prompt: 'Listen to the grammar phrase and choose the correct answer.' }))],
    speaking: [...speaking, ...grammar.flatMap((item) => (item.examples || []).map((example) => { const [phrase, meaning = ''] = example.split(' — '); return { prompt: `Read this grammar example aloud:`, phrase, meaning }; }))],
    reading: [...reading, ...grammarQuestions.map((question) => ({ ...question, passage: `${question.translation}\\n${question.hint}`, prompt: 'Read the grammar note and choose the best answer.' }))],
  };
}

function LessonWorkspace({ chapter, course, exercise, exerciseIndex, selected, submitted, isCorrect, setSelected, submitAnswer, recordPracticeResult, nextExercise, close }) {
  const [tab, setTab] = useState('vocabulary');
  const [practiceMode, setPracticeMode] = useState('writing');
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceAnswer, setPracticeAnswer] = useState('');
  const [practiceSubmitted, setPracticeSubmitted] = useState(false);
  const [practiceCorrect, setPracticeCorrect] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [heardText, setHeardText] = useState('');
  const [micError, setMicError] = useState('');
  const [vocabularyQuery, setVocabularyQuery] = useState('');
  const recognitionRef = React.useRef(null);
  const grammar = chapter.grammar || [{ title: 'Useful sentence pattern', rule: 'Notice the word order and repeat the example aloud.', examples: chapter.teach.slice(0, 2) }];
  const visibleVocabulary = chapter.teach.filter((phrase) => phrase.toLowerCase().includes(vocabularyQuery.toLowerCase()));
  const practiceSets = buildPracticeSets(chapter, course.name);
  const practiceQuestions = practiceSets[practiceMode];
  const practiceQuestion = practiceQuestions[practiceIndex];

  function choosePracticeMode(mode) {
    recognitionRef.current?.stop();
    setPracticeMode(mode);
    setPracticeIndex(0);
    setPracticeAnswer('');
    setPracticeSubmitted(false);
    setPracticeCorrect(false);
    setIsListening(false);
    setHeardText('');
    setMicError('');
  }

  function checkWriting() {
    const correct = practiceQuestion.accepted.includes(practiceAnswer.trim().toLowerCase());
    setPracticeCorrect(correct);
    setPracticeSubmitted(true);
    recordPracticeResult(correct);
  }

  function checkPracticeChoice(index) {
    if (practiceSubmitted) return;
    const correct = index === practiceQuestion.answer;
    setPracticeAnswer(String(index));
    setPracticeCorrect(correct);
    setPracticeSubmitted(true);
    recordPracticeResult(correct);
  }

  function startSpeakingPractice() {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      setMicError('Microphone pronunciation checking is not supported in this browser. Try Chrome or Edge.');
      return;
    }
    recognitionRef.current?.stop();
    const recognition = new Recognition();
    recognition.lang = course.name === 'German' ? 'de-DE' : 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;
    recognition.continuous = false;
    recognition.onstart = () => {
      setIsListening(true);
      setMicError('');
      setHeardText('');
    };
    recognition.onresult = (event) => {
      const alternatives = Array.from(event.results[0] || []).map((result) => result.transcript);
      const heard = alternatives[0] || '';
      const correct = alternatives.some((transcript) => speechMatches(transcript, practiceQuestion.phrase));
      setHeardText(heard);
      setPracticeCorrect(correct);
      setPracticeSubmitted(true);
      setIsListening(false);
      recordPracticeResult(correct);
    };
    recognition.onerror = (event) => {
      setIsListening(false);
      setMicError(event.error === 'not-allowed' ? 'Microphone access was blocked. Allow microphone access and try again.' : 'I could not hear that clearly. Please try again.');
    };
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch {
      setIsListening(false);
      setMicError('The microphone is busy. Please wait a moment and try again.');
    }
  }

  useEffect(() => () => recognitionRef.current?.stop(), []);

  function nextSkillQuestion() {
    recognitionRef.current?.stop();
    if (practiceIndex === practiceQuestions.length - 1) {
      setPracticeIndex(0);
    } else {
      setPracticeIndex((value) => value + 1);
    }
    setPracticeAnswer('');
    setPracticeSubmitted(false);
    setPracticeCorrect(false);
    setIsListening(false);
    setHeardText('');
    setMicError('');
  }

  const renderSkillQuestion = () => {
    if (practiceMode === 'writing') {
      return <><h2>{practiceQuestion.prompt}</h2><input className="practice-input" value={practiceAnswer} onChange={(event) => setPracticeAnswer(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && !practiceSubmitted && checkWriting()} placeholder="Type your answer..." disabled={practiceSubmitted} autoComplete="off" />{practiceSubmitted && <p className="answer-reveal">Correct answer: <strong>{practiceQuestion.target}</strong></p>}</>;
    }
    if (practiceMode === 'listening') {
      return <><h2>{practiceQuestion.prompt}</h2><button className="listen-prompt" onClick={() => speakPhrase(practiceQuestion.phrase, course.name)}>🔊 Play audio again</button><div className="choices">{practiceQuestion.choices.map((choice, index) => <button key={choice} className={`choice ${practiceAnswer === String(index) ? 'chosen' : ''} ${practiceSubmitted && index === practiceQuestion.answer ? 'correct' : ''} ${practiceSubmitted && practiceAnswer === String(index) && !practiceCorrect ? 'incorrect' : ''}`} onClick={() => checkPracticeChoice(index)}><span className="choice-letter">{String.fromCharCode(65 + index)}</span>{choice}</button>)}</div></>;
    }
    if (practiceMode === 'speaking') {
      return <><h2>{practiceQuestion.prompt}</h2><div className="speak-target"><strong>{practiceQuestion.phrase}</strong><span>{practiceQuestion.meaning}</span></div><div className="speaking-actions"><button className="listen-prompt" onClick={() => speakPhrase(practiceQuestion.phrase, course.name)}>🔊 Hear model</button><button className={`mic-button ${isListening ? 'recording' : ''}`} onClick={startSpeakingPractice} disabled={practiceSubmitted}>{isListening ? '🔴 Listening…' : '🎙 Speak into mic'}</button></div>{isListening && <div className="recording-indicator"><i /> Listening for your phrase…</div>}{heardText && <div className="heard-result">I heard: <strong>{heardText}</strong></div>}{micError && <div className="mic-error">{micError}</div>}<p className="practice-note">Allow microphone access, then say the complete phrase. Your speech is checked in the browser and is not stored.</p></>;
    }
    return <><h2>{practiceQuestion.prompt}</h2><div className="reading-passage">{practiceQuestion.passage.split('\\n').map((line) => <p key={line}>{line}</p>)}</div><div className="choices">{practiceQuestion.choices.map((choice, index) => <button key={choice} className={`choice ${practiceAnswer === String(index) ? 'chosen' : ''} ${practiceSubmitted && index === practiceQuestion.answer ? 'correct' : ''} ${practiceSubmitted && practiceAnswer === String(index) && !practiceCorrect ? 'incorrect' : ''}`} onClick={() => checkPracticeChoice(index)}><span className="choice-letter">{String.fromCharCode(65 + index)}</span>{choice}</button>)}</div></>;
  };

  return <div className="lesson-screen"><header className="lesson-screen-header"><button className="back-button" onClick={close}>← Back to course</button><div><p className="eyebrow">NETZWERK A1 · CHAPTER LESSON</p><h2>{chapter.icon} {chapter.title}</h2></div><div className="lesson-score">+20 XP</div></header><div className="lesson-screen-body"><aside className="lesson-sidebar"><div className="lesson-sidebar-title">YOUR LESSON</div><button className={tab === 'vocabulary' ? 'lesson-tab active' : 'lesson-tab'} onClick={() => setTab('vocabulary')}><span>01</span><div><strong>Learn vocabulary</strong><small>{chapter.teach.length} essential phrases</small></div>✓</button><button className={tab === 'grammar' ? 'lesson-tab active' : 'lesson-tab'} onClick={() => setTab('grammar')}><span>02</span><div><strong>Learn grammar</strong><small>{grammar.length} simple patterns</small></div>✓</button><button className={tab === 'practice' ? 'lesson-tab active' : 'lesson-tab'} onClick={() => setTab('practice')}><span>03</span><div><strong>Practice</strong><small>{practiceSets.writing.length + practiceSets.listening.length + practiceSets.speaking.length + practiceSets.reading.length} questions across 4 skills</small></div>→</button><div className="lesson-reminder">💡 Learn first, retrieve second. That is how phrases become automatic.</div></aside><section className="lesson-stage">{tab === 'vocabulary' && <><p className="eyebrow">STAGE 1 · BUILD YOUR WORD BANK</p><h1>Learn the useful phrases.</h1><p className="stage-lead">Listen, read, and say each phrase before moving on.</p><div className="vocabulary-toolbar"><strong>{chapter.teach.length} glossary entries</strong><input value={vocabularyQuery} onChange={(event) => setVocabularyQuery(event.target.value)} placeholder="Search German or English..." aria-label="Search vocabulary" /></div><div className="phrase-grid">{visibleVocabulary.map((phrase) => { const [german, english] = phrase.split(' — '); return <article className="phrase-card" key={phrase}><div className="vocabulary-visual" aria-hidden="true">{vocabularyEmoji(phrase)}</div><div className="phrase-copy"><strong>{german}</strong><span>{english}</span></div><button onClick={() => speakPhrase(german, course.name)}>🔊 Listen</button></article>; })}</div><div className="stage-tip">Say each phrase twice. The goal is not to memorize a list — it is to recognize and use the phrase in a real conversation.</div><button className="primary-button stage-button" onClick={() => setTab('grammar')}>I know these · Learn grammar <span>→</span></button></>}{tab === 'grammar' && <><p className="eyebrow">STAGE 2 · NOTICE THE PATTERN</p><h1>Grammar you can use today.</h1><p className="stage-lead">Small patterns unlock many new sentences. Read the rule, then say the examples aloud.</p><div className="grammar-grid">{grammar.map((item) => <article className="grammar-card" key={item.title}><span className="grammar-label">PATTERN</span><h3>{item.title}</h3><p>{item.rule}</p>{item.examples.map((example) => <div className="grammar-example" key={example}><span>{example}</span><button onClick={() => speakPhrase(example.split(' — ')[0], course.name)}>🔊</button></div>)}</article>)}</div><div className="stage-tip">If you can explain the pattern in your own words, you are ready to practise it.</div><button className="primary-button stage-button" onClick={() => setTab('practice')}>I understand · Start practice <span>→</span></button></>}{tab === 'practice' && <><p className="eyebrow">STAGE 3 · RETRIEVE FROM MEMORY</p><h1>Practice every skill.</h1><p className="stage-lead">Every glossary entry and grammar pattern is practised through writing, listening, speaking, and reading.</p><div className="practice-modes">{[['writing', '✍️', 'Writing'], ['listening', '🎧', 'Listening'], ['speaking', '🗣️', 'Speaking'], ['reading', '📖', 'Reading']].map(([mode, icon, label]) => <button key={mode} className={practiceMode === mode ? 'practice-mode active' : 'practice-mode'} onClick={() => choosePracticeMode(mode)}><span>{icon}</span>{label}<small>{practiceSets[mode].length} questions</small></button>)}</div><div className="practice-box"><div className="exercise-mascot">{practiceMode === 'writing' ? '✍️' : practiceMode === 'listening' ? '🎧' : practiceMode === 'speaking' ? '🗣️' : '📖'}</div><p className="eyebrow">{practiceMode.toUpperCase()} PRACTICE · {practiceIndex + 1}/{practiceQuestions.length}</p>{renderSkillQuestion()}{practiceSubmitted && <div className={`feedback ${practiceCorrect ? 'feedback-good' : 'feedback-try'}`}><strong>{practiceCorrect ? 'Nice work! Keep going. ✨' : 'Good try — use the correction and try again.'}</strong><span>{practiceCorrect ? 'Your answer matched the target.' : `The answer is ${practiceMode === 'writing' ? practiceQuestion.target : practiceQuestion.choices?.[practiceQuestion.answer] || practiceQuestion.phrase}.`}</span></div>}{!practiceSubmitted && practiceMode === 'writing' && <button className="primary-button stage-button" disabled={!practiceAnswer.trim()} onClick={checkWriting}>Check writing <span>→</span></button>}{practiceSubmitted && <button className="primary-button stage-button" onClick={nextSkillQuestion}>{practiceIndex === practiceQuestions.length - 1 ? 'Practise again' : 'Next question'} <span>→</span></button>}</div></>}</section></div></div>;
}

createRoot(document.getElementById('root')).render(<App />);
