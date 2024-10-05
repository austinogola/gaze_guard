import React, { useEffect, useState } from "react";
import "./styles/BottomImage.css";
import lapiImg from "../images/lapiBtm.png";
import logoImg from "../images/bottomimg.png";

// LazyImage Component
const LazyImage = ({ src, alt, className }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => setImageSrc(src);
    img.onerror = () => setError(true);

    return () => {
      setImageSrc(null);
      setError(false);
    };
  }, [src]);

  return error ? (
    <div
      className={`error-placeholder ${className}`}
      style={{ width: "100%", height: "100%" }}
    >
      <p>Error loading image</p>
    </div>
  ) : imageSrc ? (
    <img src={imageSrc} alt={alt} className={className} loading="lazy" />
  ) : (
    <div
      className={`image-placeholder ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

const BottomImage = () => {
  return (
    <div className="parentDiv-bottom">
      <div className="bottom-holder">
        <div className="logoImgHolder">
          <LazyImage src={logoImg} alt="bottom-image" />
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
          <LazyImage src={lapiImg} alt="lapi-image" />
        </div>
      </div>
    </div>
  );
};

export default BottomImage;
