import './panels.css'
import { useState } from 'react'
import { CollapseIcon, PlayIcon, PauseIcon, TrashIcon } from '@icons'
import IconButton from '@components/Buttons/IconButton'
import PropTypes from 'prop-types'

function AutomaticOperationPanel(props) {
  const [isOpen, setIsOpen] = useState(false)
  const { operation, onDelete, onActivate, onDeactivate } = props

  function togglePanel() {
    setIsOpen(!isOpen)
  }

  async function handleDelete(id) {
    console.log(operation)
    onDelete(id)
  }

  async function handleActivate(id) {
    onActivate(id)
  }

  async function handleDeactivate(id) {
    onDeactivate(id)  
  }

  return (
    <div className="elevated">
      <div className="cp-panel-header-collapsable" onClick={togglePanel}>
        <div className="cp-panel-header-data">
          <img src={operation.icon} style={{ width: '30px', height: '30px' }} />
          <div className="cp-panel-header-item">
            <span className="cp-panel-header-item-platform">
              {operation.platform}
            </span>
          </div>
          <div className="cp-panel-header-item">
            Keywords: <span>{operation.keywords}</span>
          </div>
          <div className="cp-panel-header-item">
            Date range: <span>{operation.dateRange}</span>
          </div>
          <div className="cp-panel-header-item">
            Frequency: <span>{operation.frequency}</span>
          </div>
        </div>
        <div className="cp-panel-header-item-actions">
          {operation.active ? (
            <IconButton
              type="squared success-icon"
              icon={PlayIcon}
              onClick={(e) => {
                e.stopPropagation()
                handleDeactivate(operation._id)
              }}
            />
          ) : (
            <IconButton
              type="squared error-icon"
              icon={PauseIcon}
              onClick={(e) => {
                e.stopPropagation()
                handleActivate(operation._id)
              }}
            />
          )}
          <IconButton
            type="squared delete"
            icon={TrashIcon}
            onClick={(e) => {
              e.stopPropagation()
              handleDelete(operation._id)
            }}
          />
          <div className={isOpen ? 'cp-icon-open' : 'cp-icon-closed'}>
            <CollapseIcon className="collapse-icon"/>
          </div>
        </div>
      </div>
      <div
        className={`cp-content cp-content-collapsable ${
          isOpen ? 'cp-content-open' : 'cp-content-closed'
        }`}
      >
        <div className="cp-content-row">
          <div className="cp-content-row-items">
            <div>User: {operation.username}</div>
            <div>Last run: {operation.last_scraped_at}</div>
            <div>Count: {operation.count}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

AutomaticOperationPanel.propTypes = {
  operation: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onActivate: PropTypes.func.isRequired,
  onDeactivate: PropTypes.func.isRequired,
}

export default AutomaticOperationPanel
