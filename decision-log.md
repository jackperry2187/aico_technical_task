1. Creating this decision log (seems valuable)

2. I want a frontend that's quick and easy to set up, still uses react, and won't have a ton of boilerplate. I took a look at Vite's [docs](https://vite.dev/guide/), which lead me to their [community templates](https://github.com/vitejs/awesome-vite#templates), which lead me to [this](https://github.com/joaopaulomoraes/reactjs-vite-tailwindcss-boilerplate) which looks minimal and good to me.
  - 2.1 I removed a lot from the template, namely frontend testing and related packages because I don't need that for this, and confirmed that npm run dev works.

3. I think express is going to be the easiest backend to set up quickly for this, but I haven't worked with it in a while, so I'm going off of [this](https://dev.to/janoskocs/setting-up-a-modern-express-api-with-typescript-jest-eslint-prettier-quick-guide-2025-1a26) to setup both an express typescript backend and a jest/supertest testing environment.
  - 3.1 I was getting "The TypeScript compiler "typescript" (version 7.0.2) does not expose the JavaScript compiler API required by ts-jest. To use TypeScript 7 for project type-checking, install it as "@typescript/native" and alias "@typescript/typescript6" as "typescript" for ts-jest." when running the tests after the initial setup. I've seen some other issues with TypeScript version 7 at this point - so I'm downgrading to 6. This also means I had to add `"types": ["jest"]` to the package.json.
  - 3.2 I decided not to implement the eslint/prettier stuff.

4. To follow TDD, I'm going to set up testing for the backend routes based on the information in the task.
  - 4.1 The tests are set up and passing, and the routes are created. I want to write failing tests now, but need to come up with a schema of the database first. I'll make a mock of a filled database based on the task requirements.

5. I'm going to set up a mock database based on the requirements that draws on what the mock laid out.
  - 5.1 I've now created a simple file that handles switching between db.json or mock.json based on if the tests are running or not. The mock file will also reset in between tests.

6. Now that the db is implemented, I'll start writing failing tests for the backend routes.
  6.1 Added the POST /register/device/:id tests
  6.2 Added the GET /list test
  6.3 Added the GET /device/:id tests