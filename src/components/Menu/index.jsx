import { useEffect, useState } from "react";
import "./styles.css";
import User from "../User/";
import { useNavigate } from "react-router-dom";

function Menu() {
  const [userName, setUserName] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    const url = "http://localhost:8000";

    async function userName() {
      const token = localStorage.getItem("token");

      const response = await fetch(`${url}/user/userLogged`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        }
      })

      const user = await response.json();

      console.log(user);
      setUserName(user.nome);
    }

    userName();
  }, []);

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div id="menuContainer">
      <h1>P-7</h1>
      <hr className="traco" />
      <div id="userProfile">
        <User />
        <div id="userNameLogout">
          <h4>{userName}</h4>
          <span onClick={logout}>Sair</span>
        </div>
      </div>
      <hr className="traco" />
      
    </div>
  );
}

export default Menu;
