const $ = s => document.querySelector(s);
const el = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; };
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const iso = d => { d = new Date(d); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const today = () => iso(new Date());
const addDays = (s, n) => { const d = new Date(s + 'T00:00'); d.setDate(d.getDate() + n); return iso(d); };

const TX = {
  en: { today: 'Today', week: 'Week', all: 'All', calendar: 'Calendar', board: 'Board', focus: 'Focus', add: 'Add task', ph: 'What needs doing?', tag: 'Tag / course', high: 'High', med: 'Medium', low: 'Low', none: 'No repeat', daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly', todo: 'To do', doing: 'Doing', done: 'Done', streak: 'Streak', days: 'days', progress: 'Today\'s progress', summary: 'Daily summary', export: 'Export JSON', import: 'Import JSON', del: 'Delete', notes: 'Notes', sub: 'Add subtask, press Enter', start: 'Start', pause: 'Pause', reset: 'Reset', skip: 'Skip', empty: 'Nothing here. Add a task above.', focusEmpty: 'All clear. Nothing left to focus on.', theme: 'Dark mode', lang: 'Language', accent: 'Accent', pomo: 'Pomodoro', focusT: 'Focus time', breakT: 'Break', overdue: 'overdue', dueN: 'due', doneN: 'done', imported: 'Imported', saved: 'Task deleted', fin: 'Session finished' },
  vi: { today: 'Hôm nay', week: 'Tuần này', all: 'Tất cả', calendar: 'Lịch', board: 'Bảng', focus: 'Tập trung', add: 'Thêm việc', ph: 'Cần làm gì?', tag: 'Nhãn / môn học', high: 'Cao', med: 'Vừa', low: 'Thấp', none: 'Không lặp', daily: 'Hằng ngày', weekly: 'Hằng tuần', monthly: 'Hằng tháng', todo: 'Cần làm', doing: 'Đang làm', done: 'Xong', streak: 'Chuỗi ngày', days: 'ngày', progress: 'Tiến độ hôm nay', summary: 'Tổng kết ngày', export: 'Xuất JSON', import: 'Nhập JSON', del: 'Xóa', notes: 'Ghi chú', sub: 'Thêm việc con, nhấn Enter', start: 'Bắt đầu', pause: 'Tạm dừng', reset: 'Đặt lại', skip: 'Bỏ qua', empty: 'Chưa có gì. Hãy thêm việc ở trên.', focusEmpty: 'Đã xong hết. Không còn gì để tập trung.', theme: 'Chế độ tối', lang: 'Ngôn ngữ', accent: 'Màu chủ đạo', pomo: 'Pomodoro', focusT: 'Thời gian tập trung', breakT: 'Nghỉ', overdue: 'quá hạn', dueN: 'đến hạn', doneN: 'đã xong', imported: 'Đã nhập', saved: 'Đã xóa việc', fin: 'Hết phiên' }
};
let S = { tasks: [], settings: { lang: 'en', dark: false, accent: '#1f6f8b' }, log: {} };
let view = 'today', cal = new Date(), open = null, dragId = null, focusIdx = 0;
const t = k => (TX[S.settings.lang] || TX.en)[k] || k;

let timer;
const save = () => { clearTimeout(timer); timer = setTimeout(() => fetch('/api/state', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(S) }), 300); };
const toast = m => { const x = $('#toast'); x.textContent = m; x.classList.add('show'); setTimeout(() => x.classList.remove('show'), 1800); };
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
function streak() {
  let n = 0, d = today();
  if (!S.log[d]) d = addDays(d, -1);
  while (S.log[d] > 0) { n++; d = addDays(d, -1); }
  return n;
}

// ---- rendering ----
function render() {
  document.documentElement.dataset.theme = S.settings.dark ? 'dark' : 'light';
  document.documentElement.style.setProperty('--accent', S.settings.accent);
  document.documentElement.lang = S.settings.lang;
  renderNav(); renderAdd(); renderSide();
  const v = $('#view'); v.innerHTML = '';
  ({ today: listView, week: listView, all: listView, calendar: calView, board: boardView, focus: focusView })[view](v);
}

