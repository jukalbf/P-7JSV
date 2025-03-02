// import { useState } from "react";
import PropTypes from "prop-types";
import { CloseButton } from "react-bootstrap";
import { useEffect, useState } from "react";
import Knob from "../Knob";
import "./styles.css";
import { Button } from "react-bootstrap";
// import KnobCreate from "../KnobCreate";

function PedalEdit({ closeEdit, idPedal }) {
  const [pedalInfo, setPedalInfo] = useState({});
  const [pedalKnobs, setPedalKnobs] = useState([]);
  const [pedalNome, setPedalNome] = useState("");
  const url = "http://localhost:8000";

  useEffect(() => {
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
  }, [idPedal]);

  async function deletePedal() {
    const response = await fetch(
      `${url}/pedal/deletePedal/${pedalInfo.id_pedal}`,
      {
        method: "DELETE",
      }
    );

    const pedalDelete = await response.json();
    console.log(pedalDelete);
    alert(`pedal ${pedalInfo.nome} deletado com sucesso.`);
  }

  async function editPedal() {
    const response = await fetch(
      `${url}/pedal/updatePedal/${pedalInfo.id_pedal}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: pedalNome,
        }),
      }
    );

    if (response.status === 204) {
      alert(`Pedal ${pedalNome} editado com sucesso`);
    }
  }

  function handleChangeName(e) {
    setPedalNome(e.target.value);
  }

  const knobList = pedalKnobs.map((knob) => (
    <li key={knob.id_knob} className="list-unstyled m-0">
      <Knob idKnob={knob.id_knob} value={knob.valor} />
    </li>
  ));

  return (
    <div
      className="container position-absolute p-3 d-flex flex-column z-3 shadow-lg"
      style={{
        width: "250px",
        backgroundColor: "#324131",
        top: "35%",
        left: "50%",
      }}
    >
      <CloseButton onClick={closeEdit} className="mb-2" />
      <input
        type="text"
        className="input fs-4 ps-2"
        style={{ height: "40px" }}
        placeholder={pedalInfo.nome}
        value={pedalNome}
        onChange={handleChangeName}
      />
      <ul className="container d-flex my-3 gap-2 flex-wrap">
        {knobList}
        <button type="button" className="addBtn">
          +
        </button>
      </ul>
      <div className=" d-grid gap-2" style={{ top: "100px" }}>
        <Button
          variant="primary"
          onClick={() => {
            editPedal();
            closeEdit();
          }}
        >
          Editar
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            deletePedal();
            closeEdit();
          }}
        >
          Deletar
        </Button>
      </div>
    </div>
  );
}

PedalEdit.propTypes = {
  closeEdit: PropTypes.func.isRequired,
  idPedal: PropTypes.number.isRequired,
};

export default PedalEdit;
