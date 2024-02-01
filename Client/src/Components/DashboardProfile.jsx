import { TextInput } from 'flowbite-react'
import React from 'react'
import { useSelector } from "react-redux"

const DashboardProfile = () => {
    const { currentUser } = useSelector((state) => state.user)
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
        <img src={currentUser.profilePicture} alt="User" className='rounded-full w-full h-full border-8 object-cover border-[lightgray]'/>
        </div>
        <TextInput type='text' id='username' placeholder='Username' defaultValue={currentUser.username}/>
        <TextInput type='email' id='email' placeholder='Email' defaultValue={currentUser.email}/>
        <TextInput type='password' id='password' placeholder='Password' />
      </form>
    </div>
  )
}

export default DashboardProfile
