import { useState, useCallback, useRef } from 'react'
import { ConnectionContext } from '../contexts/ConnectionContext'
import { PlatformsContext } from '../contexts/PlatformsContext'
import { useContext } from 'react'
import useMessageStore from '../utils/messageStore'
import { ToasterManager } from '../components/Toasters'
import { StorageRepository } from '../utils/storageRepository'
import { STORAGE_KEYS } from '../constants'
import { EventSourcePolyfill } from 'event-source-polyfill';

/**
 * Backend host configuration from environment
 * @type {string}
 */
const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST

/**
 * Backend port configuration from environment
 * @type {string}
 */
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT

/**
 * Maximum number of connection retry attempts
 * @type {number}
 */
const MAX_RETRIES = 3

/**
 * Custom hook for managing SSE server connections
 * Handles connection establishment, message processing, and error handling
 * @returns {{
 *   connect: Function,
 *   disconnect: Function
 * }} Connection management functions
 */
export function useServerConnection() {

  /**
   * Message store function for notifications
   * @type {Function}
   */
  const addMessage = useMessageStore((state) => state.addMessage);
  const [eventSource, setEventSource] = useState(null)
  const retryCount = useRef(0)
  const { setConnectionStatus } = useContext(ConnectionContext)
  const { updatePlatformStatus, setPlatformsError } = useContext(PlatformsContext)
  
  /**
   * Establishes SSE connection with the server
   * Handles message processing and reconnection logic
   * @function
   */
  const connect = useCallback(() => {
    if (eventSource) {
      console.log('Already connected, skipping new connection attempt.')
      return
    }

    if (retryCount.current >= MAX_RETRIES) {
       addMessage('Max connection attempts reached')
       setTimeout(()=> addMessage('Failed to connect after 3 attempts'),2000)
       setPlatformsError()
       
      return
    }

    const backendUrl = `http://${BACKEND_HOST}:${BACKEND_PORT}/api/jobsweep-sse`
    console.log(`Connection attempt ${retryCount.current + 1} to:`, backendUrl)

    try {
      const token = StorageRepository.getItem(STORAGE_KEYS.BEARER_TOKEN_KEY)
      const newEventSource = new EventSourcePolyfill(backendUrl, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      let reconnectTimeout = null

      newEventSource.onopen = () => {
       addMessage('Connected and ready to go!')
        if (reconnectTimeout) {
          clearTimeout(reconnectTimeout)
          reconnectTimeout = null
        }
        retryCount.current = 0
      }

      newEventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
         // let counter = 0
          switch (data.type) {
            case 'platform_states':
              console.log('%cReceived platform states:', 'color: blue; font-weight: bold;', data.platforms);
              if (data.platforms && typeof data.platforms === 'object') {
                Object.entries(data.platforms).forEach(([platform, status]) => {
                  updatePlatformStatus(platform, status)
                })
              } else {
                console.warn('Invalid platform_states data:', data)
              }
              break
            case 'info':
              addMessage(data.message)
              break
            case 'progress':
            case 'warning':
              if (data.message) {
               // counter += 1 
                ToasterManager.showToast('warning', data.message);
               // console.log('acabo de mandar un toast '+ counter)
              }
              break
            case 'error':
              if (data.message) {
             //   setMessage({ type: data.type, content: data.message })
              }
              break
            case 'debug':
              if (data.message) {
            //    setMessage({ type: data.type, content: data.message })
              }
              break
            case 'heartbeat':
              //TODO is neccesary the heartbeat?
              break
            default:
              console.warn('Unknown message type:', data.type)
          }
        } catch (error) {
          console.error('Error processing message:', error)
          setConnectionStatus(false)
        //  setMessage({ type: 'error', content: 'Error processing message' })
        }
      }

      newEventSource.onerror = (error) => {
        setConnectionStatus(false)
        addMessage('Connection interrupted')
        
        // Log the raw error details
        console.error('SSE Connection Error:', {
          error,
          readyState: newEventSource.readyState,
          responseText: error.target?.responseText
        });

        newEventSource.close()
        setEventSource(null)

        if (!reconnectTimeout && retryCount.current < MAX_RETRIES) {
          retryCount.current += 1
          console.log('conecting')
          reconnectTimeout = setTimeout(connect, 5000)
        }
      }

      setEventSource(newEventSource)
      setConnectionStatus(true)

      return () => {
        if (reconnectTimeout) {
          clearTimeout(reconnectTimeout)
        }
        newEventSource.close()
      }
    } catch {
      setConnectionStatus(false)
      addMessage( 'Failed to connect to server')
      retryCount.current += 1
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventSource, setConnectionStatus, updatePlatformStatus])

  /**
   * Closes the SSE connection and resets retry counter
   * @function
   */
  const disconnect = useCallback(() => {
    if (eventSource) {
      eventSource.close()
      setEventSource(null)
   //   setMessage({ type: 'info', content: 'Disconnected from server' })
    }
    retryCount.current = 0
  }, [eventSource])

  return { connect, disconnect }
}
