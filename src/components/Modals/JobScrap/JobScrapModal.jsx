import { useState } from 'react'
import Select, { components } from 'react-select'
import './jobScrapModal.css'
import '../overlay.css'
import { scrapperPlatforms } from '../jobScrapperConstants'
import { customSelectStyle } from '../../../utils/reactCustomStyle'
import StandardButton from '@buttons/StandardButton'
import PropTypes from 'prop-types'
import {CloseIcon} from '@icons'
import IconButton from '@buttons/IconButton'

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
      status: 'Idle',
      numberOfListings: 0,
      listings: [],
      taskId: null,
      message: 'Awaiting operation launch'
    }
    addOperation(newOperation)
    onClose()
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content elevated">
        <div className="modal-header">
          <div className="modal-title">Add New Job Search</div>
          <IconButton icon={CloseIcon} onClick={onClose}  type='squared'/>
        </div>

        <form className="job-scrap-form">
          <label>Platform          
          <Select
            className="job-scrap-select"
            options={platformOptions}
            value={selectedPlatform}
            onChange={handlePlatformChange}
            styles={customSelectStyle}
            components={{ Option: IconOption }}
            isSearchable={false}
          />
          </label>
          <label>
            Keywords
            <input
              className="job-scrap-input"
              type="text"
              placeholder="Enter keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </label>
          <label>
            Date Range
            <Select
              className="job-scrap-select date-range-select"
              options={dateRangeOptions}
              value={dateRangeOptions.find(
                (option) => option.value === selectedDateRange
              )}
              onChange={handleDateRangeChange}
              styles={customSelectStyle}
              isSearchable={false}
            />
          </label>
          <div>
            <StandardButton text="Save Configuration" onClick={handleSave} className="standard-button" />
          </div>
        </form>
      </div>
    </div>
  )
}

JobScrapModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  addOperation: PropTypes.func.isRequired,
}

export default JobScrapModal
