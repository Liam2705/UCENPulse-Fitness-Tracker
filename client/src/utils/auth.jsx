import toast from 'react-hot-toast'

export const logout = (navigate) => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  toast.success('Logged out successfully')
  navigate('/login')
}

export const getUser = () => {
  return JSON.parse(localStorage.getItem('user'))
}

export const getToken = () => {
  return localStorage.getItem('token')
}