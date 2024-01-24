import React from 'react'
import { Routes, Route } from "react-router-dom"
//pages
import Home from './Pages/Home'
import About from './Pages/About'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard'

const App = () => {
  return (
   <>
   <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/about' element={<About />}/>
    <Route path='/sign-in' element={<Signin />}/>
    <Route path='/sign-up' element={<Signup />}/>
    <Route path='/dashboard' element={<Dashboard />}/>
   </Routes>
   </>
  )
}

export default App
