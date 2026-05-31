import React from 'react'
import { 
  HomeIcon, 
  BriefcaseIcon, 
  HeartIcon, 
  PencilIcon, 
  TrashIcon 
} from '@heroicons/react/24/outline'

const AddressCard = ({ 
  title, 
  street, 
  isDefault, 
  onSelect, 
  onEdit, 
  onDelete 
}) => {
  // Select icon based on title
  const getIcon = () => {
    const lowercaseTitle = title.toLowerCase()
    if (lowercaseTitle.includes('hogar')) {
      return <HomeIcon className="w-5 h-5 text-blue-600" />
    }
    if (lowercaseTitle.includes('trabajo') || lowercaseTitle.includes('oficina')) {
      return <BriefcaseIcon className="w-5 h-5 text-blue-600" />
    }
    return <HeartIcon className="w-5 h-5 text-blue-600" />
  }

  return (
    <div 
      onClick={onSelect}
      className={`p-4 border rounded-2xl mb-3 flex items-center justify-between cursor-pointer transition-all duration-200 ${
        isDefault 
          ? 'border-blue-600 border-l-[6px] shadow-sm bg-white' 
          : 'border-gray-200 hover:border-gray-300 bg-white'
      }`}
    >
      {/* Left Icon + Content */}
      <div className="flex items-center space-x-4 flex-1 min-w-0">
        {/* Icon wrapper */}
        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
          {getIcon()}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm text-gray-800">{title}</h4>
          <p className="text-xs text-gray-400 mt-0.5 truncate leading-relaxed">{street}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-3 ml-4 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
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

export default AddressCard