function renderNav() {
  const n = $('#nav'); n.innerHTML = '<h1>To-Do</h1>';
  for (const k of ['today', 'week', 'all', 'calendar', 'board', 'focus']) {
    const b = el('button', view === k ? 'on' : '', t(k)); b.onclick = () => { view = k; open = null; render(); }; n.append(b);
  }
  n.append(el('hr'));
  const l = el('label', '', t('lang') + ' ');
  const sel = el('select'); sel.innerHTML = '<option value="en">English</option><option value="vi">Tiếng Việt</option>'; sel.value = S.settings.lang;
  sel.onchange = () => { S.settings.lang = sel.value; update(); }; l.append(sel); n.append(l);
  const d = el('label', '', `<input type="checkbox" ${S.settings.dark ? 'checked' : ''}> ${t('theme')}`);
  d.firstChild.onchange = e => { S.settings.dark = e.target.checked; update(); }; n.append(d);
  const a = el('label', '', t('accent') + ' <input type="color" value="' + S.settings.accent + '">');
  a.lastChild.onchange = e => { S.settings.accent = e.target.value; update(); }; n.append(a);
  n.append(el('hr'));
  const ex = el('button', '', t('export')); ex.onclick = () => {
    const a = el('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' })); a.download = `todo-${today()}.json`; a.click();
  };
  const im = el('button', '', t('import')); im.onclick = () => {
    const f = el('input'); f.type = 'file'; f.accept = '.json';
    f.onchange = async () => { try { const d = JSON.parse(await f.files[0].text()); if (!Array.isArray(d.tasks)) throw 0; S = { ...S, ...d }; update(); toast(t('imported')); } catch { toast('Invalid file'); } };
    f.click();
  };
  n.append(ex, im);
}

function renderAdd() {
  const f = $('#add'); const keep = f.querySelector('[name=due]')?.value || '';
  f.innerHTML = `<input name="title" placeholder="${esc(t('ph'))}" required>
    <input name="due" type="date" value="${keep}">
    <select name="prio"><option value="high">${t('high')}</option><option value="med" selected>${t('med')}</option><option value="low">${t('low')}</option></select>
    <input name="tag" placeholder="${esc(t('tag'))}" list="tags" size="12">
    <datalist id="tags">${[...new Set(S.tasks.map(x => x.tag).filter(Boolean))].map(x => `<option value="${esc(x)}">`).join('')}</datalist>
    <select name="rec"><option value="">${t('none')}</option><option value="daily">${t('daily')}</option><option value="weekly">${t('weekly')}</option><option value="monthly">${t('monthly')}</option></select>
    <button class="btn primary">${t('add')}</button>`;
  f.onsubmit = e => {
    e.preventDefault(); const d = Object.fromEntries(new FormData(f));
    S.tasks.unshift({ id: crypto.randomUUID(), title: d.title.trim(), due: d.due, prio: d.prio, tag: d.tag.trim(), rec: d.rec, notes: '', subs: [], status: 'todo' });
    update();
  };
}

function renderSide() {
  const td = today(), op = openTasks();
  const due = op.filter(x => x.due && x.due <= td), over = op.filter(x => x.due && x.due < td).length;
  const doneN = S.log[td] || 0, total = doneN + due.length;
  const pct = total ? Math.round(doneN / total * 100) : 0;
  const s = $('#side'); s.innerHTML = `
    <div class="card"><h3>${t('streak')}</h3><div class="pomo">${streak()} <small>${t('days')}</small></div></div>
    <div class="card"><h3>${t('progress')}</h3><div class="bar"><i style="width:${pct}%"></i></div>${pct}%</div>
    <div class="card"><h3>${t('summary')}</h3><div class="meta" style="display:block">${doneN} ${t('doneN')} · ${due.length} ${t('dueN')} · ${over} ${t('overdue')}</div></div>`;
  s.append(pomoCard());
}

