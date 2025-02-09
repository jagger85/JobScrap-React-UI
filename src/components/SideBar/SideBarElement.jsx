import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import './sideBar.css'

function SideBarElement({ label, icon, path }) {
  return (
    <NavLink to={path} className="sidebar-element-container">
      <span className="sidebar-icon">{icon}</span>
      <span className="sidebar-element-text">{label}</span>
    </NavLink>
  )
}

SideBarElement.propTypes = {
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
}

export default SideBarElement
