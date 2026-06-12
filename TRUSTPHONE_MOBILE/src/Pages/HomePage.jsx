import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import johnPorkImg from '../img/John_Pork.webp'
import { 
  MagnifyingGlassIcon, 
  AdjustmentsHorizontalIcon, 
  ChevronDownIcon, 
  HeartIcon, 
  ShieldCheckIcon 
} from '@heroicons/react/24/outline'
import ProductItem from '../Components/ProductItem'
import Footer from '../Components/Footer'

const HomePage = () => {
  const [productsData, setProductsData] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('Todos')
  const [activeSort, setActiveSort] = useState('Destacados')
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    fetch('/api/celulares')
      .then(res => res.json())
      .then(data => {
        const mapped = data.map(item => ({
          id: item._id,
          brand: item.idMarca?.nombre || 'General',
          name: item.nombre,
          price: item.precio || 0,
          quality: item.condicion || 'Excelente',
          image: item.imagen || 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=256&fit=crop',
          color: item.color || ''
        }))
        setProductsData(mapped)
      })
      .catch(console.error)
  }, [])

  // Filter products by brand and search query
  const filteredProducts = productsData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesBrand = selectedBrand === 'Todos' || 
                         product.brand.toLowerCase() === selectedBrand.toLowerCase()
    return matchesSearch && matchesBrand
  })

  const handleAddProduct = (product) => {
    try {
      const stored = localStorage.getItem('cart')
      const cart = stored ? JSON.parse(stored) : []
      const existingIdx = cart.findIndex(item => item.id === product.id)
      if (existingIdx >= 0) {
        cart[existingIdx].quantity = (cart[existingIdx].quantity || 1) + 1
      } else {
        cart.push({ ...product, quantity: 1 })
      }
      localStorage.setItem('cart', JSON.stringify(cart))
      // Notify Footer and other listeners
      window.dispatchEvent(new Event('cartUpdated'))
      // Show brief toast
      setToast(`✓ ${product.name} añadido al carrito`)
      setTimeout(() => setToast(''), 2500)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen pb-24 shadow-xl flex flex-col justify-between relative overflow-hidden">
      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-xs font-bold px-5 py-3 rounded-2xl shadow-lg animate-bounce max-w-[280px] text-center">
          {toast}
        </div>
      )}
      <div>
        {/* Header */}
        <div className="bg-white p-4 pb-3 border-b border-gray-100 flex flex-col space-y-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-1.5 rounded-lg flex items-center justify-center shadow-sm">
                <ShieldCheckIcon className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-lg text-slate-800 tracking-wider">TRUSTPHONE</span>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-3.5">
              <button className="text-gray-400 hover:text-red-500 transition">
                <HeartIcon className="w-6 h-6" />
              </button>
              <Link to="/perfil" className="w-8 h-8 rounded-full overflow-hidden border-2 border-slate-100 block hover:border-blue-500 transition">
                <img 
                  src={johnPorkImg} 
                  alt="Perfil" 
                  className="w-full h-full object-cover"
                />
              </Link>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="Busca por iPhone 15, Galaxy S24..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-11 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-semibold text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-sm"
            />
            <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute right-4 top-3.5" />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="bg-white px-4 py-3 flex space-x-3 overflow-x-auto border-b border-gray-100 scrollbar-none">
          {['Todos', 'Apple', 'Samsung', 'Xiaomi'].map((brand, idx) => {
            const isActive = selectedBrand === brand
            // Dot color matching the brand
            const dotColors = ['bg-blue-500', 'bg-red-500', 'bg-green-500']
            const dotColor = idx > 0 ? dotColors[(idx - 1) % dotColors.length] : ''

            return (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all flex-shrink-0 ${
                  isActive 
                    ? 'bg-slate-900 text-white shadow-sm' 
                    : 'bg-gray-100/80 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {!isActive && idx > 0 && <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>}
                <span>{brand}</span>
              </button>
            )
          })}
        </div>

        {/* Catalog Banner/Stats */}
        <div className="px-4 py-4 flex justify-between items-center">
          <span className="font-extrabold text-xs text-gray-800 tracking-wider">
            CATÁLOGO ({filteredProducts.length})
          </span>

          <div className="flex items-center space-x-2">
            {/* Filter */}
            <button 
              onClick={() => alert('Filtros avanzados (simulados)')}
              className="flex items-center space-x-1 bg-white border border-gray-200 px-3 py-1.5 rounded-xl text-[10px] font-bold text-gray-600 hover:bg-gray-50 transition"
            >
              <AdjustmentsHorizontalIcon className="w-3.5 h-3.5 text-gray-400" />
              <span>Filtros</span>
            </button>

            {/* Sort */}
            <div className="relative">
              <button 
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center space-x-1 bg-white border border-gray-200 px-3 py-1.5 rounded-xl text-[10px] font-bold text-gray-600 hover:bg-gray-50 transition"
              >
                <span>{activeSort}</span>
                <ChevronDownIcon className="w-3 h-3 text-gray-400" />
              </button>
              {showSortDropdown && (
                <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-30 w-32">
                  {['Destacados', 'Menor Precio', 'Mayor Precio'].map(option => (
                    <button
                      key={option}
                      onClick={() => {
                        setActiveSort(option)
                        setShowSortDropdown(false)
                      }}
                      className="w-full text-left px-3 py-1.5 text-[10px] font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="px-4 grid grid-cols-2 gap-3.5">
          {filteredProducts.map(product => (
            <ProductItem
              key={product.id}
              variant="grid"
              brand={product.brand}
              name={product.name}
              price={product.price}
              quality={product.quality}
              image={product.image}
              onAdd={() => handleAddProduct(product)}
            />
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-2 text-center py-12 bg-white rounded-2xl border border-gray-100 p-6">
              <p className="text-sm font-semibold text-gray-400">No se encontraron productos en esta búsqueda.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default HomePage