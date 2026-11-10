import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import {Button, Popover} from 'antd'
import CreateBoard from './CreateBoard'

const Navbar = () => {
  return (
    <div className = "w-full flex justify-between items-center px-6 py-3 border-b border-gray-300 shadow-sm">
        <div className = "flex items-center gap-2">
            
            <img className = "w-[25px] h-[25px] object-contain" src = {logo} alt = "trello-logo"/>
            <h4 className = "text-xl font-bold text-gray-800">Trello</h4>
           
        </div>

        <div className = "flex items-center gap-4">
            <div className = "relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input className="w-[250px] sm:w-[350px] md:w-[500px] pl-10 pr-3 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" type="text" placeholder="Search"/>
            </div>
            
            <Popover 
            content = {<CreateBoard />}
            trigger="click"
            placement = "button"
            >
            <button className = "px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition">Create</button>
            </Popover>
        </div>

    </div>
  )
}

export default Navbar