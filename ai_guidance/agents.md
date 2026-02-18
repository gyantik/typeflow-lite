# AI Guidance Rules

## Architecture Rules
- API routes must remain thin.
- Business logic belongs only in the services layer.
- Validation must occur before calling services.

## Safety Rules
- AI must not modify database schema without review.
- AI must not place business logic inside routes.
- All API input must be validated.

## Coding Standards
- Keep functions small and readable.
- Prefer simple logic over complex abstractions.
- Maintain folder separation: routes, services, schemas.

## Testing Requirements
- New logic should include pytest tests.
- Existing tests must continue passing after changes.
