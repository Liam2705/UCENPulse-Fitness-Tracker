import '../styles/Dashboard.css'
import { Sidebar } from '../components/nav/Sidebar.jsx'
import { Header } from '../components/nav/Header.jsx'
import { useMediaQuery } from 'react-responsive'
import { SidebarMobile } from '../components/nav/SidebarMobile.jsx';
import DataVisualization from '../components/forms/DataVisualisation.jsx'

function Analytics() {

  const isMobile = useMediaQuery({ query: '(max-width: 981px)' });

  return (
    <div className="dashboard-grid">
      {isMobile ? <SidebarMobile /> : <Sidebar />}
      <Header pageTitle={"Analytics"} />
      <main className="main-content">
        <DataVisualization />
      </main>
    </div>
  )
}

export default Analytics