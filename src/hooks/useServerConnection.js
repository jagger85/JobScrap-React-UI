import { SOCKET_URL } from './useApi'
import { useState, useCallback, useContext } from 'react'
import { ConnectionContext } from '../contexts/ConnectionContext'
import { STORAGE_KEYS } from '../constants'
import { StorageRepository } from '../utils/storageRepository'

const useServerConnection = () => {
  const [socket, setSocket] = useState(null)
  const { setConnectionStatus } = useContext(ConnectionContext)
  const token = StorageRepository.getItem(STORAGE_KEYS.BEARER_TOKEN_KEY)

  const connect = useCallback(() => {
    // Create WebSocket connection
    const ws = new WebSocket(SOCKET_URL)

    ws.addEventListener('open', () => {
      setConnectionStatus(true)
      console.log('Connected to server')

      // Send the token after the connection is established
      ws.send(JSON.stringify({ "type": "login", "message": `Bearer ${token}`}))

    })

    ws.addEventListener('message', (event) => {
      const message = JSON.parse(event.data)
      console.log('Message from server:', message);
      
      switch (message.type){
        case 'login':
          console.log("login message received: ", message)
          break
        
        case 'echo':
          console.log("echo message received: ", message)
          break
        
        default:
          console.warn('Unknown message type: ', message.type)
      }
    });

    ws.addEventListener('close', () => {
      setConnectionStatus(false)
      console.log('Disconnected from server')
    })

    ws.addEventListener('error', (error) => {
      console.error('WebSocket error:', error)
      setConnectionStatus(false)
    })

    setSocket(ws)
    return ws
  }, [setConnectionStatus, token])

  const disconnect = useCallback(() => {
    if (socket) {
      socket.close()
      setSocket(null)
    }
  }, [socket])

  return { connect, disconnect, socket }
}

export default useServerConnection
