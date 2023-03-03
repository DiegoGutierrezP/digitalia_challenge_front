import { useState } from 'react'
import { AppRouter } from './router/AppRouter'
import { AuthProvider } from './context/AuthContext'


function App() {

  return (
    <div className="min-vh-100" style={{background:"#F0F0F0"}}>
      <AuthProvider>
        <AppRouter/>
      </AuthProvider>
    </div>
  )
}

export default App
