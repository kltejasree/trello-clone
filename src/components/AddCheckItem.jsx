import React, { useState } from 'react'

const AddCheckItem = ({ onAdd, onCancel }) => {

  const [itemTitle, setItemTitle] = useState('')

  const handleSubmit = async () => {
    if (!itemTitle.trim()) return

    await onAdd(itemTitle)

    setItemTitle('')
  }

  return (
    <div className="mt-3">

      <input
        type="text"
        placeholder="Add an item"
        value={itemTitle}
        onChange={(e) => setItemTitle(e.target.value)}
        className="w-full border-2 border-blue-500 rounded-md px-3 py-2 outline-none"
      />

      <div className="flex gap-2 mt-3">

        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-1.5"
        >
          Add
        </button>

        <button
          onClick={onCancel}
          className="text-gray-700 hover:bg-gray-100 rounded px-4 py-1.5"
        >
          Cancel
        </button>

      </div>

    </div>
  )
}

export default AddCheckItem