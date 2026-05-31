import React from 'react'
import { PlusIcon, TrashIcon, MinusIcon } from '@heroicons/react/24/outline'

const ProductItem = ({
  variant = 'grid',
  brand,
  name,
  price,
  image,
  quality,
  color,
  quantity,
  onIncrement,
  onDecrement,
  onRemove,
  onAdd
}) => {
  // Quality colors mapping
  const qualityStyles = {
    'Excelente': { bg: 'bg-green-100', text: 'text-green-800' },
    'Muy bueno': { bg: 'bg-blue-100', text: 'text-blue-800' },
    'Bueno': { bg: 'bg-yellow-100', text: 'text-yellow-800' }
  }
  
  const qStyle = qualityStyles[quality] || { bg: 'bg-gray-100', text: 'text-gray-800' }

  if (variant === 'cart') {
    return (
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col space-y-3">
        <div className="flex space-x-4">
          {/* Image */}
          <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center p-2 border border-gray-100 flex-shrink-0">
            <img src={image} alt={name} className="max-h-full max-w-full object-contain" />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-gray-800 text-sm truncate">{name}</h4>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs font-semibold text-blue-600">{quality}</span>
              {color && <span className="text-xs text-gray-400">Color: {color}</span>}
            </div>
            <p className="text-base font-extrabold text-gray-900 mt-2">${price.toFixed(2)}</p>
          </div>
        </div>

        {/* Actions Row */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-50">
          <button 
            onClick={onRemove}
            className="flex items-center space-x-1.5 text-xs text-gray-400 hover:text-red-500 font-semibold transition-colors"
          >
            <TrashIcon className="w-4 h-4" />
            <span>Eliminar</span>
          </button>

          <div className="flex items-center border border-gray-200 rounded-lg p-0.5 bg-gray-50/50">
            <button 
              onClick={onDecrement}
              className="p-1 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-md transition"
            >
              <MinusIcon className="w-3.5 h-3.5 font-bold" />
            </button>
            <span className="w-7 text-center font-bold text-xs text-gray-800">{quantity}</span>
            <button 
              onClick={onIncrement}
              className="p-1 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-md transition"
            >
              <PlusIcon className="w-3.5 h-3.5 font-bold" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Grid view (for catalog)
  return (
    <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-md transition-shadow relative">
      {/* Product top */}
      <div>
        {/* Image wrapper */}
        <div className="bg-gray-50/80 rounded-xl h-36 flex items-center justify-center p-4 mb-3 border border-gray-50">
          <img src={image} alt={name} className="max-h-full max-w-full object-contain" />
        </div>
        
        {/* Brand */}
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">{brand}</span>
        
        {/* Name */}
        <h4 className="font-bold text-xs text-gray-800 mt-1 min-h-[32px] line-clamp-2 leading-tight">{name}</h4>
      </div>

      {/* Product bottom */}
      <div className="flex justify-between items-end mt-2 pt-2 border-t border-gray-50">
        <div>
          <p className="font-extrabold text-sm text-gray-900">${price.toFixed(2)}</p>
          <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full mt-1.5 ${qStyle.bg} ${qStyle.text}`}>
            {quality}
          </span>
        </div>
        <button 
          onClick={onAdd}
          className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white p-2 rounded-full shadow-sm hover:shadow transition-all"
        >
          <PlusIcon className="w-4 h-4 stroke-[3]" />
        </button>
      </div>
    </div>
  )
}

export default ProductItem