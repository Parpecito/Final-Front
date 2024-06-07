import { FreshContext, Handlers, RouteConfig } from "$fresh/server.ts";
import { Usuario } from "../types.ts";
import { setCookie } from "$std/http/cookie.ts";
import jwt from "jsonwebtoken";
import Register from "../components/Register.tsx";

export const config: RouteConfig = {
    skipInheritedLayouts: true, // Skip already inherited layouts
  };

export const handler: Handlers = {
  POST: async (req: Request, ctx: FreshContext) => {
    const url = new URL(req.url);
    const formulario = await req.formData();
    const email = formulario.get("email")?.toString() || "";
    const password = formulario.get("password")?.toString() || "";
    const name=formulario.get("name")?.toString()||""

    const JWT_SECRET = Deno.env.get("JWT_SECRET");
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET no se va a encontrar en el entorno");
    }
    const API_URL = Deno.env.get("API_URL");
    if (!API_URL) {
      throw new Error("API_URL no se va a encontrar en el entorno");
    }
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password,name }),
    });

    if (response.status === 400) {
      return ctx.render({
        message: "Hay un usuario con el mismo correo",
      });
    }
    if (response.status === 200) {
      const data: Omit<Usuario, "password" | "favs"> = await response.json();
      const token = jwt.sign(
        {
          email,
          name: data.name,
          id: data.id,
        },
        JWT_SECRET,
        {
          expiresIn: "24h",
        },
      );
      const headers = new Headers();
      setCookie(headers, {
        name: "auth",
        value: token,
        sameSite: "Lax",
        domain: url.hostname,
        path: "/",
        secure: true,
      });
      headers.set("location","/videos")
      return new Response(null,{
        status:303,
        headers
      })
    }else{
        return ctx.render()
    }
  },
};

const Page=()=>{
    return(
        <Register></Register>
    )
}
export default Page