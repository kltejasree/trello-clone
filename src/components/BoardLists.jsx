import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getBoardById } from '../api/Boards'
import { getAllLists, CreateList, updateList } from '../api/List'
import { createCard } from '../api/Cards'

import { Button, Popover } from 'antd'
import Cards from './Cards'
import DeleteList from './DeleteList'

import {
    setBoard,
    setAllLists
} from '../redux/features/boardList/boardListSlice'


const BoardLists = () => {

    const { boardId } = useParams()

    const dispatch = useDispatch()

    // Getting data from Redux store
    const { board, allLists } = useSelector((state) => state.boardLists)

    // Local UI states
    const [selectedListId, setSelectedListId] = useState(null)
    const [addList, setAddList] = useState(false)
    const [listName, setListName] = useState('')
    const [cardName, setCardName] = useState('')
    const [cardCount, setCardCount] = useState(0)
    const [openPopoverListId, setOpenPopoverListId] = useState(null)
    const [editEnable, setEditEnable] = useState(null)


    // Fetch board details
    useEffect(() => {

        const fetchBoard = async () => {
            const data = await getBoardById(boardId)
            dispatch(setBoard(data))
        }

        fetchBoard()

    }, [boardId, dispatch])


    // Fetch all lists
    const fetchLists = async () => {
        const data = await getAllLists(boardId)
        dispatch(setAllLists(data))
    }


    useEffect(() => {
        fetchLists()
    }, [boardId])


    // Add card section
    function openAddCard(listId) {
        setSelectedListId(listId)
    }

    function closeAddCard() {
        setSelectedListId(null)
        setCardName('')
    }


    // Add list section
    function addListEnable() {
        setAddList(!addList)
    }

    function addListName(e) {
        setListName(e.target.value)
    }

    function closeAddList() {
        setAddList(false)
        setListName('')
    }


    // Create a new list
    async function addListToLists() {

        if (listName.trim() !== '') {

            await CreateList(listName.trim(), boardId)

            await fetchLists()

            setAddList(false)
            setListName('')
        }
    }


    // Card name
    function addCardName(e) {
        setCardName(e.target.value)
    }


    // Create a new card
    async function createcard() {

        if (cardName.trim() !== '' && selectedListId) {

            await createCard(selectedListId, cardName.trim())

            setCardCount(prevCount => prevCount + 1)

            setCardName('')

            closeAddCard()
        }
    }


    // Update list name
    async function saveListName(listId) {

        if (listName.trim() !== '') {

            await updateList(listId, listName.trim())

            await fetchLists()

            setEditEnable(null)
            setListName('')
        }
    }


    return (
        <>
            <div
                className="min-h-screen w-full p-5"
                style={{
                    backgroundImage: board?.prefs?.backgroundImage
                        ? `url(${board.prefs.backgroundImage})`
                        : 'none',

                    backgroundColor: board?.prefs?.backgroundColor || '#2b2b2e',

                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }}
            >

                <div className="flex flex-wrap items-start gap-3">

                    {allLists.map((list) => (

                        <div
                            key={list.id}
                            className="w-[280px] min-h-[120px] bg-white rounded-lg p-3 shadow-sm"
                        >

                            {/* List header */}
                            <div className="flex justify-between items-center mb-4">

                                <p
                                    onDoubleClick={() => {
                                        setEditEnable(list.id)
                                        setListName(list.name)
                                    }}
                                    className="font-semibold text-gray-800"
                                >

                                    {editEnable === list.id ? (

                                        <input
                                            type="text"
                                            value={listName}
                                            onChange={(e) => setListName(e.target.value)}
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


                                {/* Delete list popover */}
                                <Popover
                                    content={
                                        <DeleteList
                                            listId={list.id}
                                            refreshLists={fetchLists}
                                        />
                                    }
                                    trigger="click"
                                    open={openPopoverListId === list.id}
                                    onOpenChange={(newOpen) => {
                                        setOpenPopoverListId(
                                            newOpen ? list.id : null
                                        )
                                    }}
                                >

                                    <button className="text-gray-600 hover:bg-gray-200 px-2 rounded">
                                        ...
                                    </button>

                                </Popover>

                            </div>


                            {/* Cards */}
                            <Cards
                                listId={list.id}
                                cardsCount={cardCount}
                            />


                            {/* Add card */}
                            {selectedListId === list.id ? (

                                <div>

                                    <input
                                        type="text"
                                        placeholder="Enter card name"
                                        value={cardName}
                                        onChange={addCardName}
                                        className="border p-2 w-full rounded mb-2"
                                    />

                                    <div className="flex gap-2">

                                        <Button
                                            type="primary"
                                            onClick={createcard}
                                        >
                                            Add Card
                                        </Button>

                                        <Button onClick={closeAddCard}>
                                            X
                                        </Button>

                                    </div>

                                </div>

                            ) : (

                                <button
                                    onClick={() => openAddCard(list.id)}
                                    className="text-gray-600 hover:bg-gray-200 w-full text-left p-2 rounded"
                                >
                                    + Add a card
                                </button>

                            )}

                        </div>

                    ))}


                    {/* Add another list */}
                    <div className="w-[280px]">

                        {addList ? (

                            <div className="bg-white p-3 rounded-lg shadow-sm">

                                <input
                                    type="text"
                                    placeholder="Enter list name"
                                    value={listName}
                                    onChange={addListName}
                                    className="border p-2 w-full rounded mb-2"
                                />

                                <div className="flex gap-2">

                                    <Button
                                        type="primary"
                                        onClick={addListToLists}
                                    >
                                        Add list
                                    </Button>

                                    <Button onClick={closeAddList}>
                                        X
                                    </Button>

                                </div>

                            </div>

                        ) : (

                            <button
                                onClick={addListEnable}
                                className="bg-white/30 hover:bg-white/50 text-white p-3 rounded-lg w-full text-left"
                            >
                                + Add another List
                            </button>

                        )}

                    </div>

                </div>

            </div>
        </>
    )
}

export default BoardLists