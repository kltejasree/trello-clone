
import { FaSearch } from 'react-icons/fa'
import logo from '../assets/logo.png'
import { Button, Popover, Input } from 'antd'
import CreateBoard from './CreateBoard'

const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center px-6 py-3 border-b border-gray-300 shadow-sm">

      <div className="flex items-center gap-2">
        <img
          className="w-6.25 h-6.25 object-contain"
          src={logo}
          alt="trello-logo"
        />
        <h4 className="text-xl font-bold text-gray-800">Trello</h4>
      </div>

      <div className="flex items-center gap-4">

        <Input
          placeholder="Search"
          prefix={<FaSearch className="text-gray-400" />}
          className="w-62.5 sm:w-75 md:w-125"
          allowClear
        />

        <Popover
          content={<CreateBoard />}
          trigger="click"
          placement="bottomRight"
        >
          <Button
            type="primary"
            className="bg-blue-600! hover:bg-blue-700! font-bold!"
          >
            Create
          </Button>
        </Popover>

      </div>

    </div>
  )
}

export default Navbar
