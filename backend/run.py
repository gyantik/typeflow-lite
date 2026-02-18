from flask import Flask, jsonify
from flask_cors import CORS
from app.routes.typing_routes import typing_bp

# ⭐ NEW — import database
from app.db import db


def create_app():
    app = Flask(__name__)
    CORS(app)

    # ⭐ DATABASE CONFIG
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///typing.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # ⭐ INIT DB
    db.init_app(app)

    app.register_blueprint(typing_bp, url_prefix="/api")

    @app.route("/")
    def home():
        return {"message": "TypeFlow Lite Backend Running"}

    @app.errorhandler(Exception)
    def handle_exception(e):
        app.logger.error(f"Error occurred: {str(e)}")
        return jsonify({"error": "Internal Server Error"}), 500

    # ⭐ CREATE TABLES AUTOMATICALLY
    with app.app_context():
        db.create_all()

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
