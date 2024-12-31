import './tables.css'
import PropTypes from 'prop-types'
import IconButton from '../Buttons/IconButton'
import { DownloadIcon, TrashIcon } from '../Icons'

const HistoricTable = (props) => {
  
    const { data, handleDownload, handleDelete } = props
  
    return (
    <div className="elevated">
      <div className="table-title">Historical operations</div>
      <table className="history-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Platform</th>
            <th>Keywords</th>
            <th>Listings</th>
            <th>Date</th>
            <th>Actions</th>
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
                <td>{operation.user}</td>
                <td>{operation.platform}</td>
                <td>{operation.keywords}</td>
                <td>{operation.listings.length}</td>
                <td>{formattedDate}</td>
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
