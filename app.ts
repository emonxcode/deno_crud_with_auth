import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import todoRouter from "./src/modules/todo/routes/todo.routes.ts";
import userRouter from "./src/modules/user/routes/user.routes.ts";

const app = new Application();
const router = new Router();
const port: number = 8080;

// routes
app.use(todoRouter.routes());
app.use(userRouter.routes());
app.use(todoRouter.allowedMethods());
app.use(userRouter.allowedMethods());
app.use(oakCors({ origin: "*" }));

// app.addEventListener("listen", ({ secure, hostname, port }) => {
//     const protocol = secure ? "https://" : "http://";
//     const url = `${protocol}${hostname ?? "localhost"}:${port}`;
//     console.log(`Listening on: ${port}`);
// });

await app.listen({ port }).then(() => {
    console.log("Server running at port :" + port);
});
export default app;
