# Personal To-Do

A customizable to-do app. Python (Flask + SQLite) backend, vanilla JS frontend.

## Run
```bash
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python app.py        # http://127.0.0.1:5000
```
Env vars: `PORT`, `HOST` (use `0.0.0.0` to open it from your phone on the same Wi-Fi), `TODO_DB` (database path).

## Features
- Tasks: deadline, priority, tag (e.g. course/project), notes, subtasks, recurring (daily/weekly/monthly)
- Views: Today, Week, All, Calendar, Board (kanban), Focus (one task at a time)
- Drag and drop: reorder in lists, move cards between board columns
- Look: light/dark, accent color, English/Vietnamese
- Motivation: streak, progress bar, daily summary, Pomodoro timer (25/5)
- Data: everything is stored in `todo.db`; Export/Import JSON in the sidebar

## Sync and security
Data lives on the machine running `app.py`. Host it on a small server to use one list from phone and laptop.
There is no login: do not expose it to the internet without adding authentication.

## Install on a phone
Open the site in the phone browser, then "Add to Home Screen".
