/* eslint-disable no-unused-vars */
import React, { useEffect, useContext, useRef } from 'react'
import Sweeper from './components/Sweeper'
import Login from './components/Login/Login'
import Settings from './components/Settings/Settings'
import Toasters from './components/Toasters'
import { AuthContext } from './contexts/AuthContext'
import { ConnectionContext } from './contexts/ConnectionContext'
import { useServerConnection } from './hooks/useServerConnection'
import './jobsweep.css'

export default function App() {
  const { isAuthenticated } = useContext(AuthContext)
  const { connect, disconnect } = useServerConnection()
  const { connection } = useContext(ConnectionContext)
  const hasConnectedRef = useRef(false);
  useEffect(() => {
    if (isAuthenticated && !hasConnectedRef.current && !connection.isConnected) {
      connect()
      hasConnectedRef.current = true
    }
  }, [connect, isAuthenticated, connection.isConnected])

  return (
    <div className="App">
      <div className="main">
        <div className="page-container">
          <div className="page-title">
            <h2
               style={{ fontSize: 'var(--xl)', cursor: 'pointer' }}
              // onClick={() => setShowSettings(!showSettings)}
            >
              Job Sweeper
            </h2>
            <div className="separator" />
            <div className="transition-container">
              {!isAuthenticated ? <Login /> : <Sweeper />}
            </div>
          </div>
        </div>
      </div>
      <Toasters />
        {/* 
      {showSettings && (
        <Settings
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
        />
      )} */}
    </div>
  )
}


