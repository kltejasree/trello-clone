import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cardsByList: {},
    hoverState: null,
    editCard: null,
    editedCardName: '',
    completedCards: [],
    selectedCard: null
}

const cardsSlice = createSlice({
    name: 'cards',
    initialState,

    reducers: {

        setCards: (state, action) => {
            const { listId, data } = action.payload
            state.cardsByList[listId] = data
        },

        setHoverState: (state, action) => {
            state.hoverState = action.payload
        },

        setEditCard: (state, action) => {
            state.editCard = action.payload
        },

        setEditedCardName: (state, action) => {
            state.editedCardName = action.payload
        },

        toggleCompleted: (state, action) => {
            const cardId = action.payload

            if (state.completedCards.includes(cardId)) {
                state.completedCards = state.completedCards.filter(
                    (id) => id !== cardId
                )
            } else {
                state.completedCards.push(cardId)
            }
        },

        setSelectedCard: (state, action) => {
            state.selectedCard = action.payload
        }

    }
})

export const {
    setCards,
    setHoverState,
    setEditCard,
    setEditedCardName,
    toggleCompleted,
    setSelectedCard
} = cardsSlice.actions

export default cardsSlice.reducer