import { useState, useEffect } from 'react'
import { getToken, logout } from '../utils/auth'
import { useNavigate } from 'react-router-dom'

export default function useUser() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      const token = getToken()
      if (!token) return navigate('/login')

      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (!res.ok) return logout(navigate) // token expired or invalid

      const data = await res.json()
      setUser(data)
    }

    fetchUser()
  }, [navigate])

  return user
}