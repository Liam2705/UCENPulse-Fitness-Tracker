import './styles/App.css'
import {Dashboard} from './pages/Dashboard.jsx';
import LogActivity from './pages/LogActivity.jsx';
import {Routes, Route} from 'react-router-dom';
import HealthMetrics from './pages/HealthMetrics.jsx';
import Analytics from './pages/Analytics.jsx';

function App() {
  return (
    <>
      // Define application routes
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/log-activity" element={<LogActivity/>}/>
        <Route path="/health-metrics" element={<HealthMetrics/>}/>
        <Route path="/analytics" element={<Analytics/>}/>
      </Routes>
    </>
  )
}

export default App
