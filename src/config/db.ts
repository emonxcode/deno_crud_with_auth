import { Client } from "https://deno.land/x/mysql/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

const client = await new Client().connect({
    hostname: 'localhost',
    username: 'root',
    password: '',
    db: 'deno_db',
});

const run = async () => {
    // create database if not exists
    await client.execute(`CREATE DATABASE IF NOT EXISTS deno_db`);
    // select db
    await client.execute("USE deno_db");
    // create users table if not exists
    await client.execute(`
        CREATE TABLE IF NOT EXISTS  users (
          id int(11) NOT NULL AUTO_INCREMENT,
          name varchar(100) NOT NULL,
          email varchar(100) NOT NULL,
          password varchar(100) NOT NULL,
          PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `);

    await client.execute(`
        CREATE TABLE IF NOT EXISTS  todos (
          id int(11) NOT NULL AUTO_INCREMENT,
          todo varchar(100) NOT NULL,
          status int(1) NOT NULL,
          PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `);
  };
  
  run();

export default client;