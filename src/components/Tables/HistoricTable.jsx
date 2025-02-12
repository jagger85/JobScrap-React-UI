import './tables.css'
import PropTypes from 'prop-types'
import IconButton from '../Buttons/IconButton'
import {
  DownloadIcon,
  TrashIcon,
  CollapseIcon,
  FileTextIcon,
  SortAscIcon,
  SortDescIcon,
} from '../Icons'
import { useNavigate } from 'react-router-dom'
import Badge from '@badges/Badge'
const HistoricTable = (props) => {
  const navigate = useNavigate()
  const {
    operations,
    handleDownload,
    handleDelete,
    pagination,
  } = props

  function openDetails(listings) {
    if (!listings || !Array.isArray(listings)) return
    navigate('/listings', { state: { listings } })
  }

  if (!operations || !Array.isArray(operations)) {
    return <div>No data available</div>
  }

  return (
    <div className="elevated table-container">
      <div className="table-container-header">
        <div className="table-title">Scraping History</div>
        <div className="table-buttons">
          <IconButton
            type="squared"
            icon={SortAscIcon}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-xs)',
              padding: '0,0,0,0',
            }}
          />

          <div
            style={{
              borderRight: '1px solid var(--font-secondary)',
              marginRight: 'var(--spacing-xs)',
            }}
          >
            {' '}
            &nbsp;{' '}
          </div>
          <IconButton
            className="squared"
            icon={CollapseIcon}
            onClick={pagination.previousPage}
            disabled={!pagination.hasPreviousPage}
          />
          <IconButton
            className="squared history-table-footer-button-right"
            icon={CollapseIcon}
            onClick={pagination.nextPage}
            disabled={!pagination.hasNextPage}
          />
        </div>
      </div>
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
          {operations.map((operation, index) => {
            if (!operation) return null

            const date = new Date(operation.created_at)
            const formattedDate = `${
              date.getMonth() + 1
            }/${date.getDate()}/${date.getFullYear().toString().slice(-2)}`

            return (
              <tr key={operation._id || index}>
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
                  {operation.listings?.length || 0}
                </td>
                <td className="table-date-cell">{formattedDate}</td>
                <td className="table-actions">
                  <IconButton
                    icon={FileTextIcon}
                    type="table-download-button squared"
                    onClick={() => openDetails(operation.listings)}
                    disabled={!operation.listings?.length}
                  />
                  <IconButton
                    icon={DownloadIcon}
                    onClick={() => handleDownload(operation.listings)}
                    type="table-download-button squared"
                    disabled={!operation.listings?.length}
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
    </div>
  )
}

HistoricTable.propTypes = {
  operations: PropTypes.array.isRequired,
  handleDownload: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,

}

export default HistoricTable
