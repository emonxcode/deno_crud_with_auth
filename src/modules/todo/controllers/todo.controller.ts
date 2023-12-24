import TodoService from "../services/todo_db_service.ts";
import Todo from "../model/todo.ts";

export default {
  getAll: async ({ response }: { response: any }) => {
    const todo = await TodoService.findAll();
    console.log(todo);
    if (!todo) {
      response.status = 404;
      response.body = { message: "No todo found" };
    } else {
      response.status = 200;
      response.body = todo;
    }
  },

  getByID: async (
    { response, params }: { response: any; params: { id: string } },
  ) => {
    const todoByID = await TodoService.findByID(params.id);
    console.log(todoByID);
    if (!todoByID) {
      response.status = 404;
      response.body = { message: "No todo found" };
    } else {
      response.status = 200;
      response.body = todoByID;
    }
  },

  deleteByID: async (
    { response, params }: { response: any; params: { id: string } },
  ) => {
    const result = await TodoService.deleteByID(params.id);
    console.log(result);
    if (!result) {
      response.status = 404;
      response.body = { message: "Failed" };
    } else {
      response.status = 200;
      response.body = { message: "Deleted" };
    }
  },

  createTodo: async (
    { request, response }: { request: any; response: any },
  ) => {
    const body = await request.body({ type: "json" });
    const requestBody = await body.value;
    console.log(requestBody.todo);
    let newTodo: Todo = {
      todo: requestBody.todo,
      status: requestBody.status,
    };

    console.log(newTodo);

    let result = await TodoService.create(newTodo);
    console.log(result);
    if (!result) {
      response.status = 500;
      response.body = { message: "Failed" };
    } else {
      response.status = 200;
      response.body = { message: "Todo created" };
    }
  },

  updateByID: async (
    { params, response, request }: { params: any; request: any; response: any },
  ) => {
    const body = await request.body({ type: "json" });
    const requestBody = await body.value;
    console.log(requestBody);
    console.log("--------");
    if (params.id == null) {
      response.body = {
        message: "no id selected",
      };
      response.status = 404;
    } else if (requestBody.todo == null || requestBody.status == null) {
      response.body = {
        message: "body request can't be empty",
      };
      response.status = 404;
    } else {
      let newTodo: Todo = {
        id: params.id,
        status: requestBody.status,
        todo: requestBody.todo,
      };
      console.log(newTodo);
      await TodoService.updateByID(newTodo);
      response.status = 200;
      response.body = { message: "Todo updated" };
    }
  },
};
