import React from 'react'

const Card = ({card}) => {
  return (
      <div className="mb-4 p-4 bg-white border-l-4 border-indigo-500 rounded-r-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <p className="text-gray-900 text-sm">{card.content}</p>
      </div>
  )
}

export default Card