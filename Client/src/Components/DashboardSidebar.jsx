import React, { useEffect, useState } from 'react'
import { Sidebar } from "flowbite-react"
import { HiUser, HiArrowSmRight } from "react-icons/hi"
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signoutSuccess } from '../redux/user/UserSlice'

const DashboardSidebar = () => {
    const location = useLocation()
  const [tab, setTab] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const  tabFromUrl = urlParams.get('tab')
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  }, [location.search])


  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/signout', {
        method: "POST",
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        console.log("Error response:", res.status, data);
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to={"/dashboard?tab=profile"}>
                <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={"User"} labelColor='dark' as="div">
                    Profile
                </Sidebar.Item>
                </Link>
                <Sidebar.Item  icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignOut}>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashboardSidebar
