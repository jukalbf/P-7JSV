import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";
import Pedal from "../../components/Pedal";
// import PedalCreate from "../../components/PedalEdit";
import ButtonAdd from "../../icons/add.svg";
import PropTypes from "prop-types";
import PedalEdit from "../../components/PedalEdit";

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
  const [openEdit, setOpenEdit] = useState(false);

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
      const response = await fetch(`${url}/preset/pedals`, {
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
    setTimeout(fetchPedais, 500);
  });

  function pedalIndex() {
    const index = pedais.length + 1;
    return index;
  }

  function openEditComp() {
    setOpenEdit(true);
  }

  function closeEdit() {
    setOpenEdit(false);
  }

  const listPedais = pedais.map((pedal) => (
    <Pedal
      key={pedal.id_pedal}
      idPedal={pedal.id_pedal}
      nome={pedal.nome}
      openEdit={openEditComp}
    />
  ));

  return (
    <div id="presetScreen">
      <h1 className="pageTitle">Pedais</h1>
      <div className="presetInfos">
        <h1 className="nomePreset">{preset.nome}</h1>
        <hr />
        <ul className="listaPedais">
          {listPedais}
          {/* <PedalButtonAdd
            idPreset={preset.id_preset}
            indexPedal={pedalIndex()}
          /> */}
        </ul>
        {openEdit && <PedalEdit closeEdit={closeEdit} />}
      </div>
    </div>
  );
}

// PropTypes =====================
PedalButtonAdd.propTypes = {
  idPreset: PropTypes.number.isRequired,
  indexPedal: PropTypes.number.isRequired,
};

export default Preset;
