import { Router } from "https://deno.land/x/oak/mod.ts";
import userController from "../controller/user.controller.ts";

const router = new Router();
router
    .get('/', (context) => {
        context.response.body = 'The server is running!';
    })
    .get('/user', userController.getAll)
    .post("/register", userController.signUp)
    .post("/login", userController.signIn)
    .get("/user/:id", userController.getByID)
    .put("/user/:id", userController.updateByID)
    .delete("/user/:id", userController.deleteByID);

export default router;