function taskEl(x) {
  const td = today();
  const subsDone = x.subs.filter(s => s.done).length;
  const e = el('div', `task ${x.prio} ${x.status === 'done' ? 'done' : ''}`); e.draggable = true;
  e.innerHTML = `<div class="row"><input type="checkbox" ${x.status === 'done' ? 'checked' : ''} aria-label="done"><div class="ttl">${esc(x.title)}</div></div>
    <div class="meta">${x.due ? `<span class="${x.due < td && x.status !== 'done' ? 'over' : ''}">${x.due}</span>` : ''}${x.tag ? `<span>#${esc(x.tag)}</span>` : ''}${x.rec ? `<span>↻ ${t(x.rec)}</span>` : ''}${x.subs.length ? `<span>${subsDone}/${x.subs.length}</span>` : ''}</div>`;
  e.querySelector('input').onchange = ev => { setStatus(x, ev.target.checked ? 'done' : 'todo'); update(); };
  e.querySelector('.ttl').onclick = () => { open = open === x.id ? null : x.id; render(); };
  e.ondragstart = () => { dragId = x.id; e.classList.add('drag'); };
  e.ondragend = () => e.classList.remove('drag');
  e.ondragover = ev => ev.preventDefault();
  e.ondrop = ev => {
    ev.preventDefault(); ev.stopPropagation(); if (!dragId || dragId === x.id) return;
    const m = byId(dragId); S.tasks.splice(S.tasks.indexOf(m), 1); S.tasks.splice(S.tasks.indexOf(x), 0, m); update();
  };
  if (open === x.id) e.append(editor(x));
  return e;
}

function editor(x) {
  const f = el('div', 'edit');
  f.innerHTML = `<div class="g"><input data-k="title" value="${esc(x.title)}" style="flex:1"><input data-k="due" type="date" value="${x.due || ''}">
    <select data-k="prio"><option value="high">${t('high')}</option><option value="med">${t('med')}</option><option value="low">${t('low')}</option></select>
    <input data-k="tag" value="${esc(x.tag)}" placeholder="${esc(t('tag'))}" size="10">
    <select data-k="rec"><option value="">${t('none')}</option><option value="daily">${t('daily')}</option><option value="weekly">${t('weekly')}</option><option value="monthly">${t('monthly')}</option></select></div>
    <textarea data-k="notes" rows="2" placeholder="${esc(t('notes'))}">${esc(x.notes)}</textarea><div class="subs"></div>
    <input class="newsub" placeholder="${esc(t('sub'))}"><div><button class="btn del">${t('del')}</button></div>`;
  f.querySelectorAll('[data-k]').forEach(i => { if (i.tagName === 'SELECT') i.value = x[i.dataset.k]; i.onchange = () => { x[i.dataset.k] = i.value; update(); }; });
  const sb = f.querySelector('.subs');
  x.subs.forEach((s, i) => {
    const r = el('label', 'row', `<input type="checkbox" ${s.done ? 'checked' : ''}> <span>${esc(s.t)}</span> <button class="btn" style="margin-left:auto;padding:0 8px">×</button>`);
    r.firstChild.onchange = e => { s.done = e.target.checked; update(); };
    r.lastChild.onclick = e => { e.preventDefault(); x.subs.splice(i, 1); update(); };
    sb.append(r);
  });
  f.querySelector('.newsub').onkeydown = e => { if (e.key === 'Enter' && e.target.value.trim()) { x.subs.push({ t: e.target.value.trim(), done: false }); update(); } };
  f.querySelector('.del').onclick = () => { S.tasks.splice(S.tasks.indexOf(x), 1); open = null; update(); toast(t('saved')); };
  return f;
}

function listView(v) {
  const td = today(), wk = addDays(td, 7);
  let L = S.tasks.filter(x => x.status !== 'done');
  if (view === 'today') L = L.filter(x => x.due && x.due <= td);
  if (view === 'week') L = L.filter(x => x.due && x.due <= wk).sort((a, b) => a.due.localeCompare(b.due));
  if (view === 'all') L = S.tasks;
  if (!L.length) return v.append(el('div', 'empty', t('empty')));
  L.forEach(x => v.append(taskEl(x)));
}

function boardView(v) {
  const b = el('div', 'board');
  for (const k of ['todo', 'doing', 'done']) {
    const c = el('div', 'col', `<h3>${t(k)}</h3>`);
    c.ondragover = e => { e.preventDefault(); c.classList.add('over-col'); };
    c.ondragleave = () => c.classList.remove('over-col');
    c.ondrop = e => { e.preventDefault(); const m = byId(dragId); if (m) { setStatus(m, k); update(); } };
    S.tasks.filter(x => x.status === k).forEach(x => c.append(taskEl(x)));
    b.append(c);
  }
  v.append(b);
}

