import { useEffect } from "react";
import "./styles.css";
import addBtn from "../../icons/adicionar-aplicativos.svg";
import Preset from "../../components/Preset";
import { useState } from "react";
import AddPreset from "../../components/AddPreset";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [presets, setPresets] = useState([]);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPresets() {
      try {
        const url = "http://localhost:8000";
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/");
          return;
        }

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

    fetchPresets();
  });

  function openCreate() {
    setVisible(true);
  }

  function closeCreate() {
    setVisible(false);
  }

  function presetScreen(preset) {
    navigate(`/home/preset/${preset.id_preset}`);
  }

  const presetList = presets.map((preset) => (
    <li
      key={preset.id_preset}
      className="cursor-pointer"
      onClick={() => presetScreen(preset)}
    >
      <Preset nome={preset.nome} />
    </li>
  ));

  return (
    <div className="container p-3">
      <h1 style={{fontSize: "80px"}} className="fw-bold title-color">Presets</h1>
      <hr className="hr-blurry" style={{ color: "#fff" }}/>
      <img
        src={addBtn}
        alt="add-button"
        className="m-2 my-3"
        style={{width: "50px", cursor: "pointer", filter: "invert(1)"}}
        onClick={openCreate}
      />
      <div className="container p-0 overflow-auto" style={{ height: "400px" }}>
        <ul className="gap-2 d-flex flex-wrap list-unstyled m-0 p-0 mh-100 justify-content-around">{presetList}</ul>
        {visible && <AddPreset closeCreate={closeCreate} />}
      </div>
    </div>
  );
};

export default Home;
