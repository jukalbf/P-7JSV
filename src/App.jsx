import Pedal from "./components/Pedal/index";
import Menu from "./components/Menu";
import { Outlet } from "react-router-dom";
import './App.css'

function App() {
  return (
    <div id="app">
      <Menu />
      <Outlet />
    </div>
  )
}

export default App
