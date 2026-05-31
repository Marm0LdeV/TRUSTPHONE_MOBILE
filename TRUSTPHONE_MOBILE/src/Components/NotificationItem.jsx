import React from 'react'

const NotificationItem = ({ title, subtitle, message }) => {
  return (
    <div className="mb-3 p-2 border rounded-md">
      <p className="font-semibold">{title}</p>
      {subtitle && <p className="text-xs text-blue-600">{subtitle}</p>}
      <p className="text-sm text-gray-600 mt-1">{message}</p>
    </div>
  )
}

export default NotificationItem