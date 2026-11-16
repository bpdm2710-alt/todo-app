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
    sub: 'Add subtask, press Enter', start: 'Start', pause: 'Pause', reset: 'Reset', skip: 'Skip', empty: 'Nothing here yet, {n}. Add a task above.', focusEmpty: 'All clear, {n}. Nothing left to focus on.',
    theme: 'Theme', dark: 'Dark', light: 'Light', lang: 'Language', accent: 'Accent', focusT: 'Focus time', breakT: 'Break', overdue: 'Overdue', dueN: 'due', doneN: 'done', imported: 'Imported',
    saved: 'Task deleted', fin: 'Session finished. Take a breath, {n}', search: 'Search tasks…', anyTag: 'Any tag', anyPrio: 'Any priority', anyStatus: 'Any status', openN: 'Open', upNext: 'Up next',
    last7: 'Completed, last 7 days', last14: 'Completed, last 14 days', byTag: 'Open tasks by tag', byPrio: 'Open tasks by priority', totalDone: 'Completed all-time', totalTasks: 'Tasks stored',
    clearDone: 'Clear completed tasks', confirmClear: 'Delete all completed tasks?', cleared: 'Completed tasks cleared', focusMin: 'Focus minutes', breakMin: 'Break minutes',
    sessions: 'Sessions today', shortcuts: 'Keyboard shortcuts', untagged: 'untagged', invalid: 'Invalid file', doneToday: 'Done today', effects: 'Scanline effect',
    seeAll: 'See all', kNav: 'Jump to menu item', kNew: 'New task', kSearch: 'Search', kEsc: 'Close menu / editor', table: 'Show as table', date: 'Date', count: 'Count',
    backup: 'Backup', danger: 'Cleanup', dataHint: 'Everything is stored in todo.db on the machine running the app.', dataHintLocal: 'Your data is saved in this browser on this device only. Export JSON now and then as a backup, and import it to move to another device.', saveFail: 'Could not save: browser storage is full or blocked', skipBreak: 'Skip phase', nothing: 'No data yet', results: 'results',
    schedule: 'Daily schedule', gMorning: 'Good morning', gNoon: 'Good afternoon', gAfternoon: 'Good afternoon', gEvening: 'Good evening', gNight: 'Up late',
    tasksDue: 'tasks due today', blocksLeft: 'time blocks left', schedProgress: 'Schedule progress', blocks: 'blocks', nowDoing: 'Now', nextUp: 'Next', nowTag: 'NOW', missed: 'Missed',
    schedEmpty: 'No time blocks yet, {n}. Add one with the form.', addBlock: 'Add time block', blockPh: 'What are you doing then?',
    cat_work: 'Work', cat_study: 'Study', cat_health: 'Health', cat_rest: 'Rest', cat_me: 'Personal',
    rep_once: 'This day only', rep_all: 'Every day', rep_wd: 'Weekdays', rep_we: 'Weekend', routineHint: 'Repeating block: changes apply to every matching day.',
    blockAdded: 'Time block added', blockDeleted: 'Time block deleted', allDone: 'Day complete. Great work, {n}!', openSched: 'Open schedule', todaySched: 'Today\'s schedule',
    name: 'Your name', bgAnim: 'Animated background', motion: 'Interaction effects', on: 'On', off: 'Off', start_t: 'Start', end_t: 'End', logout: 'Sign out'
  },
  vi: {
    dashboard: 'Tổng quan', today: 'Hôm nay', week: 'Tuần này', all: 'Tất cả', calendar: 'Lịch', board: 'Bảng', focus: 'Tập trung', pomodoro: 'Pomodoro', stats: 'Thống kê', settings: 'Cài đặt', data: 'Dữ liệu',
    grpTasks: 'Công việc', grpViews: 'Chế độ xem', grpTools: 'Công cụ', grpSys: 'Hệ thống',
    add: 'Thêm việc', ph: 'Cần làm gì?', tag: 'Nhãn / môn học', high: 'Cao', med: 'Vừa', low: 'Thấp', none: 'Không lặp', daily: 'Hằng ngày', weekly: 'Hằng tuần', monthly: 'Hằng tháng',
    todo: 'Cần làm', doing: 'Đang làm', done: 'Xong', streak: 'Chuỗi ngày', days: 'ngày', progress: 'Tiến độ hôm nay', export: 'Xuất JSON', import: 'Nhập JSON', del: 'Xóa', notes: 'Ghi chú',
    sub: 'Thêm việc con, nhấn Enter', start: 'Bắt đầu', pause: 'Tạm dừng', reset: 'Đặt lại', skip: 'Bỏ qua', empty: 'Chưa có gì cả, {n} ơi. Thêm việc ở trên nhé.', focusEmpty: 'Xong hết rồi {n} ơi. Không còn gì để tập trung.',
    theme: 'Giao diện', dark: 'Tối', light: 'Sáng', lang: 'Ngôn ngữ', accent: 'Màu chủ đạo', focusT: 'Thời gian tập trung', breakT: 'Nghỉ', overdue: 'Quá hạn', dueN: 'đến hạn', doneN: 'đã xong', imported: 'Đã nhập',
    saved: 'Đã xóa việc', fin: 'Hết phiên, nghỉ chút nhé {n}', search: 'Tìm việc…', anyTag: 'Mọi nhãn', anyPrio: 'Mọi mức', anyStatus: 'Mọi trạng thái', openN: 'Đang mở', upNext: 'Việc tiếp theo',
    last7: 'Hoàn thành 7 ngày qua', last14: 'Hoàn thành 14 ngày qua', byTag: 'Việc mở theo nhãn', byPrio: 'Việc mở theo mức ưu tiên', totalDone: 'Tổng đã hoàn thành', totalTasks: 'Số việc đã lưu',
    clearDone: 'Xóa các việc đã xong', confirmClear: 'Xóa tất cả việc đã xong?', cleared: 'Đã xóa các việc đã xong', focusMin: 'Phút tập trung', breakMin: 'Phút nghỉ',
    sessions: 'Phiên hôm nay', shortcuts: 'Phím tắt', untagged: 'không nhãn', invalid: 'Tệp không hợp lệ', doneToday: 'Xong hôm nay', effects: 'Hiệu ứng quét dòng',
    seeAll: 'Xem tất cả', kNav: 'Chuyển mục menu', kNew: 'Việc mới', kSearch: 'Tìm kiếm', kEsc: 'Đóng menu / trình sửa', table: 'Xem dạng bảng', date: 'Ngày', count: 'Số lượng',
    backup: 'Sao lưu', danger: 'Dọn dẹp', dataHint: 'Mọi dữ liệu được lưu trong todo.db trên máy chạy ứng dụng.', dataHintLocal: 'Dữ liệu được lưu ngay trong trình duyệt của thiết bị này. Thỉnh thoảng nhớ Xuất JSON để sao lưu, và Nhập JSON để chuyển sang máy khác.', saveFail: 'Không lưu được: bộ nhớ trình duyệt đầy hoặc bị chặn', skipBreak: 'Chuyển pha', nothing: 'Chưa có dữ liệu', results: 'kết quả',
    schedule: 'Lịch mỗi ngày', gMorning: 'Chào buổi sáng', gNoon: 'Chào buổi trưa', gAfternoon: 'Chào buổi chiều', gEvening: 'Chào buổi tối', gNight: 'Khuya rồi',
    tasksDue: 'việc đến hạn hôm nay', blocksLeft: 'khung giờ còn lại', schedProgress: 'Tiến độ lịch ngày', blocks: 'khung', nowDoing: 'Đang diễn ra', nextUp: 'Tiếp theo', nowTag: 'ĐANG LÀM', missed: 'Đã lỡ',
    schedEmpty: 'Chưa có khung giờ nào, {n} ơi. Thêm bằng biểu mẫu nhé.', addBlock: 'Thêm khung giờ', blockPh: 'Làm gì trong khung này?',
    cat_work: 'Công việc', cat_study: 'Học tập', cat_health: 'Sức khỏe', cat_rest: 'Nghỉ ngơi', cat_me: 'Cá nhân',
    rep_once: 'Chỉ ngày này', rep_all: 'Mỗi ngày', rep_wd: 'Ngày thường', rep_we: 'Cuối tuần', routineHint: 'Khung lặp lại: thay đổi áp dụng cho mọi ngày tương ứng.',
    blockAdded: 'Đã thêm khung giờ', blockDeleted: 'Đã xóa khung giờ', allDone: 'Hoàn tất cả ngày rồi, giỏi lắm {n}!', openSched: 'Mở lịch ngày', todaySched: 'Lịch hôm nay',
    name: 'Tên của bạn', bgAnim: 'Nền động', motion: 'Hiệu ứng tương tác', on: 'Bật', off: 'Tắt', start_t: 'Bắt đầu', end_t: 'Kết thúc', logout: 'Đăng xuất'
  }
};

