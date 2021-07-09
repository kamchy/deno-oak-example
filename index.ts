import { Application } from "./deps.ts";
import { router } from "./routes/routes.js";
import { validate } from "./utils/validate.ts";

const app = new Application();
app.addEventListener("error", (event) => {
  console.log(event.error);
});

app.use(validate);
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on port 8000...`);
await app.listen({ port: 8000 });
