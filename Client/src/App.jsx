import React, { Suspense, lazy } from 'react'
import { Routes, Route } from "react-router-dom"
//pages
import Home from './Pages/Home'
import About from './Pages/About'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard'
import Header from './Components/Header'

//implementing lazy loading in the app
const HomePage = lazy(() => import("./Pages/Home"))
const AboutPage = lazy(() => import("./Pages/About"))
const SigninPage = lazy(() => import("./Pages/Signin"))
const SignupPage = lazy(() => import("./Pages/Signup"))
const DashboardPage = lazy(() => import("./Pages/Dashboard"))


const App = () => {
  return (
   <>
   <Header />
    <Suspense fallback={<div>Loading...</div>}>
   <Routes>

    <Route path='/' element={<HomePage />}/>
    <Route path='/about' element={<AboutPage />}/>
    <Route path='/sign-in' element={<SigninPage />}/>
    <Route path='/sign-up' element={<SignupPage />}/>
    <Route path='/dashboard' element={<DashboardPage />}/>
   </Routes>
    </Suspense>
   </>
  )
}

export default App
