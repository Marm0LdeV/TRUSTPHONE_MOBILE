import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon, LockClosedIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import PaymentMethod from '../Components/PaymentMethod'
import Footer from '../Components/Footer'

const INITIAL_CARDS = [
  {
    id: 1,
    cardType: 'Visa',
    lastDigits: '4242',
    expiry: '12/26'
  },
  {
    id: 2,
    cardType: 'Mastercard',
    lastDigits: '9876',
    expiry: '09/25'
  }
]

const PaymentMethodsPage = () => {
  const [cards, setCards] = useState(INITIAL_CARDS)
  const [showAddModal, setShowAddModal] = useState(false)
  
  // Modal Form State
  const [newCard, setNewCard] = useState({
    cardType: 'Visa',
    lastDigits: '',
    expiry: ''
  })

  const handleDelete = (id, lastDigits) => {
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar la tarjeta terminada en ${lastDigits}?`)
    if (confirmDelete) {
      setCards(prev => prev.filter(c => c.id !== id))
    }
  }

  const handleEdit = (lastDigits) => {
    alert(`Editar tarjeta terminada en ${lastDigits} (simulado)`)
  }

  const handleAddCard = (e) => {
    e.preventDefault()
    if (!newCard.lastDigits || !newCard.expiry) return
    if (newCard.lastDigits.length !== 4) {
      alert('Los últimos dígitos deben ser exactamente 4 números.')
      return
    }

    const newId = cards.length > 0 ? Math.max(...cards.map(c => c.id)) + 1 : 1
    const newCardObj = {
      id: newId,
      cardType: newCard.cardType,
      lastDigits: newCard.lastDigits,
      expiry: newCard.expiry
    }

    setCards(prev => [...prev, newCardObj])
    setShowAddModal(false)
    setNewCard({ cardType: 'Visa', lastDigits: '', expiry: '' })
    alert('Método de pago añadido con éxito.')
  }

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen pb-24 shadow-xl flex flex-col justify-between relative overflow-hidden">
      <div>
        {/* Header */}
        <div className="bg-[#0b2240] px-4 py-4 flex items-center border-b border-[#0d284a] shadow-md">
          <Link to="/perfil" className="text-white hover:opacity-80 transition flex-shrink-0">
            <ArrowLeftIcon className="w-5 h-5 stroke-[2.5]" />
          </Link>
          <h1 className="text-white font-bold text-base flex-1 text-center pr-5">Métodos de Pago</h1>
        </div>

        {/* Tarjetas Guardadas Section */}
        <div className="p-4">
          <h3 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-3.5">
            TARJETAS GUARDADAS
          </h3>

          <div className="space-y-1">
            {cards.map(card => (
              <PaymentMethod
                key={card.id}
                cardType={card.cardType}
                lastDigits={card.lastDigits}
                expiry={card.expiry}
                onEdit={() => handleEdit(card.lastDigits)}
                onDelete={() => handleDelete(card.id, card.lastDigits)}
              />
            ))}

            {cards.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-150 p-6 shadow-sm">
                <span className="text-2xl">💳</span>
                <p className="text-sm font-bold text-gray-400 mt-2">No tienes métodos de pago guardados</p>
              </div>
            )}
          </div>

          {/* Add Trigger */}
          <button 
            onClick={() => setShowAddModal(true)}
            className="w-full bg-[#0b2240] hover:bg-[#123057] active:scale-[0.98] text-white py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 mt-6"
          >
            <PlusIcon className="w-4 h-4 stroke-[3]" />
            <span>Añadir nuevo método de pago</span>
          </button>
        </div>
      </div>

      {/* PCI-DSS Disclaimer Area */}
      <div className="px-6 pb-28 text-center space-y-2 flex flex-col items-center">
        <LockClosedIcon className="w-5 h-5 text-gray-300" />
        <p className="text-[10px] text-gray-400 font-semibold max-w-xs leading-relaxed">
          Sus datos de pago están cifrados y se guardan de forma segura según los estándares PCI-DSS
        </p>
      </div>

      {/* Add Card Modal (Interactive Overlay) */}
      {showAddModal && (
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-end justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-t-[2rem] rounded-b-[2rem] p-5 shadow-2xl space-y-4 animate-slide-up border border-slate-100">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-extrabold text-sm text-gray-800">Nuevo Método de Pago</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCard} className="space-y-4">
              {/* Type selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 block">Tipo de Tarjeta</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Visa', 'Mastercard'].map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setNewCard(prev => ({ ...prev, cardType: type }))}
                      className={`py-2.5 rounded-xl text-xs font-bold border transition ${
                        newCard.cardType === type
                          ? 'bg-blue-50 border-blue-200 text-blue-600 shadow-sm'
                          : 'bg-gray-50 border-gray-200 text-gray-500'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Numbers and Expiry */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 block">Últimos 4 dígitos</label>
                  <input
                    type="text"
                    maxLength="4"
                    pattern="\d{4}"
                    value={newCard.lastDigits}
                    onChange={(e) => setNewCard(prev => ({ ...prev, lastDigits: e.target.value }))}
                    placeholder="Ej: 4321"
                    required
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 block">Vencimiento (MM/AA)</label>
                  <input
                    type="text"
                    maxLength="5"
                    pattern="\d{2}/\d{2}"
                    value={newCard.expiry}
                    onChange={(e) => setNewCard(prev => ({ ...prev, expiry: e.target.value }))}
                    placeholder="Ej: 12/28"
                    required
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0b2240] hover:bg-[#123057] text-white py-3 rounded-xl font-bold text-xs shadow-md transition"
              >
                Guardar Tarjeta
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default PaymentMethodsPage
