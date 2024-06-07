import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";

type Data={
    id: string,
    fav:boolean,
    userid: string
}
const Fav:FunctionComponent<Data>=({userid,id,fav})=>{
    const [favourite,setFavourite]=useState<boolean>(fav)
    const onfav= async(userid: string,id: string)=>{
        const response = await fetch(`https://videoapp-api.deno.dev/fav/664371ea54be82d8fdc2a6a9/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
    
          });
          if(response.status===200){
            setFavourite(!favourite)
          }
    }
    return(
        <button class="fav-button" onClick={()=>onfav(userid,id)}>
            {favourite?"❤️ Remove from Favorites":"🤍 Add to Favorites"}
        </button>
    )
}
export default Fav