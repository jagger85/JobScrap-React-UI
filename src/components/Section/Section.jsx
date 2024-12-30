import './section.css'
import PropTypes from 'prop-types'
function Section({title, children}) {
  return (
    <div className="section-container">
    <div className="section-title">{title}</div>
    <div className="section-content">{children}</div>
    </div>
  )
}

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default Section
