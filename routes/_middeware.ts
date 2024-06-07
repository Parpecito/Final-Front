import { FreshContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import jwt from "jsonwebtoken";

type State = {
  email: string;
  name: string;
  id: string;
};
export async function handler(req: Request, ctx: FreshContext<State>) {
  console.log("z");
  if (ctx.destination!=="route") {
    const resp = await ctx.next();
    return resp;
  }
  console.log("a");
  if (ctx.route==="/login"||ctx.route==="/register") {
    const resp = await ctx.next();
    return resp;
  }
  console.log("b");
  const { auth } = await getCookies(req.headers);
  if (!auth) {
    return new Response("", {
      status: 307,
      headers: {
        location: "/login",
      },
    });
  }
  console.log(auth);

  const payload = jwt.verify(auth, Deno.env.get("JWT_SECRET"));
  if (!payload) {
    return new Response("", {
      status: 307,
      headers: {
        location: "/login",
      },
    });
  }
  console.log(payload);

  ctx.state.email = payload.email;
  ctx.state.id = payload.id;
  ctx.state.name = payload.name;
  console.log(ctx.state.name);

  const resp = await ctx.next();
  return resp;
}
