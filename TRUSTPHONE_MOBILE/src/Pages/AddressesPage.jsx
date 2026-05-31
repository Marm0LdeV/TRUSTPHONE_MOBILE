import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon, MagnifyingGlassIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import AddressCard from '../Components/AddressCard'
import Footer from '../Components/Footer'

const INITIAL_ADDRESSES = [
  {
    id: 1,
    title: 'Hogar',
    street: 'Calle Principal 123, Apt 4B, San Salvador',
    isDefault: false
  },
  {
    id: 2,
    title: 'Trabajo',
    street: 'Avenida Reforma 450, Torre Norte, Piso 12, San Salvador',
    isDefault: true
  },
  {
    id: 3,
    title: 'Casa de Mamá',
    street: 'Calle de los Pinos 789, Colonia Residencial',
    isDefault: false
  }
]

const AddressesPage = () => {
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  
  // Modal Form State
  const [newAddr, setNewAddr] = useState({
    title: 'Hogar',
    street: ''
  })

  // Filter based on search query
  const filteredAddresses = addresses.filter(addr => 
    addr.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    addr.street.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelect = (id) => {
    setAddresses(prev =>
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === id
      }))
    )
  }

  const handleDelete = (id, title) => {
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar la dirección "${title}"?`)
    if (confirmDelete) {
      setAddresses(prev => prev.filter(addr => addr.id !== id))
    }
  }

  const handleEdit = (title) => {
    alert(`Editar dirección "${title}" (simulado)`)
  }

  const handleAddAddress = (e) => {
    e.preventDefault()
    if (!newAddr.street) return

    const newId = addresses.length > 0 ? Math.max(...addresses.map(a => a.id)) + 1 : 1
    const newAddressObj = {
      id: newId,
      title: newAddr.title,
      street: newAddr.street,
      isDefault: false
    }

    setAddresses(prev => [...prev, newAddressObj])
    setShowAddModal(false)
    setNewAddr({ title: 'Hogar', street: '' })
    alert('Dirección añadida con éxito.')
  }

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen pb-24 shadow-xl flex flex-col justify-between relative overflow-hidden">
      <div>
        {/* Header */}
        <div className="bg-[#0b2240] px-4 py-4 flex items-center border-b border-[#0d284a] shadow-md">
          <Link to="/perfil" className="text-white hover:opacity-80 transition flex-shrink-0">
            <ArrowLeftIcon className="w-5 h-5 stroke-[2.5]" />
          </Link>
          <h1 className="text-white font-bold text-base flex-1 text-center pr-5">Mis Direcciones</h1>
        </div>

        {/* Search bar */}
        <div className="p-4 bg-white border-b border-gray-100">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Buscar dirección..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-semibold text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-sm"
            />
            <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
          </div>
        </div>

        {/* Addresses List */}
        <div className="p-4">
          {filteredAddresses.map(addr => (
            <AddressCard
              key={addr.id}
              title={addr.title}
              street={addr.street}
              isDefault={addr.isDefault}
              onSelect={() => handleSelect(addr.id)}
              onEdit={() => handleEdit(addr.title)}
              onDelete={() => handleDelete(addr.id, addr.title)}
            />
          ))}

          {filteredAddresses.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-150 p-6 shadow-sm">
              <span className="text-2xl">📍</span>
              <p className="text-sm font-bold text-gray-400 mt-2">No se encontraron direcciones</p>
            </div>
          )}

          {/* Add New Address Trigger */}
          <button 
            onClick={() => setShowAddModal(true)}
            className="w-full bg-[#0b2240] hover:bg-[#123057] active:scale-[0.98] text-white py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 mt-4"
          >
            <PlusIcon className="w-4 h-4 stroke-[3]" />
            <span>Añadir nueva dirección</span>
          </button>
        </div>
      </div>

      {/* Add Address Modal (Interactive Overlay) */}
      {showAddModal && (
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-end justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-t-[2rem] rounded-b-[2rem] p-5 shadow-2xl space-y-4 animate-slide-up border border-slate-100">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-extrabold text-sm text-gray-800">Nueva Dirección</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddAddress} className="space-y-4">
              {/* Type selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 block">Tipo de Dirección</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Hogar', 'Trabajo', 'Otro'].map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setNewAddr(prev => ({ ...prev, title: type }))}
                      className={`py-2 rounded-xl text-xs font-bold border transition ${
                        newAddr.title === type
                          ? 'bg-blue-50 border-blue-200 text-blue-600 shadow-sm'
                          : 'bg-gray-50 border-gray-200 text-gray-500'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Address details */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 block">Dirección completa</label>
                <textarea
                  value={newAddr.street}
                  onChange={(e) => setNewAddr(prev => ({ ...prev, street: e.target.value }))}
                  placeholder="Ej: Av. Central 456, Apt 3A, San Salvador"
                  required
                  rows="3"
                  className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0b2240] hover:bg-[#123057] text-white py-3 rounded-xl font-bold text-xs shadow-md transition"
              >
                Guardar Dirección
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default AddressesPage
