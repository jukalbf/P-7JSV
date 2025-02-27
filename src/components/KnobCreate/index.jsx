import { useState } from "react";
import PropTypes from "prop-types";
import "./styles.css";

const Knob = ({ value }) => {
  const rotateValue = (value * 270) / 100 - 135;

  // useEffect(() => {
  //   setRotateValue(value);
  // }, [value]);

  return (
    <div className="knobContainer">
      <div className="knob" style={{ transform: `rotate(${rotateValue}deg)` }}>
        <div className="pointer"></div>
      </div>
    </div>
  );
};

// function KnobCreate({ idPedal }) {
  // const [valueType, setValueType] = useState("");
  const [knobValue, setKnobValue] = useState(0.0);

  function handleChange(e) {
    setKnobValue(e.target.value);
  }

  return (
    <div className="knobCreateContainer">
      <input
        type="number"
        name="knobValue"
        className="knobValue"
        placeholder="0.0"
        onChange={handleChange}
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
        className="knobName"
        placeholder="Nome do knob"
      />
    </div>
  );
}

Knob.propTypes = {
  value: PropTypes.string.isRequired
}

KnobCreate.propTypes = {
  idPedal: PropTypes.string.isRequired
}

export default KnobCreate;
