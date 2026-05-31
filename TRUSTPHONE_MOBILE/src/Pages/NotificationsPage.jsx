import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  ArrowLeftIcon, 
  TruckIcon, 
  TagIcon, 
  ShieldCheckIcon, 
  BellAlertIcon, 
  ArchiveBoxIcon 
} from '@heroicons/react/24/outline'
import Footer from '../Components/Footer'

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    category: 'Pedidos',
    title: 'Pedido en camino',
    time: 'Ahora',
    description: 'Sigue el mapa en tiempo real.',
    message: 'Tu pedido #12345 está en ruta a tu domicilio.',
    icon: TruckIcon,
    isRead: false
  },
  {
    id: 2,
    category: 'Ofertas',
    title: 'Nueva oferta disponible',
    time: '2h',
    description: 'Válido solo por hoy.',
    message: '¡20% de descuento en accesorios TrustPhone!',
    icon: TagIcon,
    isRead: false
  },
  {
    id: 3,
    category: 'Pedidos',
    title: 'Pago verificado',
    time: 'Ayer',
    description: 'Compra exitosa.',
    message: 'Hemos recibido el pago de tu última orden #12344.',
    icon: ShieldCheckIcon,
    isRead: true
  },
  {
    id: 4,
    category: 'Cuenta',
    title: 'Actualización de seguridad',
    time: '2 oct',
    description: 'Protege tu cuenta.',
    message: 'Se ha detectado un nuevo inicio de sesión en TrustPhone.',
    icon: BellAlertIcon,
    isRead: true
  },
  {
    id: 5,
    category: 'Pedidos',
    title: 'Pedido entregado',
    time: '1 oct',
    description: '¡Disfruta tu producto!',
    message: 'Tu orden #12340 ha sido entregada con éxito.',
    icon: ArchiveBoxIcon,
    isRead: true
  }
]

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState('Todo')
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)

  // Filter based on active tab
  const filteredNotifications = notifications.filter(notif => {
    if (activeTab === 'Todo') return true
    return notif.category.toLowerCase() === activeTab.toLowerCase()
  })

  const handleMarkAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    )
  }

  const handleClearAll = () => {
    if (window.confirm('¿Deseas vaciar todas las notificaciones?')) {
      setNotifications([])
    }
  }

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen pb-24 shadow-xl flex flex-col justify-between relative overflow-hidden">
      <div>
        {/* Header */}
        <div className="bg-[#0b2240] px-4 py-4 flex items-center border-b border-[#0d284a] shadow-md">
          <Link to="/perfil" className="text-white hover:opacity-80 transition flex-shrink-0">
            <ArrowLeftIcon className="w-5 h-5 stroke-[2.5]" />
          </Link>
          <h1 className="text-white font-bold text-base flex-1 text-center pr-5">Notificaciones</h1>
          {notifications.length > 0 && (
            <button 
              onClick={handleClearAll}
              className="text-[10px] text-blue-200 hover:text-white font-bold transition flex-shrink-0"
            >
              Vaciar
            </button>
          )}
        </div>

        {/* Tab Filters */}
        <div className="bg-white px-4 py-3 flex space-x-2 border-b border-gray-100 overflow-x-auto scrollbar-none">
          {['Todo', 'Pedidos', 'Ofertas', 'Cuenta'].map(tab => {
            const isActive = activeTab === tab
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex-shrink-0 ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600 border border-blue-100 shadow-sm' 
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}
              >
                {tab}
              </button>
            )
          })}
        </div>

        {/* Notifications List */}
        <div className="p-4 space-y-3">
          {filteredNotifications.map(notif => {
            const IconComponent = notif.icon
            return (
              <div 
                key={notif.id}
                onClick={() => handleMarkAsRead(notif.id)}
                className={`p-4 border rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition flex space-x-4 cursor-pointer relative overflow-hidden ${
                  notif.isRead ? 'border-gray-100 opacity-75' : 'border-blue-100 bg-blue-50/5'
                }`}
              >
                {/* Red dot for unread */}
                {!notif.isRead && (
                  <span className="w-2 h-2 bg-red-500 rounded-full absolute top-4 right-4 animate-pulse"></span>
                )}

                {/* Left Icon Wrapper */}
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-extrabold text-xs text-gray-800 tracking-wide">{notif.title}</h4>
                    <span className="text-[9px] font-bold text-gray-400 ml-2 whitespace-nowrap">{notif.time}</span>
                  </div>
                  <p className="text-xs text-blue-600 font-bold mt-0.5 leading-tight">{notif.description}</p>
                  <p className="text-xs text-gray-400 mt-1 font-medium leading-snug">{notif.message}</p>
                </div>
              </div>
            )
          })}

          {filteredNotifications.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-150 p-8 shadow-sm">
              <span className="text-3xl">🔔</span>
              <p className="text-sm font-bold text-gray-400 mt-3">No tienes notificaciones en esta categoría</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default NotificationsPage
