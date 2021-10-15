import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback
} from 'react'
import jwtDecode from 'jwt-decode'
import { useRouter } from 'next/router'

export const AuthContext = createContext()

export const AuthProvider = ({ children, role }) => {
  const [user, setData] = useState({})
  const { push } = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('learn49-token')
    const user = localStorage.getItem('learn49-user')
    if (!token) {
      window.location = '/'
    }
    const localTokenData = jwtDecode(token)
    if (localTokenData.role !== role) {
      signOut()
    }
    setData(JSON.parse(user))
  }, [])

  const signOut = useCallback(async () => {
    localStorage.removeItem('learn49-token')
    localStorage.removeItem('learn49-user')
    push('/')
  }, [])

  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
