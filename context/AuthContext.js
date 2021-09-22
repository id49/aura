import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback
} from 'react'
import { useQuery } from '../lib/graphql'
import jwtDecode from 'jwt-decode'
import { useRouter } from 'next/router'

export const AuthContext = createContext()

const GET_ME_ADMIN = `
  query {
    panelGetMe {
      name
      email
      active
    }
  }
`
const GET_ME_PARENT = `
  query {
    parentGetMe {
      id
      name
      email
      active
    }
  }
`

export const AuthProvider = ({ children, role }) => {
  const [user, setData] = useState({})
  const router = useRouter()
  const { data } = useQuery(role === 'admin' ? GET_ME_ADMIN : GET_ME_PARENT)
  const [tokenData, setTokenData] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('refreshToken')
    if (!token) {
      window.location = '/'
    }
    const localTokenData = jwtDecode(token)
    setTokenData(localTokenData)
  }, [])

  useEffect(() => {
    if (data && Object.keys(user).length === 0) {
      if (role === 'admin') {
        setData(data.panelGetMe)
      } else {
        setData(data.parentGetMe)
      }
    }
  }, [data])

  useEffect(() => {
    // check if admin is trying to access as parent
    // or the other way around
    if (tokenData && tokenData.scope && tokenData.scope.indexOf(role) < 0) {
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('accessToken')
      router.push('/')
    }
  }, [tokenData])

  const signOut = useCallback(async () => {
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('accessToken')
  }, [])

  return (
    <AuthContext.Provider value={{ user, signOut, tokenData }}>
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
export const useAuthScope = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  const scope = context?.tokenData?.scope
  const isScope = (role) => scope && scope.indexOf(role) >= 0

  return {
    scope,
    isScope
  }
}
