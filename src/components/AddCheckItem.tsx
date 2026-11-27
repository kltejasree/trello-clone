import { useState } from 'react'
import {Button, Input} from 'antd';



interface addCheckItemProp {
  onAdd: (itemTitle: string) => Promise<void>;
  onCancel: () => void;
}

const AddCheckItem = ({ onAdd, onCancel }: addCheckItemProp) => {

  const [itemTitle, setItemTitle] = useState('')

  const handleSubmit = async () => {
    if (!itemTitle.trim()) return

    await onAdd(itemTitle)

    setItemTitle('')
  }

  return (
    <div className="mt-3">

      <Input
        type="text"
        placeholder="Add an item"
        value={itemTitle}
        onChange={(e) => setItemTitle(e.target.value)}
        className="w-full border-2 border-blue-500 rounded-md px-3 py-2 outline-none"
      />

      <div className="flex gap-2 mt-3">

        <Button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-1.5"
        >
          Add
        </Button>

        <Button
          onClick={onCancel}
          className="text-gray-700 hover:bg-gray-100 rounded px-4 py-1.5"
        >
          Cancel
        </Button>

      </div>

    </div>
  )
}

export default AddCheckItem