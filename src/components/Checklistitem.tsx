
import { useState } from 'react'
import { Popover } from 'antd'

type ChecklistItemType = {
  id: string;
  name: string;
  state: 'complete' | 'incomplete'
}

interface ChecklistItemProps {
  item: ChecklistItemType;
  onUpdate: (
    itemId: string,
    state: 'complete' | 'incomplete'
  ) => Promise<void>;
  onDelete: (itemId: string) => Promise<void>;
}


const ChecklistItem = ({ item, onUpdate, onDelete }: ChecklistItemProps) => {

  const [open, setOpen] = useState(false)

  const hide = () => {
    setOpen(false)
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(
      item.id,
      e.target.checked ? 'complete' : 'incomplete'
    )
  }

  const handleDelete = () => {
    onDelete(item.id)
    hide()
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

      <Popover
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
        content={
          <div className="w-32">

            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Item actions</h4>

              <button onClick={hide}>
                ×
              </button>
            </div>

            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>

          </div>
        }
      >

        <button className="text-lg font-bold">
          ...
        </button>

      </Popover>

    </div>
  )
}

export default ChecklistItem
