import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoute from './Components/PrivateRoute'
import PublicRoute from './Components/PublicRoute'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import HomePage from './Pages/HomePage'
import CartPage from './Pages/CartPage'
import OrdersPage from './Pages/OrdersPage'
import PersonalInfoPage from './Pages/PersonalInfoPage'
import AddressesPage from './Pages/AddressesPage'
import PaymentMethodsPage from './Pages/PaymentMethodsPage'
import NotificationsPage from './Pages/NotificationsPage'
import VerifyEmailPage from './Pages/VerifyEmailPage'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public-only routes: redirect to home if already logged in */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <PublicRoute>
              <VerifyEmailPage />
            </PublicRoute>
          }
        />

        {/* Protected routes: redirect to /login if not authenticated */}
        <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/carrito" element={<PrivateRoute><CartPage /></PrivateRoute>} />
        <Route path="/pedidos" element={<PrivateRoute><OrdersPage /></PrivateRoute>} />
        <Route path="/perfil" element={<PrivateRoute><PersonalInfoPage /></PrivateRoute>} />
        <Route path="/perfil/direcciones" element={<PrivateRoute><AddressesPage /></PrivateRoute>} />
        <Route path="/perfil/pagos" element={<PrivateRoute><PaymentMethodsPage /></PrivateRoute>} />
        <Route path="/perfil/notificaciones" element={<PrivateRoute><NotificationsPage /></PrivateRoute>} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App