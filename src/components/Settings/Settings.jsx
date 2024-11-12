import './Settings.css'
import PropTypes from 'prop-types'

const Settings = ({ isOpen, onClose }) => {

  return (
    <div className={`settings-overlay ${isOpen ? 'show' : ''}`}>
      <div className="settings-panel">
        <div className="settings-header">
          <h2>Settings</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="settings-content">
          {/* <div className="setting-item">
            <span>
              Server Connection{' '}
              {connection.isConnected
                ? '(Connected)'
                : connection.enabled
                ? '(Connecting...)'
                : '(Disconnected)'}
              {connection.lastHeartbeat &&
                ` - Last heartbeat: ${new Date(
                  connection.lastHeartbeat
                ).toLocaleTimeString()}`}
            </span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={connection.enabled}
                onChange={handleConnectionToggle}
                disabled={!isAuthenticated}
              />
              <span className="slider"></span>
            </label>
          </div> */}

          <div className="setting-item">
            <span>Dark Mode</span>
            <label className="toggle-switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <span>Notifications</span>
            <label className="toggle-switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <span>Auto Refresh</span>
            <label className="toggle-switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

Settings.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Settings
