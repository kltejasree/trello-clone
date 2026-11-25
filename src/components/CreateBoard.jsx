import React, {useState} from 'react'
import { createBoard } from '../api/Boards';

const CreateBoard = ({onClose}) => {
    const [color, setColor] = useState('#3B82F6');
    const [trelloColor, setTrelloColor] = useState('blue')
    const [boardTitle, setBoardTitle] = useState('');

    function storeTitle(e) {
        let val = e.target.value 
        setBoardTitle(val);
    }

    const handleCreateBoard = async function() {
        let finalBoardTitle = boardTitle.trim('');
        if(finalBoardTitle.length !== 0) {
            const boardCreated = await createBoard(finalBoardTitle, trelloColor)
            console.log(boardCreated)
            console.log('Selected color:', color);
            console.log('Created board:', boardCreated);
            console.log('Board preferences:', boardCreated.prefs);
            console.log('Background:', boardCreated.prefs.background);

        }

    }
    
  return (
    <>

    <div className = "flex flex-col w-full max-w-[320px] h-auto gap-2 border">
        <div className = "flex justify-between mx-3 my-3">
            <h4 className = "">Create board</h4>
            <button onClick = {onClose} className = "">x</button>
        </div>
        <h4 className = "mx-3 my-3">Background</h4>
        <div className = "mx-5 my-5 flex gap-1">
            
            <button onClick = {() => {setColor('#60A5FA'); setTrelloColor('blue')}} className = "bg-blue-300 h-[30px] w-[40px] rounded text-white">{color === '#60A5FA' && '✓'}</button>
            <button onClick = {() => {setColor('#3B82F6'); setTrelloColor('blue')}} className = "bg-blue-400 h-[30px] w-[40px] rounded text-white">{color === '#3B82F6' && '✓'}</button>
            <button onClick = {() => {setColor('#2563EB'); setTrelloColor('blue')}} className = "bg-blue-500 h-[30px] w-[40px] rounded text-white">{color === '#2563EB' && '✓'}</button>
            <button onClick = {() => {setColor('#A78BFA'); setTrelloColor('purple')}} className = "bg-purple-400 h-[30px] w-[40px] rounded text-white">{color === '#A78BFA' && '✓'}</button>
            <button onClick = {() => {setColor('#7C3AED'); setTrelloColor('purple')}} className = "bg-purple-600 h-[30px] w-[40px] rounded text-white">{color === '#7C3AED' && '✓'}</button>
        </div>

        <div className = "flex flex-col mx-3 my-3 gap-1">
            <p className = "">Board Title </p>
            <input className = "w-[98%] border rounded" type = "text" value = {boardTitle} onChange = {storeTitle}></input>
            <p>👋 Board title is required</p>
        </div>

        <div className = "w-[90%] border rounded-2 mx-3 my-3 bg-blue-400 text-center">
            <button onClick = {handleCreateBoard} disabled = {boardTitle.length === 0} className = "text-white disabled:cursor-not-allowed">Create</button>
        </div>

    </div>
    
    </>
  )
}

export default CreateBoard