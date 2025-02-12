import { useState } from 'react'
import Select, { components } from 'react-select'
import '../overlay.css'
import { scrapperPlatforms } from '../jobScrapperConstants'
import { customSelectStyle } from '../../../utils/reactCustomStyle'
import StandardButton from '@buttons/StandardButton'
import PropTypes from 'prop-types'
import { CloseIcon } from '@icons'
import IconButton from '@buttons/IconButton'

function AutomateScrapModal({ onClose, addAutomatedOperation }) {
  // State variables
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
  const [selectedFrequency, setSelectedFrequency] = useState(1)

  // Frequency options
  const frequencyOptions = Array.from({ length: 30 }, (_, index) => ({
    value: index + 1,
    label: `Every ${index + 1} day${index === 0 ? '' : 's'}`,
  }))

  // Date range options
  const dateRangeOptions = selectedPlatform.dateRange.map((range) => ({
    value: range,
    label: range,
  }))

  // Custom option component for Select
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

  IconOption.propTypes = {
    data: PropTypes.shape({
      icon: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  }

  // Handlers
  const handlePlatformChange = (option) => {
    setSelectedPlatform(option)
    setSelectedDateRange(option.dateRange[0])
  }

  const handleDateRangeChange = (option) => {
    setSelectedDateRange(option.value)
  }

  const handleFrequencyChange = (option) => {
    setSelectedFrequency(option.value)
  }

  const handleKeywordsChange = (e) => {
    setKeywords(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newOperation = {
      platform: selectedPlatform.label,
      icon: selectedPlatform.icon,
      keywords: keywords,
      dateRange: selectedDateRange,
      active: false,
      frequency: selectedFrequency,
    }
    addAutomatedOperation(newOperation)
    onClose()
  }

  // Render
  return (
    <div className="modal-overlay">
      <div className="modal-content elevated">
        <div className="modal-header">
          <div className="modal-title">Add New Automated Scrap</div>
          <IconButton icon={CloseIcon} onClick={onClose} type="squared" />
        </div>
        <form className="automate-scrap-form" onSubmit={handleSubmit}>
          <label>
            Platform
            <Select
              className="automate-scrap-select"
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
              className="automate-scrap-input"
              type="text"
              placeholder="Enter keywords"
              value={keywords}
              onChange={handleKeywordsChange}
              required
            />
          </label>
          <label>
            Date Range
            <Select
              className="automate-scrap-select date-range-select"
              options={dateRangeOptions}
              value={dateRangeOptions.find(
                (option) => option.value === selectedDateRange
              )}
              onChange={handleDateRangeChange}
              styles={customSelectStyle}
              isSearchable={false}
            />
          </label>
          <label>
            Frequency
            <Select
              className="automate-scrap-select date-range-select"
              options={frequencyOptions}
              value={frequencyOptions.find(
                (option) => option.value === selectedFrequency
              )}
              onChange={handleFrequencyChange}
              styles={customSelectStyle}
              isSearchable={false}
            />
          </label>
          <StandardButton
            width="180px"
            className="standard-button"
            text="Create"
            type="submit"
          />
        </form>
      </div>
    </div>
  )
}

AutomateScrapModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  addAutomatedOperation: PropTypes.func.isRequired,
}

export default AutomateScrapModal
