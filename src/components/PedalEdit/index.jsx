// import { useState } from "react";
import PropTypes from "prop-types";
import "./styles.css";
import { CloseButton } from "react-bootstrap";
// import KnobCreate from "../KnobCreate";

function PedalEdit({ pedalName, closeEdit }) {

  // const [idPedal, setIdPedal] = 

  // function handleClick(e) {

  // }

  return (
    <div id="pedalEditContainer">
      <CloseButton onClick={closeEdit}/>
      <input type="text" className="pedalName" placeholder={pedalName} />
      <ul>
        {}
        <button type="button" className="addBtn">+</button>
        {/* <KnobCreate /> */}
      </ul>
    </div>
  );
}

PedalEdit.propTypes = {
  pedalName: PropTypes.string.isRequired,
  closeEdit: PropTypes.func.isRequired
}

export default PedalEdit;
