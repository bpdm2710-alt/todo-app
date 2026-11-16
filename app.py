"""Personal to-do app: Flask serves the UI and stores one JSON document in SQLite.

Set APP_PASSWORD to require a password (do this before putting the app on the internet).
"""
import hmac
import json
import os
import secrets
import sqlite3
import time
from datetime import timedelta

from flask import Flask, jsonify, redirect, request, send_from_directory, session
from werkzeug.middleware.proxy_fix import ProxyFix

DB = os.environ.get("TODO_DB", "todo.db")
PASSWORD = os.environ.get("APP_PASSWORD", "")

app = Flask(__name__, static_folder="static", static_url_path="/static")
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)  # correct https/host behind Render, Railway, etc.
app.config.update(
    SECRET_KEY=os.environ.get("SECRET_KEY") or secrets.token_hex(32),
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE="Lax",
    SESSION_COOKIE_SECURE=os.environ.get("SECURE_COOKIES") == "1",
    PERMANENT_SESSION_LIFETIME=timedelta(days=365),  # stay signed in on the phone
)


def db():
    if os.path.dirname(DB):
        os.makedirs(os.path.dirname(DB), exist_ok=True)
    c = sqlite3.connect(DB)
    c.execute("create table if not exists state(id integer primary key check(id=1), data text not null)")
    return c


@app.before_request
def require_login():
    if not PASSWORD or session.get("ok"):
        return None
    if request.path == "/login" or request.path.startswith("/static/") or request.path in ("/manifest.webmanifest", "/sw.js"):
        return None
    if request.path.startswith("/api/"):
        return jsonify(error="login required"), 401
    return redirect("/login")


@app.route("/login", methods=["GET", "POST"])
def login():
    if not PASSWORD:
        return redirect("/")
    err = ""
    if request.method == "POST":
        if hmac.compare_digest(request.form.get("password", "").encode(), PASSWORD.encode()):
            session.clear()
            session.permanent = True
            session["ok"] = True
            return redirect("/")
        time.sleep(1)  # slow down guessing
        err = '<p class="err">Sai mật khẩu, thử lại nhé.</p>'
    with open(os.path.join(app.static_folder, "login.html"), encoding="utf-8") as f:
        return f.read().replace("<!--ERR-->", err), (401 if err else 200)


@app.get("/logout")
def logout():
    session.clear()
    return redirect("/login")


@app.get("/")
def index():
    return send_from_directory("static", "index.html")


@app.get("/manifest.webmanifest")
def manifest():
    return send_from_directory("static", "manifest.webmanifest", mimetype="application/manifest+json")


@app.get("/sw.js")
def service_worker():
    r = send_from_directory("static", "sw.js", mimetype="text/javascript")
    r.headers["Cache-Control"] = "no-cache"
    return r


@app.get("/api/state")
def get_state():
    with db() as c:
        row = c.execute("select data from state where id=1").fetchone()
    return jsonify(json.loads(row[0]) if row else {})


@app.put("/api/state")
def put_state():
    data = request.get_json(silent=True)
    if not isinstance(data, dict) or not isinstance(data.get("tasks", []), list):
        return jsonify(error="Body must be a JSON object with a 'tasks' list."), 400
    with db() as c:
        c.execute(
            "insert into state(id,data) values(1,?) on conflict(id) do update set data=excluded.data",
            (json.dumps(data),),
        )
    return jsonify(ok=True)


if __name__ == "__main__":
    app.run(host=os.environ.get("HOST", "127.0.0.1"), port=int(os.environ.get("PORT", 5000)))
