import { useState } from 'react'
import Select, { components } from 'react-select'
import './jobScrapModal.css'
import { scrapperPlatforms } from './jobScrapperConstants'
import { customSelectStyle } from '../../../utils/reactCustomStyle'
import PropTypes from 'prop-types'

function JobScrapModal({ onClose, addOperation }) {
  // Transform scrapperPlatforms into the format React Select expects
  const platformOptions = scrapperPlatforms.map((platform) => ({
    value: platform.name,
    label: platform.name,
    icon: platform.icon,
    dateRange: platform.dateRange,
  }))

  const [selectedPlatform, setSelectedPlatform] = useState(platformOptions[0])
  const [keywords, setKeywords] = useState('')
  const [selectedDateRange, setSelectedDateRange] = useState(
    selectedPlatform.dateRange[0]
  )

  // Custom Option component using react-select's components
  const { Option } = components
  const IconOption = (props) => (
    <Option {...props}>
      <div className="platform-option">
        <img
          src={props.data.icon}
          alt={props.data.label}
          className="platform-icon"
        />
        <span>{props.data.label}</span>
      </div>
    </Option>
  )

  // Add PropTypes validation
  IconOption.propTypes = {
    data: PropTypes.shape({
      icon: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  }

  // Handle platform change
  const handlePlatformChange = (option) => {
    setSelectedPlatform(option)
    setSelectedDateRange(option.dateRange[0])
  }

  const handleDateRangeChange = (option) => {
    setSelectedDateRange(option.value)
  }

  // Create options for date range
  const dateRangeOptions = selectedPlatform.dateRange.map((range) => ({
    value: range,
    label: range,
  }))

  const handleSave = () => {
    const newOperation = {
      platform: selectedPlatform.label,
      icon: selectedPlatform.icon,
      keywords: keywords,
      dateRange: selectedDateRange,
    }
    addOperation(newOperation)
    onClose()
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content elevated">
        <div className="modal-header">
          <div>Add New Job Search</div>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <label>Platform</label>
          <Select
            options={platformOptions}
            value={selectedPlatform}
            onChange={handlePlatformChange}
            styles={customSelectStyle}
            components={{ Option: IconOption }}
            isSearchable={false}
          />

          <label>Keywords</label>
          <input
            type="text"
            placeholder="Enter keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />

          <label>Date Range</label>
          <Select
            options={dateRangeOptions}
            value={dateRangeOptions.find(
              (option) => option.value === selectedDateRange
            )}
            onChange={handleDateRangeChange}
            styles={customSelectStyle}
            isSearchable={false}
            className="date-range-select"
          />
        </div>

        <div className="modal-footer">
          <button className="save-button" onClick={handleSave}>
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  )
}

JobScrapModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  addOperation: PropTypes.func.isRequired,
}

export default JobScrapModal
