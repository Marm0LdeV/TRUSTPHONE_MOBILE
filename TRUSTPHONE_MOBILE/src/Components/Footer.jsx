import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  HomeIcon, 
  ShoppingBagIcon, 
  ClipboardDocumentListIcon, 
  UserIcon 
} from '@heroicons/react/24/outline'
import { 
  HomeIcon as HomeSolidIcon, 
  ShoppingBagIcon as ShoppingBagSolidIcon, 
  ClipboardDocumentListIcon as ClipboardDocumentListSolidIcon, 
  UserIcon as UserSolidIcon 
} from '@heroicons/react/24/solid'

const Footer = () => {
  const location = useLocation()
  const path = location.pathname
  const [cartCount, setCartCount] = useState(0)

  const isHome = path === '/'
  const isCart = path === '/carrito'
  const isOrders = path === '/pedidos'
  const isProfile = path.startsWith('/perfil')

  // Read real cart count from localStorage, keep in sync
  useEffect(() => {
    const updateCount = () => {
      try {
        const stored = localStorage.getItem('cart')
        if (stored) {
          const items = JSON.parse(stored)
          const total = items.reduce((acc, item) => acc + (item.quantity || 1), 0)
          setCartCount(total)
        } else {
          setCartCount(0)
        }
      } catch {
        setCartCount(0)
      }
    }

    updateCount()
    // Listen for cart changes triggered from other components via custom event
    window.addEventListener('cartUpdated', updateCount)
    window.addEventListener('storage', updateCount)
    return () => {
      window.removeEventListener('cartUpdated', updateCount)
      window.removeEventListener('storage', updateCount)
    }
  }, [])

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-2.5 max-w-md mx-auto z-40 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] rounded-t-2xl">
      <div className="flex justify-around items-center">
        {/* Inicio */}
        <Link to="/" className="flex flex-col items-center transition-all duration-200">
          {isHome ? (
            <HomeSolidIcon className="w-5 h-5 text-blue-600 scale-105" />
          ) : (
            <HomeIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
          )}
          <span className={`text-[10px] mt-1 font-medium tracking-wide ${isHome ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>Inicio</span>
        </Link>

        {/* Carrito */}
        <Link to="/carrito" className="flex flex-col items-center relative transition-all duration-200">
          {isCart ? (
            <ShoppingBagSolidIcon className="w-5 h-5 text-blue-600 scale-105" />
          ) : (
            <ShoppingBagIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
          )}
          <span className={`text-[10px] mt-1 font-medium tracking-wide ${isCart ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>Carrito</span>
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-blue-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-white shadow-sm">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </Link>

        {/* Pedidos */}
        <Link to="/pedidos" className="flex flex-col items-center transition-all duration-200">
          {isOrders ? (
            <ClipboardDocumentListSolidIcon className="w-5 h-5 text-blue-600 scale-105" />
          ) : (
            <ClipboardDocumentListIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
          )}
          <span className={`text-[10px] mt-1 font-medium tracking-wide ${isOrders ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>Pedidos</span>
        </Link>

        {/* Perfil */}
        <Link to="/perfil" className="flex flex-col items-center transition-all duration-200">
          {isProfile ? (
            <UserSolidIcon className="w-5 h-5 text-blue-600 scale-105" />
          ) : (
            <UserIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
          )}
          <span className={`text-[10px] mt-1 font-medium tracking-wide ${isProfile ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>Perfil</span>
        </Link>
      </div>
    </div>
  )
}

export default Footer