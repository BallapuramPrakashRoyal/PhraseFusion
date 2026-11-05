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
  { title: 'Freunde, Kollegen und ich', subtitle: 'People, hobbies & jobs', icon: '🧑‍🤝‍🧑', teach: ['der Freund / die Freundin — friend', 'das Hobby — hobby', 'Was machst du gern? — What do you like doing?'], prompt: 'What does “das Hobby” mean?', choices: ['occupation', 'hobby', 'week', 'address'], answer: 1, hint: 'A Hobby is something you enjoy doing.', translation: 'hobby' },
  { title: 'In der Stadt', subtitle: 'Places & directions', icon: '🗺️', teach: ['der Bahnhof — train station', 'links / rechts — left / right', 'geradeaus — straight ahead'], prompt: 'You want someone to continue straight. What do you say?', choices: ['geradeaus', 'Gute Nacht', 'bis bald', 'schön'], answer: 0, hint: 'geradeaus means straight ahead.', translation: 'geradeaus' },
  { title: 'Guten Appetit!', subtitle: 'Food & shopping', icon: '🥨', teach: ['das Brot — bread', 'die Banane — banana', 'Ich möchte ... — I would like ...'], prompt: 'Complete: “Ich möchte ___, bitte.”', choices: ['ein Brötchen', 'links', 'Montag', 'krank'], answer: 0, hint: 'A Brötchen is a bread roll you can order.', translation: 'Ich möchte ein Brötchen, bitte.' },
  { title: 'Tag für Tag', subtitle: 'Daily routines & time', icon: '⏰', teach: ['aufstehen — to get up', 'der Arbeitstag — workday', 'um acht Uhr — at eight o’clock'], prompt: 'What does “aufstehen” mean?', choices: ['to get up', 'to pay', 'to travel', 'to fit'], answer: 0, hint: 'It describes starting your day by getting up.', translation: 'to get up' },
  { title: 'Zeit mit Freunden', subtitle: 'Plans & free time', icon: '🎉', teach: ['die Überraschung — surprise', 'bezahlen — to pay', 'Was machen wir? — What are we doing?'], prompt: 'Choose the phrase for “What are we doing?”', choices: ['Was machen wir?', 'Woher kommst du?', 'Wie heißen Sie?', 'Was kostet das?'], answer: 0, hint: 'machen means to do or make.', translation: 'Was machen wir?' },
  { title: 'Kontakte', subtitle: 'Phone, messages & appointments', icon: '📱', teach: ['die Telefonnummer — phone number', 'die Nachricht — message', 'anrufen — to call'], prompt: 'Which word means “phone number”?', choices: ['die Telefonnummer', 'die Jahreszeit', 'der Bahnhof', 'das Wetter'], answer: 0, hint: 'Telefon + Nummer gives the meaning.', translation: 'die Telefonnummer' },
  { title: 'Meine Wohnung', subtitle: 'Home & rooms', icon: '🏠', teach: ['die Wohnung — apartment', 'das Zimmer — room', 'der Tisch — table'], prompt: 'Where do you sleep?', choices: ['im Schlafzimmer', 'im Bahnhof', 'im Restaurant', 'im Flughafen'], answer: 0, hint: 'The bedroom is das Schlafzimmer.', translation: 'im Schlafzimmer' },
  { title: 'Alles Arbeit?', subtitle: 'Work & occupations', icon: '💼', teach: ['der Beruf — occupation', 'arbeiten — to work', 'die Firma — company'], prompt: 'Complete: “Was sind Sie von ___?”', choices: ['Beruf', 'Hobby', 'Stadt', 'Uhr'], answer: 0, hint: 'This polite question asks about someone’s occupation.', translation: 'Was sind Sie von Beruf?' },
  { title: 'Kleidung und Mode', subtitle: 'Clothes, colors & shopping', icon: '👕', teach: ['das Kleid — dress', 'passen — to fit', 'zweimal — twice'], prompt: 'What does “passen” mean in “Der Rock passt mir”?', choices: ['to fit', 'to cook', 'to hear', 'to learn'], answer: 0, hint: 'The sentence talks about whether clothing fits.', translation: 'to fit' },
  { title: 'Gesund und munter', subtitle: 'Body & wellbeing', icon: '💚', teach: ['die Gesundheit — health', 'die Bauchschmerzen — stomach pain', 'schlafen — to sleep'], prompt: 'Choose the useful advice for someone who is tired:', choices: ['Du sollst schlafen.', 'Du sollst kaufen.', 'Du sollst tanzen.', 'Du sollst fahren.'], answer: 0, hint: 'schlafen means to sleep.', translation: 'You should sleep.' },
  { title: 'Ab in den Urlaub!', subtitle: 'Travel & holidays', icon: '✈️', teach: ['die Städtereise — city trip', 'der Koffer — suitcase', 'aufschreiben — to write down'], prompt: 'What is “die Städtereise”?', choices: ['city trip', 'workday', 'bread roll', 'phone call'], answer: 0, hint: 'Stadt means city and Reise means trip.', translation: 'city trip' },
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

