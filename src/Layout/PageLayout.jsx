import './pageLayout.css'
import PropTypes from 'prop-types'
export default function PageLayout({ title, children }) {
  return (
    <div className="page-layout-container">
      <div className="page-layout-title-wrapper">
        <div className="page-layout-title">{title}</div>
        <div className="separator-right"></div>
      </div>
      {children}
    </div>
  )
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
}
