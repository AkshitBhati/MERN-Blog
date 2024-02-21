import React, { Suspense, lazy } from 'react'
import { Routes, Route } from "react-router-dom"
//pages

import Header from './Components/Header'
import FooterCom from './Components/Footer'
import PrivateRoute from './Components/PrivateRoute'
import OnlyAdminPrivateRoute from './Components/OnlyAdminPrivateRoute'

//implementing lazy loading in the app
const HomePage = lazy(() => import("./Pages/Home"))
const AboutPage = lazy(() => import("./Pages/About"))
const SigninPage = lazy(() => import("./Pages/Signin"))
const SignupPage = lazy(() => import("./Pages/Signup"))
const DashboardPage = lazy(() => import("./Pages/Dashboard"))
const CreatePost = lazy(() => import("./Pages/CreatePost"))
const UpdatePost = lazy(() => import("./Pages/UpdatePost"))
const PostPage = lazy(() => import("./Pages/PostPage"))
const Search = lazy(() => import('./Pages/Search'))

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
    <Route path='/search' element={<Search />}/>
    <Route path='/post/:postSlug' element={<PostPage />}/>
    <Route element={<PrivateRoute />}>
    <Route path='/dashboard' element={<DashboardPage />}/>
      <Route path='/create-post' element={<CreatePost />}/>
      <Route path='/update-post/:postId' element={<UpdatePost />} />
    </Route>
    <Route element={<OnlyAdminPrivateRoute />}>
    </Route>
   </Routes>
   <FooterCom />
    </Suspense>
   </>
  )
}

export default App