function App() {
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
    const apiUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
    fetch(`${apiUrl}/api/progress`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ language, correct }) }).catch(() => setApiStatus('offline'));
  }

  function nextExercise() {
    if (exerciseIndex === lessonExercises.length - 1) { setShowLesson(false); setActiveExercises(null); return; }
    setExerciseIndex((value) => value + 1); setSelected(null); setSubmitted(false);
  }

  return (
    <div className={`app ${course.accent}`}>
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">P</span><span>Phrase<span>Fusion</span></span></div>
        <div className="sidebar-label">YOUR SPACE</div>
        <nav className="nav">
          <button className={`nav-item ${view === 'learn' ? 'active' : ''}`} onClick={() => setView('learn')}><Icon>⌂</Icon> Learn <span className="nav-dot" /></button>
          <button className={`nav-item ${view === 'practice' ? 'active' : ''}`} onClick={() => setView('practice')}><Icon>◈</Icon> Practice</button>
          <button className={`nav-item ${view === 'review' ? 'active' : ''}`} onClick={() => setView('review')}><Icon>▣</Icon> Review words <span className="nav-count">{course.words.length}</span></button>
          <button className={`nav-item ${view === 'community' ? 'active' : ''}`} onClick={() => setView('community')}><Icon>♧</Icon> Community</button>
        </nav>
        <div className="sidebar-label courses-label">YOUR COURSES</div>
        <div className="course-switcher">
          {Object.entries(courseData).map(([key, item]) => <button key={key} className={`mini-course ${language === key ? 'selected' : ''}`} onClick={() => chooseLanguage(key)}><span className="course-flag">{item.flag}</span><span>{item.name}</span><span className="mini-arrow">›</span></button>)}
          <button className="add-course" onClick={() => setView('settings')}><span>＋</span> Add a language</button>
        </div>
        <div className="sidebar-bottom">
          <div className="streak-card"><div className="fire">♨</div><div><strong>7 day streak</strong><small>Keep the rhythm going!</small></div></div>
          <button className={`nav-item settings ${view === 'settings' ? 'active' : ''}`} onClick={() => setView('settings')}><Icon>⚙</Icon> Settings</button>
          <div className="profile"><div className="avatar">PR</div><div><strong>Prakash</strong><small>Explorer · {xp} XP</small></div><span className="more">•••</span></div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar"><div className="breadcrumb"><span>My learning</span><b>/</b><strong>{course.name}</strong><span className={`api-status ${apiStatus}`}>{apiStatus === 'connected' ? '● Live' : apiStatus === 'offline' ? '● Demo mode' : '○ Connecting'}</span></div><div className="top-actions"><button className="icon-button">?</button><button className="icon-button">⌕</button><button className="notification">♢<i /></button></div></header>
        {view === 'learn' && <LearnView course={course} todayLabel={todayLabel} xp={xp} mastered={mastered} onStart={() => openLesson()} onChapter={(chapter) => openLesson([{ ...chapter, type: 'choice' }])} />}
        {view === 'practice' && <PracticeView course={course} onStart={openLesson} />}
        {view === 'review' && <ReviewView course={course} reviewed={reviewed} setReviewed={setReviewed} />}
        {view === 'community' && <CommunityView />}
        {view === 'settings' && <SettingsView language={language} chooseLanguage={chooseLanguage} apiStatus={apiStatus} />}
      </main>

      {showLesson && <LessonWorkspace chapter={activeLesson} course={{ ...course, exercises: lessonExercises }} exercise={exercise} exerciseIndex={exerciseIndex} selected={selected} submitted={submitted} isCorrect={isCorrect} setSelected={setSelected} submitAnswer={submitAnswer} recordPracticeResult={recordPracticeResult} nextExercise={nextExercise} close={() => { setShowLesson(false); setActiveExercises(null); setActiveLesson(null); }} />}
    </div>
  );
}

