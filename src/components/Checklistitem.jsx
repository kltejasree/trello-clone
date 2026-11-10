import React from 'react'

const ChecklistItem = ({ item, onUpdate, onDelete }) => {

  const handleChange = (e) => {
    onUpdate(
      item.id,
      e.target.checked ? 'complete' : 'incomplete'
    )
  }

  return (
    <div className="flex items-center justify-between mt-3">

      <div className="flex items-center gap-3">

        <input
          type="checkbox"
          checked={item.state === 'complete'}
          onChange={handleChange}
          className="w-4 h-4 accent-green-600"
        />

        <span
          className={
            item.state === 'complete'
              ? 'line-through text-gray-400'
              : 'text-gray-700'
          }
        >
          {item.name}
        </span>

      </div>

      <button
        onClick={() => onDelete(item.id)}
        className="text-red-500 hover:text-red-700 text-sm"
      >
        Delete
      </button>

    </div>
  )
}

export default ChecklistItem