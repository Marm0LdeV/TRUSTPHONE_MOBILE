import React from 'react'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

const PaymentMethod = ({ 
  cardType, 
  lastDigits, 
  expiry, 
  onEdit, 
  onDelete 
}) => {
  const isVisa = cardType.toLowerCase().includes('visa')

  return (
    <div className="p-4 border border-gray-200 rounded-2xl mb-3 flex items-center justify-between bg-white hover:border-gray-300 transition-all duration-200">
      {/* Left Card Logo + Info */}
      <div className="flex items-center space-x-4 flex-1 min-w-0">
        {/* Card Logo Box */}
        <div className={`w-14 h-9 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-xs text-white tracking-wider shadow-sm select-none ${
          isVisa 
            ? 'bg-gradient-to-r from-blue-700 to-blue-500' 
            : 'bg-gradient-to-r from-orange-600 to-red-500'
        }`}>
          {isVisa ? 'VISA' : 'MC'}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm text-gray-800">
            {isVisa ? 'Visa' : 'Mastercard'} terminada en {lastDigits}
          </h4>
          <p className="text-xs text-gray-400 mt-0.5">Vence {expiry}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-3 ml-4 flex-shrink-0">
        <button 
          onClick={onEdit}
          className="text-gray-400 hover:text-blue-600 transition-colors"
        >
          <PencilIcon className="w-4 h-4" />
        </button>
        <button 
          onClick={onDelete}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default PaymentMethod