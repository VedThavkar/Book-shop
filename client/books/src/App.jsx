import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import{
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import Books from "./Pages/Books";
import Add from "./Pages/Add";
import Update from "./Pages/Update";
import "./Style.css"

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books/>}/>
          <Route path="/add" element={<Add/>}/>
          <Route path="/update/:id" element={<Update/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
