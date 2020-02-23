firebase-functions-template
===========================

Example Express.js setup for an API server on Firebase Functions. [Inspired by this Medium post](https://medium.com/p/a20b536c6aec).

## Features

- Automatically initializes [`functions.config()`](https://firebase.google.com/docs/functions/config-env) from a local `config.json` file. Includes module that provides the local copy if running inside `firebase serve --only functions`.
- Organized Express.js stack
- Convenient `postdeploy` and `predeploy` actions.
- Code generation with [hygen](https://github.com/jondot/hygen) (Try: `npx hygen route new <name>`)
- OpenAPI integration with [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc). (See: [Sample](functions/src/lib/languages/route.js))