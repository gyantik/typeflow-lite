# TypeFlow Lite

## Overview
TypeFlow Lite is a minimal full-stack typing metrics application built with Flask (backend) and React (frontend).  
Users type a given text and receive calculated typing speed (WPM) and accuracy in real time.

The project focuses on clean architecture, safety, and maintainability rather than feature complexity.

---

## Architecture

### Backend (Flask API)
Structure follows clear separation of concerns:

- routes → API endpoints only (thin controllers)
- services → business logic (WPM + accuracy calculations)
- schemas → input validation rules
- tests → automated verification

Key design idea:
Routes do not contain logic. All computation lives in services.

### Frontend (React)
Single-page interface that:
- sends typing data to backend
- displays WPM and accuracy
- keeps UI simple and predictable

---

## Key Technical Decisions

- Thin routes to prevent logic duplication.
- Service layer to isolate core calculations.
- Validation layer to prevent invalid states.
- Global error handler to keep failures observable.
- Minimal UI to prioritise system clarity over visuals.

---

## AI Usage

AI tools were used for:
- initial project structure planning
- boilerplate code generation
- debugging and refactoring assistance
- test case suggestions

AI outputs were manually reviewed and adjusted to maintain system integrity.

AI behavior is constrained using rules defined in:
