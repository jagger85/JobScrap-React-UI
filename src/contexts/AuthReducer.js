export const initialAuthState = {
  isAuthenticated: false, 
  username: null,
  role: null
}

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_AUTH':
      return {
        ...state,
        isAuthenticated: action.payload
      }
    case 'SET_USER':
        return {
          ...state,
          username: action.payload
        }
    case 'SET_ROLE':
        return {
          ...state,
          role: action.payload
        }
    default:
      return state
  }
}
