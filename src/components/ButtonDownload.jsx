import { useContext, useMemo } from 'react'
import { useJobListings } from '../hooks/useJoblistings.js'
import '../jobsweep.css'
import { ToasterManager } from './Toasters'
import { OPERATION_STATUS } from '../constants'
import { downloadCSV } from '../utils/csvManager'
import { PlatformsContext } from '../contexts/PlatformsContext'
import { ConnectionContext } from '../contexts/ConnectionContext'
import PropTypes from 'prop-types'
import { useFetchListings } from '../hooks/useFetchListings'
import useResetServer from '../hooks/useReset'

/**
 * Component that handles job listing downloads and initiates job scraping operations
 * @component
 * @param {Object} props - Component props
 * @param {string} props.selectedDate - The selected date for job scraping
 * @returns {JSX.Element} A button that triggers download or scraping operations
 */
export default function ButtonDownload({selectedDate}) {
  const { initiateJobScraping } = useJobListings()
  const { connection } = useContext(ConnectionContext)
  const { platforms, operationsStatus, reset } = useContext(PlatformsContext)
  const { fetchListings } = useFetchListings()
  const { resetAll } = useResetServer()

  /**
   * Memoized list of selected platform keys
   * @returns {string[]} Array of selected platform identifiers
   */
  const selectedPlatforms = useMemo(() => {
    return Object.entries(platforms)
      // eslint-disable-next-line no-unused-vars
      .filter(([_, platform]) => platform.isSelected)
      .map(([platformKey]) => platformKey)
  }, [platforms])

  /**
   * Handles the CSV download operation and subsequent reset
   * @async
   * @param {Array} results - The job listings to be downloaded
   * @throws {Error} When download or reset operations fail
   */
  const handleDownloadCSV = async (results) => {
    try {
      await downloadCSV(results) 
      await resetAll(reset)
      ToasterManager.showToast('success', 'CSV file downloaded successfully')
    } catch (error) {
      console.error('Failed to download CSV:', error)
      ToasterManager.showToast('error', 'Failed to download CSV file')
    }
  }

  /**
   * Handles the main button click action
   * Either initiates job scraping or downloads existing results
   * @async
   * @throws {Error} When operations fail
   */
  const handleButtonClick = async () => {
    try {
      if (operationsStatus === OPERATION_STATUS.FINISHED) {
        const fetchedListings = await fetchListings()
        if (!fetchedListings?.length) {
          ToasterManager.showToast('error', 'No results available to download')
          return
        }
        
        await handleDownloadCSV(fetchedListings)
      } else {
        if (selectedPlatforms.length === 0) {
          ToasterManager.showToast('error', 'Please select at least one platform')
          return
        }
        
        await initiateJobScraping(selectedDate, selectedPlatforms)
      }
    } catch (error) {
      console.error('Operation failed:', error)
      ToasterManager.showToast('error', `Failed to ${operationsStatus === OPERATION_STATUS.FINISHED ? 'download results' : 'fetch listings'}`)
    }
  }

  /**
   * Determines the button text based on connection and operation status
   * @returns {string} The appropriate button text
   */
  const getButtonText = () => {
    if (!connection.isConnected) {
      return 'Server unavailable'
    }

    switch (operationsStatus) {
      case OPERATION_STATUS.IDLE:
        return 'Ready when you are!'
      case OPERATION_STATUS.PROCESSING:
        return 'Processing your request'
      case OPERATION_STATUS.FINISHED:
        return 'All done! View your results'
      case OPERATION_STATUS.ERROR:
        return 'Operation failed - Try again'
      default:
        return 'Begin Job Search'
    }
  }

  return (
    <div className="start-download-container">
      <button
        className="button download-button"
        onClick={handleButtonClick}
        disabled={
          operationsStatus === OPERATION_STATUS.PROCESSING ||
          !connection.isConnected
        }
      >
        <span style={{letterSpacing:'0.08rem'}}>{getButtonText()}</span>
      </button>
    </div>
  )
}

ButtonDownload.propTypes = {
  selectedDate: PropTypes.string.isRequired,
}
