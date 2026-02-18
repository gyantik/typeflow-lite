import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.services.metrics_service import calculate_accuracy, calculate_wpm


def test_accuracy_basic():
    result = calculate_accuracy("hello", "hello")
    assert result == 100.0


def test_accuracy_partial():
    result = calculate_accuracy("hello", "hezzo")
    assert result < 100.0


def test_wpm_positive():
    result = calculate_wpm("hello world", 30)
    assert result > 0
