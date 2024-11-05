// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { Route, Routes } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import PageNotFound from "./pages/PageNotFound"
import Signup from "./pages/Signup"
import Transaction from "./pages/Transaction"

import Header from "./components/ui/Header"

function App() {
  // const [count, setCount] = useState(0)

  const authUser = true;
  return (
    <>
    
    {authUser && <Header/>}
      
      <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/transaction/:id" element={<Transaction />} />
          <Route path="*" element={<PageNotFound/>} />
          

      </Routes>
      
      
    </>
  )
}

export default App
