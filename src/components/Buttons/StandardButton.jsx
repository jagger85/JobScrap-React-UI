import PropTypes from 'prop-types'
function StandardButton({ text, onClick, className, props }) {
  return (
    <button className={className} onClick={onClick} {...props}> 
      {text}
    </button>
  )
}

StandardButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  props: PropTypes.object,
}

export default StandardButton
