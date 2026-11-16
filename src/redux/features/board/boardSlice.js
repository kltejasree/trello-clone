import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allBoards: [],
    open: false
}

const boardSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {

    addBoards: (state, action) => {
        state.allBoards = action.payload
    },

    openPopover: (state, action) => {
        state.open = true

    },

    closePopover: (state, action) => {
        state.open = false
    }

    }
    
})

export const {addBoards, openPopover, closePopover} = boardSlice.actions;
export default boardSlice.reducer;
