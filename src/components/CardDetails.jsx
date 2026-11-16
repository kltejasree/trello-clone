import React, { useEffect } from 'react'
import { Modal } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

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

import {
    setChecklists,
    setCheckItems,
    toggleChecklist,
    removeChecklist
} from '../redux/features/cardDetails/cardDetailsSlice'


const CardDetails = ({ card, onClose }) => {

    const dispatch = useDispatch()

    // Get data from Redux
    const { checklists, checkItems, showChecklist } = useSelector(
        (state) => state.cardDetails
    )


    // Fetch all checklists
    const getchecklists = async () => {
        const data = await getAllChecklists(card.id)
        dispatch(setChecklists(data))
    }


    useEffect(() => {
        getchecklists()
    }, [card.id])


    // Fetch items belonging to a particular checklist
    const fetchCheckItems = async (checklistId) => {

        const data = await getCheckItems(checklistId)

        dispatch(setCheckItems({
            checklistId,
            data
        }))
    }


    // Create checklist
    const handleAddChecklist = async (checkListTitle) => {

        await createChecklist(card.id, checkListTitle)

        await getchecklists()
    }


    // Delete checklist
    const handleDeleteChecklist = async (checklistId) => {

        await deleteChecklist(checklistId)

        dispatch(removeChecklist(checklistId))

        await getchecklists()
    }


    // Expand or collapse checklist
    const handleToggleChecklist = async (checklistId) => {

        const isOpen = showChecklist.includes(checklistId)

        dispatch(toggleChecklist(checklistId))

        if (!isOpen) {
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
    const handleUpdateItem = async (checklistId, itemId, state) => {

        await updateCheckItem(card.id, itemId, state)

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
                    checklists={checklists}
                    checkItems={checkItems}
                    showChecklist={showChecklist}
                    onToggleChecklist={handleToggleChecklist}
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