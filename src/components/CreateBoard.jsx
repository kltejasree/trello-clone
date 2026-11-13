import React, {useState, useReducer} from 'react'
import { createBoard } from '../api/Boards';

const initialState = {
    'color': '',
    'trelloColor': '',
    'boardTitle': ''
}

const createBoardReducer = (state, action) => {
    switch(action.type) {
        case "addColor":
            return {
                ...state,
                color: action.payload
            }
        case "setTrelloColor":
            return {
                ...state,
                trelloColor: action.payload
            }
        case "boardTitle":
            return {
                ...state,
                boardTitle: action.payload
            }
        default:
            return state

    }
}

const CreateBoard = ({onClose}) => {
    const [state, dispatch] = useReducer(createBoardReducer, initialState)

    function storeTitle(e) {
        let val = e.target.value 
        dispatch({
            type: "boardTitle",
            payload: val
        })
    }

    const handleCreateBoard = async function() {
        let finalBoardTitle = state.boardTitle.trim('');
        if(finalBoardTitle.length !== 0) {
            const boardCreated = await createBoard(finalBoardTitle, state.trelloColor)
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
            <button onClick = {(onClose)} className = "">x</button>
        </div>
        <h4 className = "mx-3 my-3">Background</h4>
        <div className = "mx-5 my-5 flex gap-1">
            
            <button onClick={() => {
                dispatch({ type: "addColor", payload: '#60A5FA' })
                dispatch({ type: "setTrelloColor", payload: 'blue' })
            }} className="bg-blue-300 h-[30px] w-[40px] rounded text-white">
                {state.color === '#60A5FA' && '✓'}
            </button>

            <button onClick={() => {
                dispatch({ type: "addColor", payload: '#3B82F6' })
                dispatch({ type: "setTrelloColor", payload: 'blue' })
            }} className="bg-blue-400 h-[30px] w-[40px] rounded text-white">
                {state.color === '#3B82F6' && '✓'}
            </button>

            <button onClick={() => {
                dispatch({ type: "addColor", payload: '#2563EB' })
                dispatch({ type: "setTrelloColor", payload: 'blue' })
            }} className="bg-blue-500 h-[30px] w-[40px] rounded text-white">
                {state.color === '#2563EB' && '✓'}
            </button>

            <button onClick={() => {
                dispatch({ type: "addColor", payload: '#A78BFA' })
                dispatch({ type: "setTrelloColor", payload: 'purple' })
            }} className="bg-purple-400 h-[30px] w-[40px] rounded text-white">
                {state.color === '#A78BFA' && '✓'}
            </button>

            <button onClick={() => {
                dispatch({ type: "addColor", payload: '#7C3AED' })
                dispatch({ type: "setTrelloColor", payload: 'purple' })
            }} className="bg-purple-600 h-[30px] w-[40px] rounded text-white">
                {state.color === '#7C3AED' && '✓'}
            </button>
        </div>

        <div className = "flex flex-col mx-3 my-3 gap-1">
            <p className = "">Board Title </p>
            <input className = "w-[98%] border rounded" type = "text" value = {state.boardTitle} onChange = {storeTitle}></input>
            <p>👋 Board title is required</p>
        </div>

        <div className = "w-[90%] border rounded-2 mx-3 my-3 bg-blue-400 text-center">
            <button onClick = {handleCreateBoard} disabled = {state.boardTitle.length === 0} className = "text-white disabled:cursor-not-allowed">Create</button>
        </div>

    </div>
    
    </>
  )
}

export default CreateBoard