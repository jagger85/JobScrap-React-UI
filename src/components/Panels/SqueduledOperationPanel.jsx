import './panels.css'
import { useState, memo } from 'react'
import { CollapseIcon, PlayIcon, PauseIcon, TrashIcon } from '@icons'
import IconButton from '@components/Buttons/IconButton'
import PropTypes from 'prop-types'
import { PLATFORM_ICONS } from '@constants'

const SqueduledOperationPanel = memo(function SqueduledPanel(props) {
  const [isOpen, setIsOpen] = useState(false)
  const { operation, onDelete, onActivate, onDeactivate } = props

  function togglePanel() {
    setIsOpen(!isOpen)
  }

  async function handleDelete() {
    onDelete(operation)
  }

  async function handleActivate() {
    onActivate(operation)
  }

  async function handleDeactivate() {
    onDeactivate(operation)  
  }

  return (
    <div className="elevated">
      <div className="cp-panel-header-collapsable" onClick={togglePanel}>
        <div className="cp-panel-header-data">
          <img src={PLATFORM_ICONS[operation.platform.toUpperCase()]} style={{ width: '30px', height: '30px' }} />
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
          {operation.enabled ? (
            <IconButton
              type="squared success-icon"
              icon={PlayIcon}
              onClick={(e) => {
                e.stopPropagation()
                handleDeactivate()
              }}
            />
          ) : (
            <IconButton
              type="squared error-icon"
              icon={PauseIcon}
              onClick={(e) => {
                e.stopPropagation()
                handleActivate()
              }}
            />
          )}
          <IconButton
            type="squared delete"
            icon={TrashIcon}
            onClick={(e) => {
              e.stopPropagation()
              handleDelete()
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
            <div>Last run: {operation.last_run_at}</div>
            <div>Count: {operation.total_run_count}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
)

SqueduledOperationPanel.propTypes = {
  operation: PropTypes.shape({
    platform: PropTypes.string.isRequired,
    keywords: PropTypes.string.isRequired,
    dateRange: PropTypes.string.isRequired,
    frequency: PropTypes.string.isRequired,
    enabled: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    last_run_at: PropTypes.string,
    total_run_count: PropTypes.number.isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onActivate: PropTypes.func.isRequired,
  onDeactivate: PropTypes.func.isRequired
}

export default SqueduledOperationPanel
