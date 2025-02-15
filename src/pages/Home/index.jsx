import React, { useEffect } from "react";
import "./styles.css";
import addBtn from "../../icons/adicionar-aplicativos.svg";
import Preset from "../../components/Preset";
import { useState } from "react";
import CreatePreset from "../../components/CreatePreset";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [presets, setPresets] = useState([]);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const url = "http://localhost:8000";

  useEffect(() => {
    async function fetchPresets() {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${url}/user/presets`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        });

        if (!response.ok) throw new Error(`Erro: ${response.status}`);

        if (!token) {
          navigate("/");
          return;
        }
        const presets = await response.json();
        
        setPresets(presets);
      } catch (err) {
        console.error(err);
      }
    }

    setTimeout(fetchPresets, 1000);
  });

  function openCreate() {
    setVisible(true);
  }

  function closeCreate() {
    setVisible(false);
  }

  const presetList = presets.map((preset) => (
    <li key={preset.id_preset} className="preset">
      <Preset nome={preset.nome} />
    </li>
  ));

  return (
    <div id="homeContainer">
      <h1 className="titlePage">Presets</h1>
      <img src={addBtn} alt="add-button" className="addButton" onClick={openCreate} />
      <div className="presetsContainer">
        {visible && <CreatePreset closeCreate={closeCreate} />}
        <ul className="presets">{presetList}</ul>
      </div>
    </div>
  );
};

export default Home;
