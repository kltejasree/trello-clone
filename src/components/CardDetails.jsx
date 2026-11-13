import React, { useReducer, useEffect } from 'react'
import { Modal } from 'antd'

import CardActions from './CardActions'
import ChecklistSection from './ChecklistSection'
import Description from './Description'

import {
    createChecklist,
    getAllChecklists,
    deleteChecklist
} from '../api/CheckLists'

import {
    createCheckitem,
    getCheckItems,
    deleteCheckItem,
    updateCheckItem
} from '../api/CheckItems'


const initialState = {
    checklists: [],
    checkItems: {},
    showChecklist: []
}


const cardDetailsReducer = (state, action) => {
    switch (action.type) {

        case "fetchChecklists":
            return {
                ...state,
                checklists: action.payload
            }

        case "fetchCheckItems":
            return {
                ...state,
                checkItems: {
                    ...state.checkItems,
                    [action.payload.checklistId]: action.payload.data
                }
            }

        case "showChecklist":
            return {
                ...state,
                showChecklist: [...state.showChecklist, action.payload]
            }

        case "hideChecklist":
            return {
                ...state,
                showChecklist: state.showChecklist.filter(
                    (id) => id !== action.payload
                )
            }

        case "deleteCheckItems":
            const updatedItems = { ...state.checkItems }
            delete updatedItems[action.payload]

            return {
                ...state,
                checkItems: updatedItems
            }

        default:
            return state
    }
}


const CardDetails = ({ card, onClose }) => {

    const [state, dispatch] = useReducer(
        cardDetailsReducer,
        initialState
    )


    // Fetch all checklists

    const getchecklists = async () => {
        const data = await getAllChecklists(card.id)

        dispatch({
            type: "fetchChecklists",
            payload: data
        })
    }


    useEffect(() => {
        getchecklists()
    }, [card.id])


    // Fetch items belonging to a particular checklist

    const fetchCheckItems = async (checklistId) => {
        const data = await getCheckItems(checklistId)

        dispatch({
            type: "fetchCheckItems",
            payload: {
                checklistId,
                data
            }
        })
    }


    // Create checklist

    const handleAddChecklist = async (checkListTitle) => {
        await createChecklist(card.id, checkListTitle)

        await getchecklists()
    }


    // Delete checklist

    const handleDeleteChecklist = async (checklistId) => {

        await deleteChecklist(checklistId)

        await getchecklists()

        dispatch({
            type: "hideChecklist",
            payload: checklistId
        })

        dispatch({
            type: "deleteCheckItems",
            payload: checklistId
        })
    }


    // Toggle checklist

    const toggleChecklist = async (checklistId) => {

        if (state.showChecklist.includes(checklistId)) {

            dispatch({
                type: "hideChecklist",
                payload: checklistId
            })

        } else {

            dispatch({
                type: "showChecklist",
                payload: checklistId
            })

            await fetchCheckItems(checklistId)

        }
    }


    // Create checklist item

    const handleAddItem = async (checklistId, itemTitle) => {

        if (!itemTitle.trim()) return

        await createCheckitem(checklistId, itemTitle)

        await fetchCheckItems(checklistId)
    }


    // Update checklist item status

    const handleUpdateItem = async (checklistId, itemId, itemState) => {

        await updateCheckItem(card.id, itemId, itemState)

        await fetchCheckItems(checklistId)
    }


    // Delete checklist item

    const handleDeleteItem = async (checklistId, itemId) => {

        await deleteCheckItem(checklistId, itemId)

        await fetchCheckItems(checklistId)
    }


    return (
        <Modal
            title={card.name}
            open={true}
            onCancel={onClose}
            footer={null}
            width={800}
        >

            <div>

                <CardActions
                    onAddChecklist={handleAddChecklist}
                />

                <Description />

                <ChecklistSection
                    checklists={state.checklists}
                    checkItems={state.checkItems}
                    showChecklist={state.showChecklist}
                    onToggleChecklist={toggleChecklist}
                    onDeleteChecklist={handleDeleteChecklist}
                    onAddItem={handleAddItem}
                    onUpdateItem={handleUpdateItem}
                    onDeleteItem={handleDeleteItem}
                />

            </div>

        </Modal>
    )
}

export default CardDetails