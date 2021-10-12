#!.\venv\Scripts\python.exe
from flask import Flask, render_template, url_for, request, redirect
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
    if request.method == 'POST':
        pass
    return render_template('game.html', difficulty=difficulty)


@app.route('/hall_of_fame')
def hall_of_fame():
    scores = Pairs.query.order_by(Pairs.score).limit(10)
    return render_template('high_scores.html', scores=scores)


if __name__ == "__main__":
    app.run(
        host='localhost',
        port=8000,
        debug=True,
    )
