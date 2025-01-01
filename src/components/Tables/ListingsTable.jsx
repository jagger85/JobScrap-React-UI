import './tables.css'
import PropTypes from 'prop-types'
import IconButton from '@buttons/IconButton'
import { DownloadIcon } from '@icons/Icons'

const ListingsTable = (props) => {
  const { data } = props

  function openDetails(listings) {
    console.log(listings)
  }
  
  return (
    <div className="elevated table-container">
      <div className="table-title">Listings</div>
      <table className="listings-table">
        <thead>
            <tr className="table-header">
                <th>Job Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Employment Type</th>
                <th>Salary</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {data.map((listing, index) => (
                <tr key={index}>
                    <td>{listing.job_title}</td>
                    <td>{listing.company}</td>
                    <td>{listing.location}</td>
                    <td>{listing.employment_type}</td>
                    <td>{listing.salary}</td>
                    <td>
                        <IconButton icon={DownloadIcon} onClick={() => openDetails(listing.listings)} type="table-download-button squared"/>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

ListingsTable.propTypes = {
  data: PropTypes.array.isRequired,
}

export default ListingsTable