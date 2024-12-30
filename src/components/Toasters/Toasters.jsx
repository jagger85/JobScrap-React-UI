import { useState, useEffect, useCallback, useRef } from 'react'
import { DeleteIcon } from '../Icons'
import './Toaster.css'

/** @type {Object} Styles configuration for notification components */
const notificationStyles = {
  container: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000,
  },
  notification: {
    padding: '10px 20px',
    marginBottom: '10px',
    borderRadius: 'var(--m-radius)',
    color: 'var(--font)',
    boxShadow: 'var(--shadow)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    animation: 'slideIn 0.5s ease-out',
    width: '300px',
    backgroundColor: 'var(--grey4)',
  },
  success: { borderLeft: '5px solid var(--success)' },
  error: { borderLeft: '5px solid var(--error)' },
  info: { borderLeft: '5px solid var(--primary)' },
  warning: { borderLeft: '5px solid var(--warning)' },
}

/**
 * Generates unique IDs for toast notifications
 * Uses IIFE pattern to maintain counter closure
 * @returns {string} A unique identifier for a toast notification
 */
const generateUniqueId = (() => {
  let counter = 0
  return () => `toast_${Date.now()}_${counter++}`
})()

/**
 * Static manager class for handling toast notifications
 * Prevents duplicate toasts and manages toast instance
 * @class
 */
export class ToasterManager {
  /** @type {{message: string, timestamp: number}} Tracks the last shown toast */
  static lastToast = { message: '', timestamp: 0 }

  /**
   * Shows a toast notification if it's not a duplicate
   * @param {('success'|'error'|'info'|'warning')} type - The type of toast notification
   * @param {string} message - The message to display
   */
  static showToast(type, message) {
    const now = Date.now()
    if (
      this.lastToast.message === message &&
      now - this.lastToast.timestamp < 100
    ) {
      return
    }

    this.lastToast = { message, timestamp: now }
    if (ToasterManager.instance) {
      ToasterManager.instance(type, message)
    }
  }
}

/**
 * Component that manages and displays toast notifications
 * Handles addition, removal, and automatic cleanup of notifications
 * @component
 * @returns {JSX.Element} Container with active toast notifications
 */
const Toasters = () => {
  /** @type {[Array<{id: string, type: string, message: string}>, Function]} State for active notifications */
  const [notifications, setNotifications] = useState([])

  /** @type {React.MutableRefObject<Object>} Ref to store timeout IDs */
  const notificationTimeouts = useRef({})

  /**
   * Adds a new notification if it's not a duplicate
   * @param {string} type - The type of notification
   * @param {string} message - The notification message
   */
  const addNotification = useCallback((type, message) => {
    const id = generateUniqueId()
    setNotifications((prev) => {
      const isDuplicate = prev.some(
        (notif) => notif.message === message && notif.type === type
      )
      if (isDuplicate) return prev
      return [...prev, { id, type, message }]
    })
  }, [])

  /**
   * Removes a notification and cleans up its timeout
   * @param {string} id - The ID of the notification to remove
   */
  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
    delete notificationTimeouts.current[id]
  }, [])

  /**
   * Sets up and cleans up the ToasterManager instance
   * @effect
   */
  useEffect(() => {
    ToasterManager.instance = addNotification
    return () => {
      ToasterManager.instance = null
    }
  }, [addNotification])

  return (
    <div style={notificationStyles.container}>
      {notifications.map(({ id, type, message }) => (
        <div
          key={id}
          style={{
            ...notificationStyles.notification,
            ...notificationStyles[type],
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>{message}</span>
          </div>
            <DeleteIcon className='deleteIcon' onClick={() => removeNotification(id)} size={20} />
        </div>
      ))}
    </div>
  )
}

export default Toasters
