import { SOCKET_URL } from './useApi'
import { useState, useCallback, useContext } from 'react'
import { ConnectionContext } from '../contexts/ConnectionContext'
import useStorage from './useStorage'
import  OperationContext  from '../contexts/OperationContext'
const useServerConnection = () => {
  const { updateOperation , updateOperationListingsCount, updateOperationMessage } = useContext(OperationContext)
  const [socket, setSocket] = useState(null)
  const { setConnectionStatus } = useContext(ConnectionContext)
  const { getToken } = useStorage()

  const connect = useCallback(() => {
    if (!socket) {
      const ws = new WebSocket(SOCKET_URL)

      ws.addEventListener('open', () => {
        setConnectionStatus(true)
        console.log('Connected to server')

        // Send the token after the connection is established
        ws.send(
          JSON.stringify({ type: 'login', message: `Bearer ${getToken()}` })
        )
      })

      ws.addEventListener('message', (event) => {
        const message = JSON.parse(event.data)
        console.log('Message from server:', message)

        switch (message.type) {
          case 'login':
            console.log('login message received: ', message)
            break
          
          case 'operation_status_update':
            console.log('operation update message received: ', message)
            updateOperation(message.task_id, message.status)
            break

          case 'operation_listings_count_update':
            console.log('operation listings update message received: ', message)
            updateOperationListingsCount(message.task_id, message.listings_count)
            break

          case 'operation_info_message':
            console.log('operation message update message received: ', message)
            updateOperationMessage(message.task_id, message.message)
            break

          case 'echo':
            console.log('echo message received: ', message)
            break

          default:
            console.warn('Unknown message type: ', message.type)
        }
      })

      ws.addEventListener('close', () => {
        setConnectionStatus(false)
        console.log('Disconnected from server')
      })

      ws.addEventListener('error', (error) => {
        console.error('WebSocket error:', error)
        setConnectionStatus(false)
      })

      setSocket(ws)
    }
  }, [socket, setConnectionStatus, getToken])

  const disconnect = useCallback(() => {
    if (socket) {
      socket.close()
      setSocket(null)
    }
  }, [socket])

  return { connect, disconnect, socket }
}

export default useServerConnection
