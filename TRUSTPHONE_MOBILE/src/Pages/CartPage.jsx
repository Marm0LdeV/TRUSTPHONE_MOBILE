import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import ProductItem from '../Components/ProductItem'
import Footer from '../Components/Footer'

const CartPage = () => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const stored = localStorage.getItem('cart')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setCartItems(parsed.map(item => ({ ...item, quantity: item.quantity || 1 })))
      } catch {
        setCartItems([])
      }
      setLoading(false)
    } else {
      // Fallback: load real phones from API
      fetch('/api/celulares')
        .then(res => res.json())
        .then(data => {
          if (data && data.length > 0) {
            const preloaded = data.slice(0, 2).map(c => ({
              id: c._id,
              brand: c.idMarca?.nombre?.toUpperCase() || 'MARCA',
              name: `${c.nombre} ${c.modelo || ''}`.trim(),
              price: Number(c.precio) || 0,
              quality: c.condicion || 'Excelente',
              image: c.imagen || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=256&fit=crop',
              color: c.color || '',
              quantity: 1
            }))
            setCartItems(preloaded)
            localStorage.setItem('cart', JSON.stringify(preloaded))
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false))
    }
  }, [])

  const updateCart = (items) => {
    setCartItems(items)
    localStorage.setItem('cart', JSON.stringify(items))
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const handleIncrement = (id) => {
    const updated = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
    updateCart(updated)
  }

  const handleDecrement = (id) => {
    const updated = cartItems.map(item => {
      if (item.id === id) {
        const newQty = item.quantity - 1
        return newQty > 0 ? { ...item, quantity: newQty } : item
      }
      return item
    })
    updateCart(updated)
  }

  const handleRemove = (id) => {
    const updated = cartItems.filter(item => item.id !== id)
    updateCart(updated)
  }

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const total = subtotal // Free shipping

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Tu carrito está vacío. Añade productos desde el catálogo.')
      return
    }
    alert('¡Compra realizada con éxito!\nTu orden #TP-98246 ha sido creada. Puedes seguir su progreso en la pestaña de Pedidos.')
    navigate('/pedidos')
  }

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen pb-24 shadow-xl flex flex-col justify-between relative overflow-hidden">
      <div>
        {/* Header */}
        <div className="bg-[#0b2240] px-4 py-4 flex items-center border-b border-[#0d284a] shadow-md">
          <Link to="/" className="text-white hover:opacity-80 transition flex-shrink-0">
            <ArrowLeftIcon className="w-5 h-5 stroke-[2.5]" />
          </Link>
          <h1 className="text-white font-bold text-base flex-1 text-center pr-5">Tu Carrito</h1>
        </div>

        {/* Cart items list */}
        <div className="p-4 space-y-3.5">
          {cartItems.map(item => (
            <ProductItem
              key={item.id}
              variant="cart"
              name={item.name}
              price={item.price}
              quality={item.quality}
              image={item.image}
              color={item.color}
              quantity={item.quantity}
              onIncrement={() => handleIncrement(item.id)}
              onDecrement={() => handleDecrement(item.id)}
              onRemove={() => handleRemove(item.id)}
            />
          ))}

          {cartItems.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-150 p-8 shadow-sm">
              <span className="text-3xl">🛒</span>
              <p className="text-sm font-bold text-gray-500 mt-3">Tu carrito está vacío</p>
              <Link 
                to="/"
                className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow transition"
              >
                Volver a la Tienda
              </Link>
            </div>
          )}
        </div>

        {/* Summary box */}
        {cartItems.length > 0 && (
          <div className="mx-4 bg-white rounded-2xl border border-gray-150 p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3">
            <h3 className="font-extrabold text-sm text-gray-800 tracking-wide border-b border-gray-50 pb-2">
              Resumen del pedido
            </h3>
            
            <div className="flex justify-between items-center text-xs font-semibold text-gray-500">
              <span>Subtotal</span>
              <span className="text-gray-800">${subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center text-xs font-semibold text-gray-500">
              <span>Envío</span>
              <span className="text-green-600 font-bold">Gratis</span>
            </div>
            
            <div className="flex justify-between items-center pt-2.5 border-t border-gray-150">
              <span className="font-extrabold text-sm text-gray-800">Total</span>
              <span className="font-extrabold text-lg text-gray-900">${total.toFixed(2)}</span>
            </div>

            {/* Checkout Action Button */}
            <button 
              onClick={handleCheckout}
              className="w-full bg-[#0b2240] hover:bg-[#123057] active:scale-[0.98] text-white py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 mt-4"
            >
              <span>Finalizar compra</span>
              <span className="font-light">→</span>
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default CartPage
