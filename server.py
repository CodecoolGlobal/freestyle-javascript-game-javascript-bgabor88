#!.\venv\Scripts\python.exe
from flask import Flask, render_template, url_for, request, redirect, session
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///pairs.db"
db = SQLAlchemy(app)


class Pairs(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False)
    score = db.Column(db.Integer(), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return '<Scores %r>' % self.id


@app.route('/', methods=['POST', 'GET'])
def index():
    return render_template('index.html')


@app.route('/game/<difficulty>', methods=['POST', 'GET'])
def game(difficulty):
    cards = []
    card_backs = ['01', '02', '03']
    num_of_cards = 10 if difficulty == 'easy' else 14 if difficulty == 'normal' else 20
    if request.method == 'POST':
        pass
    for number in range(1, num_of_cards + 1):
        cards.append(number)
    return render_template('game.html', difficulty=difficulty, cards=cards, backgrounds=card_backs)


@app.route('/hall_of_fame')
def hall_of_fame():
    scores = Pairs.query.order_by(Pairs.score).limit(10)
    return render_template('high_scores.html', scores=scores)


@app.route('/credits')
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
