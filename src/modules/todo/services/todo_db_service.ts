import dbClient from "../../../config/db.ts";
import Todo from "../model/todo.ts";

export default {
    findAll: async () => {
        const result = await dbClient.query(`select * from todos`);
        return result;
    },
    findByID: async (id: any) => {
        const result = await dbClient.query("select * from ?? where id = ?", ["todos", id]);
        return result;
    },
    deleteByID: async (id: any) => {
        const result = await dbClient.query("delete from todos where id =?", [id]);
        return null;
    },
    create: async (data: Todo) => {
        await dbClient.query("insert into todos(todo) values (?)", [data.todo]);
        return null;
    },
    updateByID: async (data:Todo) => {
        const getData = await dbClient.query("select * from todos where id",[data.id]);
        if (getData != null) {
            await dbClient.query(`update todos set todo = '${data.todo}', done = ${data.status} where id = ${data.id}`);
            return null
        } else {
            return "no match data had been found"
        }
    }
};