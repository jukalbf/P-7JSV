import React, { useState, useEffect } from "react";
import "./styles.css";
import Knob from "../Knob";

const Pedal = ({ nome, idPedal }) => {
  const [color, setColor] = useState("");
  const [knobs, setKnobs] = useState([]);

  useEffect(() => {
    const url = "http://localhost:8000";

    async function fetchKnobs() {
      const response = await fetch(`${url}/preset/${idPedal}/knobs`);

      const knobs = await response.json();
      setKnobs(knobs);
    }

    fetchKnobs();
  }, [idPedal]);

  const knobList = knobs.map((knob) => <Knob key={knob.id_knob} value={knob.valor} idKnob={knob.id_knob} />);

  return (
    <div className="pedalContainer">
      {/* <input
        type="text"
        name="colorChange"
        className="colorChange"
        placeholder="codigo da cor"
        // onChange={handleChange}
      /> */}
      <div className="pedal" style={{ "--pedalColor": color }}>
        <h1>{nome}</h1>
        <ul className="knobs">{knobList}</ul>
      </div>
    </div>
  );
};

export default Pedal;
