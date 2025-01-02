import PageLayout from '@layout/PageLayout'
import ListingsTable from '@components/Tables/ListingsTable'
import { useLocation, useNavigate } from 'react-router-dom'
import IconButton from '@buttons/IconButton'
import { CollapseIcon } from '@icons'
import '../Dashboard/dashboard.css'
function Listings() {
  const location = useLocation()
  const navigate = useNavigate()
  const listings = location.state?.listings || []

  return (
    <PageLayout title="Listings">
      <div className="dashboard-header">
        <IconButton
          icon={CollapseIcon}
          onClick={() => navigate(-1)}
          type="rounded"
        />
        <div className="dashboard-header-subtitle">Go back</div>
      </div>
      <ListingsTable data={listings} />
    </PageLayout>
  )
}

export default Listings
