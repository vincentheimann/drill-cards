/* ================================================
   PSPO I Quiz Trainer — App Logic
   ================================================ */

'use strict';

// ── State ─────────────────────────────────────────
let state = {
    mode: null,          // 'practice' | 'exam'
    queue: [],           // shuffled question objects for this session
    current: 0,          // index in queue
    score: 0,
    submitted: false,
    selected: new Set(),
    timerSec: 0,
    timerInterval: null,
};

// ── DOM refs ──────────────────────────────────────
const $ = id => document.getElementById(id);

const screens = {
    home: $('screen-home'),
    quiz: $('screen-quiz'),
    results: $('screen-results'),
};

// ── Utilities ─────────────────────────────────────
function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
}

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function pct(val, total) {
    return total === 0 ? 0 : Math.round((val / total) * 100);
}

// ── Session persistence (localStorage) ────────────
function saveBestScore(mode, score, total) {
    const key = `pspo_best_${mode}`;
    const prev = JSON.parse(localStorage.getItem(key) || '{"score":0,"total":0}');
    if (score > prev.score) {
        localStorage.setItem(key, JSON.stringify({ score, total }));
    }
}

function loadHomeStats() {
    const bar = $('stats-bar');
    const p = JSON.parse(localStorage.getItem('pspo_best_practice') || 'null');
    const e = JSON.parse(localStorage.getItem('pspo_best_exam') || 'null');
    const best = e || p;
    if (best && best.total > 0) {
        $('stat-done').textContent = best.total;
        $('stat-correct').textContent = best.score;
        $('stat-pct').textContent = pct(best.score, best.total) + '%';
        bar.style.display = 'flex';
    }
}

// ── Start Quiz ────────────────────────────────────
function startQuiz(mode) {
    state.mode = mode;
    state.current = 0;
    state.score = 0;
    state.submitted = false;
    state.selected = new Set();
    clearInterval(state.timerInterval);

    const count = mode === 'exam' ? 80 : QUESTIONS.length;
    state.queue = shuffle(QUESTIONS).slice(0, count).map(q => ({
        ...q,
        // shuffle option indices so answer order is randomised
        shuffledOrder: shuffle(q.options.map((_, i) => i)),
    }));

    // Timer
    if (mode === 'exam') {
        state.timerSec = 60 * 60;
        $('timer-box').style.display = '';
        startTimer();
    } else {
        $('timer-box').style.display = 'none';
    }

    showScreen('quiz');
    renderQuestion();
}

// ── Timer ─────────────────────────────────────────
function startTimer() {
    updateTimerDisplay();
    state.timerInterval = setInterval(() => {
        state.timerSec--;
        updateTimerDisplay();
        if (state.timerSec <= 0) {
            clearInterval(state.timerInterval);
            showResults();
        }
        if (state.timerSec <= 300) {
            $('timer-box').classList.add('urgent');
        }
    }, 1000);
}

function updateTimerDisplay() {
    const m = String(Math.floor(state.timerSec / 60)).padStart(2, '0');
    const s = String(state.timerSec % 60).padStart(2, '0');
    $('timer-display').textContent = `${m}:${s}`;
}

// ── Render Question ────────────────────────────────
function renderQuestion() {
    state.submitted = false;
    state.selected = new Set();

    const q = state.queue[state.current];
    const total = state.queue.length;
    const idx = state.current;

    // Header
    $('q-counter').textContent = `Question ${idx + 1} / ${total}`;
    $('progress-fill').style.width = `${pct(idx, total)}%`;

    // Type badge
    const badge = $('q-type-badge');
    const typeLabels = {
        single: ['Choose one answer', 'badge-single'],
        multi: ['Choose multiple answers', 'badge-multi'],
        truefalse: ['True or False', 'badge-truefalse'],
    };
    const [label, cls] = typeLabels[q.type];
    badge.textContent = label;
    badge.className = `q-type-badge ${cls}`;

    // Question text
    $('question-text').textContent = q.question;

    // Options
    const list = $('options-list');
    list.innerHTML = '';
    q.shuffledOrder.forEach((origIdx, displayPos) => {
        const optText = q.options[origIdx];
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.dataset.orig = origIdx;

        const markerClass = q.type === 'multi' ? 'option-marker marker-square' : 'option-marker';
        btn.innerHTML = `
      <span class="${markerClass}">${String.fromCharCode(65 + displayPos)}</span>
      <span class="option-text">${escapeHTML(optText)}</span>
    `;

        btn.addEventListener('click', () => onOptionClick(btn, q));
        list.appendChild(btn);
    });

    // Feedback
    const fb = $('feedback-box');
    fb.style.display = 'none';
    fb.className = 'feedback-box';
    fb.textContent = '';

    // Buttons
    const submitBtn = $('btn-submit');
    const nextBtn = $('btn-next');
    submitBtn.disabled = true;
    submitBtn.style.display = '';
    nextBtn.style.display = 'none';
}

