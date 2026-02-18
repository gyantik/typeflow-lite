# Simple AI summary (rule-based for now)

def generate_summary(text):
    # VERY SIMPLE LOGIC:
    # Take first 3 lines as summary
    lines = text.split("\n")
    summary = " ".join(lines[:3])
    return summary