function LearnView({ course, todayLabel, xp, mastered, onStart, onChapter }) {
  return <div className="content"><section className="welcome-row"><div><p className="eyebrow">{todayLabel.toUpperCase()} · READY WHEN YOU ARE</p><h1>{course.greeting} <span>✦</span></h1><p className="subtitle">A little practice today makes a confident speaker tomorrow.</p></div><div className="daily-goal"><div className="goal-ring"><b>3</b><span>/ 5</span></div><div><strong>Daily goal</strong><small>lessons completed</small></div><button>›</button></div></section>
    <section className="hero-panel"><div className="hero-copy"><div className="unit-kicker"><span className="unit-pill">UNIT 01</span><span>NETZWERK A1 · GUTEN TAG!</span></div><h2>{course.name === 'German' ? <>Deutsch macht<br /><em>Spaß.</em></> : <>Find your voice.<br /><em>One phrase at a time.</em></>}</h2><p>Learn useful words, notice the grammar, then practise through writing, listening, speaking, and reading.</p><button className="primary-button" onClick={onStart}>Start lesson <span>→</span></button><div className="lesson-meta"><span>◷ 12 min</span><span>◉ +20 XP</span><span>◌ 4 skill modes</span></div></div><div className="hero-art"><div className="floating-word word-one">Hallo!</div><div className="floating-word word-two">Danke ✦</div><div className="floating-word word-three">Los geht's!</div><div className="cube-stage"><div className="language-cube"><b className="cube-front">Hallo</b><b className="cube-right">Danke</b><b className="cube-back">Bitte</b><b className="cube-left">Tschüs</b><b className="cube-top">Ja</b><b className="cube-bottom">Nein</b></div></div><div className="hero-spark spark-one">✦</div><div className="hero-spark spark-two">✧</div></div></section>
    <section className="stats-strip"><div><strong>{xp}</strong><span>Total XP</span></div><div><strong>7</strong><span>Day streak</span></div><div><strong>{mastered}</strong><span>Words reviewed</span></div><div><strong>4.8</strong><span>Weekly accuracy</span></div></section>
    <section className="section-heading"><div><p className="eyebrow">NETZWERK A1 COURSE MAP</p><h2>Follow your learning path.</h2></div><span className="course-note">12 units · learn + practise</span></section><section className="unit-path">{course.chapters.map((chapter, index) => <div className={`path-unit ${index > 1 ? 'locked' : ''}`} key={chapter.title}><div className="unit-banner" style={{ '--unit-color': ['#202024', '#d90000', '#f0b900', '#7b1fa2'][index % 4] }}><small>UNIT {String(index + 1).padStart(2, '0')}</small><strong>{chapter.title}</strong><span>{chapter.subtitle}</span></div><button className="path-node" onClick={() => onChapter(chapter)} disabled={index > 1}>{index > 1 ? '🔒' : chapter.icon}</button><div className="path-label">{index === 0 ? 'START HERE' : index === 1 ? 'NEXT UP' : `${chapter.teach.length} words`}</div><div className="path-stars">{index === 0 ? '★★★' : index === 1 ? '★☆☆' : '☆☆☆'}</div></div>)}</section>
    <section className="bottom-grid"><div className="tip-card"><div className="tip-icon">♧</div><div><p className="eyebrow">COACH'S NOTE</p><h3>Say it out loud.</h3><p>Your brain remembers phrases better when it hears your own voice. Try the next answer like you’re chatting with a friend.</p></div><span className="tip-spark">✦</span></div><div className="progress-card"><div className="progress-head"><div><p className="eyebrow">UNIT PROGRESS</p><h3>Getting comfortable</h3></div><strong>{course.progress}%</strong></div><div className="progress-bar"><span style={{ width: `${course.progress}%` }} /></div><div className="progress-foot"><span>✦ Keep building your base</span><span>Unit 2 of 6</span></div></div></section>
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

function SettingsView({ language, chooseLanguage, apiStatus }) {
  return <div className="content inner-page"><p className="eyebrow">YOUR PREFERENCES</p><h1>Make PhraseFusion yours.</h1><p className="page-lead">Choose a comfortable pace. Effective learning is consistent, not exhausting.</p><div className="settings-list"><label><span>Learning language</span><select value={language} onChange={(event) => chooseLanguage(event.target.value)}><option value="german">German 🇩🇪</option><option value="english">English 🇬🇧</option></select></label><label><span>Daily goal</span><select defaultValue="5"><option value="5">5 minutes · Gentle</option><option value="10">10 minutes · Steady</option><option value="20">20 minutes · Focused</option></select></label><label><span>Backend connection</span><strong className={apiStatus}>{apiStatus === 'connected' ? 'Connected and syncing' : 'Using local demo data'}</strong></label><label><span>Learning approach</span><strong>Retrieval + spaced repetition</strong></label></div></div>;
}

function buildPracticeSets(chapter, language) {
  const first = chapter.teach[0] || (language === 'German' ? 'Hallo! — Hello!' : 'Hello! — Hallo!');
  const [target, meaning] = first.split(' — ');
  const isGerman = language === 'German';
  const languageName = isGerman ? 'German' : 'English';
  return {
    writing: [
      { prompt: `Write “${meaning || 'hello'}” in ${languageName}.`, target, accepted: [target.toLowerCase()] },
      { prompt: `Write the ${languageName} word for “${meaning || 'hello'}”.`, target, accepted: [target.toLowerCase()] },
    ],
    listening: [
      { prompt: 'Listen carefully. Which meaning did you hear?', phrase: target, choices: [meaning, 'Good night', 'Thank you', 'Where?'], answer: 0 },
      { prompt: 'Listen and choose the phrase you heard.', phrase: target, choices: [target, chapter.teach[1]?.split(' — ')[0] || target, 'Gute Nacht!', 'Danke!'], answer: 0 },
    ],
    speaking: [
      { prompt: `Say this ${languageName} phrase aloud, then check yourself:`, phrase: target, meaning },
      { prompt: `Read this phrase naturally in ${languageName}:`, phrase: chapter.teach[1]?.split(' — ')[0] || target, meaning: chapter.teach[1]?.split(' — ')[1] || meaning },
    ],
    reading: [
      { prompt: 'Read the mini-dialogue and choose the best meaning.', passage: `${target} — ${meaning}.`, choices: [meaning, 'See you tomorrow', 'I do not understand', 'What is your name?'], answer: 0 },
      { prompt: 'Read the sentence and choose the matching translation.', passage: `A: ${target}\\nB: ${target}`, choices: [meaning, 'Good evening', 'Where do you live?', 'My name is Anna'], answer: 0 },
    ],
  };
}

function LessonWorkspace({ chapter, course, exercise, exerciseIndex, selected, submitted, isCorrect, setSelected, submitAnswer, recordPracticeResult, nextExercise, close }) {
  const [tab, setTab] = useState('vocabulary');
  const [practiceMode, setPracticeMode] = useState('writing');
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceAnswer, setPracticeAnswer] = useState('');
  const [practiceSubmitted, setPracticeSubmitted] = useState(false);
  const [practiceCorrect, setPracticeCorrect] = useState(false);
  const [vocabularyQuery, setVocabularyQuery] = useState('');
  const grammar = chapter.grammar || [{ title: 'Useful sentence pattern', rule: 'Notice the word order and repeat the example aloud.', examples: chapter.teach.slice(0, 2) }];
  const visibleVocabulary = chapter.teach.filter((phrase) => phrase.toLowerCase().includes(vocabularyQuery.toLowerCase()));
  const practiceSets = buildPracticeSets(chapter, course.name);
  const practiceQuestions = practiceSets[practiceMode];
  const practiceQuestion = practiceQuestions[practiceIndex];

  function choosePracticeMode(mode) {
    setPracticeMode(mode);
    setPracticeIndex(0);
    setPracticeAnswer('');
    setPracticeSubmitted(false);
    setPracticeCorrect(false);
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

  function completeSpeaking() {
    setPracticeCorrect(true);
    setPracticeSubmitted(true);
    recordPracticeResult(true);
  }

  function nextSkillQuestion() {
    if (practiceIndex === practiceQuestions.length - 1) {
      setPracticeIndex(0);
    } else {
      setPracticeIndex((value) => value + 1);
    }
    setPracticeAnswer('');
    setPracticeSubmitted(false);
    setPracticeCorrect(false);
  }

  const renderSkillQuestion = () => {
    if (practiceMode === 'writing') {
      return <><h2>{practiceQuestion.prompt}</h2><input className="practice-input" value={practiceAnswer} onChange={(event) => setPracticeAnswer(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && !practiceSubmitted && checkWriting()} placeholder="Type your answer..." disabled={practiceSubmitted} autoComplete="off" />{practiceSubmitted && <p className="answer-reveal">Correct answer: <strong>{practiceQuestion.target}</strong></p>}</>;
    }
    if (practiceMode === 'listening') {
      return <><h2>{practiceQuestion.prompt}</h2><button className="listen-prompt" onClick={() => speakPhrase(practiceQuestion.phrase, course.name)}>🔊 Play audio again</button><div className="choices">{practiceQuestion.choices.map((choice, index) => <button key={choice} className={`choice ${practiceAnswer === String(index) ? 'chosen' : ''} ${practiceSubmitted && index === practiceQuestion.answer ? 'correct' : ''} ${practiceSubmitted && practiceAnswer === String(index) && !practiceCorrect ? 'incorrect' : ''}`} onClick={() => checkPracticeChoice(index)}><span className="choice-letter">{String.fromCharCode(65 + index)}</span>{choice}</button>)}</div></>;
    }
    if (practiceMode === 'speaking') {
      return <><h2>{practiceQuestion.prompt}</h2><div className="speak-target"><strong>{practiceQuestion.phrase}</strong><span>{practiceQuestion.meaning}</span></div><div className="speaking-actions"><button className="listen-prompt" onClick={() => speakPhrase(practiceQuestion.phrase, course.name)}>🔊 Hear model</button><button className="secondary-button" onClick={completeSpeaking} disabled={practiceSubmitted}>🎙 I said it clearly</button></div><p className="practice-note">There is no pressure to be perfect. Compare your pronunciation with the model and try again.</p></>;
    }
    return <><h2>{practiceQuestion.prompt}</h2><div className="reading-passage">{practiceQuestion.passage.split('\\n').map((line) => <p key={line}>{line}</p>)}</div><div className="choices">{practiceQuestion.choices.map((choice, index) => <button key={choice} className={`choice ${practiceAnswer === String(index) ? 'chosen' : ''} ${practiceSubmitted && index === practiceQuestion.answer ? 'correct' : ''} ${practiceSubmitted && practiceAnswer === String(index) && !practiceCorrect ? 'incorrect' : ''}`} onClick={() => checkPracticeChoice(index)}><span className="choice-letter">{String.fromCharCode(65 + index)}</span>{choice}</button>)}</div></>;
  };

  return <div className="lesson-screen"><header className="lesson-screen-header"><button className="back-button" onClick={close}>← Back to course</button><div><p className="eyebrow">NETZWERK A1 · CHAPTER LESSON</p><h2>{chapter.icon} {chapter.title}</h2></div><div className="lesson-score">+20 XP</div></header><div className="lesson-screen-body"><aside className="lesson-sidebar"><div className="lesson-sidebar-title">YOUR LESSON</div><button className={tab === 'vocabulary' ? 'lesson-tab active' : 'lesson-tab'} onClick={() => setTab('vocabulary')}><span>01</span><div><strong>Learn vocabulary</strong><small>{chapter.teach.length} essential phrases</small></div>✓</button><button className={tab === 'grammar' ? 'lesson-tab active' : 'lesson-tab'} onClick={() => setTab('grammar')}><span>02</span><div><strong>Learn grammar</strong><small>{grammar.length} simple patterns</small></div>✓</button><button className={tab === 'practice' ? 'lesson-tab active' : 'lesson-tab'} onClick={() => setTab('practice')}><span>03</span><div><strong>Practice</strong><small>Four skill workouts</small></div>→</button><div className="lesson-reminder">💡 Learn first, retrieve second. That is how phrases become automatic.</div></aside><section className="lesson-stage">{tab === 'vocabulary' && <><p className="eyebrow">STAGE 1 · BUILD YOUR WORD BANK</p><h1>Learn the useful phrases.</h1><p className="stage-lead">Listen, read, and say each phrase before moving on.</p><div className="vocabulary-toolbar"><strong>{chapter.teach.length} glossary entries</strong><input value={vocabularyQuery} onChange={(event) => setVocabularyQuery(event.target.value)} placeholder="Search German or English..." aria-label="Search vocabulary" /></div><div className="phrase-grid">{visibleVocabulary.map((phrase) => { const [german, english] = phrase.split(' — '); return <article className="phrase-card" key={phrase}><div><strong>{german}</strong><span>{english}</span></div><button onClick={() => speakPhrase(german, course.name)}>🔊 Listen</button></article>; })}</div><div className="stage-tip">Say each phrase twice. The goal is not to memorize a list — it is to recognize and use the phrase in a real conversation.</div><button className="primary-button stage-button" onClick={() => setTab('grammar')}>I know these · Learn grammar <span>→</span></button></>}{tab === 'grammar' && <><p className="eyebrow">STAGE 2 · NOTICE THE PATTERN</p><h1>Grammar you can use today.</h1><p className="stage-lead">Small patterns unlock many new sentences. Read the rule, then say the examples aloud.</p><div className="grammar-grid">{grammar.map((item) => <article className="grammar-card" key={item.title}><span className="grammar-label">PATTERN</span><h3>{item.title}</h3><p>{item.rule}</p>{item.examples.map((example) => <div className="grammar-example" key={example}><span>{example}</span><button onClick={() => speakPhrase(example.split(' — ')[0], course.name)}>🔊</button></div>)}</article>)}</div><div className="stage-tip">If you can explain the pattern in your own words, you are ready to practise it.</div><button className="primary-button stage-button" onClick={() => setTab('practice')}>I understand · Start practice <span>→</span></button></>}{tab === 'practice' && <><p className="eyebrow">STAGE 3 · RETRIEVE FROM MEMORY</p><h1>Practice every skill.</h1><p className="stage-lead">Train writing, listening, speaking, and reading so you can use the language in real life.</p><div className="practice-modes">{[['writing', '✍️', 'Writing'], ['listening', '🎧', 'Listening'], ['speaking', '🗣️', 'Speaking'], ['reading', '📖', 'Reading']].map(([mode, icon, label]) => <button key={mode} className={practiceMode === mode ? 'practice-mode active' : 'practice-mode'} onClick={() => choosePracticeMode(mode)}><span>{icon}</span>{label}</button>)}</div><div className="practice-box"><div className="exercise-mascot">{practiceMode === 'writing' ? '✍️' : practiceMode === 'listening' ? '🎧' : practiceMode === 'speaking' ? '🗣️' : '📖'}</div><p className="eyebrow">{practiceMode.toUpperCase()} PRACTICE · {practiceIndex + 1}/{practiceQuestions.length}</p>{renderSkillQuestion()}{practiceSubmitted && <div className={`feedback ${practiceCorrect ? 'feedback-good' : 'feedback-try'}`}><strong>{practiceCorrect ? 'Nice work! Keep going. ✨' : 'Good try — use the correction and try again.'}</strong><span>{practiceCorrect ? 'Your answer matched the target.' : `The answer is ${practiceMode === 'writing' ? practiceQuestion.target : practiceQuestion.choices?.[practiceQuestion.answer] || practiceQuestion.phrase}.`}</span></div>}{!practiceSubmitted && practiceMode === 'writing' && <button className="primary-button stage-button" disabled={!practiceAnswer.trim()} onClick={checkWriting}>Check writing <span>→</span></button>}{practiceSubmitted && <button className="primary-button stage-button" onClick={nextSkillQuestion}>{practiceIndex === practiceQuestions.length - 1 ? 'Practise again' : 'Next question'} <span>→</span></button>}</div><div className="practice-box classic-practice"><p className="eyebrow">MIXED RECALL</p><h2>{exercise.prompt}</h2><div className="choices">{exercise.choices.map((choice, index) => <button key={choice} className={`choice ${selected === index ? 'chosen' : ''} ${submitted && index === exercise.answer ? 'correct' : ''} ${submitted && selected === index && !isCorrect ? 'incorrect' : ''}`} onClick={() => !submitted && setSelected(index)}><span className="choice-letter">{String.fromCharCode(65 + index)}</span>{choice}{submitted && index === exercise.answer && <span className="choice-status">✓</span>}</button>)}</div>{submitted && <div className={`feedback ${isCorrect ? 'feedback-good' : 'feedback-try'}`}><strong>{isCorrect ? 'Brilliant! That’s the one. ✨' : 'Good try — let’s make it stick.'}</strong><span>{isCorrect ? exercise.translation : exercise.hint}</span></div>}{!submitted ? <button className="primary-button stage-button" disabled={selected === null} onClick={submitAnswer}>Check mixed recall <span>→</span></button> : <button className="primary-button stage-button" onClick={nextExercise}>{exerciseIndex === course.exercises.length - 1 ? 'Finish lesson' : 'Next mixed question'} <span>→</span></button>}</div></>}</section></div></div>;
}

createRoot(document.getElementById('root')).render(<App />);
