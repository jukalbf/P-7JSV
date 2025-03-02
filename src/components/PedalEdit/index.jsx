// import { useState } from "react";
import PropTypes from "prop-types";
import { CloseButton } from "react-bootstrap";
import { useEffect, useState } from "react";
import Knob from "../Knob";
import "./styles.css";
// import KnobCreate from "../KnobCreate";

function PedalEdit({ closeEdit, idPedal }) {
  const [pedalInfo, setPedalInfo] = useState({});
  const [pedalKnobs, setPedalKnobs] = useState([]);

  useEffect(() => {
    const url = "http://localhost:8000";

    async function findPedal() {
      const response = await fetch(`${url}/pedal/${idPedal}`);

      const pedal = await response.json();
      setPedalInfo(pedal);
      fetchKnobs(pedal.id_pedal);
    }

    async function fetchKnobs(id) {
      const response = await fetch(`${url}/pedal/knobs/${id}`);
      
      const knobs = await response.json();
      setPedalKnobs(knobs.knobs);
    }

    findPedal();
  }, [idPedal, pedalInfo]);

  const knobList = pedalKnobs.map((knob) => (
    <li key={knob.id_knob} className="list-unstyled m-0">
      <Knob idKnob={knob.id_knob} value={knob.valor} />
    </li>
  ));

  return (
    <div
      className="container position-absolute p-3 d-flex flex-column z-3 shadow-lg"
      style={{ width: "250px", height: "350px", backgroundColor: "#324131", top: "35%", left: "50%"  }}
    >
      <CloseButton onClick={closeEdit} className="mb-2" />
      <input type="text" className="input fs-4 ps-2" style={{ height: "40px" }} placeholder={pedalInfo.nome} />
      <ul className="container d-flex my-3 gap-2 flex-wrap">
        {knobList}
        <button
          type="button"
          className="addBtn"
        >
          +
        </button>
      </ul>
    </div>
  );
}

PedalEdit.propTypes = {
  closeEdit: PropTypes.func.isRequired,
  idPedal: PropTypes.number.isRequired,
};

export default PedalEdit;
