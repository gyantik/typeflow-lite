from flask import Flask, jsonify
from flask_cors import CORS
from app.routes.typing_routes import typing_bp
from app.db import db
import os


def create_app():
    app = Flask(__name__)
    CORS(app)

    # Database config
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///typing.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    app.register_blueprint(typing_bp, url_prefix="/api")

    @app.route("/")
    def home():
        return {"message": "TypeFlow Lite Backend Running"}

    with app.app_context():
        db.create_all()

    return app


app = create_app()

# ⭐ IMPORTANT FOR RENDER
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
