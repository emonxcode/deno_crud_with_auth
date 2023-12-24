import dbClient from "../config/db.ts";
import User from "../models/user.ts";

export default {
    findAll: async () => {
        const result = await dbClient.query(`select * from users`);
        return result;
    },
    findByID: async (id: any) => {
        const result = await dbClient.query("select * from users where id = ?", [id]);
        return result;
    },
    findByEmail: async (email: any) => {
        const result = await dbClient.query("select * from users where email = ?", [email]);
        return result;
    },
    deleteByID: async (id: any) => {
        const result = await dbClient.query("delete from users where id =?", [id]);
        return null;
    },
    create: async (data: User) => {
        await dbClient.query("insert into users(name, email, password) values (?,?,?)", [data.name, data.email, data.password]);
        return null;
    },
    updateByID: async (data:User) => {
        const getData = await dbClient.query("select * from users where id",[data.id]);
        if (getData != null) {
            await dbClient.query(`update users set name = '${data.name}', email = ${data.email} where id = ${data.id}`);
            return null
        } else {
            return "no match data had been found"
        }
    }
};