# Commune Manager

A monorepo containing both the frontend and backend applications.

- `web` – Next.js frontend
- `api` – NestJS backend

This repository is configured as an **npm workspace**. The root
`package.json` lists both `api` and `web` as workspaces so dependencies can
be managed together.

## Development

Backend development uses the NestJS framework and Jest for testing.
Run their CLI commands normally (e.g. `nest start`, `jest`), as they are
installed as part of the development setup.

Run `npm test` from the repository root to execute the `test` script in
all workspaces. It leverages npm's workspace mode to run each package's
tests if the script is present.
