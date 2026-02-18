import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import json
from run import create_app


def test_metrics_endpoint():
    app = create_app()
    client = app.test_client()

    payload = {
        "original_text": "hello world",
        "typed_text": "hello world",
        "time_seconds": 30
    }

    response = client.post(
        "/api/metrics",
        data=json.dumps(payload),
        content_type="application/json"
    )

    assert response.status_code == 200
    data = response.get_json()
    assert "accuracy" in data
    assert "wpm" in data
