import { FunctionComponent } from "preact";

const Logout:FunctionComponent=()=>{
    const onlogout=()=>{
        document.cookie="auth=; path=/;"
        window.location.href="/login"
    }
    return(
        <a onClick={onlogout}class="logout-button">Logout</a>
    )
}
export default Logout