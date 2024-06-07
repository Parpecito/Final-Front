import { FunctionComponent } from "preact";
import Logout from "../islands/Logout.tsx";

type Data={
    name:string
}

const Header: FunctionComponent<Data>=({name})=>{
    return(
        <header class="header-container">
            <div class="header-content">
            <span class="user-name">{name}</span>
            <Logout></Logout>
            </div>
        </header>
    )
}
export default Header