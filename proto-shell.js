/* WealthVision prototype shell — mobile-native bottom-tab navigation + gamification */
(function () {
  var LESSONS = [
    { file: 'screen18.html', title: 'Compound Interest', mins: 3 },
    { file: 'screen11.html', title: 'Inflation', mins: 3 },
    { file: 'screen12.html', title: 'Dollar-Cost Averaging', mins: 4 },
    { file: 'screen13.html', title: 'Tax-Advantaged Accounts', mins: 4 },
    { file: 'screen14.html', title: 'Index Funds vs Stock Picking', mins: 5 },
    { file: 'screen15.html', title: 'The 4% Rule', mins: 4 },
    { file: 'screen16.html', title: 'Emergency Fund', mins: 3 },
    { file: 'screen17.html', title: 'Peer Comparison', mins: 4 }
  ];

  var FOUNDATIONS = [
    { file: 'screen1.html', title: 'Why investing beats saving', mins: 2 },
    { file: 'screen2.html', title: 'Your money scenario', mins: 2 },
    { file: 'screen3.html', title: 'Set your first goal', mins: 2 }
  ];

  var TOOLS = [
    { file: 'payday.html', title: 'Payday Routine', desc: 'Split every paycheck the smart way', icon: 'wallet', dom: 'gold', isNew: true },
    { file: 'screen5.html', title: 'Growth Simulator', desc: 'Project any plan over time', icon: 'spark', dom: 'teal', isNew: false },
    { file: 'screen6.html', title: 'Scenario Compare', desc: 'Weigh two choices side by side', icon: 'compare', dom: 'sky', isNew: false },
    { file: 'screen10a.html', title: 'Can I Buy It?', desc: 'Instant affordability check', icon: 'cart', dom: 'green', isNew: true },
    { file: 'screen7.html', title: 'Goal Builder', desc: 'Turn a dream into a plan', icon: 'target', dom: 'violet', isNew: false },
    { file: 'screen17.html', title: 'Peer Comparison', desc: 'See how you stack up by age', icon: 'people', dom: 'amber', isNew: true },
    { file: 'kidmode.html', title: 'Kid Mode', desc: 'Teach kids to save with a piggy bank', icon: 'piggy', dom: 'pink', isNew: true }
  ];

  var ACHIEVEMENTS = [
    { id: 'first_lesson', title: 'First Steps', desc: 'Finish your first lesson', icon: 'sprout', test: function (s) { return s.lessons.length >= 1; } },
    { id: 'streak_3', title: 'On a Roll', desc: 'Keep a 3-day streak', icon: 'flame', test: function (s) { return s.streak.count >= 3; } },
    { id: 'halfway', title: 'Halfway There', desc: 'Complete 4 lessons', icon: 'half', test: function (s) { return s.lessons.length >= 4; } },
    { id: 'explorer', title: 'Tool Explorer', desc: 'Open any finance tool', icon: 'compass', test: function (s) { return s.toolsUsed.length >= 1; } },
    { id: 'planner', title: 'Goal Planner', desc: 'Use the Goal Builder', icon: 'target', test: function (s) { return s.visited.indexOf('screen7.html') !== -1; } },
    { id: 'scholar', title: 'Money Scholar', desc: 'Complete all 8 lessons', icon: 'cap', test: function (s) { return s.lessons.length >= LESSONS.length; } }
  ];

  var LESSON_FILES = LESSONS.map(function (l) { return l.file; });
  var TOOL_FILES = TOOLS.map(function (t) { return t.file; });
  var XP_PER_LESSON = 20;
  var XP_PER_TOOL = 8;
  var HUB_FILES = ['dashboard.html', 'learn.html', 'tools.html', 'rewards.html'];

  // Linear onboarding flow: splash/index -> screen1 -> screen2 -> screen3 -> accelerate (path-to-goal) -> goal (payoff) -> dashboard
  var ONBOARDING = {
    'screen1.html': { next: 'screen2.html', skip: 'dashboard.html' },
    'screen2.html': { next: 'screen3.html', skip: 'dashboard.html' },
    'screen3.html': { next: 'accelerate.html', skip: 'dashboard.html' },
    'accelerate.html': { next: 'goal.html?from=onboarding', skip: 'dashboard.html' }
  };

  function todayKey() {
    var d = new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }

  function daysBetween(aKey, bKey) {
    if (!aKey || !bKey) return Infinity;
    var a = new Date(aKey), b = new Date(bKey);
    return Math.round((b - a) / 86400000);
  }

  function defaultState() {
    return { visited: [], lessons: [], toolsUsed: [], xp: 0, streak: { count: 0, last: '' }, achievements: [], monthly: 0, goal: null, goals: [], activeGoal: 0, payday: null };
  }

  function readState() {
    var s = defaultState();
    try {
      var raw = localStorage.getItem('wv_state');
      if (raw) {
        var p = JSON.parse(raw);
        s.visited = Array.isArray(p.visited) ? p.visited : [];
        s.lessons = Array.isArray(p.lessons) ? p.lessons : [];
        s.toolsUsed = Array.isArray(p.toolsUsed) ? p.toolsUsed : [];
        s.xp = typeof p.xp === 'number' ? p.xp : 0;
        s.streak = p.streak && typeof p.streak === 'object' ? { count: p.streak.count || 0, last: p.streak.last || '' } : { count: 0, last: '' };
        s.achievements = Array.isArray(p.achievements) ? p.achievements : [];
        s.monthly = typeof p.monthly === 'number' ? p.monthly : 0;
        s.goal = p.goal && typeof p.goal === 'object' ? p.goal : null;
        s.goals = Array.isArray(p.goals) ? p.goals : [];
        s.activeGoal = typeof p.activeGoal === 'number' ? p.activeGoal : 0;
        s.payday = p.payday && typeof p.payday === 'object' ? p.payday : null;
      }
    } catch (err) { /* ignore */ }
    // Unify the goal model: goals[] is the source of truth; a legacy single goal
    // (from early onboarding) is migrated into the list so every screen agrees.
    if (!s.goals.length && s.goal && s.goal.target) s.goals = [s.goal];
    s.goals = s.goals.filter(function (g) { return g && g.target; });
    if (s.goals.length) {
      if (s.activeGoal < 0 || s.activeGoal >= s.goals.length) s.activeGoal = 0;
      s.goal = s.goals[s.activeGoal]; // keep the singular `goal` mirroring the active one
    } else {
      s.activeGoal = 0;
      s.goal = null;
    }
    // migrate legacy visited list
    try {
      var legacy = localStorage.getItem('wv_proto_visited');
      if (legacy) {
        JSON.parse(legacy).forEach(function (f) {
          if (s.visited.indexOf(f) === -1) s.visited.push(f);
          if (LESSON_FILES.indexOf(f) !== -1 && s.lessons.indexOf(f) === -1) s.lessons.push(f);
        });
      }
    } catch (err) { /* ignore */ }
    return s;
  }

  function writeState(s) {
    try { localStorage.setItem('wv_state', JSON.stringify(s)); } catch (err) { /* ignore */ }
  }

  // Merge a partial patch into the stored state (used by onboarding to persist monthly + goal)
  function patchState(patch) {
    var s = readState();
    if (patch && typeof patch === 'object') {
      Object.keys(patch).forEach(function (k) { s[k] = patch[k]; });
    }
    syncAchievements(s);
    writeState(s);
    return s;
  }

  /* ---------- unified goal model ----------
     goals[] is the single source of truth. `goal` always mirrors the active goal
     (goals[activeGoal]) so older screens that read `state.goal` stay correct. */
  function getGoals() {
    return readState().goals;
  }
  function getActiveGoalIndex() {
    var s = readState();
    return s.goals.length ? s.activeGoal : -1;
  }
  function getActiveGoal() {
    var s = readState();
    return s.goals.length ? s.goals[s.activeGoal] : null;
  }
  // Insert or replace a goal. index null/undefined → append a new goal.
  // The written goal becomes the active one. Returns its index.
  function saveGoal(goalObj, index) {
    if (!goalObj || !goalObj.target) return -1;
    var s = readState();
    var goals = s.goals.slice();
    var idx;
    if (typeof index === 'number' && index >= 0 && index < goals.length) {
      goals[index] = goalObj; idx = index;
    } else {
      goals.push(goalObj); idx = goals.length - 1;
    }
    patchState({ goals: goals, goal: goalObj, activeGoal: idx, monthly: goalObj.monthly || s.monthly || 0 });
    return idx;
  }
  function setActiveGoal(index) {
    var s = readState();
    if (!s.goals.length) return;
    var idx = Math.max(0, Math.min(s.goals.length - 1, index || 0));
    patchState({ activeGoal: idx, goal: s.goals[idx] });
  }
  function removeGoal(index) {
    var s = readState();
    var goals = s.goals.slice();
    if (index < 0 || index >= goals.length) return;
    goals.splice(index, 1);
    var idx = Math.max(0, Math.min(goals.length - 1, s.activeGoal));
    patchState({ goals: goals, activeGoal: goals.length ? idx : 0, goal: goals.length ? goals[idx] : null });
  }

  function levelFromXp(xp) {
    var level = Math.floor(xp / 100) + 1;
    var into = xp % 100;
    return { level: level, into: into, toNext: 100 - into, span: 100 };
  }

  function bumpStreak(s) {
    var t = todayKey();
    if (s.streak.last === t) return;
    var gap = daysBetween(s.streak.last, t);
    s.streak.count = gap === 1 ? (s.streak.count + 1) : 1;
    s.streak.last = t;
  }

  function syncAchievements(s) {
    ACHIEVEMENTS.forEach(function (a) {
      if (s.achievements.indexOf(a.id) === -1 && a.test(s)) s.achievements.push(a.id);
    });
  }

  function currentFile() {
    var seg = (window.location.pathname.split('/').pop() || '').toLowerCase();
    // Some hosts (e.g. Vercel clean URLs) strip the .html extension. Normalize so
    // page matching (onboarding flow, lessons, tools, hubs) works either way.
    if (seg === '') return 'index.html';
    if (seg.indexOf('.') === -1) seg += '.html';
    return seg;
  }

  function recordVisit(file) {
    var s = readState();
    var changed = false;
    if (file && HUB_FILES.indexOf(file) === -1) {
      if (s.visited.indexOf(file) === -1) { s.visited.push(file); changed = true; }
      if (LESSON_FILES.indexOf(file) !== -1 && s.lessons.indexOf(file) === -1) {
        s.lessons.push(file); s.xp += XP_PER_LESSON; changed = true;
      }
      if (TOOL_FILES.indexOf(file) !== -1 && s.toolsUsed.indexOf(file) === -1) {
        s.toolsUsed.push(file); s.xp += XP_PER_TOOL; changed = true;
      }
      if (changed) bumpStreak(s);
    }
    syncAchievements(s);
    writeState(s);
    return s;
  }

  function nextLesson(s) {
    return LESSONS.find(function (l) { return s.lessons.indexOf(l.file) === -1; }) || null;
  }

  /* ---------- icons ---------- */
  function icon(name) {
    var paths = {
      home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/>',
      learn: '<path d="M3 6.5 12 3l9 3.5L12 10 3 6.5Z"/><path d="M7 9v5c0 1.5 2.2 3 5 3s5-1.5 5-3V9"/>',
      tools: '<path d="M14.7 6.3a4 4 0 0 1-5 5L4 17v3h3l5.7-5.7a4 4 0 0 0 5-5l-2.3 2.3-2-2 2.3-2.3Z"/>',
      rewards: '<circle cx="12" cy="9" r="5"/><path d="m8.5 13-1.5 8 5-3 5 3-1.5-8"/>',
      spark: '<path d="M3 17l6-6 4 4 7-7"/><path d="M17 7h4v4"/>',
      compare: '<path d="M7 4v16"/><path d="M3 8l4-4 4 4"/><path d="M17 20V4"/><path d="M21 16l-4 4-4-4"/>',
      cart: '<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.6 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L23 7H6"/>',
      target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
      people: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M16 5.6a3 3 0 0 1 0 5.4"/><path d="M21 20c0-2.6-1.7-4.9-4-5.7"/>',
      piggy: '<path d="M3 12.5c0-2.6 2.5-4.7 5.7-4.9.8-.9 2-1.5 3.3-1.6L11 8.2c1.9.5 3.4 1.7 4.1 3.3H18v3h-1.7c-.5.9-1.2 1.6-2.1 2.1V18h-2.4v-1.1H9.2V18H6.8v-1.6C4.6 15.5 3 14.2 3 12.5z"/><circle cx="7.5" cy="11.8" r=".6"/>',
      wallet: '<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H17a2 2 0 0 1 2 2v.5"/><path d="M3 7.5V17a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2H5.5"/><circle cx="16.5" cy="13" r="1.15"/>',
      shield: '<path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6z"/><path d="M9 12l2 2 4-4"/>',
      card: '<rect x="2.5" y="5.5" width="19" height="13" rx="2.5"/><path d="M2.5 9.5h19"/><path d="M6 14.5h4"/>',
      gift: '<path d="M4 11h16v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/><path d="M3 8h18v3H3z"/><path d="M12 8v12"/><path d="M12 8S10.5 4 8.3 4.4A1.9 1.9 0 0 0 8.5 8z"/><path d="M12 8s1.5-4 3.7-3.6A1.9 1.9 0 0 1 15.5 8z"/>',
      calendar: '<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 9.5h17"/><path d="M8 3v4M16 3v4"/>',
      sprout: '<path d="M12 20v-8"/><path d="M12 12C9 12 7 10 7 7c3 0 5 2 5 5z"/><path d="M12 12c3 0 5-2 5-5-3 0-5 2-5 5z"/>',
      flame: '<path d="M12 2C9 6 6 8.5 6 13a6 6 0 0 0 12 0c0-2-1-3.6-2.2-5.1-.6 1.5-1.6 2.1-2.6 2.1C13.4 8.2 13 5.2 12 2z"/>',
      half: '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18Z"/>',
      compass: '<circle cx="12" cy="12" r="9"/><path d="M16 8l-2.2 6.2L7.5 16l2.2-6.2z"/>',
      cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11.5V16c0 1.4 2.7 2.6 6 2.6s6-1.2 6-2.6v-4.5"/><path d="M22 9.2V14"/>',
      sun: '<circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"/>',
      moon: '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>'
    };
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + (paths[name] || '') + '</svg>';
  }

  function buildTabBar(active) {
    var tabs = [
      { tab: 'home', label: 'Home', href: 'dashboard.html' },
      { tab: 'learn', label: 'Learn', href: 'learn.html' },
      { tab: 'tools', label: 'Tools', href: 'tools.html' },
      { tab: 'rewards', label: 'Rewards', href: 'rewards.html' }
    ];
    var nav = document.createElement('nav');
    nav.className = 'wv-tabbar';
    tabs.forEach(function (t) {
      var a = document.createElement('a');
      a.className = 'wv-tab' + (t.tab === active ? ' active' : '');
      a.href = t.href;
      a.innerHTML = '<span class="wv-tab-ic">' + icon(t.tab) + '</span><span class="wv-tab-label">' + t.label + '</span>';
      nav.appendChild(a);
    });
    return nav;
  }

  function wireBacks() {
    var file = currentFile();
    var fallback = 'dashboard.html';
    if (LESSON_FILES.indexOf(file) !== -1) fallback = 'learn.html';
    else if (TOOL_FILES.indexOf(file) !== -1) fallback = 'tools.html';
    var selectors = '.back-btn,.nav-back,.back-arrow,.close-btn,[data-back],.btn-back,.header-back';
    document.querySelectorAll(selectors).forEach(function (el) {
      el.addEventListener('click', function (ev) {
        ev.preventDefault();
        if (document.referrer && history.length > 1) { history.back(); }
        else { window.location.href = fallback; }
      });
    });
  }

  // Wire the forward "Next/CTA" button and any "Skip" links on onboarding screens
  function wireOnboarding(file) {
    var map = ONBOARDING[file];
    if (!map) return false;
    var cta = document.getElementById('cta');
    if (cta && map.next) {
      cta.addEventListener('click', function (ev) {
        if (cta.disabled) return; // honor screens that gate the CTA (e.g. goal not chosen)
        ev.preventDefault();
        window.location.href = map.next;
      });
    }
    if (map.skip) {
      document.querySelectorAll('.skip-link, #skipLink').forEach(function (el) {
        el.addEventListener('click', function (ev) {
          ev.preventDefault();
          window.location.href = map.skip;
        });
      });
    }
    return true;
  }

  function setup() {
    var file = currentFile();
    var s = recordVisit(file);
    var frame = document.querySelector('.device-frame') || document.body;
    frame.style.position = frame.style.position || 'relative';

    applyTheme(frame, readTheme());
    mountThemeToggle(frame);

    var activeTab = document.body.getAttribute('data-wv-tab');
    if (activeTab) {
      frame.appendChild(buildTabBar(activeTab));
    } else {
      wireBacks();
      wireOnboarding(file);
    }
    void s;
  }

  /* ---------- theme ---------- */
  function readTheme() {
    try { return localStorage.getItem('wv_theme') === 'light' ? 'light' : 'dark'; } catch (e) { return 'dark'; }
  }
  function applyTheme(frame, theme) {
    if (theme === 'light') frame.setAttribute('data-theme', 'light');
    else frame.removeAttribute('data-theme');
  }
  function mountThemeToggle(frame) {
    var top = frame.querySelector('.wv-top');
    if (!top || top.querySelector('.wv-theme-toggle')) return;
    var actions = document.createElement('div');
    actions.className = 'wv-actions';
    // adopt any existing right-side controls (e.g. streak flame)
    Array.prototype.slice.call(top.children).forEach(function (child, i) {
      if (i > 0) actions.appendChild(child);
    });
    var btn = document.createElement('button');
    btn.className = 'wv-theme-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Toggle light or dark mode');
    function paint() { btn.innerHTML = icon(frame.getAttribute('data-theme') === 'light' ? 'moon' : 'sun'); }
    paint();
    btn.addEventListener('click', function () {
      var next = frame.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(frame, next);
      try { localStorage.setItem('wv_theme', next); } catch (e) {}
      paint();
    });
    actions.appendChild(btn);
    top.appendChild(actions);
  }

  window.WVShell = {
    LESSONS: LESSONS,
    FOUNDATIONS: FOUNDATIONS,
    TOOLS: TOOLS,
    ACHIEVEMENTS: ACHIEVEMENTS,
    getState: readState,
    patchState: patchState,
    getGoals: getGoals,
    getActiveGoal: getActiveGoal,
    getActiveGoalIndex: getActiveGoalIndex,
    saveGoal: saveGoal,
    setActiveGoal: setActiveGoal,
    removeGoal: removeGoal,
    levelFromXp: levelFromXp,
    nextLesson: nextLesson,
    icon: icon
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
