import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const courses = {
  german: {
    name: 'German',
    short: 'DE',
    flag: '🇩🇪',
    accent: 'plum',
    greeting: 'Guten Morgen!',
    level: 'A1 · Beginner',
    progress: 34,
    lessons: [
      { title: 'Hallo, ich bin...', subtitle: 'Introductions & greetings', icon: '👋', done: true, minutes: '6 min' },
      { title: 'Zahlen & Alter', subtitle: 'Numbers and age', icon: '🔢', active: true, minutes: '8 min' },
      { title: 'Meine Familie', subtitle: 'Family & people', icon: '🏡', locked: true, minutes: '7 min' },
      { title: 'Im Café', subtitle: 'Order with confidence', icon: '🥨', locked: true, minutes: '9 min' },
    ],
    question: {
      prompt: 'How do you say “I am 24 years old” in German?',
      choices: ['Ich habe 24 Jahre.', 'Ich bin 24 Jahre alt.', 'Ich ist vierundzwanzig.', 'Ich heiße 24.'],
      answer: 1,
      hint: 'German uses “sein” (to be) when talking about age.',
      translation: 'Ich bin 24 Jahre alt.',
    },
  },
  english: {
    name: 'English',
    short: 'EN',
    flag: '🇬🇧',
    accent: 'blue',
    greeting: 'Good morning!',
    level: 'A1 · Beginner',
    progress: 62,
    lessons: [
      { title: 'Hello, I am...', subtitle: 'Introductions & greetings', icon: '👋', done: true, minutes: '6 min' },
      { title: 'Numbers & age', subtitle: 'Numbers and age', icon: '🔢', active: true, minutes: '8 min' },
      { title: 'My family', subtitle: 'Family & people', icon: '🏡', locked: true, minutes: '7 min' },
      { title: 'At the café', subtitle: 'Order with confidence', icon: '☕', locked: true, minutes: '9 min' },
    ],
    question: {
      prompt: 'Choose the natural way to ask someone’s age:',
      choices: ['How many years have you?', 'How old are you?', 'What age you have?', 'You are how old?'],
      answer: 1,
      hint: 'Use “How old are you?” as a friendly, everyday question.',
      translation: 'How old are you?',
    },
  },
};

function Icon({ children, className = '' }) {
  return <span className={`icon ${className}`} aria-hidden="true">{children}</span>;
}

