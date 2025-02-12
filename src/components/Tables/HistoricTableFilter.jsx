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
}) => {
  return (
    <div className="table-filter-container elevated">
      <SearchInput placeholder="Search" />
      <div style={{ display: 'flex', gap: 'var(--spacing-xs)' }}>
        <Select
          placeholder="Source"
          styles={customSelectStyle}
          isSearchable={false}
          value={selectedPlatform}
          options={platformOptions}
          onChange={handlePlatformChange}
        />
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
}

export default HistoricTableFilter
