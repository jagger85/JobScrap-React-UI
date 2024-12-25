import './mainLayout.css'
import Header from '../components/Header/Header'
function MainLayout() {
  return (
    <div className="main-container">
        <div className="sidebar-container">Sidebar</div>
        <div className="content-container">
          <div className="header-container"><Header/></div>
          <div className="body-container">Body</div>
          <div className="footer-container">Footer</div>
        </div>
    </div>
  )
}

export default MainLayout
