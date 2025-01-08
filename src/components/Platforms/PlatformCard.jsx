import { useState, useEffect } from 'react'
import { EllipsisVerticalIcon, PlayIcon, PauseIcon, TrashIcon } from '../Icons'
import './platformCard.css'
import PropTypes from 'prop-types'

function PlatformCard(props) {
  const { createdAt, keywords, dateRange, lastRun, platform, icon } = props
  const [active, setActive] = useState(false)
  const [dropdown, setDropdown] = useState(false)

  const handleActive = () => {
    setActive(!active)
  }

  const handleDropdown = () => {
    setDropdown(!dropdown)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdown && !event.target.closest('.platform-card-dots-container')) {
        setDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [dropdown])

  return (
    <div className="elevated platform-card-container">
      <div className="platform-card-header">
        <div className="platform-card-icon-name">
          <img src={icon} style={{ width: '30px' }} />
          <div className="platform-card-title-created">
            <div style={{ fontWeight: 'bold' }}>{platform}</div>
            <div className="platform-card-subtitle">{createdAt}</div>
          </div>
        </div>
        <div className="platform-card-dots-container">
          <EllipsisVerticalIcon
            className="platform-card-dots-icon"
            onClick={handleDropdown}
          />
          {dropdown && (
            <div className="platform-card-dropdown">
              <div className="platform-card-dropdown-item">
                <TrashIcon />
                Delete
              </div>
              {/* Add more dropdown items as needed */}
            </div>
          )}
        </div>
      </div>

      {/* section keywords buttons */}
      <div className="platform-card-keywords-buttons">
        <div className="platform-card-keywords">
          <div style={{ fontWeight: 'bold' }}>Keywords</div>
          <div className="platform-card-subtitle">{keywords}</div>
        </div>
        <div className="platform-card-buttons">
          {active ? (
            <PlayIcon
              style={{ color: 'var(--success)' }}
              onClick={handleActive}
            />
          ) : (
            <PauseIcon
              style={{ color: 'var(--error)' }}
              onClick={handleActive}
            />
          )}
        </div>
      </div>
      {/* section date range */}
      <div className="platform-card-daterange">
        <div style={{ fontWeight: 'bold' }}>Date Range</div>
        <div className="platform-card-subtitle">{dateRange}</div>
      </div>

      {/* section last run */}
      <div className="platform-card-lastrun">
        <div style={{ fontWeight: 'bold' }}>Last run</div>
        <div className="platform-card-subtitle">{lastRun}</div>
      </div>
    </div>
  )
}

PlatformCard.propTypes = {
  createdAt: PropTypes.string.isRequired,
  keywords: PropTypes.string.isRequired,
  dateRange: PropTypes.string.isRequired,
  lastRun: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
}

export default PlatformCard
