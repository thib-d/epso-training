'use client';

import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { questions, type Category, type Language } from './questions';

const copy = {
  fr: {
    brand: 'Cap EPSO', navLearn: 'Se préparer', navTrain: 'S’entraîner', eyebrow: 'Entraînement EPSO · Raisonnement',
    titleA: 'Entraînez votre logique.', titleB: 'Gagnez en assurance.',
    subtitle: 'Une préparation bilingue et ciblée pour les tests de raisonnement verbal, numérique et abstrait des concours EPSO.',
    start: 'Commencer un test', learn: 'Voir les ressources', questions: 'questions corrigées', modes: '3 types de raisonnement', bilingual: 'FR + EN automatique',
    choose: 'Choisissez votre entraînement', chooseSub: 'Travaillez une compétence ou lancez une session mixte.',
    verbal: 'Verbal', numerical: 'Numérique', abstract: 'Abstrait', mixed: 'Mixte',
    verbalDesc: 'Analyser un texte et distinguer ce qui est certain.', numericalDesc: 'Lire des données et calculer avec précision.', abstractDesc: 'Repérer des suites, règles et transformations.', mixedDesc: 'Alterner les trois formats comme le jour J.',
    launch: 'Lancer', resources: 'Comprendre avant de pratiquer', resourcesSub: 'Trois introductions vidéo pour acquérir les bons réflexes.',
    qOf: 'Question', check: 'Valider ma réponse', next: 'Question suivante', result: 'Résultat', correct: 'Bonne réponse', incorrect: 'Pas tout à fait', explanation: 'Explication', back: 'Quitter le test', score: 'Score', restart: 'Recommencer', home: 'Retour à l’accueil',
    disclaimer: 'Outil indépendant de préparation, non affilié à EPSO.'
  },
  en: {
    brand: 'Cap EPSO', navLearn: 'Learn', navTrain: 'Practice', eyebrow: 'EPSO practice · Reasoning',
    titleA: 'Train your reasoning.', titleB: 'Build your confidence.',
    subtitle: 'Focused bilingual preparation for verbal, numerical and abstract reasoning tests in EPSO competitions.',
    start: 'Start a test', learn: 'Browse resources', questions: 'explained questions', modes: '3 reasoning types', bilingual: 'Automatic EN + FR',
    choose: 'Choose your practice', chooseSub: 'Focus on one skill or start a mixed session.',
    verbal: 'Verbal', numerical: 'Numerical', abstract: 'Abstract', mixed: 'Mixed',
    verbalDesc: 'Analyse a passage and identify what must be true.', numericalDesc: 'Read data and calculate accurately.', abstractDesc: 'Spot sequences, rules and transformations.', mixedDesc: 'Switch between all three formats, just like test day.',
    launch: 'Start', resources: 'Understand, then practise', resourcesSub: 'Three video introductions to build the right habits.',
    qOf: 'Question', check: 'Check answer', next: 'Next question', result: 'Results', correct: 'Correct', incorrect: 'Not quite', explanation: 'Explanation', back: 'Leave test', score: 'Score', restart: 'Try again', home: 'Back to home',
    disclaimer: 'Independent preparation tool, not affiliated with EPSO.'
  }
};

const categoryMeta: Record<Category | 'mixed', { mark: string; cls: string }> = {
  verbal: { mark: 'Aa', cls: 'blue' }, numerical: { mark: '42', cls: 'amber' }, abstract: { mark: '◇', cls: 'violet' }, mixed: { mark: '＋', cls: 'green' },
};

const subscribeToBrowserLanguage = () => () => {};
const getBrowserLanguage = (): Language => navigator.language.toLowerCase().startsWith('fr') ? 'fr' : 'en';

