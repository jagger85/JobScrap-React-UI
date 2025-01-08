import PropTypes from 'prop-types'
import './badges.css'

function Badge({ text, className }) {
  return (
    <div className={className}>{text}</div>
  )
}

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
}

export default Badge
