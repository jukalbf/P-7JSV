import React, { useEffect } from "react";
import "./styles.css";
import addBtn from "../../icons/adicionar-aplicativos.svg";
import Preset from "../../components/Preset";

// const presets = [
//   { id: 1, nome: "preset massa" },
//   { id: 2, nome: "preset massa 2" },
//   { id: 3, nome: "preset massa 3" },
//   { id: 4, nome: "preset massa 4" },
// ];

const Home = () => {
  useEffect(() => {
    fetch("http://localhost:8000/user/presets")
      .then(response => response.json());
  })

  const presetList = presets.map((preset) => (
    <li key={preset.id} className="preset">
      <Preset nome={preset.nome} />
    </li>
  ));
  return (
    <div id="homeContainer">
      <h1 className="titlePage">Presets</h1>
      <div className="presetsContainer">
        <img src={addBtn} alt="add-button" className="addButton" />
        <ul className="presets">{presetList}</ul>
      </div>
    </div>
  );
};

export default Home;
