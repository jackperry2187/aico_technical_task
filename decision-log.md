1. Creating this decision log (seems valuable)

2. I want a frontend that's quick and easy to set up, still uses react, and won't have a ton of boilerplate. I took a look at Vite's [docs](https://vite.dev/guide/), which lead me to their [community templates](https://github.com/vitejs/awesome-vite#templates), which lead me to [this](https://github.com/joaopaulomoraes/reactjs-vite-tailwindcss-boilerplate) which looks minimal and good to me.
  - 2.1 I removed a lot from the template, namely frontend testing and related packages because I don't need that for this, and confirmed that npm run dev works.

3. I think express is going to be the easiest backend to set up quickly for this, but I haven't worked with it in a while, so I'm going off of [this](https://medium.com/@vihangamallawaarachchi.dev/setting-up-a-node-js-and-express-backend-with-typescript-a-comprehensive-guide-b15fad5c803c) and [this](https://dev.to/justwonder/setting-up-an-express-typescript-server-a-step-by-step-guide-gic) and taking the parts I actually want.
  - 3.1 In order to set up support with TS7 I had to modify some files, but I'm now able to run build/dev successfully.