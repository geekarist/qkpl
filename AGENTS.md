# Repository Guidelines

## Project Structure & Module Organization
This repository is a minimal Node.js project. The entry point is [`index.js`](/Users/chrp/Workspaces/agent-sandbox/qkpl/index.js), and package metadata plus npm scripts live in [`package.json`](/Users/chrp/Workspaces/agent-sandbox/qkpl/package.json). There is no `src/`, `test/`, or `assets/` directory yet.

As the project grows, keep runtime code in the repository root only if it remains very small. Otherwise, move application code into `src/` and place automated tests under `test/` or `tests/` to keep responsibilities clear.

## Build, Test, and Development Commands
- `npm install`: install project dependencies after they are added to `package.json`.
- `node index.js`: run the current entry script locally.
- `npm test`: runs the configured test script. It currently fails intentionally because no test suite has been set up yet.

If you add a build step, expose it through `package.json` scripts so contributors can rely on `npm run <script>` instead of ad hoc commands.

## Coding Style & Naming Conventions
Use simple CommonJS-compatible JavaScript consistent with the current package type. Prefer 2-space indentation, semicolons optional only if used consistently, and double quotes if editing existing files like `index.js`.

Use descriptive file names in lowercase, for example `index.js`, `server.js`, or `user-service.js`. Prefer small modules with one clear responsibility.

This repository does not currently include ESLint or Prettier. If you add either tool, document the command in `package.json` and apply it consistently across the codebase.

## Testing Guidelines
There is no testing framework configured yet. When adding tests, use a standard Node.js-friendly setup and wire it to `npm test`. Name test files after the unit under test, such as `index.test.js` or `user-service.test.js`.

Keep tests fast and deterministic. Cover new behavior and bug fixes in the same change that introduces them.

## Commit & Pull Request Guidelines
Git history uses short, imperative commit subjects such as `Add main script` and `Initial commit`. Continue that style: one-line summaries that describe what the change does.

Pull requests should include a concise description, testing notes, and any relevant console output if behavior changes. Link related issues when applicable and include screenshots only if a future change adds a UI.
