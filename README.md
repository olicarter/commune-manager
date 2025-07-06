# Commune Manager

A monorepo containing both the frontend and backend applications.

- `web` – Next.js frontend
- `api` – NestJS backend

This repository is configured as an **npm workspace**. The root
`package.json` lists both `api` and `web` as workspaces so dependencies can
be managed together.

## Development

When running backend commands, ensure you invoke the `nest` and `jest`
CLIs via npm. Background agents do not have globally installed binaries, so
use `npm exec` (or `npx`) to run them. For example:

```bash
# start the API
npm exec nest start

# run backend tests
npm exec jest
```

Run `npm test` from the repository root to execute the `test` script in
all workspaces. It leverages npm's workspace mode to run each package's
tests if the script is present.
