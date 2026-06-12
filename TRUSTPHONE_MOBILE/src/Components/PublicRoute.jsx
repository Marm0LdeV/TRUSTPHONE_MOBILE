import { Navigate, useLocation } from 'react-router-dom'

/**
 * PublicRoute — wraps routes only accessible when NOT logged in (login, register).
 * If the user already has a session, redirects to home so they can't go back to login.
 */
const PublicRoute = ({ children }) => {
  const location = useLocation()
  const user = localStorage.getItem('user')

  if (user) {
    const destination = location.state?.from?.pathname || '/'
    return <Navigate to={destination} replace />
  }

  return children
}

export default PublicRoute
