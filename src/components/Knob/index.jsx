import "./styles.css";
import PropTypes from "prop-types";

const Knob = ({ value, idKnob, click, name }) => {
  const rotateValue = (value * 270) / 100 - 135;
  
  return (
    <div className="container p-0" id={idKnob} onClick={click}>
      <div className="knob d-flex" style={{ transform: `rotate(${rotateValue}deg)` }}>
        <div className="pointer"></div>
      </div>
      <div className="putValue" style={{ color: "#fff" }}>
        <span className="d-flex justify-content-center">{name}</span>
      </div>
    </div>
  );
};

Knob.propTypes = {
  value: PropTypes.number.isRequired,
  idKnob: PropTypes.number.isRequired,
  click: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
}

export default Knob;
