import React, { useState } from "react";
import "./styles.css";

const Knob = () => {
    const [rotateValue, setRotateValue] = useState(0);
    
    function handleChange(e) {
        setRotateValue(e.target.value);
    }

  return (
    <div className="knobContainer">
      <div className="knob" style={{ "--rotate": rotateValue + "deg"}}>
        <div className="pointer"></div>
      </div>
      <div className="putValue">
        <input type="text" name="value" className="value" onChange={handleChange} />
      </div>
    </div>
  );
};

export default Knob;
