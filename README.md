# MINH//OS — Personal To-Do

Minh's customizable to-do app with a neon cyber look and an animated background. Python (Flask + SQLite) backend, vanilla JS frontend.

## Run
```bash
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python app.py        # http://127.0.0.1:5000
```
Env vars: `PORT`, `HOST` (use `0.0.0.0` to open it from your phone on the same Wi-Fi), `TODO_DB` (database path), `APP_PASSWORD`, `SECRET_KEY`, `SECURE_COOKIES=1` (behind HTTPS).

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

## Look
The default look is **Aqua Daylight** (light): pale water blue with frosted glass panels and an animated background.
A dark neon theme is still available in Settings → Theme.

## Password
Set `APP_PASSWORD` and the app shows a sign-in page; the session lasts a year on each device. Without it there is no login,
so always set it before putting the app on the internet. `SECRET_KEY` keeps people signed in across restarts.

## Put it online with your own link (Render)
1. Create an account at render.com and choose **New → Blueprint**, then pick this repository. `render.yaml` sets everything up:
   gunicorn, a 1 GB disk for `todo.db` (data survives deploys), HTTPS, and a generated `SECRET_KEY`.
2. When asked, enter `APP_PASSWORD`.
3. The app is live at `https://minh-os.onrender.com` (or similar).
4. For your own domain (e.g. `minhos.app`, bought from Cloudflare, Namecheap, Porkbun…): in Render open the service →
   **Settings → Custom Domains → Add**, then add the DNS record Render shows at your domain registrar. Render issues the HTTPS certificate.

The plan in `render.yaml` is `starter` because Render's free plan has no persistent disk (data would be lost on every deploy).

## Install on iPhone
1. Open the site in **Safari** (it must be Safari on iOS) and sign in.
2. Tap **Share** (□↑) → **Add to Home Screen** → **Add**.
3. MINH//OS appears on the home screen with its own icon and opens full screen, like a normal app.

On Android: Chrome → ⋮ → **Install app**.
## Sync and security
Data lives on the machine running `app.py`, so phone and laptop share one list when it is hosted. Set `APP_PASSWORD` before exposing it.

