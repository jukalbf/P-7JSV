import React, { useState } from "react";
import "./styles.css";
import Knob from "../Knob";

const Pedal = () => {
  const [color, setColor] = useState("");

  function handleChange(e) {
    setColor(e.target.value);
  }

  return (
    <div className="pedalContainer">
      <input
        type="text"
        name="colorChange"
        className="colorChange"
        placeholder="codigo da cor"
        onChange={handleChange}
      />
      <div className="pedal" style={{ "--pedalColor": color }}>
        <h1>Miniuniverse</h1>
        <div className="knobs">
            <Knob />
        </div>
      </div>
    </div>
  );
};

export default Pedal;