export default function Home() {
  const browserLanguage = useSyncExternalStore(subscribeToBrowserLanguage, getBrowserLanguage, () => 'fr');
  const [preferredLanguage, setPreferredLanguage] = useState<Language | null>(null);
  const lang = preferredLanguage ?? browserLanguage;
  const [view, setView] = useState<'home' | 'quiz'>('home');
  const [category, setCategory] = useState<Category | 'mixed'>('mixed');
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const t = copy[lang];
  const session = useMemo(() => category === 'mixed' ? questions : questions.filter(q => q.category === category), [category]);
  const q = session[index];

  function start(type: Category | 'mixed') { setCategory(type); setIndex(0); setSelected(null); setChecked(false); setScore(0); setFinished(false); setView('quiz'); window.scrollTo({ top: 0 }); }
  function submit() { if (selected === null) return; setChecked(true); if (selected === q.answer) setScore(s => s + 1); }
  function next() { if (index + 1 >= session.length) setFinished(true); else { setIndex(i => i + 1); setSelected(null); setChecked(false); } }

  return (
    <main>
      <header className="topbar">
        <button className="brand" onClick={() => setView('home')}><span className="brand-mark">EU</span><span>{t.brand}</span></button>
        <nav><button onClick={() => { setView('home'); setTimeout(() => document.querySelector('#resources')?.scrollIntoView({behavior:'smooth'}), 0); }}>{t.navLearn}</button><button className="nav-cta" onClick={() => start('mixed')}>{t.navTrain} <span>→</span></button></nav>
        <div className="lang-switch" aria-label="Language"><button className={lang === 'fr' ? 'active' : ''} onClick={() => setPreferredLanguage('fr')}>FR</button><button className={lang === 'en' ? 'active' : ''} onClick={() => setPreferredLanguage('en')}>EN</button></div>
      </header>

      {view === 'home' ? <>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span className="pulse" />{t.eyebrow}</div>
            <h1>{t.titleA}<br/><em>{t.titleB}</em></h1>
            <p>{t.subtitle}</p>
            <div className="hero-actions"><button className="primary" onClick={() => start('mixed')}>{t.start}<span>→</span></button><button className="secondary" onClick={() => document.querySelector('#resources')?.scrollIntoView({behavior:'smooth'})}>{t.learn}</button></div>
            <div className="proof"><span><b>{questions.length}</b> {t.questions}</span><span><b>3</b> {t.modes}</span><span><b>文</b> {t.bilingual}</span></div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="orb orb-one"/><div className="orb orb-two"/>
            <div className="logic-card card-a"><span className="card-label">01 · VERBAL</span><div className="text-lines"><i/><i/><i/></div><span className="tick">✓</span></div>
            <div className="logic-card card-b"><span className="card-label">02 · NUMERICAL</span><div className="big-number">72<span>%</span></div><div className="bars"><i/><i/><i/><i/></div></div>
            <div className="logic-card card-c"><span className="card-label">03 · ABSTRACT</span><div className="shapes"><i>○</i><i>△</i><i>□</i><i>?</i></div></div>
          </div>
        </section>

        <section className="practice-section" id="practice">
          <div className="section-heading"><span>01</span><div><h2>{t.choose}</h2><p>{t.chooseSub}</p></div></div>
          <div className="category-grid">{(['verbal','numerical','abstract','mixed'] as const).map((type) => <button key={type} className={`category-card ${categoryMeta[type].cls}`} onClick={() => start(type)}><span className="category-mark">{categoryMeta[type].mark}</span><span className="category-count">{type === 'mixed' ? questions.length : questions.filter(q => q.category === type).length} Q</span><h3>{t[type]}</h3><p>{t[`${type}Desc` as keyof typeof t]}</p><span className="card-link">{t.launch} <b>↗</b></span></button>)}</div>
        </section>

        <section className="resources-section" id="resources">
          <div className="section-heading light"><span>02</span><div><h2>{t.resources}</h2><p>{t.resourcesSub}</p></div></div>
          <div className="video-grid">{[
            ['lsq5zNLhSkM', t.verbal, '31 min'], ['lDuy-UKnIT0', t.numerical, '21 min'], ['ZROjSwgCbhw', t.abstract, '16 min']
          ].map(([id,title,duration]) => <article className="video-card" key={id}><div className="video-wrap"><iframe src={`https://www.youtube-nocookie.com/embed/${id}`} title={`${title} reasoning`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div><div><span>{duration}</span><h3>{title}</h3><p>EPSOprep · YouTube</p></div></article>)}</div>
        </section>
      </> :
      <section className="quiz-shell">
        <button className="back" onClick={() => setView('home')}>← {t.back}</button>
        {!finished ? <div className="quiz-layout">
          <aside className="quiz-side"><span className={`category-mark ${categoryMeta[q.category].cls}`}>{categoryMeta[q.category].mark}</span><p>{t[q.category]}</p><strong>{String(index + 1).padStart(2,'0')}<small> / {String(session.length).padStart(2,'0')}</small></strong><div className="progress"><i style={{width:`${((index+1)/session.length)*100}%`}}/></div><span>{t.score}: {score}</span></aside>
          <article className="question-card"><div className="question-kicker">{t.qOf} {index + 1} · {t[q.category]}</div><h2>{q.prompt[lang]}</h2><div className="answers">{q.options[lang].map((option, i) => <button key={option} disabled={checked} onClick={() => setSelected(i)} className={`${selected === i ? 'selected' : ''} ${checked && i === q.answer ? 'right' : ''} ${checked && selected === i && i !== q.answer ? 'wrong' : ''}`}><span>{String.fromCharCode(65+i)}</span>{option}</button>)}</div>{checked && <div className={`feedback ${selected === q.answer ? 'good' : 'bad'}`}><strong>{selected === q.answer ? t.correct : t.incorrect}</strong><p><b>{t.explanation}.</b> {q.explanation[lang]}</p></div>}<div className="quiz-actions"><button className="primary" disabled={selected === null} onClick={checked ? next : submit}>{checked ? t.next : t.check}<span>→</span></button></div></article>
        </div> : <div className="result-card"><span className="result-ring">{score}<small>/{session.length}</small></span><p>{t.result}</p><h2>{Math.round((score/session.length)*100)}%</h2><div><button className="primary" onClick={() => start(category)}>{t.restart}</button><button className="secondary" onClick={() => setView('home')}>{t.home}</button></div></div>}
      </section>}
      <footer><span>{t.brand}</span><p>{t.disclaimer}</p><span>2026</span></footer>
    </main>
  );
}
