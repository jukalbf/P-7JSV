import "./styles.css";
import PropTypes from "prop-types";

function Preset({ nome }) {
  return (
    <div className="container presetBg h-100 p-3 ratio ratio-16x9" style={{ width: "21em", cursor: "pointer" }}>
      <h1 className="text-center text-wrap fs-2">{nome}</h1>
    </div>
  );
}

Preset.propTypes = {
  nome: PropTypes.string.isRequired,
};

export default Preset;
