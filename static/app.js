const $ = s => document.querySelector(s);
const el = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; };
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const iso = d => { d = new Date(d); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const today = () => iso(new Date());
const addDays = (s, n) => { const d = new Date(s + 'T00:00'); d.setDate(d.getDate() + n); return iso(d); };
const pad = n => String(n).padStart(2, '0');

const TX = {
  en: {
    dashboard: 'Dashboard', today: 'Today', week: 'Week', all: 'All tasks', calendar: 'Calendar', board: 'Board', focus: 'Focus', pomodoro: 'Pomodoro', stats: 'Stats', settings: 'Settings', data: 'Data',
    grpTasks: 'Tasks', grpViews: 'Views', grpTools: 'Tools', grpSys: 'System',
    add: 'Add task', ph: 'What needs doing?', tag: 'Tag / course', high: 'High', med: 'Medium', low: 'Low', none: 'No repeat', daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly',
    todo: 'To do', doing: 'Doing', done: 'Done', streak: 'Streak', days: 'days', progress: 'Today\'s progress', export: 'Export JSON', import: 'Import JSON', del: 'Delete', notes: 'Notes',
    sub: 'Add subtask, press Enter', start: 'Start', pause: 'Pause', reset: 'Reset', skip: 'Skip', empty: 'Nothing here. Add a task above.', focusEmpty: 'All clear. Nothing left to focus on.',
    theme: 'Theme', dark: 'Dark', light: 'Light', lang: 'Language', accent: 'Accent', focusT: 'Focus time', breakT: 'Break', overdue: 'Overdue', dueN: 'due', doneN: 'done', imported: 'Imported',
    saved: 'Task deleted', fin: 'Session finished', search: 'Search tasks…', anyTag: 'Any tag', anyPrio: 'Any priority', anyStatus: 'Any status', openN: 'Open', upNext: 'Up next',
    last7: 'Completed, last 7 days', last14: 'Completed, last 14 days', byTag: 'Open tasks by tag', byPrio: 'Open tasks by priority', totalDone: 'Completed all-time', totalTasks: 'Tasks stored',
    clearDone: 'Clear completed tasks', confirmClear: 'Delete all completed tasks?', cleared: 'Completed tasks cleared', focusMin: 'Focus minutes', breakMin: 'Break minutes',
    sessions: 'Sessions today', shortcuts: 'Keyboard shortcuts', untagged: 'untagged', invalid: 'Invalid file', doneToday: 'Done today', effects: 'Scanline effect',
    seeAll: 'See all', kNav: 'Jump to menu item', kNew: 'New task', kSearch: 'Search', kEsc: 'Close menu / editor', table: 'Show as table', date: 'Date', count: 'Count',
    backup: 'Backup', danger: 'Cleanup', dataHint: 'Everything is stored in todo.db on the machine running the app.', skipBreak: 'Skip phase', nothing: 'No data yet', results: 'results'
  },
  vi: {
    dashboard: 'Tổng quan', today: 'Hôm nay', week: 'Tuần này', all: 'Tất cả', calendar: 'Lịch', board: 'Bảng', focus: 'Tập trung', pomodoro: 'Pomodoro', stats: 'Thống kê', settings: 'Cài đặt', data: 'Dữ liệu',
    grpTasks: 'Công việc', grpViews: 'Chế độ xem', grpTools: 'Công cụ', grpSys: 'Hệ thống',
    add: 'Thêm việc', ph: 'Cần làm gì?', tag: 'Nhãn / môn học', high: 'Cao', med: 'Vừa', low: 'Thấp', none: 'Không lặp', daily: 'Hằng ngày', weekly: 'Hằng tuần', monthly: 'Hằng tháng',
    todo: 'Cần làm', doing: 'Đang làm', done: 'Xong', streak: 'Chuỗi ngày', days: 'ngày', progress: 'Tiến độ hôm nay', export: 'Xuất JSON', import: 'Nhập JSON', del: 'Xóa', notes: 'Ghi chú',
    sub: 'Thêm việc con, nhấn Enter', start: 'Bắt đầu', pause: 'Tạm dừng', reset: 'Đặt lại', skip: 'Bỏ qua', empty: 'Chưa có gì. Hãy thêm việc ở trên.', focusEmpty: 'Đã xong hết. Không còn gì để tập trung.',
    theme: 'Giao diện', dark: 'Tối', light: 'Sáng', lang: 'Ngôn ngữ', accent: 'Màu chủ đạo', focusT: 'Thời gian tập trung', breakT: 'Nghỉ', overdue: 'Quá hạn', dueN: 'đến hạn', doneN: 'đã xong', imported: 'Đã nhập',
    saved: 'Đã xóa việc', fin: 'Hết phiên', search: 'Tìm việc…', anyTag: 'Mọi nhãn', anyPrio: 'Mọi mức', anyStatus: 'Mọi trạng thái', openN: 'Đang mở', upNext: 'Việc tiếp theo',
    last7: 'Hoàn thành 7 ngày qua', last14: 'Hoàn thành 14 ngày qua', byTag: 'Việc mở theo nhãn', byPrio: 'Việc mở theo mức ưu tiên', totalDone: 'Tổng đã hoàn thành', totalTasks: 'Số việc đã lưu',
    clearDone: 'Xóa các việc đã xong', confirmClear: 'Xóa tất cả việc đã xong?', cleared: 'Đã xóa các việc đã xong', focusMin: 'Phút tập trung', breakMin: 'Phút nghỉ',
    sessions: 'Phiên hôm nay', shortcuts: 'Phím tắt', untagged: 'không nhãn', invalid: 'Tệp không hợp lệ', doneToday: 'Xong hôm nay', effects: 'Hiệu ứng quét dòng',
    seeAll: 'Xem tất cả', kNav: 'Chuyển mục menu', kNew: 'Việc mới', kSearch: 'Tìm kiếm', kEsc: 'Đóng menu / trình sửa', table: 'Xem dạng bảng', date: 'Ngày', count: 'Số lượng',
    backup: 'Sao lưu', danger: 'Dọn dẹp', dataHint: 'Mọi dữ liệu được lưu trong todo.db trên máy chạy ứng dụng.', skipBreak: 'Chuyển pha', nothing: 'Chưa có dữ liệu', results: 'kết quả'
  }
};

const MENU = [
  ['grpTasks', [['dashboard', '◈'], ['today', '◉'], ['week', '▤'], ['all', '≣']]],
  ['grpViews', [['calendar', '▦'], ['board', '▥'], ['focus', '◎']]],
  ['grpTools', [['pomodoro', '⏱'], ['stats', '▲']]],
  ['grpSys', [['settings', '⚙'], ['data', '⇅']]]
];
const ORDER = MENU.flatMap(g => g[1].map(x => x[0]));
const WITH_ADD = new Set(['today', 'week', 'all', 'calendar', 'board']);
const ACCENTS = ['#00e5ff', '#ff2e88', '#2dffa0', '#ffc23d', '#a66bff', '#ff6b2d'];
const OLD_ACCENT = '#1f6f8b';

let S = { tasks: [], settings: { lang: 'en', dark: true, accent: ACCENTS[0], fx: true, focusMin: 25, breakMin: 5 }, log: {}, pomoLog: {} };
let view = 'dashboard', cal = new Date(), open = null, dragId = null, focusIdx = 0;
const F = { q: '', tag: '', prio: '', status: '' };
const t = k => (TX[S.settings.lang] || TX.en)[k] || k;

let timer;
const save = () => { clearTimeout(timer); timer = setTimeout(() => fetch('/api/state', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(S) }), 300); };
let toastT;
const toast = m => { const x = $('#toast'); x.textContent = m; x.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => x.classList.remove('show'), 1800); };
const update = () => { save(); render(); };

