import React, { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleLogin() {
    const url = "http://localhost:8000/login/";
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        })
      });

      if(!response.ok) throw new Error(`Erro: ${response.status}`);

      navigate("/home");

      const data = await response.json();
      localStorage.setItem("token", data.token);
    } catch (err) {
      console.error(err);
    }
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <div id="loginPage">
      <h1 id="titleLogin">P-7</h1>
      <div className="loginContainer">
        <h1>Login</h1>
        <form method="post" id="loginInputs">
          <input type="email" id="inputEmail" placeholder="Email" value={email} onChange={handleEmail}/>
          <input type="password" id="inputEmail" placeholder="Senha" value={password} onChange={handlePassword} />
          <button type="button" id="buttonEnter" onClick={() => handleLogin()}>Entrar</button>
          <button type="button" id="buttonCadastro">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
