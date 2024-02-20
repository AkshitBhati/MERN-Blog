import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashboardSidebar from '../Components/DashboardSidebar'
import DashboardProfile from '../Components/DashboardProfile'
import DashPosts from '../Components/DashPosts'
import DashUsers from '../Components/DashUser'
import DashComments from '../Components/DashComments'
import DashboardComponent from '../Components/DashboardComponent'

const Dashboard = () => {
  const location = useLocation()
  const [tab, setTab] = useState('')

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const  tabFromUrl = urlParams.get('tab')
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  }, [location.search])
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
    <DashboardSidebar />
      </div>
      {/* Profile */}
      {tab == 'profile' && <DashboardProfile />}
      {/* posts */}
      {tab === 'posts' && <DashPosts />}
      {/* users  */}
      {tab === 'users' && <DashUsers />}
      {/* comments */}
      {tab === 'comments' && <DashComments /> }
      {/* dash component */}
      { tab === 'dash' && <DashboardComponent /> }
    </div>
  )
}

export default Dashboard
