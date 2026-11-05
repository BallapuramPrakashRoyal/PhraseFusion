import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const germanChapters = [
  { title: 'Guten Tag!', subtitle: 'Greetings & introductions', icon: '👋', teach: ['Hallo! — Hello!', 'Guten Morgen! — Good morning!', 'Wie heißen Sie? — What is your name?'], prompt: 'Choose the friendly German greeting:', choices: ['Guten Tag!', 'Gute Zahl!', 'Danke Haus!', 'Bis gestern!'], answer: 0, hint: 'Use Guten Tag! during the day.', translation: 'Guten Tag!' },
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

function App() {
  const [language, setLanguage] = useState(localStorage.getItem('phrasefusion-language') || 'german');
  const [view, setView] = useState('learn');
  const [courseData, setCourseData] = useState(courses);
  const [showLesson, setShowLesson] = useState(false);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [activeExercises, setActiveExercises] = useState(null);
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
    const lesson = exercises || [{ ...course.chapters[1], type: 'choice' }];
    setActiveExercises(lesson); setExerciseIndex(0); setSelected(null); setSubmitted(false); setShowLesson(true);
  }

  function submitAnswer() {
    if (selected === null) return;
    setSubmitted(true);
    if (isCorrect) { setXp((value) => value + 20); setMastered((value) => value + 1); }
    const apiUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
    fetch(`${apiUrl}/api/progress`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ language, correct: isCorrect }) }).catch(() => setApiStatus('offline'));
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

      {showLesson && <LessonModal course={{ ...course, exercises: lessonExercises }} exercise={exercise} exerciseIndex={exerciseIndex} selected={selected} submitted={submitted} isCorrect={isCorrect} setSelected={setSelected} submitAnswer={submitAnswer} nextExercise={nextExercise} close={() => { setShowLesson(false); setActiveExercises(null); }} />}
    </div>
  );
}

