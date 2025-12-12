import '../styles/Dashboard.css'
import { Sidebar } from '../components/nav/Sidebar'
import { Header } from '../components/nav/Header'
import { useMediaQuery } from 'react-responsive'
import { SidebarMobile } from '../components/nav/SidebarMobile.jsx';
import HealthMetricTracker from '../components/forms/HealthMetricTracker.jsx'


function HealthMetrics() {

  const isMobile = useMediaQuery({ query: '(max-width: 981px)' });

  return (
    <div className="dashboard-grid">
      {isMobile ? <SidebarMobile /> : <Sidebar />}
      <Header pageTitle={"Health Metrics"} />
      <main className="main-content">
        <HealthMetricTracker />
      </main>
    </div>
  )
}

export default HealthMetrics