import { useContext, useMemo, useRef } from 'react'
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
 * @param {string} props.keywords - The keywords for job scraping
 * @returns {JSX.Element} A button that triggers download or scraping operations
 */
export default function ButtonDownload({selectedDate, keywords}) {
  const { initiateJobScraping } = useJobListings()
  const { connection } = useContext(ConnectionContext)
  const { platforms, operationsStatus, reset } = useContext(PlatformsContext)
  const { fetchListings } = useFetchListings()
  const { resetAll } = useResetServer()
  const isProcessing = useRef(false);

  /**
   * Memoized list of selected platform keys
   */
  const selectedPlatforms = useMemo(() => {
    return Object.entries(platforms)
      .filter(([_, platform]) => platform.isSelected)
      .map(([platformKey]) => platformKey)
  }, [platforms])

  /**
   * Checks if any selected platform has finished successfully
   */
  const hasSuccessfulPlatforms = useMemo(() => {
    return selectedPlatforms.some(platformKey => 
      platforms[platformKey]?.status === 'finished'
    );
  }, [platforms, selectedPlatforms]);

  /**
   * Checks if all selected platforms are in error state
   */
  const areAllSelectedPlatformsInError = useMemo(() => {
    if (selectedPlatforms.length === 0) return false;
    
    return selectedPlatforms.every(platformKey => 
      platforms[platformKey]?.status === 'error'
    );
  }, [platforms, selectedPlatforms]);

  /**
   * Checks if we should allow downloading results
   */
  const canDownloadResults = useMemo(() => {
    return hasSuccessfulPlatforms || operationsStatus === OPERATION_STATUS.FINISHED;
  }, [hasSuccessfulPlatforms, operationsStatus]);

  /**
   * Handles the main button click action
   */
  const handleButtonClick = async () => {
    if (isProcessing.current) return;
    isProcessing.current = true;

    try {
      if (areAllSelectedPlatformsInError) {
        await resetAll(reset);
        //ToasterManager.showToast('success', 'Platforms reset successfully. You can try again.');
        return;
      }

      if (canDownloadResults) {
        const fetchedListings = await fetchListings();
        if (!fetchedListings?.length) {
          ToasterManager.showToast('error', 'No results available to download');
          return;
        }
        
        await downloadCSV(fetchedListings);
        await resetAll(reset);
      } else {
        if (selectedPlatforms.length === 0) {
          ToasterManager.showToast('error', 'Please select at least one platform');
          return;
        }
        
        await initiateJobScraping(selectedDate, selectedPlatforms, keywords);
      }
    } catch (error) {
      console.error('Operation failed:', error);
      ToasterManager.showToast('error', `Failed to ${canDownloadResults ? 'download results' : 'fetch listings'}`);
    } finally {
      isProcessing.current = false;
    }
  }

  /**
   * Determines the button text based on connection and operation status
   */
  const getButtonText = () => {
    if (!connection.isConnected) {
      return 'Server unavailable';
    }

    if (areAllSelectedPlatformsInError) {
      return 'All platforms failed - Click to reset';
    }

    if (canDownloadResults) {
      return 'Download available results';
    }

    switch (operationsStatus) {
      case OPERATION_STATUS.IDLE:
        return 'Ready when you are!';
      case OPERATION_STATUS.PROCESSING:
        return 'Processing your request';
      case OPERATION_STATUS.FINISHED:
        return 'All done! View your results';
      case OPERATION_STATUS.ERROR:
        return 'Operation failed - Try again';
      default:
        return 'Begin Job Search';
    }
  };

  return (
    <div className="start-download-container">
      <button
        className="button download-button"
        onClick={handleButtonClick}
        disabled={
          !connection.isConnected || 
          (operationsStatus === OPERATION_STATUS.PROCESSING && !canDownloadResults && !areAllSelectedPlatformsInError)
        }
      >
        <span style={{letterSpacing:'0.08rem'}}>{getButtonText()}</span>
      </button>
    </div>
  );
}

ButtonDownload.propTypes = {
  selectedDate: PropTypes.string.isRequired,
  keywords: PropTypes.string,
}