function App() {
  const [language, setLanguage] = useState('german');
  const [courseData, setCourseData] = useState(courses);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showLesson, setShowLesson] = useState(false);
  const course = courseData[language];
  const isCorrect = selected === course.question.answer;

  const todayLabel = useMemo(() => new Intl.DateTimeFormat('en', { weekday: 'long', month: 'short', day: 'numeric' }).format(new Date()), []);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) return;
    fetch(`${apiUrl.replace(/\/$/, '')}/api/courses`)
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('Course API unavailable')))
      .then((remoteCourses) => setCourseData((current) => ({ ...current, ...remoteCourses })))
      .catch(() => {
        // Keep the bundled starter lessons usable when the API is not configured.
      });
  }, []);

  function chooseLanguage(next) {
    setLanguage(next);
    setSelected(null);
    setSubmitted(false);
    setShowLesson(false);
  }

  function submitAnswer() {
    if (selected !== null) {
      setSubmitted(true);
      const apiUrl = import.meta.env.VITE_API_URL;
      if (apiUrl) {
        fetch(`${apiUrl.replace(/\/$/, '')}/api/progress`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ language, correct: selected === course.question.answer }),
        }).catch(() => {});
      }
    }
  }

  return (
    <div className={`app ${course.accent}`}>
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">P</span><span>Phrase<span>Fusion</span></span></div>
        <div className="sidebar-label">YOUR SPACE</div>
        <nav className="nav">
          <button className="nav-item active"><Icon>⌂</Icon> Learn <span className="nav-dot" /></button>
          <button className="nav-item"><Icon>◈</Icon> Practice</button>
          <button className="nav-item"><Icon>▣</Icon> Review words <span className="nav-count">12</span></button>
          <button className="nav-item"><Icon>♧</Icon> Community</button>
        </nav>
        <div className="sidebar-label courses-label">YOUR COURSES</div>
        <div className="course-switcher">
          {Object.entries(courses).map(([key, item]) => (
            <button key={key} className={`mini-course ${language === key ? 'selected' : ''}`} onClick={() => chooseLanguage(key)}>
              <span className="course-flag">{item.flag}</span><span>{item.name}</span><span className="mini-arrow">›</span>
            </button>
          ))}
          <button className="add-course"><span>＋</span> Add a language</button>
        </div>
        <div className="sidebar-bottom">
          <div className="streak-card"><div className="fire">♨</div><div><strong>7 day streak</strong><small>Keep the rhythm going!</small></div></div>
          <button className="nav-item settings"><Icon>⚙</Icon> Settings</button>
          <div className="profile"><div className="avatar">PR</div><div><strong>Prakash</strong><small>Explorer · 840 XP</small></div><span className="more">•••</span></div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="breadcrumb"><span>My learning</span><b>/</b><strong>{course.name}</strong></div>
          <div className="top-actions"><button className="icon-button">?</button><button className="icon-button">⌕</button><button className="notification">♢<i /></button></div>
        </header>

        <div className="content">
          <section className="welcome-row">
            <div><p className="eyebrow">{todayLabel.toUpperCase()} · READY WHEN YOU ARE</p><h1>{course.greeting} <span>✦</span></h1><p className="subtitle">A little practice today makes a confident speaker tomorrow.</p></div>
            <div className="daily-goal"><div className="goal-ring"><b>3</b><span>/ 5</span></div><div><strong>Daily goal</strong><small>lessons completed</small></div><button>›</button></div>
          </section>

          <section className="hero-panel">
            <div className="hero-copy"><div className="unit-kicker"><span className="unit-pill">UNIT 02</span><span>EVERYDAY CONVERSATIONS</span></div><h2>{language === 'german' ? <>Small words.<br /><em>Big confidence.</em></> : <>Find your voice.<br /><em>One phrase at a time.</em></>}</h2><p>Build a strong foundation with short, useful lessons inspired by your textbook path — then make every phrase your own.</p><button className="primary-button" onClick={() => setShowLesson(true)}>Continue lesson <span>→</span></button><div className="lesson-meta"><span>◷ 8 min</span><span>◉ +20 XP</span><span>◌ 4 exercises</span></div></div>
            <div className="hero-art"><div className="sun" /><div className="cloud cloud-one" /><div className="cloud cloud-two" /><div className="hill hill-back" /><div className="hill hill-front" /><div className="speech-bubble bubble-one">Hallo!</div><div className="speech-bubble bubble-two">Let's go ✦</div><div className="character"><div className="character-hair" /><div className="character-face"><span className="eye left" /><span className="eye right" /><span className="smile" /></div><div className="character-body" /><div className="book">A</div></div></div>
          </section>

          <section className="section-heading"><div><p className="eyebrow">YOUR TEXTBOOK PATH</p><h2>Keep going, you’re doing great.</h2></div><button className="text-button">See all units <span>→</span></button></section>
          <section className="lesson-grid">
            {course.lessons.map((lesson, index) => <article className={`lesson-card ${lesson.active ? 'current' : ''} ${lesson.locked ? 'locked' : ''}`} key={lesson.title}>
              <div className="lesson-number">0{index + 1}</div><div className={`lesson-icon ${lesson.active ? 'active-icon' : ''}`}>{lesson.icon}</div><div className="lesson-info"><h3>{lesson.title}</h3><p>{lesson.subtitle}</p><small>◷ {lesson.minutes}</small></div>{lesson.done ? <div className="done-mark">✓</div> : lesson.locked ? <div className="lock">⌑</div> : <div className="play-mark">→</div>}
            </article>)}
          </section>

          <section className="bottom-grid"><div className="tip-card"><div className="tip-icon">♧</div><div><p className="eyebrow">COACH'S NOTE</p><h3>Say it out loud.</h3><p>Your brain remembers phrases better when it hears your own voice. Try the next answer like you’re chatting with a friend.</p></div><span className="tip-spark">✦</span></div><div className="progress-card"><div className="progress-head"><div><p className="eyebrow">UNIT PROGRESS</p><h3>Getting comfortable</h3></div><strong>{course.progress}%</strong></div><div className="progress-bar"><span style={{ width: `${course.progress}%` }} /></div><div className="progress-foot"><span>✦ {course.progress < 50 ? 'Keep building your base' : 'You’re on a roll'}</span><span>Unit 2 of 6</span></div></div></section>
        </div>
      </main>

      {showLesson && <div className="modal-backdrop" onClick={() => setShowLesson(false)}><section className="lesson-modal" onClick={(event) => event.stopPropagation()}>
        <button className="close-button" onClick={() => setShowLesson(false)}>×</button><div className="modal-progress"><span style={{ width: submitted ? '100%' : '55%' }} /></div><p className="eyebrow">UNIT 02 · EXERCISE 3 OF 4</p><div className="exercise-mascot">🤔</div><h2>{course.question.prompt}</h2><p className="exercise-subtitle">Pick the best answer. No pressure — mistakes are how we learn.</p>
        <div className="choices">{course.question.choices.map((choice, index) => <button key={choice} className={`choice ${selected === index ? 'chosen' : ''} ${submitted && index === course.question.answer ? 'correct' : ''} ${submitted && selected === index && !isCorrect ? 'incorrect' : ''}`} onClick={() => !submitted && setSelected(index)}><span className="choice-letter">{String.fromCharCode(65 + index)}</span>{choice}{submitted && index === course.question.answer && <span className="choice-status">✓</span>}</button>)}</div>
        {submitted && <div className={`feedback ${isCorrect ? 'feedback-good' : 'feedback-try'}`}><strong>{isCorrect ? 'Brilliant! That’s the one. ✨' : 'Good try — let’s make it stick.'}</strong><span>{isCorrect ? course.question.translation : course.question.hint}</span></div>}
        {!submitted ? <button className="primary-button modal-submit" disabled={selected === null} onClick={submitAnswer}>Check answer <span>→</span></button> : <button className="primary-button modal-submit" onClick={() => setShowLesson(false)}>Finish exercise <span>→</span></button>}
      </section></div>}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
