import linkedinIcon from '@platform-icons/linkedin.svg'
import indeedIcon from '@platform-icons/indeed.svg'
import kalibrrIcon from '@platform-icons/kalibrr.svg'
import jobstreetIcon from '@platform-icons/jobstreet.svg'

export const scrapperPlatforms = [
    {
        name: 'LinkedIn',
        icon: linkedinIcon,
        dateRange:['Past 24 hours','Past week','Past month']
    },
    {
        name: 'Indeed',
        icon: indeedIcon,
        dateRange:['Last 24 hours','Last 3 days','Last 7 days','Last 14 days']
    },
    {
        name: 'Kalibrr',
        icon: kalibrrIcon,
        dateRange: Array.from({ length: 30 }, (_, index) => index + 1)
    },
    {
        name: 'Jobstreet',
        icon: jobstreetIcon,
        dateRange: Array.from({ length: 30 }, (_, index) => index + 1)
    }
]
