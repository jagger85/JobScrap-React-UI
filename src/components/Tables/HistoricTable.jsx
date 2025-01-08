import './tables.css'
import PropTypes from 'prop-types'
import IconButton from '../Buttons/IconButton'
import { DownloadIcon, TrashIcon, CollapseIcon, FileTextIcon, SortAscIcon, SortDescIcon } from '../Icons'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import {customSelectStyle} from '@utils/reactCustomStyle'
import SearchInput from '../SearchInput'

import Badge from '@badges/Badge'
const HistoricTable = (props) => {
  const navigate = useNavigate()
  const {
    data,
    handleDownload,
    handleDelete,
    onNextPage,
    onPreviousPage,
    hasNextPage,
    hasPreviousPage
  } = props

  function openDetails(listings) {
    if (!listings || !Array.isArray(listings)) return;
    navigate('/listings', { state: { listings } })
  }

  if (!data || !Array.isArray(data)) {
    return <div>No data available</div>
  }

  return (
    <div className="historic-table-container">
      <div className="table-filter-container elevated">
        <SearchInput placeholder="Search" />
        <div style={{display: 'flex', gap: 'var(--spacing-xs)'}}>
        <Select
          placeholder="Source"
          styles={customSelectStyle}
          isSearchable={false}
        />       
         <Select
          placeholder="Select User"
          styles={customSelectStyle}
          isSearchable={false}
        />
        </div>
      </div>
      <div className="elevated table-container">
        <div className="table-container-header">
        <div className="table-title">Scraping History</div>
        <div className="table-buttons">
        <IconButton type="squared" icon={SortAscIcon} style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)',padding: '0,0,0,0'}}/>

        <div style={{borderRight: '1px solid var(--font-secondary)', marginRight: 'var(--spacing-xs)'}}>  &nbsp; </div>
          <IconButton
            className="squared"
            icon={CollapseIcon}
            onClick={onPreviousPage}
            disabled={!hasPreviousPage}
          />
          <IconButton
            className="squared history-table-footer-button-right"
            icon={CollapseIcon}
            onClick={onNextPage}
            disabled={!hasNextPage}
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
          {data.map((operation, index) => {
            if (!operation) return null;

            const date = new Date(operation.created_at)
            const formattedDate = `${date.getMonth() + 1
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
    </div>
  )
}

HistoricTable.propTypes = {
  data: PropTypes.array.isRequired,
  handleDownload: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired,
  onPreviousPage: PropTypes.func.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  hasPreviousPage: PropTypes.bool.isRequired,
}

export default HistoricTable
