export const customSelectStyle = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isDisabled ? 'var(--grey1)' : 'var(--grey3)',
    color: 'var(--font)',
    borderRadius: 'var(--s-radius)',
    borderColor: state.isFocused ? 'var(--primary)' : '#404040',
    boxShadow:
      'inset 0 2px 4px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.2)',
    '&:hover': {
      borderColor: state.isFocused ? 'var(--primary)' : '#404040',
      boxShadow:
        'inset 0 2px 4px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.2)',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'var(--font)',
  }),
  input: (provided) => ({
    ...provided,
    color: 'var(--font)',
    '&:focus': {},
  }),

  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: 'var(--font)',
  }),

  dropdownIndicator: (provided) => ({
    ...provided,
    color: 'var(--font)',
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
    color: 'var(--font)',
    '&:active': {
      backgroundColor: 'var(--primary)',
    },
  }),
  selectContainer: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? 'var(--primary)' : '#404040',
    boxShadow:
      'inset 0 2px 4px rgba(0, 0, 0, 0.5),0 1px 3px rgba(0, 0, 0, 0.2)',
  }),
}
