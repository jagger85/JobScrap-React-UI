import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { sidebarLinks } from './constants'
import SideBarElement from './SideBarElement'
import uplift from '../../assets/platform-icons/Uplift.png'
import './sideBar.css'

function SideBar() {
  const { role } = useContext(AuthContext)
  const filteredLinks = sidebarLinks.filter((link) => link.roles.includes(role))

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <img src={uplift} style={{ width: '75px', height: '75px' }} />
        <div className="sidebar-header-text">Job Scraper</div>
      </div>
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
