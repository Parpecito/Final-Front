import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import VideoUnico from "../../components/VideoUnico.tsx";
import { Video } from "../../types.ts";

type State = {
  id: string;
  name: string;
  email: string;
};
type Data = {
  video: Video;
  userid: string;
};

export const handler: Handlers<Data, State> = {
  GET: async (req: Request, ctx: FreshContext<State, Data>) => {
    const userid = ctx.state.id;
    const videoid = ctx.params.id;
    const API_URL = Deno.env.get("API_URL");
    if (!API_URL) {
      throw new Error("API_URL no se va a encontrar en el entorno");
    }
    const response= await fetch(`${API_URL}/video/664371ea54be82d8fdc2a6a9/${videoid}`)
    if(response.status!==200){
        return new Response(null,{
            status:303,
            headers:{
                location: "/videos"
            }
        })
    }
    const video:Video=await response.json()
    return ctx.render({video,userid})
  },
};

const Page=(props:PageProps<Data>)=>{
    return(
        <VideoUnico video={props.data.video} userid={props.data.userid}></VideoUnico>
    )
}
export default Page
