import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getBoardById } from '../api/Boards'
import { getAllLists, CreateList } from '../api/List'
import { Input, Button, Popover } from 'antd'
import { createCard } from '../api/Cards'
import Cards from './Cards'
import { updateList } from '../api/List'
import ArchiveList from './ArchieveList'


interface boardType {
    id: string;
    name: string;
    prefs: {
    backgroundImage?: string;
    backgroundColor?: string;
    }

}

interface listType {
    id: string;
    name: string;

}

const BoardLists = () => {
    const { boardId } = useParams<{boardId: string}>();

    const [board, setBoard] = useState<boardType | null>(null);
    const [allLists, setAllLists] = useState<listType[]>([]);
    const [selectedListId, setSelectedListId] = useState<string | null>(null);
    const [addList, setAddList] = useState<boolean>(false);
    const [listName, setListName] = useState<string>('');
    const [cardName, setCardName] = useState<string>('');
    const [cardCount, setCardCount] = useState<number>(0);
    const [openPopoverListId, setOpenPopoverListId] = useState<string | null>(null)
    const [editEnable, setEditEnable] = useState<string | null>(null)
    console.log(editEnable)

    useEffect(() => {
        const fetchBoard = async () => {
            if(!boardId) return
            const data: boardType = await getBoardById(boardId);
            setBoard(data);
    
        };

        fetchBoard();
    }, [boardId]);

   
    const fetchLists = async () => {
        if(!boardId) return
        const data = await getAllLists(boardId);
        setAllLists(data);
    };

    useEffect(() => {
        fetchLists();
    }, [boardId])
    

    function openAddCard(listId: string) {
        setSelectedListId(listId);
    }

    function closeAddCard() {
        setSelectedListId(null);
        setCardName('');
    }

    function addListEnable() {
        setAddList(!addList);
    }

    function addListName(e: React.ChangeEvent<HTMLInputElement>) {
        setListName(e.target.value);
    }

    function closeAddList() {
        setAddList(false);
        setListName('');
    }

    async function addListToLists() {
        if (listName.trim() !== '') {
            if(!boardId) return 
            await CreateList(listName.trim(), boardId);

            const data = await getAllLists(boardId);
            setAllLists(data);

            setAddList(false);
            setListName('');
        }
    }

    function addCardName(e: React.ChangeEvent<HTMLInputElement>) {
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

    async function saveListName(listId: string) {
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
                    className="w-70 min-h-30 bg-white rounded-lg p-3 shadow-sm"
                >

                    <div className="flex justify-between items-center mb-4">
                        <p onDoubleClick = {() => {setEditEnable(list.id); setListName(list.name)}} className="font-semibold text-gray-800">
                            {editEnable === list.id ? <Input type = "text" value = {listName} onChange = {(e) => setListName(e.target.value)} onKeyDown={(e) => {if(e.key === 'Enter') { saveListName(list.id)}}}></Input> : list.name}
                        </p>

                        <Popover
                            content={<ArchiveList listId = {list.id} refreshLists = {fetchLists}/>}
        
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

                            <Input
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

                                <Button onClick={closeAddCard} className = "font-bold!">
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

                <div className="w-70 min-h-30 bg-white rounded-lg p-3 shadow-sm">

                    <Input
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
                    className="w-70 h-auto border border-gray-300 text-left text-black hover:bg-gray-200 p-2 rounded-lg"
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