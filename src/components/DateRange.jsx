import Select from 'react-select'
import { customSelectStyle } from './Particles'
import { DATE_RANGES, DATE_RANGE_LABELS } from '../constants'
import PropTypes from 'prop-types'
import '../jobsweep.css'

/**
 * Component that renders a date range selection dropdown
 * Allows users to choose from predefined date ranges for job searches
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onDateChange - Callback function triggered when date range changes
 * @param {string} props.selectedDate - Currently selected date range value
 * @returns {JSX.Element} A styled select dropdown for date range selection
 */
export default function DateRange({ onDateChange, selectedDate }) {
  /**
   * Transforms date range constants into options format required by react-select
   * @type {Array<{value: string, label: string}>}
   */
  const dateOptions = Object.values(DATE_RANGES).map((value) => ({
    value,
    label: DATE_RANGE_LABELS[value],
  }))

  return (
    <div
      className="date-container"
      style={{
        marginTop: '2rem',
      }}
    >
      <div
        style={{
          fontSize: 'var(--m)',
          marginTop: 'var(--spacing-l)',
        }}
      >
        Choose a Date Range
      </div>
      <div
        className="react-select"
        style={{
          marginTop: 'var(--spacing-m)',
          marginBottom: 'var(--spacing-l)',
        }}
      >
        <Select
          placeholder="Select a date range..."
          styles={customSelectStyle}
          options={dateOptions}
          value={dateOptions.find((option) => option.value === selectedDate)}
          onChange={(selectedOption) => onDateChange(selectedOption.value)}
        />
      </div>
    </div>
  )
}

/**
 * PropTypes for the DateRange component
 * @type {Object}
 */
DateRange.propTypes = {
  onDateChange: PropTypes.func.isRequired,
  selectedDate: PropTypes.string.isRequired,
}
