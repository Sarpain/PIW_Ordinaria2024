import {FreshContext,Handlers,PageProps,RouteConfig,} from "$fresh/server.ts";
import Register from "../components/Register.tsx";
import jwt from "jsonwebtoken";
import type { User } from "../types.ts";
import { setCookie } from "$std/http/cookie.ts";

export const config: RouteConfig = {
  skipInheritedLayouts: true, // Skip already inherited layouts
};

export type Data = {
    message: string;
  };

export const handler: Handlers = {
  POST: async (req: Request, ctx: FreshContext<unknown, Data>) => {
    console.log("register handler");
    const url = new URL(req.url);
    const form = await req.formData();
    const email = form.get("email")?.toString() || "";
    const password = form.get("password")?.toString() || "";
    const name = form.get("name")?.toString() || "";
    const API_URL = Deno.env.get("API_URL");
    if (!API_URL) {
      throw new Error("API_URL is not set in the environment");
    }
    const response = await fetch(
      `${API_URL}/register`,
      {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      },
    );
    if (response.status == 404) {
      return ctx.render({
        message: "User already exists or invalid data provided",
      });
    }

    const JWT_SECRET = Deno.env.get("JWT_SECRET");
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not set in the environment");
    }
    if (response.status == 200) {
      const data: Omit<User, "password" | "favs"> = await response.json();
      const token = jwt.sign(
        {
          email,
          id: data.id,
          name: data.name,
        },
        JWT_SECRET,
        {expiresIn: "24h"});
      const headers = new Headers();

      setCookie(headers, {
        name: "auth",
        value: token,
        sameSite: "Lax",
        domain: url.hostname,
        path: "/",
        secure: true,
      });
      headers.set("location", "/videos");
      return new Response(null, {
        status: 303,
        headers,
      });
    } else {
      return ctx.render();
    }
  },
};

const Page = (props: PageProps<Data>) => (
    <Register
      message={props.data?.message}
    />
  );
  
  export default Page;