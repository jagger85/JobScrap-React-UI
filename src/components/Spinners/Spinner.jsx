import PropTypes from 'prop-types'
import './spinner.css'

const Spinner = ({ className }) => {
  return (
    <div className={`spinner-container ${className || ''}`}>
      <div className="spinner-ring" />
    </div>
  )
}

Spinner.propTypes = {
  className: PropTypes.string,
}

export default Spinner
