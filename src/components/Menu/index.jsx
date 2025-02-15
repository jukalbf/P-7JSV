import React from "react";
import "./styles.css";
import User from "../User/";
import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();

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
