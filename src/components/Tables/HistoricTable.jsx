import './tables.css'
import PropTypes from 'prop-types'
import IconButton from '../Buttons/IconButton'
import { DownloadIcon, TrashIcon } from '../Icons'
import Badge from '@badges/Badge'
const HistoricTable = (props) => {
  const { data, handleDownload, handleDelete } = props
  return (
    <div className="elevated">
      <div className="table-title">Historical operations</div>
      <table className="history-table">
        <thead>
          <tr className="table-header">
            <th>User</th>
            <th>Platform</th>
            <th>Keywords</th>
            <th className="table-listings-cell">Listings</th>
            <th className="table-date-cell">Date</th>
            <th className="table-actions-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((operation, index) => {
            const date = new Date(operation.created_at)
            const formattedDate = `${
              date.getMonth() + 1
            }/${date.getDate()}/${date.getFullYear().toString().slice(-2)}`
            return (
              <tr key={index}>
                <td className="table-user-cell">{operation.user}</td>
                <td><Badge text={operation.platform} className="background-badge" /></td>
                <td><Badge text={operation.keywords} className="primary-badge" /></td>
                <td className="table-listings-cell">{operation.listings.length}</td>
                <td className="table-date-cell">{formattedDate}</td>
                <td className="table-actions">
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
    </div>
  )
}

HistoricTable.propTypes = {
  data: PropTypes.array.isRequired,
  handleDownload: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default HistoricTable
