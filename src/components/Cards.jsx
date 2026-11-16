import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getAllCards, archieveCard, updateCard } from '../api/Cards'

import { FaEdit } from 'react-icons/fa'
import { FaBoxArchive } from 'react-icons/fa6'

import { Popover, Input, Button } from 'antd'
import CardDetails from './CardDetails'

import {
    setCards,
    setHoverState,
    setEditCard,
    setEditedCardName,
    toggleCompleted,
    setSelectedCard
} from '../redux/features/cards/cardsSlice'


const Cards = ({ listId, cardsCount }) => {

    const dispatch = useDispatch()

    // Get data from Redux
    const {
        cardsByList,
        hoverState,
        editCard,
        editedCardName,
        completedCards,
        selectedCard
    } = useSelector((state) => state.cards)

    // Get cards belonging to this particular list
    const cardDetails = cardsByList[listId] || []


    // Fetch cards
    const fetchCards = async function () {

        const data = await getAllCards(listId)

        dispatch(setCards({
            listId,
            data
        }))
    }


    useEffect(() => {
        fetchCards()
    }, [listId, cardsCount])


    // Edit card
    const handleEdit = (card) => {

        dispatch(setEditCard(card.id))
        dispatch(setEditedCardName(card.name))
    }


    // Save edited card
    const handleSave = async (cardId) => {

        await updateCard(cardId, editedCardName)

        await fetchCards()

        dispatch(setEditCard(null))
        dispatch(setEditedCardName(''))
    }


    // Archive card
    const handleArchive = async (cardId) => {

        await archieveCard(cardId)

        await fetchCards()

        dispatch(setEditCard(null))
        dispatch(setEditedCardName(''))

        if (selectedCard?.id === cardId) {
            dispatch(setSelectedCard(null))
        }
    }


    // Complete card
    const handleComplete = (cardId) => {

        dispatch(toggleCompleted(cardId))
    }


    return (
        <>

            {cardDetails.map((card) => (

                <div key={card.id}>

                    <div
                        className="w-full p-3 border border-gray-300 rounded-lg cursor-pointer"

                        onMouseEnter={() => dispatch(setHoverState(card.id))}

                        onMouseLeave={() => dispatch(setHoverState(null))}

                        onClick={() => dispatch(setSelectedCard(card))}
                    >

                        {hoverState === card.id || editCard === card.id ? (

                            <div className="flex justify-between items-center">

                                <div className="flex items-center gap-2">

                                    <input
                                        type="checkbox"
                                        name="complete"

                                        checked={completedCards.includes(card.id)}

                                        onChange={() => handleComplete(card.id)}

                                        onClick={(e) => e.stopPropagation()}
                                    />

                                    <span>{card.name}</span>

                                </div>


                                {completedCards.includes(card.id) ? (

                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleArchive(card.id)
                                        }}
                                    >

                                        <FaBoxArchive className="h-5 w-5" />

                                    </Button>

                                ) : (

                                    <Popover
                                        trigger="click"

                                        open={editCard === card.id}

                                        onOpenChange={(open) => {

                                            if (open) {
                                                handleEdit(card)
                                            } else {
                                                dispatch(setEditCard(null))
                                            }

                                        }}

                                        content={

                                            <div
                                                className="flex flex-col gap-3 w-56"

                                                onClick={(e) => e.stopPropagation()}
                                            >

                                                <Input
                                                    value={editedCardName}

                                                    onChange={(e) =>
                                                        dispatch(setEditedCardName(e.target.value))
                                                    }

                                                    placeholder="Enter card name"
                                                />


                                                <div className="flex justify-between items-center">

                                                    <Button
                                                        type="primary"
                                                        onClick={() => handleSave(card.id)}
                                                    >
                                                        Save
                                                    </Button>

                                                    <Button
                                                        onClick={() => handleArchive(card.id)}
                                                    >
                                                        Archive
                                                    </Button>

                                                </div>

                                            </div>
                                        }
                                    >

                                        <FaEdit
                                            className="w-5 h-5 cursor-pointer"

                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleEdit(card)
                                            }}
                                        />

                                    </Popover>

                                )}

                            </div>

                        ) : (

                            <span>{card.name}</span>

                        )}

                    </div>


                    {/* Card Details Modal */}
                    {selectedCard?.id === card.id && (

                        <CardDetails
                            card={selectedCard}

                            onClose={() => dispatch(setSelectedCard(null))}
                        />

                    )}

                </div>

            ))}

        </>
    )
}

export default Cards