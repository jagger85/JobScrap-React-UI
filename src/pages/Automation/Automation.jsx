import kalibrrIcon from '../../assets/platform-icons/kalibrr.svg'
import PlatformCard from '../../components/Platforms/PlatformCard'
import PageLayout from '../../Layout/PageLayout'
import Section from '../../components/Section/Section'

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
    <PageLayout title="Automation">
      <Section title="Automatic Job Scraps">

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
  
 
        </Section>
    </PageLayout>
  )
}

export default Automation