
---

## Interface Safety

The API validates:
- original_text must be a string
- typed_text must be a string
- time_seconds must be a positive number

Invalid input returns structured error responses instead of crashing.

---

## Verification (Tests)

Automated tests verify:

- Accuracy calculation logic
- WPM calculation logic
- API endpoint response structure

Run tests with:

