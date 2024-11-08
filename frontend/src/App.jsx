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
import { useQuery } from "@apollo/client"
import { GET_AUTH_USER } from "./graphql/queries/user.query"
import { Navigate } from "react-router-dom"

import { Toaster } from "react-hot-toast"
function App() {
  // const [count, setCount] = useState(0)

  // const authUser = true;
  const{ loading, error, data } = useQuery(GET_AUTH_USER);

  // console.log("DATA--AUTHENTICATED USER---->",data);
  console.log("LOADING--->",loading);
  console.log("ERROR--->",error);
  console.log("DATA--->",data);
  // console.log("AUTH USER--->",authUser);

  if(loading) return <p>Loading...</p>;

  return ( 
    <>
    
    {data?.authUser && <Header/>}
      
      <Routes>

          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={data?.authUser ? <Home /> : <Navigate to ="/login" />} />
          <Route path="/login" element={!data?.authUser ? <Login /> : <Navigate to ="/" />} />
          <Route path="/signup" element={!data?.authUser ? <Signup /> : <Navigate to ="/" />} />
          <Route path="/transaction/:id" element={!data?.authUser ? <Navigate to ="/login" /> : <Transaction />} />
          <Route path="*" element={<PageNotFound/>} />
          

      </Routes>

      <Toaster/>
      
    </>
  )
}

export default App
