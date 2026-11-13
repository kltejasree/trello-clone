import React, { useReducer, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getBoardById } from '../api/Boards'
import { getAllLists, CreateList, updateList } from '../api/List'
import { Button, Popover } from 'antd'
import { createCard } from '../api/Cards'
import Cards from './Cards'
import DeleteList from './DeleteList'

const initialState = {
    board: null,
    AllLists: [],
    selectedListId: null,
    addList: false,
    listName: '',
    cardName: '',
    cardCount: 0,
    openPopoverListId: null,
    editEnable: null
}

const listsReducer = (state, action) => {
    switch(action.type) {

        case "fetchBoard":
            return {
                ...state,
                board: action.payload
            }

        case "fetchLists":
            return {
                ...state,
                AllLists: action.payload
            }

        case "selectedListId":
            return {
                ...state,
                selectedListId: action.payload
            }

        case "addList":
            return {
                ...state,
                addList: action.payload
            }

        case "listName":
            return {
                ...state,
                listName: action.payload
            }

        case "cardName":
            return {
                ...state,
                cardName: action.payload
            }

        case "cardCount":
            return {
                ...state,
                cardCount: state.cardCount + 1
            }

        case "openPopoverListId":
            return {
                ...state,
                openPopoverListId: action.payload
            }

        case "editEnable":
            return {
                ...state,
                editEnable: action.payload
            }

        default:
            return state
    }
}


const BoardLists = () => {

    const { boardId } = useParams()

    const [state, dispatch] = useReducer(listsReducer, initialState)


    // Fetch Board
    useEffect(() => {
        const fetchBoard = async () => {
            const data = await getBoardById(boardId)

            dispatch({
                type: "fetchBoard",
                payload: data
            })
        }

        fetchBoard()
    }, [boardId])


    // Fetch Lists
    const fetchLists = async () => {
        const data = await getAllLists(boardId)

        dispatch({
            type: "fetchLists",
            payload: data
        })
    }

    useEffect(() => {
        fetchLists()
    }, [boardId])


    // Open Add Card
    function openAddCard(listId) {
        dispatch({
            type: "selectedListId",
            payload: listId
        })
    }


    // Close Add Card
    function closeAddCard() {
        dispatch({
            type: "selectedListId",
            payload: null
        })

        dispatch({
            type: "cardName",
            payload: ''
        })
    }


    // Open / Close Add List
    function addListEnable() {
        dispatch({
            type: "addList",
            payload: !state.addList
        })
    }


    // Store List Name
    function addListName(e) {
        dispatch({
            type: "listName",
            payload: e.target.value
        })
    }


    // Close Add List
    function closeAddList() {
        dispatch({
            type: "addList",
            payload: false
        })

        dispatch({
            type: "listName",
            payload: ''
        })
    }


    // Create List
    async function addListToLists() {
        if (state.listName.trim() !== '') {

            await CreateList(state.listName.trim(), boardId)

            await fetchLists()

            dispatch({
                type: "addList",
                payload: false
            })

            dispatch({
                type: "listName",
                payload: ''
            })
        }
    }


    // Store Card Name
    function addCardName(e) {
        dispatch({
            type: "cardName",
            payload: e.target.value
        })
    }


    // Create Card
    async function createcard() {
        if (state.cardName.trim() !== '' && state.selectedListId) {

            await createCard(state.selectedListId, state.cardName.trim())

            dispatch({
                type: "cardCount"
            })

            dispatch({
                type: "cardName",
                payload: ''
            })

            closeAddCard()
        }
    }


    // Save Updated List Name
    async function saveListName(listId) {
        if (state.listName.trim() !== '') {

            await updateList(listId, state.listName.trim())

            await fetchLists()

            dispatch({
                type: "editEnable",
                payload: null
            })

            dispatch({
                type: "listName",
                payload: ''
            })
        }
    }


    return (
        <>
            <div
                className="min-h-screen w-full p-5"
                style={{
                    backgroundImage: state.board?.prefs?.backgroundImage
                        ? `url(${state.board.prefs.backgroundImage})`
                        : 'none',

                    backgroundColor: state.board?.prefs?.backgroundColor || '#2b2b2e',

                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }}
            >

                <div className="flex flex-wrap items-start gap-3">

                    {state.AllLists.map((list) => (

                        <div
                            key={list.id}
                            className="w-[280px] min-h-[120px] bg-white rounded-lg p-3 shadow-sm"
                        >

                            <div className="flex justify-between items-center mb-4">

                                <p
                                    onDoubleClick={() => {
                                        dispatch({
                                            type: "editEnable",
                                            payload: list.id
                                        })

                                        dispatch({
                                            type: "listName",
                                            payload: list.name
                                        })
                                    }}
                                    className="font-semibold text-gray-800"
                                >

                                    {state.editEnable === list.id ? (

                                        <input
                                            type="text"
                                            value={state.listName}
                                            onChange={addListName}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    saveListName(list.id)
                                                }
                                            }}
                                        />

                                    ) : (

                                        list.name

                                    )}

                                </p>


                                <Popover
                                    content={
                                        <DeleteList
                                            listId={list.id}
                                            refreshLists={fetchLists}
                                        />
                                    }
                                    trigger="click"
                                    open={state.openPopoverListId === list.id}
                                    onOpenChange={(newOpen) => {
                                        dispatch({
                                            type: "openPopoverListId",
                                            payload: newOpen ? list.id : null
                                        })
                                    }}
                                >

                                    <button className="text-gray-600 hover:bg-gray-200 px-2 rounded">
                                        ...
                                    </button>

                                </Popover>

                            </div>


                            {/* Display Existing Cards */}

                            <Cards
                                listId={list.id}
                                cardsCount={state.cardCount}
                            />


                            {/* Add Card */}

                            {state.selectedListId === list.id ? (

                                <div className="flex flex-col gap-3 mt-3">

                                    <input
                                        type="text"
                                        placeholder="Enter a title or paste a link"
                                        value={state.cardName}
                                        onChange={addCardName}
                                        className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                                    />

                                    <div className="flex items-center gap-2">

                                        <Button
                                            type="primary"
                                            onClick={createcard}
                                        >
                                            Add Card
                                        </Button>

                                        <Button onClick={closeAddCard}>
                                            x
                                        </Button>

                                    </div>

                                </div>

                            ) : (

                                <button
                                    onClick={() => openAddCard(list.id)}
                                    className="w-full text-left text-gray-600 hover:bg-gray-200 p-2 rounded-lg"
                                >
                                    + Add a card
                                </button>

                            )}

                        </div>

                    ))}


                    {/* Add List */}

                    {state.addList ? (

                        <div className="w-[280px] min-h-[120px] bg-white rounded-lg p-3 shadow-sm">

                            <input
                                type="text"
                                placeholder="Enter list name..."
                                value={state.listName}
                                onChange={addListName}
                                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                            />

                            <div className="flex items-center gap-2 mt-2">

                                <Button
                                    onClick={addListToLists}
                                    type="primary"
                                >
                                    Add list
                                </Button>

                                <Button onClick={closeAddList}>
                                    x
                                </Button>

                            </div>

                        </div>

                    ) : (

                        <button
                            onClick={addListEnable}
                            className="w-[280px] h-auto border border-gray-300 text-left text-black hover:bg-gray-200 p-2 rounded-lg"
                        >
                            + Add another List
                        </button>

                    )}

                </div>

            </div>
        </>
    )
}

export default BoardLists