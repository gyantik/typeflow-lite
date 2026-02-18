from app.services.ai_service import generate_summary
from flask import Blueprint, jsonify, request
from app.services.metrics_service import calculate_accuracy, calculate_wpm
from app.schemas.typing_schema import validate_metrics_input

# PDF imports
from PyPDF2 import PdfReader
import os

# DATABASE imports
from app.models.typing_model import TypingSession
from app.db import db

# FIRST define blueprint
typing_bp = Blueprint("typing", __name__)


@typing_bp.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "API working"})


@typing_bp.route("/metrics", methods=["POST"])
def get_metrics():
    data = request.json

    valid, error = validate_metrics_input(data)
    if not valid:
        return jsonify({"error": error}), 400

    original_text = data.get("original_text")
    typed_text = data.get("typed_text")
    time_seconds = data.get("time_seconds")

    accuracy = calculate_accuracy(original_text, typed_text)
    wpm = calculate_wpm(typed_text, time_seconds)

    # SAVE RESULT INTO DATABASE
    session = TypingSession(
        original_text=original_text,
        typed_text=typed_text,
        accuracy=accuracy,
        wpm=wpm
    )

    db.session.add(session)
    db.session.commit()

    return jsonify({
        "accuracy": accuracy,
        "wpm": wpm
    })


# PDF Upload + Text Extraction
@typing_bp.route("/upload", methods=["POST"])
def upload_pdf():
    file = request.files["file"]

    upload_folder = "uploads"
    os.makedirs(upload_folder, exist_ok=True)

    filepath = os.path.join(upload_folder, file.filename)
    file.save(filepath)

    reader = PdfReader(filepath)
    extracted_text = ""

    for page in reader.pages:
        extracted_text += page.extract_text() or ""

    #AI SUMMARY
    summary = generate_summary(extracted_text)

    return jsonify({
        "message": "uploaded",
        "text": extracted_text,
        "summary": summary
    })

# GET HISTORY FROM DATABASE
@typing_bp.route("/history", methods=["GET"])
def get_history():
    sessions = TypingSession.query.all()

    history = []
    for s in sessions:
        history.append({
            "id": s.id,
            "accuracy": s.accuracy,
            "wpm": s.wpm,
            "original_text": s.original_text,
            "typed_text": s.typed_text
        })

    return jsonify(history)
