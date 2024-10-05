import "./styles/BottomImage.css";
import lapiImg from "../images/lapiBtm.png";

import logoImg from "../images/bottomimg.png";
const BottomImage = () => {
  return (
    <div className="parentDiv-bottom">
      <div className="bottom-holder">
        <div className="logoImgHolder">
          <img src={logoImg} alt="bottom-image" />
        </div>
        <div className="textDiv">
          <div>
            <p>Download your</p>
            <p>
              <span>Extension </span> from here
            </p>
          </div>
          <button>DOWNLOAD</button>
        </div>
        <div className="lapHolder">
          <img src={lapiImg} alt="lapi-image" />
        </div>
      </div>
    </div>
  );
};

export default BottomImage;
