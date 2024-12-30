import kalibrrIcon from '../../assets/platform-icons/kalibrr.svg'
import PlatformCard from '../Platforms/PlatformCard'
import './automation.css'

function Automation() {
    const platformCards = [
        {
          id: 0,
          platform: 'Kalibrr',
          icon: kalibrrIcon,
          createdAt: '2 days ago',
          keywords: 'python',
          dateRange: 'every week',
          lastRun: 'last week',
        },
        {
          id: 1,
          platform: 'Kalibrr',
          icon: kalibrrIcon,
          createdAt: '2 days ago',
          keywords: 'python',
          dateRange: 'every week',
          lastRun: 'last week',
        },
        {
          id: 2,
          platform: 'Kalibrr',
          icon: kalibrrIcon,
          createdAt: '2 days ago',
          keywords: 'python',
          dateRange: 'every week',
          lastRun: 'last week',
        },
      ]
  return (
    <>
    <div className="automation-container">
        <h2>Automation</h2>
      <div className="automation-body">
        {platformCards.map((card) => {
          return (
            <PlatformCard
              key={card.id}
              platform={card.platform}
              icon={card.icon}
              createdAt={card.createdAt}
              keywords={card.keywords}
              dateRange={card.dateRange}
              lastRun={card.lastRun}
            />
          )
        })}
      </div>
    </div>
  </>
  )
}

export default Automation