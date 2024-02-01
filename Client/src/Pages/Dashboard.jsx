import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashboardSidebar from '../Components/DashboardSidebar'
import DashboardProfile from '../Components/DashboardProfile'

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
      {tab == 'profile' && <DashboardProfile />}
      {/* Profile */}
    </div>
  )
}

export default Dashboard