const MENU = [
  ['grpTasks', [['dashboard', '◈'], ['schedule', '◷'], ['today', '◉'], ['week', '▤'], ['all', '≣']]],
  ['grpViews', [['calendar', '▦'], ['board', '▥'], ['focus', '◎']]],
  ['grpTools', [['pomodoro', '⏱'], ['stats', '▲']]],
  ['grpSys', [['settings', '⚙'], ['data', '⇅']]]
];
const ORDER = MENU.flatMap(g => g[1].map(x => x[0]));
const WITH_ADD = new Set(['today', 'week', 'all', 'calendar', 'board']);
const ACCENTS = ['#00b4d8', '#00e5ff', '#ff2e88', '#2dffa0', '#ffc23d', '#a66bff', '#ff6b2d'];
const OLD_ACCENT = '#1f6f8b';

let S = { tasks: [], settings: { lang: 'vi', dark: false, accent: ACCENTS[0], fx: true, focusMin: 25, breakMin: 5, name: 'Minh', bgAnim: true, motion: true }, log: {}, pomoLog: {}, sched: {} };
let view = 'dashboard', cal = new Date(), open = null, dragId = null, focusIdx = 0, lastView = null, justId = null;
const who = () => (S.settings.name || '').trim() || 'Minh';
const RM = () => !S.settings.motion || matchMedia('(prefers-reduced-motion: reduce)').matches;
const F = { q: '', tag: '', prio: '', status: '' };
const t = k => ((TX[S.settings.lang] || TX.en)[k] || TX.en[k] || k).replace('{n}', who());

