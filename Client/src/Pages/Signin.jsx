import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInStart, signInFailure, signInSuccess } from '../redux/user/UserSlice'
import { useDispatch, useSelector } from 'react-redux'
import OAuth from '../Components/OAuth'

const Signin = () => {
  const [formData, setFormData] = useState({})

  const navigate = useNavigate()
  //for redux
  const { loading, error: errMessage } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]:e.target.value.trim() })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ( !formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill out all fields'))
    }
    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message))
      }
      
      if(res.ok){
        dispatch(signInSuccess(data))
        navigate('/')
      }
    } catch (err) {
     dispatch(signInFailure(err.message))
    }
  };
  
  const handleLoginAsAdmin = () => {
    setFormData({
      email:"admin@akshit.com",
      password:"akshit"
    })
  }
  return (
   <div className='min-h-screen mt-20'>
    <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
      {/* left */}
      <div className="flex-1">
      <Link to={"/"} className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white'>Akshit's Blog</span>
        </Link>
        <p></p>
      </div>
      {/* right */}

      <div className="flex-1">
        <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
         
          <div>
          <Label value='Your Email' />
          <TextInput 
            type='email'
            placeholder='Email'
            id='email'
            onChange={handleChange}
            value={formData.email}
          />
          </div> 

          <div>
          <Label value='Your Password' />
          <TextInput 
            type='password'
            placeholder='Password'
            id='password'
            onChange={handleChange}
            value={formData.password}
          />
          </div> 
          <Button gradientDuoTone="purpleToPink" type='submit' disabled={loading}>
            {loading ? (
              <>
              <Spinner size="sm"/>
              <span className='pl-3'>Loading ...</span>
              </>
            ) : "Sign In"}
          </Button>
          <Button gradientDuoTone="purpleToPink" disabled={loading} onClick={handleLoginAsAdmin}>
            {loading ? (
              <>
              <Spinner size="sm"/>
              <span className='pl-3'>Loading ...</span>
              </>
            ) : "Login as admin"}
          </Button>
            <OAuth />
        </form>
        <div className="flex gap-2 text-sm mt-5">
          <span>New Here?</span>
          <Link to='/sign-up' className='text-blue-500'>
            Sign Up
          </Link>
        </div>
        {errMessage && (
          <Alert className='mt-5' color='failure'>{errMessage}</Alert>
        )}
      </div>
    </div>
   </div>
  )
}

export default Signin
