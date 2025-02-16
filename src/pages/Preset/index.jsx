import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";
import Pedal from "../../components/Pedal";

function Preset() {
  const { id } = useParams();
  const [preset, setPreset] = useState("");
  const [pedais, setPedais] = useState([]);

  const url = "http://localhost:8000";

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function fetchPreset() {
      const response = await fetch(`${url}/preset/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        }
      });
      
      const preset = await response.json();
      setPreset(preset);
    }

    async function fetchPedais() {
      const response = await fetch(`${url}/preset/pedals`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        }
      });

      const pedais = await response.json();
      setPedais(pedais);
    }

    fetchPreset();
    fetchPedais();
  })

  const listPedais = pedais.map(pedal => <Pedal key={pedal.id_pedal} idPedal={pedal.id_pedal} nome={pedal.nome} />)

  return (
    <div id="presetScreen">
      <h1 className="pageTitle">Pedais</h1>
      <div className="presetInfos">
        <h1 className="nomePreset">{preset.nome}</h1>
        <hr />
        <ul className="listaPedais">{listPedais}</ul>
      </div>
    </div>
  );
}

export default Preset;
