import PropTypes from 'prop-types'
import { SearchIcon } from '@icons'

const inputStyle = {
    paddingLeft: '40px',
}
const iconContainerStyle = {
    position: 'relative',
}
const iconStyle = {
    position: 'absolute',
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
}


function SearchInput({ placeholder, onChange, value }) {
    return (
        <div style={iconContainerStyle}>
            <input style={inputStyle} type="text" placeholder={placeholder} onChange={onChange} value={value} />
            <SearchIcon style={iconStyle} />
        </div>
    )
}

SearchInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
}

export default SearchInput
