//-----Borders
const doubleBorder = (color) => `0 0 0 2px #202020d9, 0 0 0 3px ${color}`;
const doubleBorderClicked = (color) => `0 0 0 2px #202020d9, 0 0 0 3px ${color}`;
const doubleBorderHover = (color) => `0 0 0 2px #202020d9, 0 0 0 3px ${color}`;

//----Colors
const redIcon = () => '#FF0000'; // Replace with actual color code
const redIconClicked = () => '#DD0000'; // Replace with actual color code
const orangeIcon = () => '#FFA500'; // Replace with actual color code
const orangeIconClicked = () => '#FF8C00'; // Replace with actual color code


const customSelectStyle = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isDisabled ? 'var(--grey1)' : 'var(--grey3)',
    color: 'var(--font)',
    borderRadius: 'var(--s-radius)',
    minWidth: '45ch',
    borderColor: state.isFocused ? 'var(--primary)' : '#404040',       
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.2)',
    '&:hover': {
      borderColor: state.isFocused ? 'var(--primary)' : '#404040',
      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.2)',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'var(--font)',
  }),
  input: (provided) => ({
    ...provided,
    color: 'var(--grey-icons)',
    '&:focus': {
      
    },
  }),
  
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: 'var(--grey-icons)',
  }),
  
  dropdownIndicator: (provided) => ({
    ...provided,
    color: 'var(--grey-icons)',
    '&:hover': {
      color: 'var(--primary)', 
    },
  }),
  
  // Menu and options 
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'var(--grey3)',
  }),
  
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? 'var(--grey2)' : 'var(--grey3)',
    color: state.isSelected ? 'var(--primary)' : 'var(--font)',
    '&:active': {
      backgroundColor: 'var(--primary)',
    },
  }),
  selectContainer: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? 'var(--primary)' : '#404040',       
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.5),0 1px 3px rgba(0, 0, 0, 0.2)',
    
  }),
  placeholder: (provided) => ({
    ...provided,
    textAlign: 'center',
    marginRight: '-15px',
    color: 'var(--grey-icons)',
  }),
}

export {    
  doubleBorder,
  doubleBorderClicked,
    doubleBorderHover,
    redIcon,
    redIconClicked,
    orangeIcon,
    orangeIconClicked,
    customSelectStyle
}

