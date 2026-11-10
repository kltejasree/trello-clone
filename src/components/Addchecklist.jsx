import React, { useState } from 'react'
import { Popover, Button } from 'antd'
import { CheckSquareOutlined } from '@ant-design/icons'

const AddChecklist = ({ onAddChecklist }) => {

  const [open, setOpen] = useState(false)
  const [checkListTitle, setCheckListTitle] = useState('Checklist')

  const handleAdd = async () => {
    if (!checkListTitle.trim()) return

    await onAddChecklist(checkListTitle)

    setCheckListTitle('Checklist')
    setOpen(false)
  }

  const content = (
    <div className="w-64 flex flex-col gap-3">

      <div className="flex justify-between items-center">
        <h4>Add checklist</h4>

        <button onClick={() => setOpen(false)}>
          ×
        </button>
      </div>

      <div>
        <h5>Title</h5>

        <input
          type="text"
          value={checkListTitle}
          onChange={(e) => setCheckListTitle(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <Button type="primary" onClick={handleAdd}>
        Add
      </Button>

    </div>
  )

  return (
    <Popover
      trigger="click"
      content={content}
      open={open}
      onOpenChange={setOpen}
      placement="bottom"
    >
      <button className="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white hover:bg-gray-100">
        <CheckSquareOutlined />
        <span className="ml-1.5">Checklist</span>
      </button>
    </Popover>
  )
}

export default AddChecklist