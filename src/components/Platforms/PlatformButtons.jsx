import { useContext, useMemo } from 'react'
import { PLATFORMS } from '../../constants'
import indeed from '../../assets/platform-icons/indeed.svg'
import jobstreet from '../../assets/platform-icons/jobstreet.svg'
import kalibrr from '../../assets/platform-icons/kalibrr.svg'
import linkedIn from '../../assets/platform-icons/linkedIn.svg'
import './PlatformButtons.css'
import { PlatformsContext } from '../../contexts/PlatformsContext'

/** Mapping of platform names to their respective icon assets */
const PLATFORM_ICONS = {
  [PLATFORMS.INDEED]: indeed,
  [PLATFORMS.JOBSTREET]: jobstreet,
  [PLATFORMS.LINKEDIN]: linkedIn,
  [PLATFORMS.KALIBRR]: kalibrr,
}

/**
 * Component that renders a list of platform selection buttons
 * Allows users to toggle between different job search platforms
 * @component
 * @returns {JSX.Element} A list of platform selection buttons
 */
export default function PlatformButtons() {

  const { platforms, togglePlatform } = useContext(PlatformsContext)

  console.log('Current platforms state:', platforms)

  /**
   * Memoized list of platform buttons with handleClick inside the memo
   * @returns {JSX.Element[]} Array of platform button elements
   */
  const platformButtons = useMemo(() => {
    return Object.values(PLATFORMS).map((platformName) => {
      const isSelected = platforms[platformName]?.isSelected || false
      const status = platforms[platformName]?.status || 'idle'

      return (
        <li
          key={platformName}
          data-status={status}
        >
          <button
            onClick={() => togglePlatform(platformName)}
            className={isSelected ? 'selected' : ''}
            data-status={status}
            title={platformName}
            type="button"
          >
            <img
              src={PLATFORM_ICONS[platformName]}
              alt={platformName}
            />
          </button>
        </li>
      )
    })
  }, [platforms, togglePlatform])

  return (
    <div className="platforms-container">
      <span style={{ fontSize: 'var(--m)', marginBottom: 'var(--spacing-xs)' }}>
        Choose Platforms
      </span>
      <div className="checkbox-container">
        <div className="buttons-wrapper">
          <nav>
            <ul className="nav">
              {platformButtons}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}
