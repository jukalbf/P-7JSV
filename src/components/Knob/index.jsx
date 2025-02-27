import "./styles.css";
import PropTypes from "prop-types";

const Knob = ({ value, idKnob }) => {
  const rotateValue = (value * 270) / 100 - 135;
  
  return (
    <div className="knobContainer" id={idKnob}>
      <div className="knob" style={{ transform: `rotate(${rotateValue}deg)` }}>
        <div className="pointer"></div>
      </div>
      <div className="putValue">
        <span>{value}</span>
      </div>
    </div>
  );
};

Knob.propTypes = {
  value: PropTypes.number.isRequired,
  idKnob: PropTypes.number.isRequired,
}

export default Knob;
