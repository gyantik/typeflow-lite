def validate_metrics_input(data):
    if not isinstance(data, dict):
        return False, "Invalid JSON body"

    if "original_text" not in data or not isinstance(data["original_text"], str):
        return False, "original_text must be a string"

    if "typed_text" not in data or not isinstance(data["typed_text"], str):
        return False, "typed_text must be a string"

    if "time_seconds" not in data or not isinstance(data["time_seconds"], (int, float)):
        return False, "time_seconds must be a number"

    if data["time_seconds"] <= 0:
        return False, "time_seconds must be greater than 0"

    return True, None
