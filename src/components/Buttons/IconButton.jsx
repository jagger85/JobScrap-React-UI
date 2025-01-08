import './buttons.css'
import PropTypes from 'prop-types'

const IconButton = ({
  icon: Icon,
  onClick,
  size = 25,
  type,
  disabled,
  children,
  style,
  ...props
}) => {
  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e)
    }
  }

  return (
    <div
      style={style}
      className={`${type} button ${disabled ? 'disabled' : ''}`}
      onClick={handleClick}
      {...props}
    >
      {Icon && <Icon size={size} />}
      {children}
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
  disabled: PropTypes.bool,
}

export default IconButton
