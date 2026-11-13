import React, { useReducer, useEffect } from 'react'
import { getAllCards, archieveCard, updateCard } from '../api/Cards'
import { FaEdit } from 'react-icons/fa'
import { FaBoxArchive } from 'react-icons/fa6'
import { Popover, Input, Button } from 'antd'
import CardDetails from './CardDetails'

const initialState = {
    cardDetails: [],
    hoverState: null,
    editCard: null,
    editedCardName: '',
    completedCards: [],
    selectedCard: null
}

const cardsReducer = (state, action) => {
    switch (action.type) {

        case "fetchCards":
            return {
                ...state,
                cardDetails: action.payload
            }

        case "hoverState":
            return {
                ...state,
                hoverState: action.payload
            }

        case "editCard":
            return {
                ...state,
                editCard: action.payload
            }

        case "editedCardName":
            return {
                ...state,
                editedCardName: action.payload
            }

        case "completedCards":
            return {
                ...state,
                completedCards: action.payload
            }

        case "selectedCard":
            return {
                ...state,
                selectedCard: action.payload
            }

        default:
            return state
    }
}


const Cards = ({ listId, cardsCount }) => {

    const [state, dispatch] = useReducer(cardsReducer, initialState)

    const fetchCards = async function () {
        const data = await getAllCards(listId)

        dispatch({
            type: "fetchCards",
            payload: data
        })
    }

    useEffect(() => {
        fetchCards()
    }, [listId, cardsCount])


    const handleEdit = (card) => {

        dispatch({
            type: "editCard",
            payload: card.id
        })

        dispatch({
            type: "editedCardName",
            payload: card.name
        })
    }


    const handleSave = async (cardId) => {

        await updateCard(cardId, state.editedCardName)

        await fetchCards()

        dispatch({
            type: "editCard",
            payload: null
        })
    }


    const handleArchive = async (cardId) => {

        await archieveCard(cardId)

        await fetchCards()

        dispatch({
            type: "editCard",
            payload: null
        })
    }


    const handleComplete = (cardId) => {

        if (state.completedCards.includes(cardId)) {

            let newArray = [...state.completedCards]

            let index = newArray.indexOf(cardId)

            newArray.splice(index, 1)

            dispatch({
                type: "completedCards",
                payload: newArray
            })

        } else {

            dispatch({
                type: "completedCards",
                payload: [...state.completedCards, cardId]
            })

        }
    }


    return (
        <>
            {state.cardDetails.map((card) => (

                <div key={card.id}>

                    <div
                        className="w-full p-3 border border-gray-300 rounded-lg cursor-pointer"
                        onMouseEnter={() => dispatch({
                            type: "hoverState",
                            payload: card.id
                        })}
                        onMouseLeave={() => dispatch({
                            type: "hoverState",
                            payload: null
                        })}
                        onClick={() => dispatch({
                            type: "selectedCard",
                            payload: card
                        })}
                    >

                        {state.hoverState === card.id || state.editCard === card.id ? (

                            <div className="flex justify-between items-center">

                                <div className="flex items-center gap-2">

                                    <input
                                        type="checkbox"
                                        name="complete"
                                        checked={state.completedCards.includes(card.id)}
                                        onChange={(e) => {
                                            e.stopPropagation()
                                            handleComplete(card.id)
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                    />

                                    <span>{card.name}</span>

                                </div>

                                {state.completedCards.includes(card.id) ? (

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
                                        open={state.editCard === card.id}
                                        onOpenChange={(open) => {
                                            if (open) {
                                                handleEdit(card)
                                            } else {
                                                dispatch({
                                                    type: "editCard",
                                                    payload: null
                                                })
                                            }
                                        }}
                                        content={
                                            <div
                                                className="flex flex-col gap-3 w-56"
                                                onClick={(e) => e.stopPropagation()}
                                            >

                                                <Input
                                                    value={state.editedCardName}
                                                    onChange={(e) => dispatch({
                                                        type: "editedCardName",
                                                        payload: e.target.value
                                                    })}
                                                    placeholder="Enter card name"
                                                />

                                                <div className="flex justify-between items-center">

                                                    <Button
                                                        type="primary"
                                                        onClick={() => handleSave(card.id)}
                                                    >
                                                        Save
                                                    </Button>

                                                    <Button onClick={() => handleArchive(card.id)}>
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


                    {state.selectedCard?.id === card.id && (

                        <CardDetails
                            card={state.selectedCard}
                            onClose={() => dispatch({
                                type: "selectedCard",
                                payload: null
                            })}
                        />

                    )}

                </div>

            ))}

        </>
    )
}

export default Cards