// ---- tasks ----
const byId = id => S.tasks.find(x => x.id === id);
const PR = { high: 0, med: 1, low: 2 };
function nextDue(d, rec) {
  const x = new Date((d || today()) + 'T00:00');
  if (rec === 'daily') x.setDate(x.getDate() + 1);
  else if (rec === 'weekly') x.setDate(x.getDate() + 7);
  else x.setMonth(x.getMonth() + 1);
  return iso(x);
}
function setStatus(task, status) {
  const was = task.status;
  task.status = status;
  if (status === 'done' && was !== 'done') {
    S.log[today()] = (S.log[today()] || 0) + 1;
    if (task.rec) S.tasks.push({ ...task, id: crypto.randomUUID(), status: 'todo', due: nextDue(task.due, task.rec), subs: task.subs.map(s => ({ ...s, done: false })) });
  } else if (was === 'done' && status !== 'done') {
    S.log[today()] = Math.max(0, (S.log[today()] || 0) - 1);
  }
}
const openTasks = () => S.tasks.filter(x => x.status !== 'done');
const ranked = () => openTasks().sort((a, b) => PR[a.prio] - PR[b.prio] || (a.due || '9').localeCompare(b.due || '9'));
const tags = () => [...new Set(S.tasks.map(x => x.tag).filter(Boolean))].sort();
function streak() {
  let n = 0, d = today();
  if (!S.log[d]) d = addDays(d, -1);
  while (S.log[d] > 0) { n++; d = addDays(d, -1); }
  return n;
}
function todayStats() {
  const td = today(), op = openTasks();
  const due = op.filter(x => x.due && x.due <= td).length, over = op.filter(x => x.due && x.due < td).length;
  const doneN = S.log[td] || 0, total = doneN + due;
  return { due, over, doneN, open: op.length, pct: total ? Math.round(doneN / total * 100) : 0 };
}

