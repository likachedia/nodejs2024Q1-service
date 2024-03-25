# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {https://github.com/likachedia/nodejs2024Q1-service}
```
Go to branch develop1

## Installing NPM modules

```
npm install
```
if you get the problem with installation try this command:

```
npm install --legacy-peer-deps
```
or this:
```
npm install --force
```
## Running application

```
docker compose up
```
After this command may you got problem with running the app.
Open the second terminal and run this scripts

```
npm run prisma:generate

npm run prisma:migrate

npm run prisma:deploy
``` 
### Vulnerabilities scan

After you have built the images 
you can scan them for vulnerabiities and recommendations using Docker Scout. Run

```
npm run docker:scan
```
## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
