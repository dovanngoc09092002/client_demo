import { ColorRing } from "react-loader-spinner";
import "../css/loadding.css"
function Loadding() {
    return (
      <div className="loaddinginpage">
        <>
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#ddd", "#fff", "#fff", "#fff", "#fff"]}
          />
        </>
      </div>
    );
}

export default Loadding;