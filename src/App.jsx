import Menu from "./components/Menu";
import { Outlet } from "react-router-dom";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div id="app">
      <Menu />
      <Outlet />
    </div>
  )
}

export default App
