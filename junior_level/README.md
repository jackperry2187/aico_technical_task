## Requirements
- Node.js and pnpm installed
- Ports 5050 (backend) and 5173 (frontend) available

## Running

In one terminal, run both `pnpm install` and `pnpm dev` in the `server` folder
In another terminal, run both `pnpm install` and `pnpm dev` in the `web` folder

### Tests

To run tests in the backend, run `pnpm test` 

## Architecture

The frontend is a simple React/Vite/TypeScript project with a single page.
The backend is Express for the API, Supertest + Jest for testing, and a JSON file to store device information.

## Summary of Approach / Challenges
- This is the least I've used AI in ~8 months which was both difficult and refreshing
- This is also my first time starting a new frontend + backend project from scratch in a while, so I spent a considerable amount of time just refreshing myself on getting everything set up
- I focused heavily on things I already know and have worked with before and recently, i.e. Vite/React/TypeScript/Express/Jest/Supertest
- TypeScript version 7 was a wierd and unexpected hurdle
- Keeping a decision log was useful and felt like I was writing patch notes
