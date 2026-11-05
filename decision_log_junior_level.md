# This is the decision log for the junior_level implementation
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
  - 6.1 Added the POST /register/device/:id tests
  - 6.2 Added the GET /list test
  - 6.3 Added the GET /device/:id tests
  - 6.4 Added the PATCH /device/:id tests
  - 6.5 Added the DELETE /device/:id tests
  - 6.6 All 16 tests are now written and failing, as expected.

7. Now I'll start on implementing the routes to make the tests pass.
  - 7.1 I started with GET /list since that one's pretty easy, I needed to change toBe to toStrictEqual since I actually wanted equality checking
  - 7.2 When implementing POST /register/device/:id, I needed a way to check that the input was a number and got a regex from [this](https://stackoverflow.com/questions/9011524/regex-to-check-whether-a-string-contains-only-numbers) post. I also needed to add `app.use(express.json());` in order for the `res.body` to be parsed correctly.
  - 7.3 The GET /device/:id route was meant to be straightforward, but was failing because /device/4 was actually real due to the previous /register/device/4 run in the tests. I added a resetDb function to ensure the database is reset between tests. The tests I copied over from /register/device were also still pointing to that rather than /get, so I updated them accordingly. This also fixed the list test, which broke after the implementation of /register, but I hadn't realised.
  - 7.4 The implementation of PATCH /device/:id highlighted that I had used `PATCH` instead of `patch` in the tests, which was breaking them, the same was true for some of the DELETE tests so I preemptively updated those too.
  - 7.5 Implementing the PATCH route made me realise some things, notably that I'm not checking for negative numbers and I also want to put a bound on the PATCH value, 0 to 100 makes sense for that. I've also added tests where relevant for this.
  - 7.6 Ran into another `toBe` that was supposed to be a `toStrictEqual` for the DELETE tests. Otherwise good, and all 25 tests are now passing!

8. I tried to test the /list route by going to `http://localhost:5050/list` in the browser (after copying the items from mock.json into db.json) and it didn't work and caused an odd error. I realised I was referencing database.json (which wasn't a file), and needed to be using `__dirname`, so I updated that and the usages of it.

9. The next thing I wanted to implement was getting the list on the frontend. 
  - 9.1 I found [this](https://vite.dev/config/server-options#server-proxy) in the vite documentation which should allow me to avoid CORS issues
  - 9.2 From the network tab in chrome I can tell I'm getting the three items I would expect
  - 9.3 I added a table to display the list of devices, which should meet the minimum requirements.

10. Bonus features
  - 10.1 Added a refresh button to update the list
  - 10.2 Added a random patch button to call the patch route and then refresh the list, had to add `/device` to the proxy list as well
  - 10.3 Added a button to delete the last device and then refresh. Also correctly typed the devices object in the frontend, which I should've done earlier.
  - 10.4 Added an "add new" button, which makes a new `light` device and then refreshes. Also needed to add the `/register` route to the proxy list.
  - 10.5 Added a table that displays the history of the first device