// ---- routing & menu ----
function go(k) { if (location.hash !== '#' + k) location.hash = k; else { view = k; render(); } }
function fromHash() { const k = location.hash.slice(1); view = ORDER.includes(k) ? k : 'dashboard'; open = null; setMenu(false); render(); window.scrollTo(0, 0); }
function setMenu(on) { $('#nav').classList.toggle('open', on); $('#scrim').classList.toggle('on', on); $('#menuBtn').setAttribute('aria-expanded', on); }

function onAccent(hex) {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255).map(c => c <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4);
  return .2126 * r + .7152 * g + .0722 * b > .25 ? '#00121a' : '#ffffff';
}

// ---- rendering ----
function render() {
  const r = document.documentElement;
  r.dataset.theme = S.settings.dark ? 'dark' : 'light';
  r.style.setProperty('--accent', S.settings.accent);
  r.style.setProperty('--on-accent', onAccent(S.settings.accent));
  r.lang = S.settings.lang;
  document.body.classList.toggle('fx', !!S.settings.fx);
  renderNav(); renderHud();
  $('#title').textContent = t(view);
  $('#crumb').textContent = `[${pad(ORDER.indexOf(view) + 1)}/${pad(ORDER.length)}]`;
  const f = $('#add'); f.hidden = !WITH_ADD.has(view); if (!f.hidden) renderAdd();
  const v = $('#view'); v.innerHTML = '';
  ({ dashboard: dashView, today: listView, week: listView, all: allView, calendar: calView, board: boardView, focus: focusView, pomodoro: pomoView, stats: statsView, settings: settingsView, data: dataView })[view](v);
}

function renderNav() {
  const n = $('#nav'); n.innerHTML = '';
  const st = todayStats(), counts = { today: st.due, all: st.open };
  MENU.forEach(([g, items]) => {
    n.append(el('div', 'grp', t(g)));
    items.forEach(([k, ic]) => {
      const i = ORDER.indexOf(k) + 1;
      const b = el('button', view === k ? 'on' : '', `<span class="ic">${ic}</span>${t(k)}${counts[k] ? ` <span class="n">${counts[k]}</span>` : ''}${i <= 10 ? `<kbd>${i % 10}</kbd>` : ''}`);
      if (view === k) b.setAttribute('aria-current', 'page');
      b.onclick = () => go(k); n.append(b);
    });
  });
}

function renderHud() {
  const st = todayStats(), h = $('#hud');
  h.innerHTML = `<span class="chip opt">${t('streak')} <b>${streak()}</b></span><span class="chip opt">${t('progress')} <b>${st.pct}%</b></span>${st.over ? `<span class="chip">${t('overdue')} <b style="color:var(--hi)">${st.over}</b></span>` : ''}`;
  if (P.run || P.left !== P.total()) {
    const c = el('span', 'chip live', `⏱ <b data-pomo>${fmt(P.left)}</b>`); c.onclick = () => go('pomodoro'); c.title = t('pomodoro'); h.append(c);
  }
}

const prioOpts = () => `<option value="high">${t('high')}</option><option value="med">${t('med')}</option><option value="low">${t('low')}</option>`;
const recOpts = () => `<option value="">${t('none')}</option><option value="daily">${t('daily')}</option><option value="weekly">${t('weekly')}</option><option value="monthly">${t('monthly')}</option>`;

function renderAdd() {
  const f = $('#add'); const keep = f.querySelector('[name=due]')?.value || (view === 'today' ? today() : '');
  f.innerHTML = `<input name="title" placeholder="${esc(t('ph'))}" required aria-label="${esc(t('ph'))}">
    <input name="due" type="date" value="${keep}" aria-label="Due date">
    <select name="prio" aria-label="Priority">${prioOpts()}</select>
    <input name="tag" placeholder="${esc(t('tag'))}" list="tags" size="12" aria-label="${esc(t('tag'))}">
    <datalist id="tags">${tags().map(x => `<option value="${esc(x)}">`).join('')}</datalist>
    <select name="rec" aria-label="Repeat">${recOpts()}</select>
    <button class="btn primary">+ ${t('add')}</button>`;
  f.querySelector('[name=prio]').value = 'med';
  f.onsubmit = e => {
    e.preventDefault(); const d = Object.fromEntries(new FormData(f));
    S.tasks.unshift({ id: crypto.randomUUID(), title: d.title.trim(), due: d.due, prio: d.prio, tag: d.tag.trim(), rec: d.rec, notes: '', subs: [], status: 'todo' });
    update(); $('#add [name=title]').focus();
  };
}

