import { Navigate, useLocation } from 'react-router-dom'

/**
 * PrivateRoute — guards routes requiring authentication.
 * Redirects to /login if no user session is found in localStorage.
 */
const PrivateRoute = ({ children }) => {
  const location = useLocation()
  const user = localStorage.getItem('user')

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default PrivateRoute
