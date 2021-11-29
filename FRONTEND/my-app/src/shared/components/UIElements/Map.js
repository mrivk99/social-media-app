import React from "react";

import "./Map.css";

const Map = (props) => {
    // Uses google maps js sdk
  return <div className={`map ${props.className}`} style={props.style}>

  </div>;
};

export default Map;
