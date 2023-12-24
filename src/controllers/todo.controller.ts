import todos from "../services/todo_db_service.ts";
import Todo from "../models/todo.ts";

export default {
    getAll: async ({response}: {response: any}) => {
        const todo = await todos.findAll();
        console.log(todo);
        response.status = 200;
        response.body = todo;
    },
    getByID: async ({response, params}: {response: any, params: {id: string}}) => {
        const todoByID = await todos.findByID(params.id);
        console.log(todoByID);
        if(todoByID)
        response.status = 200;
        response.body = todoByID;
    },
    deleteByID: async ({ response, params }: { response: any, params: { id: string } }) => {
        const todoByID = await todos.deleteByID(params.id);
        console.log(todoByID);
        response.status = 200;
    },
    createTodo: async ({ request, response }: { request: any; response: any }) => {
        const body = await request.body({ type: 'json' });
        const requestBody = await body.value;
        console.log(requestBody.todo);
        let newTodo: Todo = {
            id: 0,
            todo:  requestBody.todo,
            status: 0
        };
        console.log(newTodo);
        await todos.create(newTodo);
        response.status = 200;
        response.body = { message: "Todo created" };
    },
    updateByID: async ({params, response, request}: {params: any, request:any, response:any}) => {
        const body = await request.body({ type: 'json' });
        const requestBody = await body.value;
        console.log(requestBody);
        console.log("--------");
        if (params.id == null) {
            response.body = {
                message: "no id selected"
            };
            response.status = 404;
        } else if (requestBody.todo == null || requestBody.status == null) {
            response.body = {
                message: "body request can't be empty"
            };
            response.status = 404;
        } else {
            let newTodo: Todo = {
                id: params.id,
                status: requestBody.status,
                todo: requestBody.todo
            };
            console.log(newTodo);
            await todos.updateByID(newTodo);
            response.status = 200;
            response.body = { message: "Todo updated" };
        }
    }   
};