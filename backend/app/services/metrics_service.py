def calculate_accuracy(original_text, typed_text):
    if not original_text:
        return 0

    correct_chars = 0
    for i in range(min(len(original_text), len(typed_text))):
        if original_text[i] == typed_text[i]:
            correct_chars += 1

    accuracy = (correct_chars / len(original_text)) * 100
    return round(accuracy, 2)


def calculate_wpm(typed_text, time_seconds):
    if time_seconds <= 0:
        return 0

    words = len(typed_text.split())
    minutes = time_seconds / 60
    wpm = words / minutes
    return round(wpm, 2)
