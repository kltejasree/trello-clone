import { useState } from 'react'
import { Popover, Button } from 'antd'
import { FaChevronDown, FaChevronRight } from 'react-icons/fa'

import ProgressBar from './ProgressBar'
import ChecklistItem from './Checklistitem'
import AddCheckItem from './AddCheckItem'

type ChecklistType = {
  id: string;
  name: string;
}

type ChecklistItemType = {
  id: string;
  name: string;
  state: 'complete' | 'incomplete';
}

interface ChecklistSectionProps {
  checklists: ChecklistType[];
  checkItems: Record<string, ChecklistItemType[]>;
  showChecklist: string[];

  onToggleChecklist: (checklistId: string) => Promise<void>;
  onDeleteChecklist: (checklistId: string) => Promise<void>;
  onAddItem: (
    checklistId: string,
    itemTitle: string
  ) => Promise<void>;
  onUpdateItem: (
    checklistId: string,
    itemId: string,
    state: 'complete' | 'incomplete'
  ) => Promise<void>;
  onDeleteItem: (
    checklistId: string,
    itemId: string
  ) => Promise<void>;
}

const ChecklistSection = ({
  checklists,
  checkItems,
  showChecklist,
  onToggleChecklist,
  onDeleteChecklist,
  onAddItem,
  onUpdateItem,
  onDeleteItem
}: ChecklistSectionProps) => {

  const [enableAddItem, setEnableAddItem] = useState<string | null>(null)
  const [deleteOpen, setDeleteOpen] = useState<string | null>(null)

  return (
    <div className="mt-8 pl-8">

      {checklists.map((checklist) => {

        const isOpen = showChecklist.includes(checklist.id)

        const items = checkItems[checklist.id] || []

        const totalItems = items.length

        const completedItems = items.filter(
          (item) => item.state === 'complete'
        ).length

        const progress = totalItems === 0
          ? 0
          : Math.round((completedItems / totalItems) * 100)

        return (
          <div key={checklist.id} className="mt-6">

            {/* Checklist heading */}

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-2">

                {isOpen ? (
                  <FaChevronDown
                    onClick={() => onToggleChecklist(checklist.id)}
                    className="w-4 h-4 cursor-pointer"
                  />
                ) : (
                  <FaChevronRight
                    onClick={() => onToggleChecklist(checklist.id)}
                    className="w-4 h-4 cursor-pointer"
                  />
                )}

                <h3 className="font-semibold text-base m-0">
                  {checklist.name}
                </h3>

              </div>

              {/* Delete checklist */}

              <Popover
                trigger="click"
                open={deleteOpen === checklist.id}
                onOpenChange={(newOpen: boolean) => {
                  setDeleteOpen(newOpen ? checklist.id : null)
                }}
                content={
                  <div className="flex flex-col gap-2 w-56">

                    <div className="flex justify-between">
                      <h4>{`Delete ${checklist.name}`}</h4>

                      <Button onClick={() => setDeleteOpen(null)}>
                        x
                      </Button>
                    </div>

                    <p>
                      Are you sure you want to delete this checklist?
                    </p>

                    <Button
                      type="primary"
                      danger
                      onClick={async () => {
                        await onDeleteChecklist(checklist.id)
                        setDeleteOpen(null)
                      }}
                    >
                      Delete Checklist
                    </Button>

                  </div>
                }
              >

                <Button className="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white hover:bg-gray-100">
                  Delete
                </Button>

              </Popover>

            </div>

            {/* Checklist content */}

            {isOpen && (
              <>

                <ProgressBar val={progress} />

                {/* Checklist items */}

                <div className="mt-3">

                  {items.map((item) => (
                    <ChecklistItem
                      key={item.id}
                      item={item}
                      onUpdate={(itemId, state) =>
                        onUpdateItem(checklist.id, itemId, state)
                      }
                      onDelete={(itemId) =>
                        onDeleteItem(checklist.id, itemId)
                      }
                    />
                  ))}

                </div>

                {/* Add item Button */}

                <div className="mt-3">

                  <Button
                    onClick={() => setEnableAddItem(
                      enableAddItem === checklist.id
                        ? null
                        : checklist.id
                    )}
                    className="border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white hover:bg-gray-100"
                  >
                    Add Item
                  </Button>

                </div>

                {/* Add item input */}

                {enableAddItem === checklist.id && (
                  <AddCheckItem
                    onAdd={async (itemTitle) => {
                      await onAddItem(checklist.id, itemTitle)
                      setEnableAddItem(null)
                    }}
                    onCancel={() => setEnableAddItem(null)}
                  />
                )}

              </>
            )}

          </div>
        )
      })}

    </div>
  )
}

export default ChecklistSection