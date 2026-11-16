import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    checklists: [],
    checkItems: {},
    showChecklist: [],
    openItemPopover: null
}

const cardDetailsSlice = createSlice({
    name: 'cardDetails',
    initialState,

    reducers: {
        setChecklists: (state, action) => {
            state.checklists = action.payload
        },

        setCheckItems: (state, action) => {
            const { checklistId, data } = action.payload
            state.checkItems[checklistId] = data
        },

        toggleChecklist: (state, action) => {
            const checklistId = action.payload

            if (state.showChecklist.includes(checklistId)) {
                state.showChecklist = state.showChecklist.filter(
                    (id) => id !== checklistId
                )
            } else {
                state.showChecklist.push(checklistId)
            }
        },

        removeChecklist: (state, action) => {
            const checklistId = action.payload

            state.checklists = state.checklists.filter(
                (checklist) => checklist.id !== checklistId
            )

            state.showChecklist = state.showChecklist.filter(
                (id) => id !== checklistId
            )

            delete state.checkItems[checklistId]
        },

        setOpenItemPopover: (state, action) => {
            state.openItemPopover = action.payload
        },

        closeItemPopover: (state) => {
            state.openItemPopover = null
        }
    }
})

export const {
    setChecklists,
    setCheckItems,
    toggleChecklist,
    removeChecklist,
    setOpenItemPopover,
    closeItemPopover
} = cardDetailsSlice.actions

export default cardDetailsSlice.reducer