import React, {useState, useEffect} from 'react'
import {Card} from 'antd'
import { getAllBoards } from '../api/Boards'
import CreateBoard from './CreateBoard'
import {Button, Popover} from 'antd'
import {Link} from 'react-router-dom'



const Board = () => {
    const [allBoards, setAllBoards] = useState([])
    const [showCreateCard, setShowCreateCard] = useState(false)
    const [open, setOpen] = useState(false)
    console.log(showCreateCard)
    console.log(allBoards)

    useEffect(() => {
        const AllBoards = async function() {
            const allBoarddata = await getAllBoards();
            setAllBoards(allBoarddata)
        }
        AllBoards();

    },[])

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen)

    }


  return (
    <>
    <h4 className = "text-2xl text-center my-10">Trello Workspace</h4>
    <div className="flex gap-4 flex-wrap justify-center">
      {allBoards.map((board) => (
        <Link to={`/boards/${board.id}`}>
          <Card
            key={board.id}
            className="w-55 h-40 overflow-hidden p-0"
            styles={{ body: { padding: 0 } }}
            cover={
              board.prefs?.backgroundImage ? (
                <img
                  src={board.prefs.backgroundImage}
                  alt={board.name}
                  className="w-full h-30 object-cover"
                />
              ) : (
                <div
                  className="w-full h-30"
                  style={{
                    backgroundColor: board.prefs?.backgroundColor || '#2b2b2e',
                  }}
                />
              )
            }
          >
            <div
              id={board.id}
              className="text-black py-2 pl-2 bg-white cursor-pointer"
              onClick={(e) => console.log(e.currentTarget.id)}
            >
              {board.name}
            </div>
          </Card>
        </Link>
      ))}


      <Popover 
        content = {<CreateBoard onClose = {() => setOpen(false)}/>}
        trigger="click"
        placement="button"
        open = {open}
        onOpenChange = {handleOpenChange}
        
        >
      <div className = "">
        <div onClick = {() => setShowCreateCard(!showCreateCard)} className = "w-55 h-40 bg-gray-300 rounded-[10px] text-center pt-[25%]">Create new board</div>
      </div>

      </Popover>
    </div>
    </>
  )
}


export default Board