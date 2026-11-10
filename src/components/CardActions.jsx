import React from 'react'
import {
  PlusOutlined,
  TagOutlined,
  ClockCircleOutlined,
  UserAddOutlined,
} from '@ant-design/icons'

import AddChecklist from './Addchecklist'

const CardActions = ({ onAddChecklist }) => {
  return (
    <div className="flex gap-3 mt-5 pl-8 flex-wrap">

      <button className="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white hover:bg-gray-100">
        <PlusOutlined />
        <span className="ml-1.5">Add</span>
      </button>

      <button className="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white hover:bg-gray-100">
        <TagOutlined />
        <span className="ml-1.5">Labels</span>
      </button>

      <button className="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white hover:bg-gray-100">
        <ClockCircleOutlined />
        <span className="ml-1.5">Dates</span>
      </button>

      <AddChecklist onAddChecklist={onAddChecklist} />

      <button className="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white hover:bg-gray-100">
        <UserAddOutlined />
        <span className="ml-1.5">Members</span>
      </button>

    </div>
  )
}

export default CardActions