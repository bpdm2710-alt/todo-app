# MINH//OS — Personal To-Do

Minh's customizable to-do app with a neon cyber look and an animated background. Python (Flask + SQLite) backend, vanilla JS frontend.

## Run
```bash
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python app.py        # http://127.0.0.1:5000
```
Env vars: `PORT`, `HOST` (use `0.0.0.0` to open it from your phone on the same Wi-Fi), `TODO_DB` (database path).

## Features
Every feature has its own section, picked from the side menu (a slide-out drawer on phones, opened with ☰):

| Group | Section | What it does |
|---|---|---|
| Tasks | Dashboard | Greeting for Minh, streak, today's progress, overdue/open counts, up next, today's schedule, 7-day chart, quick Pomodoro |
| | Daily schedule | Timeline of time blocks for each day with a tick to mark each done; blocks repeat every day, weekdays, weekends or only one day; the current block is highlighted |
| | Today / Week | Tasks due today (incl. overdue) / in the next 7 days |
| | All tasks | Search plus tag, priority and status filters |
| Views | Calendar | Month grid; click a day to add a task on that date |
| | Board | Kanban (To do / Doing / Done) with drag and drop |
| | Focus | One task at a time, highest priority first |
| Tools | Pomodoro | Big timer, adjustable focus/break minutes, sessions counted per day |
| | Stats | 14-day completions, open tasks by tag and by priority |
| System | Settings | Your name, language (EN/VI), dark/light, accent color, scanline effect, animated background, interaction effects, shortcuts |
| | Data | Export/Import JSON, clear completed tasks |

- Tasks: deadline, priority, tag (e.g. course/project), notes, subtasks, status, recurring (daily/weekly/monthly)
- Keyboard: `1`…`0` jump to a menu item, `N` new task, `/` search, `Esc` close menu/editor
- Each section has its own URL (`/#stats`, `/#board`, …), so the browser back button and bookmarks work
- A running Pomodoro shows in the top bar from any section
- Data: everything is stored in `todo.db`

## Sync and security
Data lives on the machine running `app.py`. Host it on a small server to use one list from phone and laptop.
There is no login: do not expose it to the internet without adding authentication.

## Install on a phone
Open the site in the phone browser, then "Add to Home Screen".
