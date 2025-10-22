import React from 'react'
import '../styles/Dashboard.css'
import '../styles/LogActivity.css'
import {Sidebar} from '../components/Sidebar'
import {Header} from '../components/Header'
import { useMediaQuery } from 'react-responsive'
import {SidebarMobile} from '../components/SidebarMobile.jsx';
import ActivityForm from '../components/ActivityForm.jsx';

function LogActivity() {

    const isMobile = useMediaQuery({ query: '(max-width: 981px)' });

  return (
    <div className="dashboard-grid">
                {isMobile ? <SidebarMobile /> : <Sidebar />}
                <Header pageTitle={"Log an Activity"}/>
                <main className="main-content">
                  <div className="activity-form">
                    <ActivityForm/>
                  </div>
                </main>
            </div>
  )
}

export default LogActivity