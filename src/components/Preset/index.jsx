import React, { useEffect } from "react";
import "./styles.css";

function Preset({ nome }) {

  return (
    <div className="presetContainer">
      <h1>{nome}</h1>
    </div>
  );
}

export default Preset;
