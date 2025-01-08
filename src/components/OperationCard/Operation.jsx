import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import './operation.css'
import { EllipsisVerticalIcon, TrashIcon } from '../Icons'

function Operation({ operation, onDelete }) {
  const [dropdown, setDropdown] = useState(false)

  const handleDropdown = () => {
    setDropdown(!dropdown)
  }

  const handleDelete = () => {
    onDelete(operation.id)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdown && !event.target.closest('.operation-dots-container')) {
        setDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [dropdown])

  return (
    <div className="elevated operation-container">
      <div className="operation-header">
        <img src={operation.icon} alt={operation.platform} />
        <div className="operation-title-created">
          <div className="operation-title">{operation.platform}</div>
          <div className="operation-subtitle">{operation.createdAt}</div>
        </div>
        <div className="operation-dots-container">
          <EllipsisVerticalIcon onClick={handleDropdown} />
          {dropdown && (
            <div className="operation-dropdown">
              <div className="operation-dropdown-item" onClick={handleDelete}>
                <TrashIcon />
                Delete
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="operation-keywords">
        <div style={{ fontWeight: 'bold' }}>Keywords</div>
        <div className="operation-subtitle">{operation.keywords}</div>
      </div>
      <div className="operation-status">
        <div style={{ fontWeight: 'bold' }}>Date Range</div>
        <div className="operation-subtitle">{operation.dateRange}</div>
      </div>
    </div>
  )
}

Operation.propTypes = {
  operation: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default Operation
