import { useState, useEffect } from "react";
import "./styles.css";
import Knob from "../Knob";
import PedalEdit from "../PedalEdit";
import PropTypes from "prop-types";

const Pedal = ({ nome, idPedal }) => {
  // const [color, setColor] = useState("");
  const [knobs, setKnobs] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    const url = "http://localhost:8000";

    async function fetchKnobs() {
      const response = await fetch(`${url}/preset/${idPedal}/knobs`);

      const knobs = await response.json();
      setKnobs(knobs);
    }

    fetchKnobs();
  }, [idPedal]);

  function closeEdit() {
    setOpenEdit(false);
  }

  function openEditComp() {
    setOpenEdit(true);
  }

  const knobList = knobs.map((knob) => (
    <li key={knob.id_knob}>
      <Knob value={knob.valor} idKnob={knob.id_knob} />
    </li>
  ));

  return (
    <>
    <div className="container h-100 p-0">
      <div className="pedal w-100 h-100" id={idPedal}>
        <h1 className="pedalName">{nome}</h1>
        <ul className="d-flex">{knobList}</ul>
        <span className="editBtn" onClick={openEditComp}>Editar</span>
      </div>
    </div>
    {openEdit && <PedalEdit idPedal={idPedal} closeEdit={closeEdit} />}
    </>
  );
};

Pedal.propTypes = {
  nome: PropTypes.string.isRequired,
  idPedal: PropTypes.string.isRequired,
  openEdit: PropTypes.func.isRequired,
};

export default Pedal;
