import './buttons.css'
import PropTypes from 'prop-types'

const IconButton = ({ icon: Icon, onClick, size = 25,type, ...props }) => {
  return (
    <div className={`${type} button`} onClick={onClick} {...props}>
      {Icon && <Icon size={size} />}
    </div>
  )
}

IconButton.propTypes = {
  icon: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.number,
  status: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
}

export default IconButton
