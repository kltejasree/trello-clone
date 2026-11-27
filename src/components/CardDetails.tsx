import { useState, useEffect } from 'react'
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

interface CardType {
  id: string;
  name: string;
}

interface CardDetailsProps {
  card: CardType;
  onClose: () => void;
}

interface CheckListType {
  id: string;
  name: string;
}

type ItemState = 'complete' | 'incomplete';

interface CheckListItem {
  id: string;
  name: string;
  state: ItemState;
}

const CardDetails = ({ card, onClose }: CardDetailsProps) => {

  const [checklists, setChecklists] = useState<CheckListType[]>([])
  const [checkItems, setCheckItems] = useState<Record<string, CheckListItem[]>>({})
  const [showChecklist, setShowChecklist] = useState<string[]>([])

  // Fetch all checklists

  const getchecklists = async () => {
    const data: CheckListType[] = await getAllChecklists(card.id)
    setChecklists(data)
  }

  useEffect(() => {
    getchecklists()
  }, [card.id])

  // Fetch items belonging to a particular checklist

  const fetchCheckItems = async (checklistId: string) => {
    const data: CheckListItem[] = await getCheckItems(checklistId)

    setCheckItems((prev) => ({
      ...prev,
      [checklistId]: data
    }))
  }

  // Create checklist

  const handleAddChecklist = async (checkListTitle: string) => {
    await createChecklist(card.id, checkListTitle)
    await getchecklists()
  }

  // Delete checklist

  const handleDeleteChecklist = async (checklistId: string) => {
    await deleteChecklist(checklistId)

    await getchecklists()

    setShowChecklist((prev) =>
      prev.filter((id) => id !== checklistId)
    )

    setCheckItems((prev) => {
      const updated = { ...prev }
      delete updated[checklistId]
      return updated
    })
  }

  // Expand and collapse checklist

  const toggleChecklist = async (checklistId: string) => {

    if (showChecklist.includes(checklistId)) {

      setShowChecklist((prev) =>
        prev.filter((id) => id !== checklistId)
      )

    } else {

      setShowChecklist((prev) => [...prev, checklistId])

      await fetchCheckItems(checklistId)

    }
  }

  // Create checklist item

  const handleAddItem = async (checklistId: string, itemTitle: string) => {

    if (!itemTitle.trim()) return

    await createCheckitem(checklistId, itemTitle)

    await fetchCheckItems(checklistId)
  }

  // Update checklist item status

  const handleUpdateItem = async (
    checklistId: string,
    itemId: string,
    state: ItemState
  ) => {

    await updateCheckItem(card.id, itemId, state)

    await fetchCheckItems(checklistId)
  }

  // Delete checklist item

  const handleDeleteItem = async (checklistId: string, itemId: string) => {

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