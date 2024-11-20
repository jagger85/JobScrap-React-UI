import { DATE_RANGES } from '../constants'
import DateRange from './DateRange'
import ButtonDownload from './ButtonDownload'
import PlatformButtons from './Platforms/PlatformButtons'
import Console from './Console'
import { useState } from 'react'

/**
 * Main container component for the job sweeper application
 * Manages date range selection and coordinates child components
 * @component
 * @returns {JSX.Element} The main application container with date selection, platform buttons, download functionality, and console
 */
export default function Sweeper() {
  /**
   * State for tracking the selected date range
   * @type {string}
   */
  const [selectedDate, setSelectedDate] = useState(DATE_RANGES.PAST_24_HOURS)

  /**
   * Handles changes to the date range selection
   * @param {string} dateRange - The newly selected date range
   */
  const handleDateChange = (dateRange) => {
    setSelectedDate(dateRange)
  }

  return (
      <div className="elevated jobsweeper-container">
        <DateRange
          onDateChange={handleDateChange}
          selectedDate={selectedDate}
        />
        <PlatformButtons />
        <ButtonDownload selectedDate={selectedDate} />
        <Console />
      </div>
  )
}
