# Commune Manager

A monorepo containing a Next.js frontend backed by InstantDB.

- `web` – Next.js frontend using InstantDB

This repository is configured as an **npm workspace**. The root
`package.json` lists `web` as a workspace so dependencies can
be managed together.

## Development

The frontend connects directly to InstantDB. Set the environment variable
`NEXT_PUBLIC_INSTANT_APP_ID` to the app ID for your InstantDB project.

Run `npm test` from the repository root to execute the `test` script in
all workspaces (currently only `web`).
