import React, { useEffect, useState } from "react";
import "./styles.css";

const Knob = ({ value, idKnob }) => {
  const [rotateValue, setRotateValue] = useState(value);
  
  return (
    <div className="knobContainer">
      <div className="knob" style={{ transform: `rotate(${rotateValue - 135}deg)` }}>
        <div className="pointer"></div>
      </div>
      <div className="putValue">
        <span>{value}</span>
      </div>
    </div>
  );
};

export default Knob;
