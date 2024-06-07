
import { FreshContext } from "$fresh/server.ts";
import Header from "../components/Header.tsx";

export default async function Layout(req: Request, ctx: FreshContext) {
  // do something with state here

  return (
    <div class="page-container">
      <Header name={`${ctx.state.name}`||"unknown"}></Header>
      <ctx.Component />
    </div>
  );
}