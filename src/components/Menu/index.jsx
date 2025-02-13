import React from "react";
import "./styles.css";
import User from "../User/";

function Menu() {
  return (
    <div id="menuContainer">
      <h1>P-7</h1>
      <hr className="traco" />
      <div id="userProfile">
        <User />
        <div>
          <h3>User name</h3>
          <span>Sair</span>
        </div>
      </div>
      <hr className="traco" />
      
    </div>
  );
}

export default Menu;
