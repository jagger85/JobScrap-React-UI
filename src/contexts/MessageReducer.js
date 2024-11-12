export const initialState = {
  messages: []
}

export const messageReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload]
      }

    case 'CLEAR_MESSAGES':
      return {
        ...state,
        messages: []
      }

    default:
      return state
  }
}
