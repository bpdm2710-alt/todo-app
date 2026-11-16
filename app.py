"""Personal to-do app: Flask serves the UI and stores one JSON document in SQLite."""
import json
import os
import sqlite3

from flask import Flask, jsonify, request, send_from_directory

DB = os.environ.get("TODO_DB", "todo.db")
app = Flask(__name__, static_folder="static", static_url_path="/static")


def db():
    c = sqlite3.connect(DB)
    c.execute("create table if not exists state(id integer primary key check(id=1), data text not null)")
    return c


@app.get("/")
def index():
    return send_from_directory("static", "index.html")


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
