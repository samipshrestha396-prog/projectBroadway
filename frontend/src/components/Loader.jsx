import { Spinner } from "react-bootstrap";

function Loader({ width = "100px", height = "100px" }) {
  return (
    <>
      <Spinner animation="border" role="status" style={{width,
        height,
        display:"block",
        margin:"auto"
      }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </>
  );
}

export default Loader;
