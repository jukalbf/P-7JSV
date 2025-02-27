import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import "./styles.css";
import User from "../User/";
import { useNavigate } from "react-router-dom";

function Menu() {
  const [userName, setUserName] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    const url = "http://localhost/8000";

    async function userName() {
      const token = localStorage.getItem("token");

      const id = jwt_decode(token);

      const user = await fetch(`${url}/user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })

      setUserName(user.nome)
    }
  });

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
          <h4>User name</h4>
          <span onClick={logout}>Sair</span>
        </div>
      </div>
      <hr className="traco" />
      
    </div>
  );
}

export default Menu;