function escapeHTML(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// ── Option Selection ───────────────────────────────
function onOptionClick(btn, q) {
    if (state.submitted) return;
    const origIdx = parseInt(btn.dataset.orig, 10);

    if (q.type === 'multi') {
        // Toggle
        if (state.selected.has(origIdx)) {
            state.selected.delete(origIdx);
            btn.classList.remove('selected');
        } else {
            state.selected.add(origIdx);
            btn.classList.add('selected');
        }
    } else {
        // Single / truefalse — deselect others
        document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        state.selected = new Set([origIdx]);
        btn.classList.add('selected');
    }

    $('btn-submit').disabled = state.selected.size === 0;
}

// ── Submit ─────────────────────────────────────────
function onSubmit() {
    if (state.submitted || state.selected.size === 0) return;
    state.submitted = true;

    const q = state.queue[state.current];
    const correct = new Set(q.correct);
    const selected = state.selected;

    // Determine result
    const allCorrectSelected = [...correct].every(i => selected.has(i));
    const noWrongSelected = [...selected].every(i => correct.has(i));
    const isFullyCorrect = allCorrectSelected && noWrongSelected;
    const isPartial = !isFullyCorrect && [...selected].some(i => correct.has(i));

    if (isFullyCorrect) state.score++;

    // Colour options
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.disabled = true;
        const origIdx = parseInt(btn.dataset.orig, 10);
        if (correct.has(origIdx) && selected.has(origIdx)) {
            btn.classList.add('correct');
        } else if (selected.has(origIdx) && !correct.has(origIdx)) {
            btn.classList.add('wrong');
        } else if (correct.has(origIdx)) {
            // highlight missed correct answers
            btn.classList.add('correct');
        }
    });

    // Feedback message
    const fb = $('feedback-box');
    fb.style.display = '';
    if (isFullyCorrect) {
        fb.className = 'feedback-box feedback-correct';
        fb.textContent = '✅ Correct!';
    } else if (isPartial) {
        const missed = [...correct].filter(i => !selected.has(i)).map(i => q.options[i]);
        fb.className = 'feedback-box feedback-partial';
        fb.textContent = `⚠️ Partially correct. You missed: ${missed.join('; ')}`;
    } else {
        const correctAnswers = [...correct].map(i => q.options[i]);
        fb.className = 'feedback-box feedback-wrong';
        fb.textContent = `❌ Wrong. Correct answer${correctAnswers.length > 1 ? 's' : ''}: ${correctAnswers.join('; ')}`;
    }

    // Show Next button
    $('btn-submit').style.display = 'none';
    $('btn-next').style.display = '';

    const isLast = state.current === state.queue.length - 1;
    $('btn-next').textContent = isLast ? 'See Results 🏁' : 'Next Question →';
}

// ── Next Question ──────────────────────────────────
function onNext() {
    state.current++;
    if (state.current >= state.queue.length) {
        showResults();
    } else {
        renderQuestion();
        // scroll top on mobile
        document.querySelector('.quiz-main').scrollTop = 0;
        window.scrollTo(0, 0);
    }
}

// ── Results ────────────────────────────────────────
function showResults() {
    clearInterval(state.timerInterval);

    const total = state.queue.length;
    const score = state.score;
    const wrong = total - score;
    const scorePct = pct(score, total);

    // Pass threshold — PSPO I requires 85%
    const PASS_THRESHOLD = 85;
    const passed = scorePct >= PASS_THRESHOLD;

    saveBestScore(state.mode, score, total);

    // Medal & title
    let medal, title, subtitle;
    if (scorePct === 100) {
        medal = '🏆'; title = 'Perfect Score!'; subtitle = 'Outstanding performance!';
    } else if (scorePct >= 85) {
        medal = '🎉'; title = 'You Passed!'; subtitle = `You met the PSPO I threshold of ${PASS_THRESHOLD}%.`;
    } else if (scorePct >= 70) {
        medal = '📈'; title = 'Almost There!'; subtitle = `You need ${PASS_THRESHOLD}% to pass. Keep practising!`;
    } else {
        medal = '💪'; title = 'Keep Practising!'; subtitle = `Review the incorrect answers and try again.`;
    }

    $('results-medal').textContent = medal;
    $('results-title').textContent = title;
    $('results-subtitle').textContent = subtitle;

    // Counters
    $('r-correct').textContent = score;
    $('r-wrong').textContent = wrong;
    $('r-total').textContent = total;
    $('score-pct').textContent = `${scorePct}%`;

    // Arc animation
    const arc = $('score-arc');
    arc.className = 'score-arc ' + (passed ? 'pass' : 'fail');
    const circumference = 2 * Math.PI * 54; // 339.3
    const offset = circumference - (scorePct / 100) * circumference;
    setTimeout(() => { arc.style.strokeDashoffset = offset; }, 100);

    // Pass/fail banner
    const banner = $('pass-fail-banner');
    if (passed) {
        banner.className = 'banner-pass';
        banner.textContent = `✅ PASS — ${scorePct}% (threshold: ${PASS_THRESHOLD}%)`;
    } else {
        banner.className = 'banner-fail';
        banner.textContent = `❌ FAIL — ${scorePct}% (threshold: ${PASS_THRESHOLD}%)`;
    }

    showScreen('results');
}

// ── Event Bindings ─────────────────────────────────
$('btn-practice').addEventListener('click', () => startQuiz('practice'));
$('btn-practice').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') startQuiz('practice'); });

$('btn-exam').addEventListener('click', () => startQuiz('exam'));
$('btn-exam').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') startQuiz('exam'); });

$('btn-quit').addEventListener('click', () => {
    clearInterval(state.timerInterval);
    showScreen('home');
    loadHomeStats();
});

$('btn-submit').addEventListener('click', onSubmit);
$('btn-next').addEventListener('click', onNext);

$('btn-restart-same').addEventListener('click', () => startQuiz(state.mode));
$('btn-home').addEventListener('click', () => {
    showScreen('home');
    loadHomeStats();
});

// Keyboard: Enter to submit / next
document.addEventListener('keydown', e => {
    if (screens.quiz.classList.contains('active')) {
        if (e.key === 'Enter') {
            const submit = $('btn-submit');
            const next = $('btn-next');
            if (next.style.display !== 'none') { onNext(); }
            else if (!submit.disabled) { onSubmit(); }
        }
    }
});

// ── Init ───────────────────────────────────────────
loadHomeStats();
showScreen('home');
