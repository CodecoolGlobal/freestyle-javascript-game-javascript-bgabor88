#!.\venv\Scripts\python.exe
import random
from flask import Flask, render_template, url_for, request, redirect, session
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import desc
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///pairs.db"
db = SQLAlchemy(app)
app.secret_key = 'New trilogy sucks!'


class Pairs(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False)
    score = db.Column(db.String(20), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    game_mode = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return '<Pairs %r>' % self.id


@app.route('/')
def index():
    if 'username' in session.keys():
        return redirect(url_for('menu'))
    return render_template('entry.html')


@app.route('/menu', methods=['POST', 'GET'])
def menu():
    if request.method == 'POST':
        username = request.form['username']
        session['username'] = username
        session['easy'] = {'level1': 0, 'level2': 0, 'level3': 0}
        session['normal'] = {'level1': 0, 'level2': 0, 'level3': 0}
        session['hard'] = {'level1': 0, 'level2': 0, 'level3': 0}
        session.modified = True
        return redirect(url_for('menu', session=session))
    return render_template('menu.html', session=session)


@app.route('/game/<difficulty>/<level>', methods=['POST', 'GET'])
def game(difficulty, level):
    cards = []
    already_choosed = []
    card_backs = ['01', '02', '03']
    num_of_cards = 10 if difficulty == 'easy' else 14 if difficulty == 'normal' else 20
    if request.method == 'POST':
        score = int(request.form['score'])
        session[difficulty][level] = score
        session.modified = True
        if level == 'level3':
            final_score = sum([score for score in list(session[difficulty].values())])
            username = session['username']
            game_mode = difficulty.lower()
            new_entry = Pairs(username=username, score=final_score, game_mode=game_mode)
            db.session.add(new_entry)
            db.session.commit()
        return redirect(url_for('menu'))
    while len(cards) != num_of_cards:
        choose = random.randint(1, 36)
        if choose not in already_choosed:
            cards.append(choose)
            already_choosed.append(choose)
    return render_template('game.html', difficulty=difficulty, level=level, cards=cards, backgrounds=card_backs)


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
    tables = []
    for mode in ['easy', 'normal', 'hard']:
        tables.append(Pairs.query.filter(Pairs.game_mode == mode).order_by(desc(Pairs.score)).limit(10))
    return render_template('high_scores.html', tables=tables)


@app.route('/credits', methods=['POST', 'GET'])
def game_credits():
    creators = {}
    return render_template('credits.html', creators=creators)


@app.route('/tutorial')
def tutorial():
    cards = []
    card_backs = ['01', '02', '03']
    if request.method == 'POST':
        pass
    for number in range(1, 11):
        cards.append(number)
    return render_template('tutorial.html', difficulty='easy', cards=cards, backgrounds=card_backs)


if __name__ == "__main__":
    app.run(
        host='localhost',
        port=8000,
        debug=True,
    )
