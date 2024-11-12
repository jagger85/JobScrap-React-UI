import useMessageStore from '../utils/messageStore.js'

/**
 * Console component that displays the most recent system message
 * Acts as a status display for various operations
 * @component
 * @returns {JSX.Element} A console display showing the latest message
 */
export default function Console() {
  /**
   * Subscribes to the message store and retrieves the last message
   * Updates automatically when new messages are added
   * @type {string|null}
   */
  const lastMessage = useMessageStore((state) => 
    state.messages[state.messages.length - 1]
  );
  
  return (
    <div className="console-container">
      <div className="console-display-container"
      style={{ fontSize: 'var(--xs)', marginTop: 'var(--spacing-l)' }}>
        {lastMessage && <p style={{letterSpacing:'0.10rem'}}>{lastMessage}</p>}
      </div>
    </div>
  )
}
