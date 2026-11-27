import { useState } from 'react'
import { createBoard } from '../api/Boards'
import { Button, Input } from 'antd'

interface createBoardProps {
    onClose: () => void;
}

const CreateBoard = ( {onClose}: createBoardProps ) => {
    const [color, setColor] = useState('#3B82F6')
    const [trelloColor, setTrelloColor] = useState('blue')
    const [boardTitle, setBoardTitle] = useState('')

    function storeTitle(e: React.ChangeEvent<HTMLInputElement>) {
        let val = e.target.value
        setBoardTitle(val)
    }

    const handleCreateBoard = async function () {
        let finalBoardTitle = boardTitle.trim()
        if (finalBoardTitle.length !== 0) {
            await createBoard(finalBoardTitle, trelloColor)
            onClose();
        }
    }

    return (
        <>
            <div className="flex flex-col w-full max-w-[320px] h-auto gap-5 border rounded-lg p-4">

                {/* Header */}
                <div className="flex justify-between items-center">
                    <h4 className="text-lg font-bold">Create board</h4>
                    <Button type="text" onClick={onClose} className = "font-bold! text-lg!">x</Button>
                </div>

                {/* Background */}
                <div className="flex flex-col gap-3">
                    <h4 className="font-semibold">Background</h4>

                    <div className="flex gap-2">
                        <Button
                            onClick={() => {
                                setColor('#60A5FA')
                                setTrelloColor('blue')
                            }}
                            className="bg-blue-300! h-7.5 w-10 rounded text-white!"
                        >
                            {color === '#60A5FA' && '✓'}
                        </Button>

                        <Button
                            onClick={() => {
                                setColor('#3B82F6')
                                setTrelloColor('blue')
                            }}
                            className="bg-blue-400! h-7.5 w-10 rounded text-white!"
                        >
                            {color === '#3B82F6' && '✓'}
                        </Button>

                        <Button
                            onClick={() => {
                                setColor('#2563EB')
                                setTrelloColor('blue')
                            }}
                            className="bg-blue-500! h-7.5 w-10 rounded text-white!"
                        >
                            {color === '#2563EB' && '✓'}
                        </Button>

                        <Button
                            onClick={() => {
                                setColor('#A78BFA')
                                setTrelloColor('purple')
                            }}
                            className="bg-purple-400! h-7.5 w-10 rounded text-white!"
                        >
                            {color === '#A78BFA' && '✓'}
                        </Button>

                        <Button
                            onClick={() => {
                                setColor('#7C3AED')
                                setTrelloColor('purple')
                            }}
                            className="bg-purple-600! h-7.5 w-10 rounded text-white!"
                        >
                            {color === '#7C3AED' && '✓'}
                        </Button>
                    </div>
                </div>

                {/* Board Title */}
                <div className="flex flex-col gap-3">
                    <p className="font-semibold">Board Title</p>

                    <Input
                        placeholder="Board Title"
                        value={boardTitle}
                        onChange={storeTitle}
                        size="large"
                    />

                    <p className="text-xs text-gray-500">
                        👋 Board title is required
                    </p>
                </div>

                {/* Create Button */}
                <Button
                    type="primary"
                    size="large"
                    block
                    onClick={handleCreateBoard}
                >
                    Create
                </Button>

            </div>
        </>
    )
}

export default CreateBoard