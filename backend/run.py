from flask import Flask, jsonify
from flask_cors import CORS
from app.routes.typing_routes import typing_bp

# ⭐ Database import
from app.db import db


def create_app():
    app = Flask(__name__)
    CORS(app)

    # ⭐ DATABASE CONFIG
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///typing.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # ⭐ INIT DATABASE
    db.init_app(app)

    # ⭐ REGISTER ROUTES
    app.register_blueprint(typing_bp, url_prefix="/api")

    @app.route("/")
    def home():
        return {"message": "TypeFlow Lite Backend Running"}

    @app.errorhandler(Exception)
    def handle_exception(e):
        app.logger.error(f"Error occurred: {str(e)}")
        return jsonify({"error": "Internal Server Error"}), 500

    # ⭐ CREATE TABLES
    with app.app_context():
        db.create_all()

    return app


# ⭐ CREATE APP INSTANCE
app = create_app()


import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
