import './tables.css'
import PropTypes from 'prop-types'
import IconButton from '../Buttons/IconButton'
import { DownloadIcon, TrashIcon, CollapseIcon, FileTextIcon } from '../Icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Badge from '@badges/Badge'
const HistoricTable = (props) => {
  const navigate = useNavigate()
  const { data, handleDownload, handleDelete } = props
  const [page, setPage] = useState(1)
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

  function openDetails(listings) {
    navigate('/listings', { state: { listings } })
  }

  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPageData = data.slice(startIndex, endIndex)

  return (
    <div className="elevated table-container">
      <div className="table-title">Scraping History</div>
      <table className="history-table">
        <thead>
          <tr className="table-header">
            <th>User</th>
            <th>Source</th>
            <th>Keywords</th>
            <th className="table-listings-cell">Results</th>
            <th className="table-date-cell">Date</th>
            <th className="table-actions-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((operation, index) => {
            const date = new Date(operation.created_at)
            const formattedDate = `${
              date.getMonth() + 1
            }/${date.getDate()}/${date.getFullYear().toString().slice(-2)}`
            return (
              <tr key={index}>
                <td className="table-user-cell">{operation.user}</td>
                <td>
                  <Badge
                    text={operation.platform}
                    className="background-badge"
                  />
                </td>
                <td>
                  <Badge text={operation.keywords} className="primary-badge" />
                </td>
                <td className="table-listings-cell">
                  {operation.listings.length}
                </td>
                <td className="table-date-cell">{formattedDate}</td>
                <td className="table-actions">
                  <IconButton
                    icon={FileTextIcon}
                    type="table-download-button squared"
                    onClick={() => openDetails(operation.listings)}
                  />
                  <IconButton
                    icon={DownloadIcon}
                    onClick={() => handleDownload(operation.listings)}
                    type="table-download-button squared"
                  />
                  <IconButton
                    icon={TrashIcon}
                    onClick={() => handleDelete(operation._id)}
                    type="table-delete-button squared"
                  />
                </td>
              </tr>
            )
          })}
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
    </div>
  )
}

HistoricTable.propTypes = {
  data: PropTypes.array.isRequired,
  handleDownload: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default HistoricTable
