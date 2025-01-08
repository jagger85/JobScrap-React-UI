
import '../jobsweep.css'

/**
 * Component that handles job listing downloads and initiates job scraping operations
 * @component
 * @param {Object} props - Component props
 * @param {string} props.selectedDate - The selected date for job scraping
 * @param {string} props.keywords - The keywords for job scraping
 * @returns {JSX.Element} A button that triggers download or scraping operations
 */
export default function ButtonDownload() {


  return (
    <div className="start-download-container">
      <button
        className="button download-button"
      >
        <span style={{letterSpacing:'0.08rem'}}>{}</span>
      </button>
    </div>
  )

}