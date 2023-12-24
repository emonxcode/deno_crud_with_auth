import UserService from "../service/user_db_service.ts";
import User from "../model/user.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { create } from "https://deno.land/x/djwt@v2.4/mod.ts";
import { key } from "../../../utils/key.ts";

export default {
  getAll: async ({ response }: { response: any }) => {
    const User = await UserService.findAll();
    console.log(User);
    response.status = 200;
    response.body = User;
  },

  getByID: async (
    { response, params }: { response: any; params: { id: string } },
  ) => {
    const UserByID = await UserService.findByID(params.id);
    console.log(UserByID);
    if (UserByID) {
      response.status = 200;
    }
    response.body = UserByID;
  },

  deleteByID: async (
    { response, params }: { response: any; params: { id: string } },
  ) => {
    const UserByID = await UserService.deleteByID(params.id);
    console.log(UserByID);
    response.status = 200;
  },

  signUp: async ({ request, response }: { request: any; response: any }) => {
    console.log("signup");
    const body = await request.body({ type: "json" });
    const requestBody = await body.value;
    console.log(requestBody.email);

    // encrypt password
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(requestBody.password, salt);

    const newUser: User = {
      id: 0,
      name: requestBody.name,
      email: requestBody.email,
      password: hashedPassword,
    };
    console.log(newUser);
    await UserService.create(newUser);
    response.status = 200;
    response.body = { message: "User created" };
  },

  signIn: async ({ request, response }: { request: any; response: any }) => {
    const body = await request.body({ type: "json" });
    const requestBody = await body.value;

    const { email, password } = requestBody;

    const userByEmail = await UserService.findByEmail(email);

    console.log(userByEmail);
    if (!userByEmail) {
      response.body = 404;
      response.body = { message: `User of "${email}" not found` };
      return;
    }

    const confirmPassword = await bcrypt.compare(
      password,
      userByEmail[0].password,
    );
    if (!confirmPassword) {
      response.body = 500;
      response.body = { message: "Incorrect password" };
      return;
    }

    const jwt = await create({ alg: "HS512", typ: "JWT" }, {
      "uid": userByEmail.id,
    }, key);

    if (jwt) {
      response.status = 200;
      response.body = {
        userId: userByEmail.id,
        name: userByEmail.name,
        token: jwt,
      };
    } else {
      response.status = 500;
      response.body = {
        message: "internal server error",
      };
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
    } else if (requestBody.User == null || requestBody.status == null) {
      response.body = {
        message: "body request can't be empty",
      };
      response.status = 404;
    } else {
      let newUser: User = {
        id: params.id,
        name: requestBody.name,
        email: requestBody.email,
      };
      console.log(newUser);
      await UserService.updateByID(newUser);
      response.status = 200;
      response.body = { message: "User updated" };
    }
  },
};