function taskEl(x) {
  const td = today();
  const subsDone = x.subs.filter(s => s.done).length;
  const e = el('div', `task ${x.prio} ${x.status === 'done' ? 'done' : ''} ${open === x.id ? 'opened' : ''}`); e.draggable = true;
  e.innerHTML = `<div class="row"><input type="checkbox" ${x.status === 'done' ? 'checked' : ''} aria-label="done"><div class="ttl" tabindex="0" role="button">${esc(x.title)}</div></div>
    <div class="meta"><span class="p-${x.prio}">■ ${t(x.prio)}</span>${x.due ? `<span class="${x.due < td && x.status !== 'done' ? 'over' : ''}">${x.due}</span>` : ''}${x.tag ? `<span>#${esc(x.tag)}</span>` : ''}${x.status === 'doing' ? `<span>▶ ${t('doing')}</span>` : ''}${x.rec ? `<span>↻ ${t(x.rec)}</span>` : ''}${x.subs.length ? `<span>${subsDone}/${x.subs.length}</span>` : ''}</div>`;
  e.querySelector('input').onchange = ev => { setStatus(x, ev.target.checked ? 'done' : 'todo'); update(); };
  const ttl = e.querySelector('.ttl');
  ttl.onclick = () => { open = open === x.id ? null : x.id; render(); };
  ttl.onkeydown = ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); ttl.click(); } };
  e.ondragstart = () => { dragId = x.id; e.classList.add('drag'); };
  e.ondragend = () => e.classList.remove('drag');
  e.ondragover = ev => ev.preventDefault();
  e.ondrop = ev => {
    if (view === 'board' && byId(dragId)?.status !== x.status) return; // let the column handle status change
    ev.preventDefault(); ev.stopPropagation(); if (!dragId || dragId === x.id) return;
    const m = byId(dragId); S.tasks.splice(S.tasks.indexOf(m), 1); S.tasks.splice(S.tasks.indexOf(x), 0, m); update();
  };
  if (open === x.id) e.append(editor(x));
  return e;
}

function editor(x) {
  const f = el('div', 'edit');
  f.innerHTML = `<div class="g"><input data-k="title" value="${esc(x.title)}" style="flex:1 1 200px"><input data-k="due" type="date" value="${x.due || ''}">
    <select data-k="prio">${prioOpts()}</select>
    <input data-k="tag" value="${esc(x.tag)}" placeholder="${esc(t('tag'))}" size="10">
    <select data-k="rec">${recOpts()}</select>
    <select data-k="status"><option value="todo">${t('todo')}</option><option value="doing">${t('doing')}</option><option value="done">${t('done')}</option></select></div>
    <textarea data-k="notes" rows="2" placeholder="${esc(t('notes'))}">${esc(x.notes)}</textarea><div class="subs"></div>
    <input class="newsub" placeholder="${esc(t('sub'))}"><div><button class="btn danger sm del">${t('del')}</button></div>`;
  f.querySelectorAll('[data-k]').forEach(i => {
    if (i.tagName === 'SELECT') i.value = x[i.dataset.k] || '';
    i.onchange = () => { if (i.dataset.k === 'status') setStatus(x, i.value); else x[i.dataset.k] = i.value; update(); };
  });
  const sb = f.querySelector('.subs');
  x.subs.forEach((s, i) => {
    const r = el('label', '', `<input type="checkbox" ${s.done ? 'checked' : ''}> <span>${esc(s.t)}</span> <button class="btn sm" style="margin-left:auto" aria-label="remove">×</button>`);
    r.firstChild.onchange = e => { s.done = e.target.checked; update(); };
    r.lastChild.onclick = e => { e.preventDefault(); x.subs.splice(i, 1); update(); };
    sb.append(r);
  });
  f.querySelector('.newsub').onkeydown = e => { if (e.key === 'Enter' && e.target.value.trim()) { x.subs.push({ t: e.target.value.trim(), done: false }); update(); document.querySelector('.newsub')?.focus(); } };
  f.querySelector('.del').onclick = () => { S.tasks.splice(S.tasks.indexOf(x), 1); open = null; update(); toast(t('saved')); };
  return f;
}

