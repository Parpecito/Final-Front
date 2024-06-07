import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import AllVideos from "../components/AllVideos.tsx";
import { Video } from "../types.ts";

type State = {
  id: string;
  email: string;
  name: string;
};
type Data = {
  videos: Video[];
  userid: string;
};

export const handler: Handlers<Data, State> = {
  GET: async (req: Request, ctx: FreshContext<State, Data>) => {
    try {
      const userid = ctx.state.id;
      const API_URL = Deno.env.get("API_URL");
      if (!API_URL) {
        throw new Error("API_URL no se va a encontrar en el entorno");
      }
      const response = await fetch(`${API_URL}/videos/664371ea54be82d8fdc2a6a9`);
      if (response.status !== 200) {
        return ctx.render({ videos: [], userid: "" });
      }
      const videos: Video[] = await response.json();
      //console.log(videos)
      return ctx.render({videos,userid})
    } catch (error) {
      return new Response(error.message, {
        status: 500,
      });
    }
  },
};
const Page=(props:PageProps<Data>)=>{
    return(
        <AllVideos videos={props.data.videos} userid={props.data.userid}></AllVideos>
    )
}
export default Page