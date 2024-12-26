import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { sidebarLinks } from './constants'
import SideBarElement from './SideBarElement'

import './sideBar.css'

function SideBar() {
  const { role } = useContext(AuthContext)
  const filteredLinks = sidebarLinks.filter((link) => link.roles.includes(role))

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">sidebar header</div>
      <div className="sidebar-content">
        {filteredLinks.map((element) => (
          <SideBarElement
            key={element.label}
            label={element.label}
            path={element.path}
            icon={element.icon}
          />
        ))}
      </div>
      <div className="sidebar-footer">sidebar footer</div>
    </div>
  )
}

export default SideBar
