import { useState } from "react";
import "./styles.css";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import Knob from "../Knob";

function KnobCreate({ idPedal, closeKnobCreate }) {
  // const [valueType, setValueType] = useState("");
  const [knobValue, setKnobValue] = useState(0.0);
  const [knobName, setKnobName] = useState("");
  
  async function createKnob() {
    const url = "http://localhost:8000";
    const response = await fetch(`${url}/knob/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: knobName,
        valor: knobValue,
        tipo_valor: "porcentagem",
        pedalId: idPedal,
      }),
    });

    if (!response.ok) {
      alert("Erro ao criar Knob.");
    }
  }

  function handleKnobValue(e) {
    setKnobValue(e.target.value);
  }

  function handleknobName(e) {
    setKnobName(e.target.value);
  }

  return (
    <div className="knobCreateContainer z-3 shadow-lg">
      <input
        type="number"
        name="knobValue"
        className="knobValue"
        placeholder="0.0"
        onChange={handleKnobValue}
        value={knobValue}
        min="0"
        max="100"
      />
      <Knob value={knobValue} />
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
        value={knobName}
        className="knobName"
        placeholder="Nome do knob"
      />
      <div className="container d-grid gap-1 w-100">
        <Button variant="primary" size="sm" onClick={createKnob}>Criar</Button>
        <Button variant="danger" size="sm" onClick={closeKnobCreate}>
          Cancelar
        </Button>
      </div>
    </div>
  );
}

Knob.propTypes = {
  value: PropTypes.string.isRequired,
};

KnobCreate.propTypes = {
  idPedal: PropTypes.number.isRequired,
  closeKnobCreate: PropTypes.func.isRequired,
};

export default KnobCreate;