let timer;
// Two storage modes: the Flask server (todo.db), or this browser only when the page is a static site (GitHub Pages).
const LOCAL = !!window.MINH_STATIC, KEY = 'minh-os-state';
const save = () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    if (LOCAL) { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch { toast(t('saveFail')); } return; }
    fetch('api/state', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(S) }).then(authCheck);
  }, 300);
};
const authCheck = r => { if (r.status === 401) location.href = 'login'; return r; };
function loadState() {
  if (!LOCAL) return fetch('api/state').then(authCheck).then(r => r.json());
  navigator.storage?.persist?.(); // ask the browser not to evict the data
  try { return Promise.resolve(JSON.parse(localStorage.getItem(KEY) || '{}')); } catch { return Promise.resolve({}); }
}
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
  const dark = !!S.settings.dark;
  document.querySelector('meta[name=theme-color]').content = dark ? '#0a0f2c' : '#e6fbff';
  BG.set({ bg: dark ? '#0a0f2c' : '#e6fbff', accent: S.settings.accent, hi: dark ? '#ff3d9a' : '#3dffb0', vio: dark ? '#8a6bff' : '#7aa8ff', dark });
  BG.run(S.settings.bgAnim && !matchMedia('(prefers-reduced-motion: reduce)').matches && !document.hidden);
  const entering = view !== lastView; lastView = view;
  renderNav(entering); renderHud();
  $('#title').textContent = t(view);
  $('#crumb').textContent = `[${pad(ORDER.indexOf(view) + 1)}/${pad(ORDER.length)}]`;
  const f = $('#add'); f.hidden = !WITH_ADD.has(view); if (!f.hidden) renderAdd();
  const v = $('#view'); v.innerHTML = '';
  ({ dashboard: dashView, schedule: schedView, today: listView, week: listView, all: allView, calendar: calView, board: boardView, focus: focusView, pomodoro: pomoView, stats: statsView, settings: settingsView, data: dataView })[view](v);
  const m = $('main'); m.classList.remove('enter');
  if (entering && !RM()) {
    void m.offsetWidth; m.classList.add('enter');
    v.querySelectorAll(':scope > *, .grid > *, .timeline > *, .stack > *').forEach(c => c.style.setProperty('--i', [...c.parentNode.children].indexOf(c)));
    countUp(v);
    const h = $('#title'); h.classList.remove('glitch'); void h.offsetWidth; h.classList.add('glitch');
  }
  justId = null;
}

function renderNav(entering) {
  const n = $('#nav'); n.innerHTML = '';
  const st = todayStats(), counts = { today: st.due, all: st.open };
  MENU.forEach(([g, items]) => {
    n.append(el('div', 'grp', t(g)));
    items.forEach(([k, ic]) => {
      const i = ORDER.indexOf(k) + 1;
      const b = el('button', view === k ? (entering ? 'on just' : 'on') : '', `<span class="ic">${ic}</span>${t(k)}${counts[k] ? ` <span class="n">${counts[k]}</span>` : ''}${i <= 10 ? `<kbd>${i % 10}</kbd>` : ''}`);
      if (view === k) b.setAttribute('aria-current', 'page');
      b.onclick = () => go(k); n.append(b);
    });
  });
}

