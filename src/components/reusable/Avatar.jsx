import React from "react";

export default ({ src, height, width, onClick }) => {
  return (
    <img
      className="Icon"
      src={src}
      style={{ height: height, width: width || height, borderRadius: "50%" }}
      onClick={e => onClick && onClick()}
      alt="User Avatar"
    />
  );
};
