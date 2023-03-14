import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import Intro from "./Scenes/Intro"
import Tema_1_figuras from "./Scenes/Tema_1_Figuras"
import Tarea_1 from "./Scenes/Tarea1_Josem"
import Tarea_2 from "./Scenes/Tarea2_Josem"

function App() {
  return (
    <Router>
      <Routes>
          <Route exact path='/' element={<Intro/>}></Route>
          <Route path='/tema_1' element={<Tema_1_figuras/>}></Route>
          <Route path='/tarea_1' element={<Tarea_1/>}></Route>
          <Route path='/tarea_2' element={<Tarea_2/>}></Route>
      </Routes>
    </Router>
)}

export default App;
