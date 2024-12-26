import './mainLayout.css'
import Header from '../components/Header/Header'
import SideBar from '../components/SideBar/SideBar'
import Dashboard from '../components/Dashboard'
import History from '../components/History'
import UserManagement from '../components/UserManagement/UserManagement'
import Settings from '../components/Settings'

import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'

function MainLayout() {
  return (
    <div className="main-container">
      <div className="sidebar-container">
        <SideBar />
      </div>
      <div className="content-container">
        <div className="header-container">
          <Header />
        </div>
        <div className="body-container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/history"
              element={
                <ProtectedRoute
                  element={<History />}
                  allowedRoles={['admin', 'user']}
                />
              }
            />
            <Route
              path="/user-management"
              element={
                <ProtectedRoute
                  element={<UserManagement />}
                  allowedRoles={['admin']}
                />
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute
                  element={<Settings />}
                  allowedRoles={['admin', 'user']}
                />
              }
            />
          </Routes>
        </div>
        <div className="footer-container">Footer</div>
      </div>
    </div>
  )
}

export default MainLayout
