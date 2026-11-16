import { configureStore } from '@reduxjs/toolkit'
import boardSlice from '../features/board/boardSlice'
import boardListsReducer from '../features/boardList/boardListSlice'
import cardDetailsReducer from '../features/cardDetails/cardDetailsSlice'
import cardReducer from '../features/cards/cardsSlice'

const trelloStore = configureStore({
    reducer: {
        boardSlice,
        boardLists: boardListsReducer,
        cardDetails: cardDetailsReducer,
        cards: cardReducer

    }
})

export default trelloStore