// ---- sections ----
function dashView(v) {
  const st = todayStats();
  const tiles = el('div', 'grid tiles');
  tiles.innerHTML = `
    <div class="card"><h3>${t('streak')}</h3><div class="big-num">${streak()}<small>${t('days')}</small></div></div>
    <div class="card"><h3>${t('progress')}</h3><div class="big-num">${st.pct}<small>%</small></div><div class="bar"><i style="width:${st.pct}%"></i></div></div>
    <div class="card"><h3>${t('doneToday')}</h3><div class="big-num">${st.doneN}<small>/ ${st.doneN + st.due}</small></div></div>
    <div class="card"><h3>${t('overdue')}</h3><div class="big-num ${st.over ? 'crit' : ''}">${st.over ? '⚠ ' : ''}${st.over}</div></div>
    <div class="card"><h3>${t('openN')}</h3><div class="big-num">${st.open}</div></div>`;
  v.append(tiles);
  const two = el('div', 'grid two'); two.style.marginTop = '14px';
  const up = el('div', 'card', `<h3>${t('upNext')}</h3>`);
  const L = ranked().slice(0, 5);
  if (!L.length) up.append(el('div', 'empty', t('focusEmpty')));
  L.forEach(x => up.append(taskEl(x)));
  const more = el('button', 'btn sm', t('seeAll') + ' →'); more.onclick = () => go('all'); up.append(more);
  const ch = el('div', 'card', `<h3>${t('last7')}</h3>`); ch.append(dayChart(7));
  const pc = el('div', 'card', `<h3>${t('pomodoro')} · ${t(P.mode === 'focus' ? 'focusT' : 'breakT')}</h3><div class="big-num" data-pomo>${fmt(P.left)}</div>`);
  const pb = el('button', 'btn', P.run ? t('pause') : t('start')); pb.style.marginTop = '8px'; pb.onclick = () => { P.toggle(); render(); }; pc.append(pb);
  const side = el('div', 'stack'); side.append(ch, pc);
  two.append(up, side); v.append(two);
}

function listView(v) {
  const td = today(), wk = addDays(td, 7);
  let L = openTasks();
  if (view === 'today') L = L.filter(x => x.due && x.due <= td).sort((a, b) => PR[a.prio] - PR[b.prio]);
  if (view === 'week') L = L.filter(x => x.due && x.due <= wk).sort((a, b) => a.due.localeCompare(b.due));
  if (!L.length) return v.append(el('div', 'empty', t('empty')));
  L.forEach(x => v.append(taskEl(x)));
}

