import "./styles.css";
import PropTypes from "prop-types";

function Preset({ nome }) {

  return (
    <div className="container presetBg">
      <h1>{nome}</h1>
    </div>
  );
}

Preset.propTypes = {
  nome: PropTypes.string.isRequired
}

export default Preset;
