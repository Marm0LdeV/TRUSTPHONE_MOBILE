import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon, MagnifyingGlassIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Footer from '../Components/Footer'

const MOCK_ORDERS = [
  {
    id: 1,
    status: 'EN CAMINO',
    productName: 'iPhone 15 Pro Max',
    orderId: '#TP-98234 - 12 Oct 2023',
    price: 1199.00,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=256&fit=crop',
    progress: 60,
    statusText: 'Llegará el 15 de Octubre'
  },
  {
    id: 2,
    status: 'ENTREGADO',
    productName: 'iPhone 15 Pro Max',
    orderId: '#TP-98230 - 05 Oct 2023',
    price: 1199.00,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=256&fit=crop',
    statusText: 'Entregado el 05 de Octubre en recepción'
  },
  {
    id: 3,
    status: 'PROCESANDO',
    productName: 'Apple Watch Ultra 2',
    orderId: '#TP-98245 - Hace 2 horas',
    price: 799.00,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=256&fit=crop',
    statusText: 'Estamos preparando tu pedido'
  }
]

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState('Todos')
  const [orders, setOrders] = useState(MOCK_ORDERS)
  const [searchQuery, setSearchQuery] = useState('')

  // Filter based on active tab & search query
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.orderId.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === 'Todos') return matchesSearch
    if (activeTab === 'En camino') return order.status === 'EN CAMINO' && matchesSearch
    if (activeTab === 'Procesando') return order.status === 'PROCESANDO' && matchesSearch
    if (activeTab === 'Entregado') return order.status === 'ENTREGADO' && matchesSearch
    return matchesSearch
  })

  const handleCancelOrder = (id, orderId) => {
    const confirmCancel = window.confirm(`¿Estás seguro de que deseas cancelar el pedido ${orderId}?`)
    if (confirmCancel) {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'CANCELADO', statusText: 'Pedido cancelado por el usuario' } : o))
      alert('Pedido cancelado correctamente.')
    }
  }

  const handleComprarDeNuevo = (productName) => {
    alert(`¡${productName} añadido al carrito! Redirigiendo...`)
  }

  const handleVerFactura = (orderId) => {
    alert(`Descargando factura electrónica para la orden ${orderId}...`)
  }

  const handleRastrear = (orderId) => {
    alert(`Rastreando envío para la orden ${orderId}. Tu paquete está en tránsito cerca de tu zona.`)
  }

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen pb-24 shadow-xl flex flex-col justify-between relative overflow-hidden">
      <div>
        {/* Header */}
        <div className="bg-[#0b2240] px-4 py-4 flex items-center border-b border-[#0d284a] shadow-md">
          <Link to="/" className="text-white hover:opacity-80 transition flex-shrink-0">
            <ArrowLeftIcon className="w-5 h-5 stroke-[2.5]" />
          </Link>
          <h1 className="text-white font-bold text-base flex-1 text-center pr-5">Mis Pedidos</h1>
          <button 
            onClick={() => {
              const q = prompt('Buscar pedido por nombre de producto o ID:')
              if (q !== null) setSearchQuery(q)
            }}
            className="text-white hover:opacity-80 transition flex-shrink-0"
          >
            <MagnifyingGlassIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Filters */}
        <div className="bg-white px-4 py-3 flex space-x-2 border-b border-gray-100 overflow-x-auto scrollbar-none">
          {['Todos', 'En camino', 'Procesando', 'Entregado'].map(tab => {
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

        {/* Search clearing indicator */}
        {searchQuery && (
          <div className="px-4 pt-3 flex justify-between items-center text-xs">
            <span className="text-gray-500 font-semibold">Buscando: "{searchQuery}"</span>
            <button 
              onClick={() => setSearchQuery('')}
              className="text-blue-600 font-bold hover:underline"
            >
              Limpiar
            </button>
          </div>
        )}

        {/* Orders list */}
        <div className="p-4 space-y-4">
          {filteredOrders.map(order => {
            // Status colors
            const statusStyles = {
              'EN CAMINO': { text: 'text-blue-600', bg: 'bg-blue-50' },
              'ENTREGADO': { text: 'text-green-600', bg: 'bg-green-50' },
              'PROCESANDO': { text: 'text-yellow-600', bg: 'bg-yellow-50' },
              'CANCELADO': { text: 'text-red-600', bg: 'bg-red-50' }
            }
            const sStyle = statusStyles[order.status] || { text: 'text-gray-600', bg: 'bg-gray-50' }

            return (
              <div 
                key={order.id} 
                className="bg-white rounded-2xl border border-gray-100 p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4"
              >
                {/* Status + Price Row */}
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded-full uppercase ${sStyle.bg} ${sStyle.text}`}>
                    {order.status}
                  </span>
                  <span className="font-extrabold text-base text-gray-900">${order.price.toFixed(2)}</span>
                </div>

                {/* Product details */}
                <div className="flex space-x-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center p-1.5 border border-gray-50 flex-shrink-0">
                    <img src={order.image} alt={order.productName} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-gray-800 truncate">{order.productName}</h3>
                    <p className="text-[10px] text-gray-400 mt-0.5">{order.orderId}</p>
                  </div>
                </div>

                {/* Progress bar for EN CAMINO */}
                {order.status === 'EN CAMINO' && (
                  <div className="space-y-1.5">
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-blue-500 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${order.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Subtext info */}
                <p className="text-xs text-gray-500 font-medium leading-tight">
                  {order.statusText}
                </p>

                {/* Dynamic Actions */}
                <div className="pt-2 border-t border-gray-50 flex justify-end">
                  {order.status === 'EN CAMINO' && (
                    <button 
                      onClick={() => handleRastrear(order.orderId)}
                      className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-1 transition"
                    >
                      <span>Rastrear</span>
                      <ChevronRightIcon className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {order.status === 'ENTREGADO' && (
                    <div className="grid grid-cols-2 gap-3 w-full">
                      <button 
                        onClick={() => handleVerFactura(order.orderId)}
                        className="border border-gray-200 hover:bg-gray-50 text-gray-700 py-2.5 rounded-xl font-bold text-xs transition"
                      >
                        Ver Factura
                      </button>
                      <button 
                        onClick={() => handleComprarDeNuevo(order.productName)}
                        className="bg-[#0b2240] hover:bg-[#123057] text-white py-2.5 rounded-xl font-bold text-xs transition"
                      >
                        Comprar de nuevo
                      </button>
                    </div>
                  )}

                  {order.status === 'PROCESANDO' && (
                    <button 
                      onClick={() => handleCancelOrder(order.id, order.orderId)}
                      className="w-full border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-100 text-gray-500 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-1 transition"
                    >
                      <span>Cancelar pedido</span>
                      <ChevronRightIcon className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {order.status === 'CANCELADO' && (
                    <span className="text-xs text-gray-400 font-semibold py-1">Sin acciones disponibles</span>
                  )}
                </div>
              </div>
            )
          })}

          {filteredOrders.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <span className="text-3xl">📦</span>
              <p className="text-sm font-bold text-gray-500 mt-3">No tienes pedidos en esta categoría</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default OrdersPage