function allView(v) {
  const bar = el('div', 'filters');
  bar.innerHTML = `<input type="search" id="q" placeholder="${esc(t('search'))}" value="${esc(F.q)}" aria-label="${esc(t('search'))}">
    <select id="ft"><option value="">${t('anyTag')}</option>${tags().map(x => `<option value="${esc(x)}">#${esc(x)}</option>`).join('')}</select>
    <select id="fp"><option value="">${t('anyPrio')}</option>${prioOpts()}</select>
    <select id="fs"><option value="">${t('anyStatus')}</option><option value="todo">${t('todo')}</option><option value="doing">${t('doing')}</option><option value="done">${t('done')}</option></select>`;
  const res = el('div');
  const draw = () => {
    const q = F.q.toLowerCase();
    const L = S.tasks.filter(x => (!q || (x.title + ' ' + x.notes + ' ' + x.tag).toLowerCase().includes(q)) && (!F.tag || x.tag === F.tag) && (!F.prio || x.prio === F.prio) && (!F.status || x.status === F.status));
    res.innerHTML = `<div class="meta" style="margin-bottom:8px">${L.length} ${t('results')}</div>`;
    if (!L.length) res.append(el('div', 'empty', t('empty')));
    L.forEach(x => res.append(taskEl(x)));
  };
  [['#q', 'q', 'oninput'], ['#ft', 'tag', 'onchange'], ['#fp', 'prio', 'onchange'], ['#fs', 'status', 'onchange']].forEach(([s, k, ev]) => {
    const i = bar.querySelector(s); if (i.tagName === 'SELECT') i.value = F[k]; i[ev] = () => { F[k] = i.value; draw(); };
  });
  v.append(bar, res); draw();
}

function boardView(v) {
  const b = el('div', 'board');
  for (const k of ['todo', 'doing', 'done']) {
    const L = S.tasks.filter(x => x.status === k);
    const c = el('div', 'col', `<h3><span>${t(k)}</span><span>${L.length}</span></h3>`);
    c.ondragover = e => { e.preventDefault(); c.classList.add('over-col'); };
    c.ondragleave = () => c.classList.remove('over-col');
    c.ondrop = e => { e.preventDefault(); const m = byId(dragId); if (m && m.status !== k) { setStatus(m, k); update(); } else c.classList.remove('over-col'); };
    L.forEach(x => c.append(taskEl(x)));
    b.append(c);
  }
  v.append(b);
}

function calView(v) {
  const y = cal.getFullYear(), m = cal.getMonth(), td = today();
  const head = el('div', 'row cal-head', `<button class="btn" aria-label="Previous month">‹</button><strong>${cal.toLocaleDateString(S.settings.lang, { month: 'long', year: 'numeric' })}</strong><button class="btn" aria-label="Next month">›</button>`);
  head.firstChild.onclick = () => { cal = new Date(y, m - 1, 1); render(); };
  head.lastChild.onclick = () => { cal = new Date(y, m + 1, 1); render(); };
  v.append(head);
  const g = el('div', 'cal');
  for (let i = 0; i < 7; i++) g.append(el('div', 'h', new Date(2024, 0, 1 + i).toLocaleDateString(S.settings.lang, { weekday: 'short' })));
  const start = new Date(y, m, 1 - ((new Date(y, m, 1).getDay() + 6) % 7));
  for (let i = 0; i < 42; i++) {
    const d = new Date(start); d.setDate(start.getDate() + i); const k = iso(d);
    const T = S.tasks.filter(x => x.due === k);
    const c = el('div', `d ${k === td ? 't' : ''} ${d.getMonth() !== m ? 'x' : ''} ${T.length ? 'has' : ''}`, `<b>${pad(d.getDate())}</b>`);
    T.forEach(x => c.append(el('span', x.status === 'done' ? 'ok' : '', esc(x.title))));
    c.title = T.map(x => x.title).join('\n');
    c.onclick = () => { $('#add [name=due]').value = k; $('#add [name=title]').focus(); };
    g.append(c);
  }
  v.append(g);
}

function focusView(v) {
  const L = ranked();
  if (!L.length) return v.append(el('div', 'empty', t('focusEmpty')));
  const x = L[focusIdx % L.length];
  const f = el('div', 'card focus', `<div class="ring">${pad(focusIdx % L.length + 1)} / ${pad(L.length)} · <span class="p-${x.prio}">${t(x.prio)}</span>${x.due ? ' · ' + x.due : ''}${x.tag ? ' · #' + esc(x.tag) : ''}</div>
    <div class="big">${esc(x.title)}</div>${x.notes ? `<p class="meta" style="justify-content:center">${esc(x.notes)}</p>` : ''}
    <div class="row" style="justify-content:center"><button class="btn primary" id="fd">✓ ${t('done')}</button><button class="btn" id="fs">${t('skip')} →</button><button class="btn" id="fp">⏱ ${P.run ? fmt(P.left) : t('start')}</button></div>`);
  f.querySelector('#fd').onclick = () => { setStatus(x, 'done'); update(); };
  f.querySelector('#fs').onclick = () => { focusIdx++; render(); };
  f.querySelector('#fp').onclick = () => { P.toggle(); render(); };
  v.append(f);
}

function pomoView(v) {
  const pct = Math.round((1 - P.left / P.total()) * 100);
  const c = el('div', 'card pomo-face', `<div class="pomo-mode">${t(P.mode === 'focus' ? 'focusT' : 'breakT')}</div><div class="pomo-time" data-pomo>${fmt(P.left)}</div>
    <div class="bar"><i data-pomo-bar style="width:${pct}%"></i></div>
    <div class="row"><button class="btn primary" id="pp">${P.run ? t('pause') : t('start')}</button><button class="btn" id="pk">${t('skipBreak')}</button><button class="btn" id="pr">${t('reset')}</button></div>`);
  c.querySelector('#pp').onclick = () => { P.toggle(); render(); };
  c.querySelector('#pk').onclick = () => { P.next(false); render(); };
  c.querySelector('#pr').onclick = () => { P.reset(); render(); };
  const info = el('div', 'grid tiles'); info.style.marginTop = '14px';
  info.innerHTML = `<div class="card"><h3>${t('sessions')}</h3><div class="big-num">${S.pomoLog[today()] || 0}</div></div>`;
  for (const [k, lab] of [['focusMin', 'focusMin'], ['breakMin', 'breakMin']]) {
    const d = el('div', 'card', `<h3>${t(lab)}</h3><input type="number" min="1" max="180" value="${S.settings[k]}" style="width:100px;font-family:var(--mono)">`);
    d.querySelector('input').onchange = e => { S.settings[k] = Math.max(1, Math.min(180, +e.target.value || 1)); if (!P.run) P.left = P.total(); update(); };
    info.append(d);
  }
  v.append(c, info);
}

function dayChart(n) {
  const td = today(), days = Array.from({ length: n }, (_, i) => addDays(td, i - n + 1));
  const vals = days.map(d => S.log[d] || 0), max = Math.max(1, ...vals);
  const wrap = el('div');
  const ch = el('div', 'chart'); ch.setAttribute('role', 'img'); ch.setAttribute('aria-label', `${t('last' + n)}: ` + days.map((d, i) => `${d} ${vals[i]}`).join(', '));
  ch.append(el('span', 'max', String(max)));
  days.forEach((d, i) => {
    const c = el('div', `c ${vals[i] ? '' : 'zero'} ${d === td ? 'today' : ''}`, `<i style="height:${vals[i] ? vals[i] / max * 100 : 1.5}%"></i><span class="tip">${d} · ${vals[i]} ${t('doneN')}</span>`);
    c.tabIndex = 0; ch.append(c);
  });
  const ax = el('div', 'axis', days.map(d => `<span>${new Date(d + 'T00:00').toLocaleDateString(S.settings.lang, { weekday: 'narrow' })}</span>`).join(''));
  const tb = el('details', '', `<summary>${t('table')}</summary><table><tr><th>${t('date')}</th><th>${t('count')}</th></tr>${days.map((d, i) => `<tr><td>${d}</td><td>${vals[i]}</td></tr>`).join('')}</table>`);
  wrap.append(ch, ax, tb);
  return wrap;
}

function hbars(rows, cls = () => '') {
  if (!rows.length) return el('div', 'empty', t('nothing'));
  const max = Math.max(1, ...rows.map(r => r[1]));
  return el('div', 'hbars', rows.map(([k, n, raw]) => `<span>${esc(k)}</span><div class="track"><i class="${cls(raw)}" style="width:${n / max * 100}%"></i></div><span class="v">${n}</span>`).join(''));
}

function statsView(v) {
  const op = openTasks(), total = Object.values(S.log).reduce((a, b) => a + b, 0);
  const tiles = el('div', 'grid tiles');
  tiles.innerHTML = `<div class="card"><h3>${t('totalDone')}</h3><div class="big-num">${total}</div></div>
    <div class="card"><h3>${t('streak')}</h3><div class="big-num">${streak()}<small>${t('days')}</small></div></div>
    <div class="card"><h3>${t('openN')}</h3><div class="big-num">${op.length}</div></div>
    <div class="card"><h3>${t('totalTasks')}</h3><div class="big-num">${S.tasks.length}</div></div>`;
  const c14 = el('div', 'card', `<h3>${t('last14')}</h3>`); c14.style.marginTop = '14px'; c14.append(dayChart(14));
  const tagCount = {}; op.forEach(x => { const k = x.tag ? '#' + x.tag : t('untagged'); tagCount[k] = (tagCount[k] || 0) + 1; });
  const two = el('div', 'grid two'); two.style.marginTop = '14px';
  const ct = el('div', 'card', `<h3>${t('byTag')}</h3>`); ct.append(hbars(Object.entries(tagCount).sort((a, b) => b[1] - a[1]).slice(0, 8)));
  const cp = el('div', 'card', `<h3>${t('byPrio')}</h3>`);
  cp.append(op.length ? hbars(['high', 'med', 'low'].map(p => [t(p), op.filter(x => x.prio === p).length, p]), p => 'p-' + p) : el('div', 'empty', t('nothing')));
  two.append(ct, cp);
  v.append(tiles, c14, two);
}

function settingsView(v) {
  const c = el('div', 'card');
  c.innerHTML = `<div class="set">
    <label>${t('lang')}</label><div><select id="sl"><option value="en">English</option><option value="vi">Tiếng Việt</option></select></div>
    <label>${t('theme')}</label><div class="seg" id="st"><button data-v="1" class="${S.settings.dark ? 'on' : ''}">◐ ${t('dark')}</button><button data-v="0" class="${S.settings.dark ? '' : 'on'}">○ ${t('light')}</button></div>
    <label>${t('accent')}</label><div class="row wrap" id="sa">${ACCENTS.map(a => `<button class="sw ${a === S.settings.accent ? 'on' : ''}" data-v="${a}" style="background:${a};color:${a}" aria-label="${a}"></button>`).join('')}<input type="color" value="${S.settings.accent}" aria-label="Custom accent"></div>
    <label>${t('effects')}</label><div class="seg" id="sf"><button data-v="1" class="${S.settings.fx ? 'on' : ''}">On</button><button data-v="0" class="${S.settings.fx ? '' : 'on'}">Off</button></div>
  </div>`;
  const sl = c.querySelector('#sl'); sl.value = S.settings.lang; sl.onchange = () => { S.settings.lang = sl.value; update(); };
  c.querySelectorAll('#st button').forEach(b => b.onclick = () => { S.settings.dark = b.dataset.v === '1'; update(); });
  c.querySelectorAll('#sf button').forEach(b => b.onclick = () => { S.settings.fx = b.dataset.v === '1'; update(); });
  c.querySelectorAll('#sa .sw').forEach(b => b.onclick = () => { S.settings.accent = b.dataset.v; update(); });
  c.querySelector('#sa input').onchange = e => { S.settings.accent = e.target.value; update(); };
  const k = el('div', 'card', `<h3>${t('shortcuts')}</h3><div class="keys">
    <span><kbd>1</kbd>…<kbd>0</kbd></span><span>${t('kNav')}</span><span><kbd>N</kbd></span><span>${t('kNew')}</span>
    <span><kbd>/</kbd></span><span>${t('kSearch')}</span><span><kbd>Esc</kbd></span><span>${t('kEsc')}</span></div>`);
  k.style.marginTop = '14px';
  v.append(c, k);
}

function dataView(v) {
  const c = el('div', 'card', `<h3>${t('backup')}</h3><p class="meta" style="margin:0 0 12px">${t('dataHint')}</p><div class="row wrap"></div>`);
  const ex = el('button', 'btn', '⇩ ' + t('export')); ex.onclick = () => {
    const a = el('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' })); a.download = `todo-${today()}.json`; a.click();
  };
  const im = el('button', 'btn', '⇧ ' + t('import')); im.onclick = () => {
    const f = el('input'); f.type = 'file'; f.accept = '.json';
    f.onchange = async () => { try { const d = JSON.parse(await f.files[0].text()); if (!Array.isArray(d.tasks)) throw 0; S = { ...S, ...d, settings: { ...S.settings, ...d.settings } }; update(); toast(t('imported')); } catch { toast(t('invalid')); } };
    f.click();
  };
  c.querySelector('.row').append(ex, im);
  const done = S.tasks.filter(x => x.status === 'done').length;
  const d = el('div', 'card', `<h3>${t('danger')}</h3>`); d.style.marginTop = '14px';
  const cl = el('button', 'btn danger', `${t('clearDone')} (${done})`); cl.disabled = !done;
  cl.onclick = () => { if (confirm(t('confirmClear'))) { S.tasks = S.tasks.filter(x => x.status !== 'done'); update(); toast(t('cleared')); } };
  d.append(cl);
  v.append(c, d);
}

// ---- pomodoro (runs outside render so it keeps counting) ----
const fmt = s => `${pad(Math.floor(s / 60))}:${pad(s % 60)}`;
function beep() { try { const a = new AudioContext(), o = a.createOscillator(); o.connect(a.destination); o.start(); o.stop(a.currentTime + .3); } catch { } }
const P = {
  mode: 'focus', left: 25 * 60, run: null,
  total() { return (this.mode === 'focus' ? S.settings.focusMin : S.settings.breakMin) * 60; },
  toggle() { if (this.run) { clearInterval(this.run); this.run = null; } else this.run = setInterval(() => this.tick(), 1000); },
  next(finished) {
    if (finished && this.mode === 'focus') { S.pomoLog[today()] = (S.pomoLog[today()] || 0) + 1; save(); }
    this.mode = this.mode === 'focus' ? 'break' : 'focus'; this.left = this.total();
  },
  reset() { clearInterval(this.run); this.run = null; this.mode = 'focus'; this.left = this.total(); document.title = 'To-Do'; },
  tick() {
    if (--this.left <= 0) { beep(); toast(t('fin')); this.next(true); render(); }
    document.querySelectorAll('[data-pomo]').forEach(e => e.textContent = fmt(this.left));
    const b = document.querySelector('[data-pomo-bar]'); if (b) b.style.width = Math.round((1 - this.left / this.total()) * 100) + '%';
    document.title = `${fmt(this.left)} · To-Do`;
  }
};

// ---- events ----
window.addEventListener('hashchange', fromHash);
$('#menuBtn').onclick = () => setMenu(!$('#nav').classList.contains('open'));
$('#scrim').onclick = () => setMenu(false);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { setMenu(false); if (open) { open = null; render(); } return; }
  const tg = e.target.tagName;
  if (e.ctrlKey || e.metaKey || e.altKey || ['INPUT', 'TEXTAREA', 'SELECT'].includes(tg)) return;
  if (/^[0-9]$/.test(e.key)) { const k = ORDER[(+e.key + 9) % 10]; if (k) go(k); }
  else if (e.key === 'n') { e.preventDefault(); if (!WITH_ADD.has(view)) go('today'); setTimeout(() => $('#add [name=title]')?.focus()); }
  else if (e.key === '/') { e.preventDefault(); go('all'); setTimeout(() => $('#q')?.focus()); }
});

fetch('/api/state').then(r => r.json()).then(d => {
  if (d && d.tasks) {
    S = { ...S, ...d, settings: { ...S.settings, ...d.settings }, pomoLog: d.pomoLog || {} };
    if (!d.settings?.v) { if (S.settings.accent === OLD_ACCENT) S.settings.accent = ACCENTS[0]; S.settings.dark = true; }
  }
  S.settings.v = 2; P.left = P.total(); fromHash();
}).catch(fromHash);