function renderHud() {
  const st = todayStats(), h = $('#hud');
  const nb = view !== 'schedule' && blocksFor(today()).find(b => blockState(b, today()) === 'now');
  h.innerHTML = `${nb ? `<span class="chip opt now" data-go="schedule"><i class="live-dot"></i>${esc(nb.title)}</span>` : ''}<span class="chip opt">${t('streak')} <b>${streak()}</b></span><span class="chip opt">${t('progress')} <b>${st.pct}%</b></span>${st.over ? `<span class="chip">${t('overdue')} <b style="color:var(--hi)">${st.over}</b></span>` : ''}`;
  if (P.run || P.left !== P.total()) {
    const c = el('span', 'chip live', `⏱ <b data-pomo>${fmt(P.left)}</b>`); c.onclick = () => go('pomodoro'); c.title = t('pomodoro'); h.append(c);
  }

  h.querySelector('[data-go]')?.addEventListener('click', () => go('schedule'));
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
  const e = el('div', `task ${x.prio} ${x.status === 'done' ? 'done' : ''} ${open === x.id ? 'opened' : ''} ${justId === x.id ? 'just' : ''}`); e.draggable = true;
  e.innerHTML = `<div class="row"><input type="checkbox" ${x.status === 'done' ? 'checked' : ''} aria-label="done"><div class="ttl" tabindex="0" role="button">${esc(x.title)}</div></div>
    <div class="meta"><span class="p-${x.prio}">■ ${t(x.prio)}</span>${x.due ? `<span class="${x.due < td && x.status !== 'done' ? 'over' : ''}">${x.due}</span>` : ''}${x.tag ? `<span>#${esc(x.tag)}</span>` : ''}${x.status === 'doing' ? `<span>▶ ${t('doing')}</span>` : ''}${x.rec ? `<span>↻ ${t(x.rec)}</span>` : ''}${x.subs.length ? `<span>${subsDone}/${x.subs.length}</span>` : ''}</div>`;
  e.querySelector('input').onchange = ev => {
    const on = ev.target.checked; justId = x.id;
    if (on && !RM()) { e.classList.add('completing'); setTimeout(() => { justId = x.id; setStatus(x, 'done'); update(); }, 420); }
    else { setStatus(x, on ? 'done' : 'todo'); update(); }
  };
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
  const st = todayStats(), ss = schedStats(today());
  const hr = new Date().getHours(), gk = hr < 4 ? 'gNight' : hr < 11 ? 'gMorning' : hr < 13 ? 'gNoon' : hr < 18 ? 'gAfternoon' : hr < 23 ? 'gEvening' : 'gNight';
  const hero = el('div', 'card hero', `<div><div class="hello">${t(gk)}, <span>${esc(who())}</span></div>
    <div class="meta">${new Date().toLocaleDateString(S.settings.lang, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} · ${st.due} ${t('tasksDue')} · ${ss.n - ss.d} ${t('blocksLeft')}</div></div>
    <div class="avatar" aria-hidden="true">${esc(who()[0].toUpperCase())}</div>`);
  hero.style.marginBottom = '14px';
  const tiles = el('div', 'grid tiles');
  tiles.innerHTML = `
    <div class="card"><h3>${t('streak')}</h3><div class="big-num">${cnt(streak())}<small>${t('days')}</small></div></div>
    <div class="card"><h3>${t('progress')}</h3><div class="big-num">${cnt(st.pct)}<small>%</small></div><div class="bar"><i style="width:${st.pct}%"></i></div></div>
    <div class="card"><h3>${t('doneToday')}</h3><div class="big-num">${cnt(st.doneN)}<small>/ ${st.doneN + st.due}</small></div></div>
    <div class="card"><h3>${t('overdue')}</h3><div class="big-num ${st.over ? 'crit' : ''}">${st.over ? '⚠ ' : ''}${cnt(st.over)}</div></div>
    <div class="card"><h3>${t('openN')}</h3><div class="big-num">${cnt(st.open)}</div></div>`;
  v.append(hero, tiles);
  const two = el('div', 'grid two'); two.style.marginTop = '14px';
  const up = el('div', 'card', `<h3>${t('upNext')}</h3>`);
  const L = ranked().slice(0, 5);
  if (!L.length) up.append(el('div', 'empty', t('focusEmpty')));
  L.forEach(x => up.append(taskEl(x)));
  const more = el('button', 'btn sm', t('seeAll') + ' →'); more.onclick = () => go('all'); up.append(more);
  const ch = el('div', 'card', `<h3>${t('last7')}</h3>`); ch.append(dayChart(7));
  const pc = el('div', 'card', `<h3>${t('pomodoro')} · ${t(P.mode === 'focus' ? 'focusT' : 'breakT')}</h3><div class="big-num" data-pomo>${fmt(P.left)}</div>`);
  const pb = el('button', 'btn', P.run ? t('pause') : t('start')); pb.style.marginTop = '8px'; pb.onclick = () => { P.toggle(); render(); }; pc.append(pb);
  const sc = el('div', 'card', `<h3>${t('todaySched')} · ${ss.d}/${ss.n}</h3><div class="bar"><i style="width:${ss.pct}%"></i></div>`);
  const nb = ss.B.find(b => blockState(b, today()) === 'now'), nx = ss.B.find(b => !b.done && toMin(b.start) > nowMin());
  sc.append(el('div', 'meta mini-sched', `${nb ? `<span><i class="live-dot"></i>${t('nowDoing')}: <b>${esc(nb.title)}</b></span>` : ''}${nx ? `<span>${t('nextUp')}: ${nx.start} · ${esc(nx.title)}</span>` : ''}`));
  const sb = el('button', 'btn sm', t('openSched') + ' →'); sb.style.marginTop = '10px'; sb.onclick = () => go('schedule'); sc.append(sb);
  const side = el('div', 'stack'); side.append(sc, ch, pc);
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
  tiles.innerHTML = `<div class="card"><h3>${t('totalDone')}</h3><div class="big-num">${cnt(total)}</div></div>
    <div class="card"><h3>${t('streak')}</h3><div class="big-num">${cnt(streak())}<small>${t('days')}</small></div></div>
    <div class="card"><h3>${t('openN')}</h3><div class="big-num">${cnt(op.length)}</div></div>
    <div class="card"><h3>${t('totalTasks')}</h3><div class="big-num">${cnt(S.tasks.length)}</div></div>`;
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
    <label for="sn">${t('name')}</label><div><input id="sn" value="${esc(S.settings.name || '')}" placeholder="Minh" maxlength="30"></div>
    ${[['fx', 'effects'], ['bgAnim', 'bgAnim'], ['motion', 'motion']].map(([k, l]) => `<label>${t(l)}</label><div class="seg" data-set="${k}"><button data-v="1" class="${S.settings[k] ? 'on' : ''}">${t('on')}</button><button data-v="0" class="${S.settings[k] ? '' : 'on'}">${t('off')}</button></div>`).join('')}
  </div>`;
  const sl = c.querySelector('#sl'); sl.value = S.settings.lang; sl.onchange = () => { S.settings.lang = sl.value; update(); };
  c.querySelectorAll('#st button').forEach(b => b.onclick = () => { S.settings.dark = b.dataset.v === '1'; update(); });
  c.querySelectorAll('[data-set] button').forEach(b => b.onclick = () => { S.settings[b.parentNode.dataset.set] = b.dataset.v === '1'; update(); });
  c.querySelector('#sn').onchange = e => { S.settings.name = e.target.value.trim() || 'Minh'; update(); };
  c.querySelectorAll('#sa .sw').forEach(b => b.onclick = () => { S.settings.accent = b.dataset.v; update(); });
  c.querySelector('#sa input').onchange = e => { S.settings.accent = e.target.value; update(); };
  const k = el('div', 'card', `<h3>${t('shortcuts')}</h3><div class="keys">
    <span><kbd>1</kbd>…<kbd>0</kbd></span><span>${t('kNav')}</span><span><kbd>N</kbd></span><span>${t('kNew')}</span>
    <span><kbd>/</kbd></span><span>${t('kSearch')}</span><span><kbd>Esc</kbd></span><span>${t('kEsc')}</span></div>`);
  k.style.marginTop = '14px';
  v.append(c, k);
}

function dataView(v) {
  const c = el('div', 'card', `<h3>${t('backup')}</h3><p class="meta" style="margin:0 0 12px">${t(LOCAL ? 'dataHintLocal' : 'dataHint')}</p><div class="row wrap"></div>`);
  const ex = el('button', 'btn', '⇩ ' + t('export')); ex.onclick = () => {
    const a = el('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' })); a.download = `${who().toLowerCase().replace(/\W+/g, '-') || 'minh'}-todo-${today()}.json`; a.click();
  };
  const im = el('button', 'btn', '⇧ ' + t('import')); im.onclick = () => {
    const f = el('input'); f.type = 'file'; f.accept = '.json';
    f.onchange = async () => { try { const d = JSON.parse(await f.files[0].text()); if (!Array.isArray(d.tasks)) throw 0; S = { ...S, ...d, settings: { ...S.settings, ...d.settings } }; if (!Array.isArray(S.routine)) S.routine = []; S.sched = S.sched || {}; update(); toast(t('imported')); } catch { toast(t('invalid')); } };
    f.click();
  };
  c.querySelector('.row').append(ex, im);
  const done = S.tasks.filter(x => x.status === 'done').length;
  const d = el('div', 'card', `<h3>${t('danger')}</h3>`); d.style.marginTop = '14px';
  const cl = el('button', 'btn danger', `${t('clearDone')} (${done})`); cl.disabled = !done;
  cl.onclick = () => { if (confirm(t('confirmClear'))) { S.tasks = S.tasks.filter(x => x.status !== 'done'); update(); toast(t('cleared')); } };
  d.append(cl);
  const lo = el('a', 'btn', '⏻ ' + t('logout')); lo.href = 'logout'; lo.style.cssText = 'display:inline-block;margin-top:14px;text-decoration:none';
  v.append(c, d); if (!LOCAL) v.append(lo);
}

// ---- daily schedule: repeating routine blocks + one-off blocks per day, ticked off per day ----
const CATS = { work: ['⌘', 'var(--accent)'], study: ['✎', 'var(--vio)'], health: ['♥', 'var(--lo)'], rest: ['☕', 'var(--med)'], me: ['★', 'var(--hi)'] };
const DAYSET = { all: () => true, wd: d => d > 0 && d < 6, we: d => d === 0 || d === 6 };
const toMin = s => { const [h, m] = String(s || '0:0').split(':').map(Number); return h * 60 + (m || 0); };
const fromMin = m => { m = ((m % 1440) + 1440) % 1440; return `${pad(Math.floor(m / 60))}:${pad(m % 60)}`; };
const nowMin = () => { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); };
const span = b => { const s = toMin(b.start); let e = toMin(b.end); if (e <= s) e += 1440; return [s, e]; };
const dur = b => { const [s, e] = span(b), m = e - s; return `${m >= 60 ? Math.floor(m / 60) + 'h' : ''}${m % 60 ? pad(m % 60) + (m >= 60 ? '' : 'm') : ''}`; };
const dayRec = k => S.sched[k] || (S.sched[k] = { done: {}, items: [] });
let schedDay = today(), schedOpen = null;

function blocksFor(k) {
  const wd = new Date(k + 'T00:00').getDay(), r = S.sched[k] || { done: {}, items: [] };
  return [...S.routine.filter(b => (DAYSET[b.days] || DAYSET.all)(wd)), ...r.items]
    .map(b => ({ ...b, done: !!r.done[b.id] }))
    .sort((a, b) => a.start.localeCompare(b.start) || a.end.localeCompare(b.end));
}
function blockState(b, k) {
  if (b.done) return 'ok';
  const td = today(); if (k < td) return 'miss'; if (k > td) return 'later';
  const n = nowMin(), [s, e] = span(b);
  return n >= e ? 'miss' : n >= s ? 'now' : 'later';
}
function schedStats(k) { const B = blocksFor(k), d = B.filter(b => b.done).length; return { B, d, n: B.length, pct: B.length ? Math.round(d / B.length * 100) : 0 }; }
const srcList = (id, k) => S.routine.some(b => b.id === id) ? S.routine : dayRec(k).items;
function setRepeat(src, k, rep) {
  const from = srcList(src.id, k); from.splice(from.indexOf(src), 1);
  if (rep === 'once') { delete src.days; dayRec(k).items.push(src); } else { src.days = rep; S.routine.push(src); }
}
const catOpts = () => Object.keys(CATS).map(c => `<option value="${c}">${CATS[c][0]} ${t('cat_' + c)}</option>`).join('');
const repOpts = () => ['once', 'all', 'wd', 'we'].map(r => `<option value="${r}">${t('rep_' + r)}</option>`).join('');

function schedView(v) {
  const k = schedDay, td = today(), st = schedStats(k);
  const head = el('div', 'row cal-head', `<button class="btn" data-d="-1" aria-label="Previous day">‹</button><strong>${new Date(k + 'T00:00').toLocaleDateString(S.settings.lang, { weekday: 'long', day: 'numeric', month: 'long' })}</strong>${k !== td ? `<button class="btn sm" data-d="0">${t('today')}</button>` : ''}<button class="btn" data-d="1" aria-label="Next day">›</button>`);
  head.querySelectorAll('button').forEach(b => b.onclick = () => { schedDay = +b.dataset.d ? addDays(k, +b.dataset.d) : td; schedOpen = null; lastView = null; render(); });
  v.append(head);

  const wrap = el('div', 'sched');
  const tl = el('div', 'timeline');
  if (!st.B.length) tl.append(el('div', 'empty', t('schedEmpty')));
  st.B.forEach(b => tl.append(blockEl(b, k)));

  const now = k === td && st.B.find(b => blockState(b, k) === 'now');
  const next = k === td && st.B.find(b => !b.done && toMin(b.start) > nowMin());
  const sum = el('div', 'card sched-sum', `<div class="ring-p" style="--p:${st.pct}"><b>${cnt(st.pct)}%</b></div>
    <div><h3>${t('schedProgress')}</h3><div class="big-num">${cnt(st.d)}<small>/ ${st.n} ${t('blocks')}</small></div>
    ${now ? `<div class="meta"><span><i class="live-dot"></i>${t('nowDoing')}: <b>${esc(now.title)}</b></span></div>` : ''}${next ? `<div class="meta"><span>${t('nextUp')}: ${next.start} · ${esc(next.title)}</span></div>` : ''}</div>`);

  let last = st.B.length ? Math.max(...st.B.map(b => span(b)[1])) : 0;
  if (!last || last >= 1440 - 60) last = Math.min(23 * 60, Math.ceil(nowMin() / 60) * 60);
  const add = el('form', 'card sched-add'); add.autocomplete = 'off';
  add.innerHTML = `<h3>${t('addBlock')}</h3><div class="g">
    <label>${t('start_t')}<input name="start" type="time" required value="${fromMin(last)}"></label>
    <label>${t('end_t')}<input name="end" type="time" required value="${fromMin(last + 60)}"></label></div>
    <input name="title" required placeholder="${esc(t('blockPh'))}" aria-label="${esc(t('blockPh'))}">
    <div class="g"><select name="cat" aria-label="Category">${catOpts()}</select><select name="rep" aria-label="Repeat">${repOpts()}</select></div>
    <button class="btn primary">+ ${t('addBlock')}</button>`;
  add.onsubmit = e => {
    e.preventDefault(); const d = Object.fromEntries(new FormData(add));
    const b = { id: crypto.randomUUID(), start: d.start, end: d.end, title: d.title.trim(), cat: d.cat };
    if (!b.title) return;
    if (d.rep === 'once') dayRec(k).items.push(b); else { b.days = d.rep; S.routine.push(b); }
    justId = b.id; update(); toast(t('blockAdded'));
  };
  const side = el('div', 'stack side'); side.append(sum, add);
  wrap.append(tl, side); v.append(wrap);
}

function blockEl(b, k) {
  const s = blockState(b, k), [ic, col] = CATS[b.cat] || CATS.work;
  const e = el('div', `blk ${s} ${schedOpen === b.id ? 'opened' : ''} ${justId === b.id ? 'just' : ''}`); e.style.setProperty('--c', col);
  let prog = '';
  if (s === 'now') { const [a, z] = span(b); prog = `<div class="bar"><i style="width:${Math.round((nowMin() - a) / (z - a) * 100)}%"></i></div>`; }
  e.innerHTML = `<div class="tm"><b>${b.start}</b><span>${b.end}</span></div><div class="node">${ic}</div>
    <div class="bd"><div class="row"><div class="ttl" tabindex="0" role="button">${esc(b.title)}</div>${s === 'now' ? `<span class="tagnow">${t('nowTag')}</span>` : ''}
    <input type="checkbox" class="chk" ${b.done ? 'checked' : ''} aria-label="${esc(t('done'))}: ${esc(b.title)}"></div>
    <div class="meta"><span>${t('cat_' + b.cat)}</span><span>${dur(b)}</span>${b.days ? `<span>↻ ${t('rep_' + b.days)}</span>` : ''}${s === 'miss' ? `<span class="over">${t('missed')}</span>` : ''}</div>${prog}</div>`;
  e.querySelector('.chk').onchange = ev => {
    const r = dayRec(k); if (ev.target.checked) r.done[b.id] = 1; else delete r.done[b.id];
    justId = b.id; const st = schedStats(k);
    if (ev.target.checked && st.d === st.n) { confetti(); toast(t('allDone')); }
    update();
  };
  const ttl = e.querySelector('.ttl');
  ttl.onclick = () => { schedOpen = schedOpen === b.id ? null : b.id; render(); };
  ttl.onkeydown = ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); ttl.click(); } };
  if (schedOpen === b.id) e.querySelector('.bd').append(blockEditor(b, k));
  return e;
}

function blockEditor(b, k) {
  const L = srcList(b.id, k), src = L.find(x => x.id === b.id);
  const f = el('div', 'edit');
  f.innerHTML = `<div class="g"><input data-k="start" type="time" value="${src.start}" aria-label="${esc(t('start_t'))}"><input data-k="end" type="time" value="${src.end}" aria-label="${esc(t('end_t'))}">
    <input data-k="title" value="${esc(src.title)}" style="flex:1 1 180px"><select data-k="cat">${catOpts()}</select><select data-k="rep">${repOpts()}</select></div>
    ${src.days ? `<div class="meta">↻ ${t('routineHint')}</div>` : ''}<div><button class="btn danger sm del">${t('del')}</button></div>`;
  f.querySelectorAll('[data-k]').forEach(i => {
    const kk = i.dataset.k;
    if (i.tagName === 'SELECT') i.value = kk === 'rep' ? (src.days || 'once') : src[kk];
    i.onchange = () => { if (kk === 'rep') setRepeat(src, k, i.value); else if (i.value.trim()) src[kk] = i.value.trim(); update(); };
  });
  f.querySelector('.del').onclick = () => { L.splice(L.indexOf(src), 1); delete dayRec(k).done[src.id]; schedOpen = null; update(); toast(t('blockDeleted')); };
  return f;
}

function seedRoutine() {
  const vi = S.settings.lang === 'vi';
  return [
    ['06:30', '07:00', 'health', 'all', vi ? 'Thức dậy, vận động nhẹ' : 'Wake up, light exercise'],
    ['07:00', '07:30', 'rest', 'all', vi ? 'Ăn sáng' : 'Breakfast'],
    ['08:00', '11:30', 'work', 'wd', vi ? 'Làm việc sâu' : 'Deep work'],
    ['11:30', '13:00', 'rest', 'all', vi ? 'Ăn trưa & nghỉ ngơi' : 'Lunch & rest'],
    ['13:30', '17:00', 'study', 'wd', vi ? 'Học / làm dự án' : 'Study / project work'],
    ['17:30', '18:30', 'health', 'all', vi ? 'Thể thao' : 'Workout'],
    ['19:00', '20:00', 'me', 'all', vi ? 'Ăn tối cùng gia đình' : 'Dinner with family'],
    ['20:00', '22:00', 'study', 'all', vi ? 'Ôn tập, đọc sách' : 'Review & reading'],
    ['22:30', '23:00', 'rest', 'all', vi ? 'Chuẩn bị đi ngủ' : 'Wind down for sleep']
  ].map(([start, end, cat, days, title]) => ({ id: crypto.randomUUID(), start, end, cat, days, title }));
}

// ---- interaction effects ----
const cnt = n => `<span class="cnt">${n}</span>`;
function countUp(root) {
  root.querySelectorAll('.cnt').forEach(n => {
    const to = +n.textContent; if (!to) return;
    const t0 = performance.now();
    const step = ts => { const p = Math.min(1, (ts - t0) / 750); n.textContent = Math.round(to * (1 - (1 - p) ** 3)); if (p < 1) requestAnimationFrame(step); };
    n.textContent = '0'; requestAnimationFrame(step);
  });
}
function fxAt(cls, x, y, css = '', ms = 700) { const p = el('i', cls); p.style.cssText = `left:${x}px;top:${y}px;${css}`; $('#fx').append(p); setTimeout(() => p.remove(), ms); }
function burst(node) {
  const r = node.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
  for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2, d = 24 + Math.random() * 22; fxAt('spark', x, y, `--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d}px;background:${i % 3 ? 'var(--accent)' : 'var(--hi)'}`); }
}
function confetti() {
  if (RM()) return;
  const cols = [S.settings.accent, '#ff3d9a', '#3dffb0', '#ffd24a', '#8a6bff'];
  for (let i = 0; i < 110; i++) fxAt('conf', innerWidth / 2 + (Math.random() - .5) * 200, innerHeight * .45,
    `background:${cols[i % 5]};--dx:${(Math.random() - .5) * innerWidth}px;--dy:${-Math.random() * innerHeight * .5 - 120}px;--r:${(Math.random() - .5) * 1440}deg;animation-duration:${1.4 + Math.random() * .9}s`, 2500);
}
document.addEventListener('pointerdown', e => {
  if (RM() || !e.target.closest('button, .ttl, .cal .d, .chip.live, .chip.now, input[type=checkbox], .sw')) return;
  fxAt('pulse', e.clientX, e.clientY, '', 600);
});
document.addEventListener('change', e => { if (!RM() && e.target.type === 'checkbox' && e.target.checked) burst(e.target); }, true);
document.addEventListener('pointermove', e => {
  BG.move(e.clientX, e.clientY);
  const c = e.target.closest?.('.card, .task, .blk'); if (!c) return;
  const r = c.getBoundingClientRect(); c.style.setProperty('--mx', e.clientX - r.left + 'px'); c.style.setProperty('--my', e.clientY - r.top + 'px');
}, { passive: true });

// ---- animated background: drifting neon aurora, perspective grid floor, linked particles ----
const BG = (() => {
  const c = $('#bg'), g = c.getContext('2d');
  let w = 0, h = 0, pts = [], raf = 0, last = 0, col = null, mx = .5, my = .5, sx = .5, sy = .5;
  const rgba = (hex, a) => { const n = parseInt(String(hex).slice(1, 7), 16) || 0; return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${a})`; };
  function size() {
    const dpr = Math.min(2, devicePixelRatio || 1); w = innerWidth; h = innerHeight;
    c.width = w * dpr; c.height = h * dpr; g.setTransform(dpr, 0, 0, dpr, 0, 0);
    pts = Array.from({ length: Math.min(80, Math.round(w * h / 20000)) }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4, r: Math.random() * 1.5 + .6 }));
  }
  function draw(T, moving) {
    if (!col) return;
    const dk = col.dark;
    g.globalCompositeOperation = 'source-over'; g.fillStyle = col.bg; g.fillRect(0, 0, w, h);
    sx += (mx - sx) * .05; sy += (my - sy) * .05;
    g.globalCompositeOperation = dk ? 'lighter' : 'source-over';
    for (const [cc, ox, oy, rr, sp] of [[col.accent, .2, .18, .75, 1], [col.hi, .85, .28, .6, 1.4], [col.vio, .55, .9, .7, .8]]) {
      const x = w * (ox + Math.sin(T * .15 * sp) * .13 + (sx - .5) * .08), y = h * (oy + Math.cos(T * .12 * sp) * .11 + (sy - .5) * .08), R = Math.max(w, h) * rr * .6;
      const gr = g.createRadialGradient(x, y, 0, x, y, R);
      gr.addColorStop(0, rgba(cc, dk ? .34 : .2)); gr.addColorStop(1, rgba(cc, 0));
      g.fillStyle = gr; g.fillRect(0, 0, w, h);
    }
    g.globalCompositeOperation = 'source-over';
    // grid floor
    const hz = h * .6, vx = w / 2 + (sx - .5) * 80, A = dk ? .32 : .22;
    const fade = g.createLinearGradient(0, hz, 0, h); fade.addColorStop(0, rgba(col.accent, 0)); fade.addColorStop(1, rgba(col.accent, A));
    g.strokeStyle = fade; g.lineWidth = 1; g.beginPath();
    for (let i = -16; i <= 16; i++) { g.moveTo(vx + i * 6, hz); g.lineTo(vx + i * w / 7, h); }
    g.stroke();
    const off = (T * .25) % 1;
    for (let j = 0; j < 14; j++) {
      const p = (j + off) / 14, y = hz + (h - hz) * p * p;
      g.strokeStyle = rgba(col.accent, A * p); g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke();
    }
    const hl = g.createLinearGradient(0, 0, w, 0); hl.addColorStop(0, rgba(col.hi, 0)); hl.addColorStop(.5, rgba(col.hi, dk ? .6 : .35)); hl.addColorStop(1, rgba(col.hi, 0));
    g.fillStyle = hl; g.fillRect(0, hz - 1, w, 2);
    // particles
    const px = mx * w, py = my * h;
    for (const p of pts) {
      if (moving) { p.x = (p.x + p.vx + w) % w; p.y = (p.y + p.vy + h) % h; }
      g.fillStyle = rgba(col.accent, dk ? .85 : .55); g.beginPath(); g.arc(p.x, p.y, p.r, 0, 7); g.fill();
    }
    g.lineWidth = .8;
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 120) { g.strokeStyle = rgba(col.accent, (1 - d / 120) * (dk ? .3 : .2)); g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke(); }
      }
      const d = Math.hypot(a.x - px, a.y - py);
      if (d < 160) { g.strokeStyle = rgba(col.hi, (1 - d / 160) * .45); g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(px, py); g.stroke(); }
    }
  }
  function loop(ts) { raf = requestAnimationFrame(loop); if (ts - last < 33) return; last = ts; draw(ts / 1000, true); }
  size();
  addEventListener('resize', () => { size(); if (!raf) draw(0, false); });
  return {
    set(o) { const ch = JSON.stringify(o) !== JSON.stringify(col); col = o; if (ch && !raf) draw(0, false); },
    run(on) { if (on && !raf) raf = requestAnimationFrame(loop); else if (!on && raf) { cancelAnimationFrame(raf); raf = 0; draw(0, false); } },
    move(x, y) { mx = x / w; my = y / h; }
  };
})();
document.addEventListener('visibilitychange', () => BG.run(!document.hidden && S.settings.bgAnim && !matchMedia('(prefers-reduced-motion: reduce)').matches));

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
  reset() { clearInterval(this.run); this.run = null; this.mode = 'focus'; this.left = this.total(); document.title = 'MINH//OS'; },
  tick() {
    if (--this.left <= 0) { beep(); toast(t('fin')); this.next(true); render(); }
    document.querySelectorAll('[data-pomo]').forEach(e => e.textContent = fmt(this.left));
    const b = document.querySelector('[data-pomo-bar]'); if (b) b.style.width = Math.round((1 - this.left / this.total()) * 100) + '%';
    document.title = `${fmt(this.left)} · MINH//OS`;
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

// refresh the "now" highlight on the schedule without stealing focus from a field being edited
setInterval(() => {
  const a = document.activeElement;
  if (['schedule', 'dashboard'].includes(view) && !(a && ['INPUT', 'TEXTAREA', 'SELECT'].includes(a.tagName))) render(); else renderHud();
}, 30000);

function boot() {
  if (!Array.isArray(S.routine)) S.routine = seedRoutine();
  S.sched = S.sched || {};
  S.settings.v = 4; P.left = P.total(); fromHash();
}
loadState().then(d => {
  if (d && d.tasks) {
    S = { ...S, ...d, settings: { ...S.settings, ...d.settings }, pomoLog: d.pomoLog || {}, sched: d.sched || {} };
    if (!d.settings?.v) { if (S.settings.accent === OLD_ACCENT) S.settings.accent = ACCENTS[0]; S.settings.dark = true; }
    // v4: Aqua Daylight becomes the default look
    if ((d.settings?.v || 0) < 4) { S.settings.dark = false; S.settings.accent = ACCENTS[0]; }
  }
  boot();
}).catch(boot);
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => { });
