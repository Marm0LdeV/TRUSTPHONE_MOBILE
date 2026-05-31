import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import CartPage from './Pages/CartPage'
import OrdersPage from './Pages/OrdersPage'
import PersonalInfoPage from './Pages/PersonalInfoPage'
import AddressesPage from './Pages/AddressesPage'
import PaymentMethodsPage from './Pages/PaymentMethodsPage'
import NotificationsPage from './Pages/NotificationsPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/pedidos" element={<OrdersPage />} />
        <Route path="/perfil" element={<PersonalInfoPage />} />
        <Route path="/perfil/direcciones" element={<AddressesPage />} />
        <Route path="/perfil/pagos" element={<PaymentMethodsPage />} />
        <Route path="/perfil/notificaciones" element={<NotificationsPage />} />
      </Routes>
    </Router>
  )
}

export default App