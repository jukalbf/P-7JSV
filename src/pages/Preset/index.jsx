import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";
import Pedal from "../../components/Pedal";
import ButtonAdd from "../../icons/add.svg";
import PropTypes from "prop-types";

function PedalButtonAdd({ idPreset, indexPedal }) {
  async function addPedal() {
    const url = "http://localhost:8000";

    const response = await fetch(`${url}/pedal/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: `Pedal#${indexPedal}`,
        presetId: idPreset,
      }),
    });

    if (!response.ok) throw new Error(`Erro: ${response.status}`);

    alert("Pedal criado com sucesso. Recarregue a página para editá-lo.");
  }

  return (
    <div className="pedalAddContainer" onClick={() => addPedal()}>
      <img src={ButtonAdd} alt="" />
    </div>
  );
}

// função da página =========================
function Preset() {
  const { id } = useParams();
  const [preset, setPreset] = useState("");
  const [pedais, setPedais] = useState([]);

  useEffect(() => {
    const url = "http://localhost:8000";
    const token = localStorage.getItem("token");

    async function fetchPreset() {
      const response = await fetch(`${url}/preset/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      });

      const preset = await response.json();
      setPreset(preset);
    }

    async function fetchPedais() {
      const response = await fetch(`${url}/preset/${id}/pedals`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      });

      const pedals = await response.json();
      setPedais(pedals);
    }

    fetchPreset();
    fetchPedais();
  }, [id]);

  function pedalIndex() {
    const index = pedais.length + 1;
    return index;
  }

  const listPedais = pedais.map((pedal) => (
    <li key={pedal.id_pedal} className="h-100 list-unstyled">
      <Pedal
        idPedal={pedal.id_pedal}
        nome={pedal.nome}
      />
    </li>
  ));

  return (
    <div className="container p-5">
      <h1 style={{fontSize: "80px"}} className="fw-bold title-color">Pedais</h1>
      <hr className="hr-blurry" style={{ color: "#fff" }}/>
      <div className="presetInfos container">
        <h1 className="nomePreset" style={{ color: "#fff" }}>{preset.nome}</h1>
        <hr />
        <ul className="container d-flex gap-3 p-0" style={{ height: "300px" }}>
          {listPedais}
          <PedalButtonAdd
            idPreset={preset.id_preset}
            indexPedal={pedalIndex()}
          />
        </ul>
      </div>
    </div>
  );
}

// PropTypes =====================
PedalButtonAdd.propTypes = {
  idPreset: PropTypes.number.isRequired,
  indexPedal: PropTypes.number.isRequired,
  fetchPedais: PropTypes.func.isRequired
};

export default Preset;
