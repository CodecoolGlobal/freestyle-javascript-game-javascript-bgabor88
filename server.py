#!.\venv\Scripts\python.exe
from flask import Flask, render_template, url_for, request, redirect, session
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import desc
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///pairs.db"
db = SQLAlchemy(app)


class Pairs(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False)
    score = db.Column(db.String(20), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return '<Pairs %r>' % self.id


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/game/<difficulty>', methods=['POST', 'GET'])
def game(difficulty):
    if request.method == 'POST':
        pass
    return render_template('game.html', difficulty=difficulty)


@app.route('/test', methods=['POST', 'GET'])
def test():
    if request.method == 'POST':
        username = request.form['username']
        score = request.form['score']
        new_entry = Pairs(username=username, score=score)
        db.session.add(new_entry)
        db.session.commit()
        return redirect(url_for('hall_of_fame'))
    return render_template('test.html')


@app.route('/hall_of_fame')
def hall_of_fame():
    scores = Pairs.query.order_by(desc(Pairs.score)).limit(10)
    return render_template('high_scores.html', scores=scores)


@app.route('/credits', methods=['POST', 'GET'])
def game_credits():
    creators = {}
    return render_template('credits.html', creators=creators)


@app.route('/tutorial')
def tutorial():
    return render_template('tutorial.html')


if __name__ == "__main__":
    app.run(
        host='localhost',
        port=8000,
        debug=True,
    )
