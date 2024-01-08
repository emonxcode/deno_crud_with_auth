// import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
// import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
// import todoRouter from "./src/modules/todo/routes/todo.routes.ts";
// import userRouter from "./src/modules/user/routes/user.routes.ts";
// import express from "npm:express@4.18.2";

// const app = new Application();
// const router = new Router();
// const port: number = 8080;

// // routes
// app.use(todoRouter.routes());
// app.use(userRouter.routes());
// app.use(todoRouter.allowedMethods());
// app.use(userRouter.allowedMethods());
// app.use(oakCors({ origin: "*" }));

// app.addEventListener("listen", ({ secure, hostname, port }) => {
//     const protocol = secure ? "https://" : "http://";
//     const url = `${protocol}${hostname ?? "localhost"}:${port}`;
//     console.log(`Listening on: ${port}`);
// });

// await app.listen({ port }).then(() => {
//     console.log("Server running at port :" + port);
// });
// export default app;

import { Application, Router, testing } from "https://deno.land/x/oak/mod.ts";
import { imageUpload } from "./src/helper/helper.ts";
const app = new Application();
const baseDir = "D:/Projects/Web/deno-crud/images/";

const router = new Router();
router.post("/upload", async (ctx) => {
  const body = ctx.request.body();
  if (body.type === "form-data") {
    const data = body.value;
    const formData = await data.read();
    const NidUploadFrontSidePath = "/images/";

    const ImageUpArray = [
      { path: NidUploadFrontSidePath, file: formData.files![0] },
    ];

    await imageUpload(ImageUpArray);

    console.log(`File uploaded successfully to: ${baseDir}`);

    ctx.response.body = { "message": formData.fields["name"] };
  }
  ctx.response.status = 201;
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 3000 });
