import { useEffect, useState } from "react";
import "./styles.css";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import Knob from "../Knob";

function KnobEdit({ idPedal, closeKnobEdit, openKnobEdit, idKnob }) {
  // const [valueType, setValueType] = useState("");
  const [knobValue, setKnobValue] = useState(0.0);
  const [knobValueEdit, setKnobValueEdit] = useState(null);
  const [knobNameEdit, setKnobNameEdit] = useState("");
  const [knobName, setKnobName] = useState("");
  const url = "http://localhost:8000";

  useEffect(() => {
    async function fetchKnob() {
      const response = await fetch(`${url}/knob/${idKnob}`);
      const knob = await response.json();

      setKnobName(knob.nome);
      setKnobValue(knob.valor);
    }

    fetchKnob();
  }, [idKnob]);

  async function editKnob() {
    
    const response = await fetch(`${url}/knob/updateKnob/${idKnob}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: knobNameEdit,
        valor: knobValueEdit,
        tipo_valor: "porcentagem",
        pedalId: idPedal,
      }),
    });

    if (!response.ok) {
      alert("Erro ao criar Knob.");
    }

    alert(`Knob editado com sucesso: ${knobName}, ${knobValue}`);
  }

  function handleKnobValue(e) {
    setKnobValueEdit(e.target.value);
  }

  function handleknobName(e) {
    setKnobNameEdit(e.target.value);
  }

  return (
    <div className="knobEditContainer z-3 shadow-lg">
      <input
        type="number"
        name="knobValue"
        className="knobValue"
        placeholder={knobValue}
        onChange={handleKnobValue}
        value={knobValueEdit}
        min="0"
        max="100"
      />
      <Knob value={knobValueEdit} name={knobName} click={openKnobEdit} />
      <select name="valueType" className="valueType">
        <option value="" selected disabled>
          Tipo de valor
        </option>
        <option value="porcentagem">Porcentagem</option>
        <option value="horas">Horas</option>
        <option value="seletor">Seletor</option>
      </select>
      <input
        type="text"
        name="knobName"
        onChange={handleknobName}
        value={knobNameEdit}
        className="knobName"
        placeholder={knobName}
      />
      <div className="container d-grid gap-1 w-100">
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            editKnob();
            closeKnobEdit();
          }}
        >
          Editar
        </Button>
        <Button variant="danger" size="sm" onClick={closeKnobEdit}>
          Cancelar
        </Button>
      </div>
    </div>
  );
}

Knob.propTypes = {
  value: PropTypes.string.isRequired,
};

KnobEdit.propTypes = {
  idPedal: PropTypes.number.isRequired,
  closeKnobEdit: PropTypes.func.isRequired,
  openKnobEdit: PropTypes.func,
  idKnob: PropTypes.number.isRequired,
};

export default KnobEdit;
