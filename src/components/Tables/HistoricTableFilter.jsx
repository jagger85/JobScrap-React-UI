import './tables.css'
import Select from 'react-select'
import SearchInput from '../SearchInput'
import { customSelectStyle } from '@utils/reactCustomStyle'
import PropTypes from 'prop-types'

const HistoricTableFilter = ({
  handlePlatformChange,
  handleUserChange,
  selectedPlatform,
  selectedUser,
  platformOptions,
  userOptions,
  handleSearch,
}) => {
  return (
    <div className="table-filter-container elevated">
      <SearchInput placeholder="Search by keyword" onChange={handleSearch} />
      <div style={{ display: 'flex', gap: 'var(--spacing-xs)' }}>
        <div style={{ minWidth: '20ch' }}>
          <Select
            placeholder="Source"
            styles={customSelectStyle}
            isSearchable={false}
            value={selectedPlatform}
            options={platformOptions}
            onChange={handlePlatformChange}
          />
        </div>
        <div style={{ minWidth: '20ch' }}>
          <Select
            value={selectedUser}
            placeholder="Select User"
            styles={customSelectStyle}
            isSearchable={false}
            onChange={handleUserChange}
            options={userOptions}
          />
        </div>
      </div>
    </div>
  )
}

HistoricTableFilter.propTypes = {
  handlePlatformChange: PropTypes.func.isRequired,
  handleUserChange: PropTypes.func.isRequired,
  selectedPlatform: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  selectedUser: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  platformOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  userOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleSearch: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
}

export default HistoricTableFilter