function LearnView({ course, todayLabel, xp, mastered, onStart, onChapter }) {
  return <div className="content"><section className="welcome-row"><div><p className="eyebrow">{todayLabel.toUpperCase()} · READY WHEN YOU ARE</p><h1>{course.greeting} <span>✦</span></h1><p className="subtitle">A little practice today makes a confident speaker tomorrow.</p></div><div className="daily-goal"><div className="goal-ring"><b>3</b><span>/ 5</span></div><div><strong>Daily goal</strong><small>lessons completed</small></div><button>›</button></div></section>
    <section className="hero-panel"><div className="hero-copy"><div className="unit-kicker"><span className="unit-pill">UNIT 02</span><span>EVERYDAY CONVERSATIONS</span></div><h2>{course.name === 'German' ? <>Small words.<br /><em>Big confidence.</em></> : <>Find your voice.<br /><em>One phrase at a time.</em></>}</h2><p>Build a strong foundation with short, useful lessons inspired by your textbook path — then make every phrase your own.</p><button className="primary-button" onClick={onStart}>Continue lesson <span>→</span></button><div className="lesson-meta"><span>◷ 8 min</span><span>◉ +20 XP</span><span>◌ 4 exercises</span></div></div><div className="hero-art"><div className="sun" /><div className="cloud cloud-one" /><div className="cloud cloud-two" /><div className="hill hill-back" /><div className="hill hill-front" /><div className="speech-bubble bubble-one">Hallo!</div><div className="speech-bubble bubble-two">Let's go ✦</div><div className="character"><div className="character-hair" /><div className="character-face"><span className="eye left" /><span className="eye right" /><span className="smile" /></div><div className="character-body" /><div className="book">A</div></div></div></section>
    <section className="stats-strip"><div><strong>{xp}</strong><span>Total XP</span></div><div><strong>7</strong><span>Day streak</span></div><div><strong>{mastered}</strong><span>Words reviewed</span></div><div><strong>4.8</strong><span>Weekly accuracy</span></div></section>
    <section className="section-heading"><div><p className="eyebrow">NETZWERK A1 COURSE MAP</p><h2>Learn in the order that makes sense.</h2></div><span className="course-note">12 chapters · teach + practise</span></section><section className="lesson-grid chapter-grid">{course.chapters.map((chapter, index) => <button className={`lesson-card chapter-card ${index > 1 ? 'locked' : ''}`} onClick={() => onChapter(chapter)} key={chapter.title}><div className="lesson-number">0{index + 1}</div><div className={`lesson-icon ${index === 1 ? 'active-icon' : ''}`}>{chapter.icon}</div><div className="lesson-info"><h3>{chapter.title}</h3><p>{chapter.subtitle}</p><small>◷ 8 min · {chapter.teach.length} key phrases</small></div>{index === 0 ? <div className="done-mark">✓</div> : <div className="play-mark">→</div>}</button>)}</section>
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

function LessonModal({ course, exercise, exerciseIndex, selected, submitted, isCorrect, setSelected, submitAnswer, nextExercise, close }) {
  const [phase, setPhase] = useState(exercise.teach ? 'teach' : 'practice');
  return <div className="modal-backdrop" onClick={close}><section className="lesson-modal" onClick={(event) => event.stopPropagation()}><button className="close-button" onClick={close}>×</button><div className="modal-progress"><span style={{ width: phase === 'teach' ? '25%' : `${((exerciseIndex + (submitted ? 1 : 0)) / course.exercises.length) * 100}%` }} /></div>
    {phase === 'teach' ? <><p className="eyebrow">UNIT 02 · LEARN THE PHRASES</p><div className="exercise-mascot">📚</div><h2>{exercise.title}</h2><p className="exercise-subtitle">First understand the building blocks. Then retrieve them from memory.</p><div className="teaching-list">{exercise.teach.map((phrase) => { const [german, english] = phrase.split(' — '); return <div className="teaching-card" key={phrase}><strong>{german}</strong><span>{english}</span><button aria-label={`Hear ${german}`} onClick={() => window.speechSynthesis?.speak(new SpeechSynthesisUtterance(german))}>🔊</button></div>; })}</div><div className="teach-tip">💡 Read each phrase aloud twice. Speaking and recalling together creates a stronger memory.</div><button className="primary-button modal-submit" onClick={() => setPhase('practice')}>Start practice <span>→</span></button></> : <><p className="eyebrow">UNIT 02 · EXERCISE {exerciseIndex + 1} OF {course.exercises.length}</p><div className="exercise-mascot">{exercise.type === 'translate' ? '🧩' : '🤔'}</div><h2>{exercise.prompt}</h2><p className="exercise-subtitle">Pick the best answer. No pressure — mistakes are how we learn.</p><div className="choices">{exercise.choices.map((choice, index) => <button key={choice} className={`choice ${selected === index ? 'chosen' : ''} ${submitted && index === exercise.answer ? 'correct' : ''} ${submitted && selected === index && !isCorrect ? 'incorrect' : ''}`} onClick={() => !submitted && setSelected(index)}><span className="choice-letter">{String.fromCharCode(65 + index)}</span>{choice}{submitted && index === exercise.answer && <span className="choice-status">✓</span>}</button>)}</div>{submitted && <div className={`feedback ${isCorrect ? 'feedback-good' : 'feedback-try'}`}><strong>{isCorrect ? 'Brilliant! That’s the one. ✨' : 'Good try — let’s make it stick.'}</strong><span>{isCorrect ? exercise.translation : exercise.hint}</span></div>}{!submitted ? <button className="primary-button modal-submit" disabled={selected === null} onClick={submitAnswer}>Check answer <span>→</span></button> : <button className="primary-button modal-submit" onClick={nextExercise}>{exerciseIndex === course.exercises.length - 1 ? 'Finish lesson' : 'Next exercise'} <span>→</span></button>}</>}
  </section></div>;
}

createRoot(document.getElementById('root')).render(<App />);
