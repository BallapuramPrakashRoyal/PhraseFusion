import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function App() {
  return (
    <main className="app-shell">
      <section className="hero-card">
        <div className="badge">AI LANGUAGE COACH</div>
        <h1>Learn German.<br />Play your way. 🇩🇪</h1>
        <p>Personalized lessons, funny exercises, and an AI tutor that learns how you learn.</p>
        <button>Start Learning</button>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
