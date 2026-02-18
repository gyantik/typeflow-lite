# TypeFlow Lite

## Overview
A minimal typing metrics web app built with Flask and React.
Users submit typed text and receive WPM and accuracy results.

## Architecture
Backend:
- Flask API
- Routes layer
- Services layer
- Validation schemas

Frontend:
- React single page interface

## Key Technical Decisions
- Thin routes for maintainability
- Service layer for logic separation
- Input validation to prevent invalid states

## AI Usage
AI tools were used for:
- Architecture planning
- Boilerplate generation
- Debugging assistance

All generated code was reviewed and adjusted manually.

## Risks
- Large text inputs may impact performance.
- No authentication implemented.

## Future Extensions
- Add database storage for sessions.
- Add AI-generated summaries.
- Add typing analytics dashboard.

## Running the Project

Backend:
python run.py

Frontend:
npm start
