/* eslint-disable no-unused-vars */
import React, { useEffect, useContext, useRef } from 'react'
import Login from './components/Login/Login'
import MainLayout from './Layout/MainLayout'
import Toasters from './components/Toasters'
import { AuthContext } from './contexts/AuthContext'
import { ConnectionContext } from './contexts/ConnectionContext'
import useServerConnection from './hooks/useServerConnection'
import './jobsweep.css'

export default function App() {
  const { isAuthenticated } = useContext(AuthContext)
  const { connect, disconnect } = useServerConnection()
  const { connection } = useContext(ConnectionContext)
  const hasConnectedRef = useRef(false)
  useEffect(() => {
    if (
      isAuthenticated &&
      !hasConnectedRef.current &&
      !connection.isConnected
    ) {
      connect()
      hasConnectedRef.current = true
    }
  }, [connect, isAuthenticated, connection.isConnected])

  return (
    <div className="App">
      {!isAuthenticated ? <Login /> : <MainLayout />}
      <Toasters />
    </div>
  )
}
