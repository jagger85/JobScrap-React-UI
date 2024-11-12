export const initialAuthState = {
  isAuthenticated: false
}

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_AUTH':
      return {
        ...state,
        isAuthenticated: action.payload
      }
    default:
      return state
  }
}
