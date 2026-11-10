import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getBoardById } from '../api/Boards'
import { getAllLists, CreateList } from '../api/List'
import { Button, Popover } from 'antd'
import { createCard } from '../api/Cards'
import Cards from './Cards'
import DeleteList from './DeleteList'
import { updateList } from '../api/List'



const BoardLists = () => {
    const { boardId } = useParams();

    const [board, setBoard] = useState(null);
    const [allLists, setAllLists] = useState([]);
    const [selectedListId, setSelectedListId] = useState(null);
    const [addList, setAddList] = useState(false);
    const [listName, setListName] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardCount, setCardCount] = useState(0);
    const [openPopoverListId, setOpenPopoverListId] = useState(null)
    const [editEnable, setEditEnable] = useState(null)
    console.log(editEnable)


    const hide = () => {
        setOpen(false);
    };

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    useEffect(() => {
        const fetchBoard = async () => {
            const data = await getBoardById(boardId);
            setBoard(data);
        };

        fetchBoard();
    }, [boardId]);

   
    const fetchLists = async () => {
        const data = await getAllLists(boardId);
        setAllLists(data);
    };

    useEffect(() => {
        fetchLists();
    }, [boardId])
    

    function openAddCard(listId) {
        setSelectedListId(listId);
    }

    function closeAddCard() {
        setSelectedListId(null);
        setCardName('');
    }

    function addListEnable() {
        setAddList(!addList);
    }

    function addListName(e) {
        setListName(e.target.value);
    }

    function closeAddList() {
        setAddList(false);
        setListName('');
    }

    async function addListToLists() {
        if (listName.trim() !== '') {
            await CreateList(listName.trim(), boardId);

            const data = await getAllLists(boardId);
            setAllLists(data);

            setAddList(false);
            setListName('');
        }
    }

    function addCardName(e) {
        setCardName(e.target.value);
    }

    async function createcard() {
        if (cardName.trim() !== '' && selectedListId) {
            await createCard(selectedListId, cardName.trim());

            setCardCount(prevCount => prevCount + 1);

            setCardName('');
            closeAddCard();
        }
    }

    async function saveListName(listId) {
        if(listName.trim() !== ''){
            await updateList(listId, listName.trim());
            await fetchLists();
            setEditEnable(null);
            setListName('');
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
        <div className="flex flex-wrap items-start gap-3" >

            {allLists.map((list) => (

                <div
                    key={list.id}
                    className="w-[280px] min-h-[120px] bg-white rounded-lg p-3 shadow-sm"
                >

                    <div className="flex justify-between items-center mb-4">
                        <p onDoubleClick = {() => {setEditEnable(list.id); setListName(list.name)}} className="font-semibold text-gray-800">
                            {editEnable === list.id ? <input type = "text" value = {listName} onChange = {(e) => setListName(e.target.value)} onKeyDown={(e) => {if(e.key === 'Enter') { saveListName(list.id)}}}></input> : list.name}
                        </p>

                        <Popover
                            content={<DeleteList listId = {list.id} refreshLists = {fetchLists}/>}
        
                            trigger="click"
                            open={openPopoverListId === list.id}
                            onOpenChange={(newOpen) => {
                                setOpenPopoverListId(newOpen ? list.id : null);
                            }}
                        >
                        


                        <button className="text-gray-600 hover:bg-gray-200 px-2 rounded">
                            ...
                        </button>

                        </Popover>
                    </div>

                    {/* Display existing cards */}
                    <Cards
                        listId={list.id}
                        cardsCount={cardCount}
                    />

                    {selectedListId === list.id ? (

                        <div className="flex flex-col gap-3 mt-3">

                            <input
                                type="text"
                                placeholder="Enter a title or paste a link"
                                value={cardName}
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

            {addList ? (

                <div className="w-[280px] min-h-[120px] bg-white rounded-lg p-3 shadow-sm">

                    <input
                        type="text"
                        placeholder="Enter list name..."
                        value={listName}
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
    );
    
};

export default BoardLists;