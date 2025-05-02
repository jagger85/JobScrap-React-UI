export const initialConnectionState = {
  enabled: false,
  isConnected: false,
  lastHeartbeat: null
}

export const connectionReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CONNECTION_STATUS':
      return {
        ...state,
        isConnected: action.payload.isConnected,
        lastHeartbeat: action.payload.isConnected ? Date.now() : null
      }
    case 'UPDATE_HEARTBEAT':
      return {
        ...state,
        lastHeartbeat: Date.now(),
        isConnected: true
      }
    default:
      return state
  }
}
