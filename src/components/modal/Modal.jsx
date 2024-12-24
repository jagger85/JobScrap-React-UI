import './Modal.css'
import PropTypes from 'prop-types'
import { useContext } from 'react'
import { createPortal } from 'react-dom'
import useReset from '../../hooks/useReset'
import { PlatformsContext } from '../../contexts/PlatformsContext'


const Modal = ({ isOpen, onClose }) => {
const {resetAll} = useReset()
const {reset} = useContext(PlatformsContext)

const handleReset = async () => {
  await resetAll(reset)
  onClose()
}
  if (!isOpen) return null

  return createPortal(
    <div className="modal-wrapper">
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-container">
        <div className="modal-header">
          <div className="modal-title">Reset Job Search</div>
        </div>
        <div className="modal-content">
          <div className="modal-icon-container">&#x21bb;</div>
          <div className="modal-message">
            You are about to reset your job search
          </div>
          <div className="modal-subMessage">
            Are you sure you want to continue?
          </div>
        </div>
        <div className="modal-footer">
          <button className="modal-btn modal-btn-left" onClick={handleReset}>Reset</button>
          <button className="modal-btn modal-btn-right" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>,
    document.body
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Modal
