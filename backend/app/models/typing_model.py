from app.db import db

class TypingSession(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    original_text = db.Column(db.Text)
    typed_text = db.Column(db.Text)
    accuracy = db.Column(db.Float)
    wpm = db.Column(db.Float)