function calView(v) {
  const y = cal.getFullYear(), m = cal.getMonth(), td = today();
  const head = el('div', 'row', `<button class="btn">‹</button><strong style="flex:1;text-align:center">${cal.toLocaleDateString(S.settings.lang, { month: 'long', year: 'numeric' })}</strong><button class="btn">›</button>`);
  head.firstChild.onclick = () => { cal = new Date(y, m - 1, 1); render(); };
  head.lastChild.onclick = () => { cal = new Date(y, m + 1, 1); render(); };
  v.append(head);
  const g = el('div', 'cal'); g.style.marginTop = '10px';
  for (let i = 0; i < 7; i++) g.append(el('div', 'h', new Date(2024, 0, 1 + i).toLocaleDateString(S.settings.lang, { weekday: 'short' })));
  const start = new Date(y, m, 1 - ((new Date(y, m, 1).getDay() + 6) % 7));
  for (let i = 0; i < 42; i++) {
    const d = new Date(start); d.setDate(start.getDate() + i); const k = iso(d);
    const c = el('div', `d ${k === td ? 't' : ''} ${d.getMonth() !== m ? 'x' : ''}`, `<b>${d.getDate()}</b>`);
    S.tasks.filter(x => x.due === k).forEach(x => c.append(el('span', '', (x.status === 'done' ? '✓ ' : '') + esc(x.title))));
    c.onclick = () => { $('#add [name=due]').value = k; $('#add [name=title]').focus(); };
    g.append(c);
  }
  v.append(g);
}

function focusView(v) {
  const L = openTasks().sort((a, b) => PR[a.prio] - PR[b.prio] || (a.due || '9').localeCompare(b.due || '9'));
  if (!L.length) return v.append(el('div', 'empty', t('focusEmpty')));
  const x = L[focusIdx % L.length];
  const f = el('div', 'focus', `<div class="meta" style="justify-content:center">${x.due || ''} ${x.tag ? '#' + esc(x.tag) : ''} · ${t(x.prio)}</div><div class="big">${esc(x.title)}</div>
    <button class="btn primary" id="fd">${t('done')}</button> <button class="btn" id="fs">${t('skip')}</button>`);
  f.querySelector('#fd').onclick = () => { setStatus(x, 'done'); update(); };
  f.querySelector('#fs').onclick = () => { focusIdx++; render(); };
  v.append(f);
}

// ---- pomodoro (runs outside render so it keeps counting) ----
const P = { mode: 'focus', left: 25 * 60, run: null };
function beep() { try { const a = new AudioContext(), o = a.createOscillator(); o.connect(a.destination); o.start(); o.stop(a.currentTime + .3); } catch { } }
function pomoCard() {
  const c = el('div', 'card', `<h3>${t('pomo')} · ${t(P.mode === 'focus' ? 'focusT' : 'breakT')}</h3><div class="pomo" id="pt"></div>
    <div class="row" style="margin-top:6px"><button class="btn" id="pp">${P.run ? t('pause') : t('start')}</button><button class="btn" id="pr">${t('reset')}</button></div>`);
  const draw = () => { const e = c.querySelector('#pt'); if (e) e.textContent = `${String(Math.floor(P.left / 60)).padStart(2, '0')}:${String(P.left % 60).padStart(2, '0')}`; };
  draw();
  c.querySelector('#pp').onclick = () => {
    if (P.run) { clearInterval(P.run); P.run = null; } else P.run = setInterval(() => {
      if (--P.left <= 0) { beep(); toast(t('fin')); P.mode = P.mode === 'focus' ? 'break' : 'focus'; P.left = (P.mode === 'focus' ? 25 : 5) * 60; }
      const e = document.querySelector('#pt'); if (e) e.textContent = `${String(Math.floor(P.left / 60)).padStart(2, '0')}:${String(P.left % 60).padStart(2, '0')}`;
      document.title = P.run ? `${document.querySelector('#pt')?.textContent} · To-Do` : 'To-Do';
    }, 1000);
    render();
  };
  c.querySelector('#pr').onclick = () => { clearInterval(P.run); P.run = null; P.mode = 'focus'; P.left = 25 * 60; document.title = 'To-Do'; render(); };
  return c;
}

fetch('/api/state').then(r => r.json()).then(d => { if (d && d.tasks) S = { ...S, ...d, settings: { ...S.settings, ...d.settings } }; render(); }).catch(render);
