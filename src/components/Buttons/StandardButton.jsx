import PropTypes from 'prop-types'
function StandardButton({ text, onClick, className, width, ...props }) {
  return (
    <button
      className={className}
      onClick={onClick}
      style={{ width: width }}
      {...props}
    >
      {text}
    </button>
  )
}

StandardButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  width: PropTypes.string,
}

export default StandardButton
