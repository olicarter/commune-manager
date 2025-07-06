# Contributing

Thank you for wanting to contribute to this project!

## Architectural Principles

This repository follows **Domain Driven Design (DDD)** and **vertical slicing**. All features should be organized by domain and encapsulated so that each slice contains its own logic, data access and interfaces.

When adding new code:

- Model your changes around the core domain concepts.
- Keep features independent; avoid spreading feature logic across unrelated modules.
- New slices should contain everything they need (handlers, models, tests, etc.) within the same feature folder.

## Testing

All new functionality must include tests. For API endpoints, write integration
tests that exercise the actual HTTP routes. Pull requests without appropriate
test coverage may be rejected.

Please ensure pull requests respect these guidelines.
