import { Spinner } from "react-bootstrap";

function Loader(){
    return(<>
    <Spinner animation="border" style={{
        display:"block",
        width:"1000x",
        height:"100px",
        margin:"auto"
    }}/>
    </>)
}

export default Loader;