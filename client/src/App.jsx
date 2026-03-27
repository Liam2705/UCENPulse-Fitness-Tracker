import './styles/App.css'
import { Dashboard } from './pages/Dashboard.jsx';
import LogActivity from './pages/LogActivity.jsx';
import { Routes, Route } from 'react-router-dom';
import HealthMetrics from './pages/HealthMetrics.jsx';
import Analytics from './pages/Analytics.jsx';
import Login from './pages/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Register from './pages/Register.jsx';

function App() {
  return (
    // Define application routes
    <>
      <Routes>
        {/* Public Routes */}
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/log-activity" element={<ProtectedRoute><LogActivity /></ProtectedRoute>} />
        <Route path="/health-metrics" element={<ProtectedRoute><HealthMetrics /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App
