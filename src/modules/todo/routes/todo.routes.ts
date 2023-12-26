import { Router } from "https://deno.land/x/oak/mod.ts";
import todoController from "../controllers/todo.controller.ts";
import { authourized } from "../../../middlewares/authentication.ts";

const router = new Router();
router.get("/todos", authourized, todoController.getAll)
  .post("/todos", authourized, todoController.createTodo)
  .get("/todos/:id", authourized, todoController.getByID)
  .put("/todos/:id", authourized, todoController.updateByID)
  .delete("/todos/:id", authourized, todoController.deleteByID);

export default router;
