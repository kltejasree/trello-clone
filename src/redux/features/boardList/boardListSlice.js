import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    board: null,
    allLists: []
}

const boardListsSlice = createSlice({
    name: 'boardLists',
    initialState,
    reducers: {
        setBoard: (state, action) => {
            state.board = action.payload
        },
        setAllLists: (state, action) => {
            state.allLists = action.payload
        }
    }
})

export const { setBoard, setAllLists } = boardListsSlice.actions

export default boardListsSlice.reducer