import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import "./styles.css";

function CreatePreset({ closeCreate }) {
  const [presetName, setPresetName] = useState("");
  const [presets, setPresets] = useState([]);

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

        const presets = await response.json();

        setPresets(presets);
      } catch (err) {
        console.error(err);
      }
    }

    setTimeout(fetchPresets, 1000);
  }, []);

  function createPreset() {
    try {
      const token = localStorage.getItem("token");

      const tokenDecoded = jwt_decode(token);

      let name = presetName.trim();

      if (name === "") {
        name = presets.length;
        setPresetName(name);
      }

      setPresetName(name);

      const response = fetch(`${url}/preset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({
          nome: presetName,
          userId: tokenDecoded.userId,
        }),
      });

      console.log(presetName);

      if (!response.ok) throw new Error(`Erro: ${response.status}`);
    } catch (err) {
      console.error(err);
    }
  }

  function handlePresetName(e) {
    setPresetName(e.target.value);
  }

  return (
    <div id="createPresetContainer">
      <h1>Novo preset</h1>
      <form method="post">
        <input
          type="text"
          placeholder="Nome do preset"
          id="nomeInputPreset"
          value={presetName}
          onChange={handlePresetName}
        />
      </form>
      <button type="button" onClick={() => {
        createPreset();
        closeCreate();
        }}>
        Criar
      </button>
      <button type="button" onClick={closeCreate}>
        Cancelar
      </button>
    </div>
  );
}

export default CreatePreset;
