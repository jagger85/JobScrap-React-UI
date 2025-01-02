import './tables.css'
import PropTypes from 'prop-types'
import IconButton from '@buttons/IconButton'
import { CollapseIcon, ReceiptTextIcon, LinkIcon } from '@icons'
import { useState } from 'react'
import JobListingModal from '@modals/JobListing/JobListingModal'

const ListingsTable = (props) => {
  const { data } = props
  const [page, setPage] = useState(1)
  const [selectedListing, setSelectedListing] = useState(null)
  const itemsPerPage = 10
  const totalPages = Math.ceil(data.length / itemsPerPage)

  function nextPage() {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }

  function previousPage() {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPageData = data.slice(startIndex, endIndex)

  function openDetails(listing) {
    setSelectedListing(listing)
  }

  function closeModal() {
    setSelectedListing(null)
  }

  function navigateToLink(link) {
    window.open(link, '_blank')
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
          {currentPageData.map((listing, index) => (
            <tr key={index}>
              <td>{listing.job_title}</td>
              <td>{listing.company}</td>
              <td>{listing.location}</td>
              <td>{listing.employment_type}</td>
              <td>{listing.salary}</td>
              <td className="table-actions">
                <IconButton
                  icon={ReceiptTextIcon}
                  onClick={() => openDetails(listing)}
                  type="table-download-button squared"
                />
                <IconButton
                  icon={LinkIcon}
                  onClick={() => navigateToLink(listing.url)}
                  type="table-download-button squared"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="history-table-footer">
        <IconButton
          className="squared"
          icon={CollapseIcon}
          onClick={previousPage}
          disabled={page === 1}
        />
        <div className="history-table-footer-page">
          {page} / {totalPages}
        </div>
        <IconButton
          className="squared history-table-footer-button-right"
          icon={CollapseIcon}
          onClick={nextPage}
          disabled={page === totalPages}
        />
      </div>

      {selectedListing && (
        <JobListingModal listing={selectedListing} onClose={closeModal} />
      )}
    </div>
  )
}

ListingsTable.propTypes = {
  data: PropTypes.array.isRequired,
}

export default ListingsTable
