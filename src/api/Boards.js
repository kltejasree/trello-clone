import TrelloApi from "./TrelloApi";

import React from 'react'

export async function createBoard(boardName, color) {
    const api = await TrelloApi.post('/boards', null, {
        params: {
            name: boardName,
            prefs_background: color,
        },
    })

    return api.data;
}

export async function getAllBoards() {
    const api = await TrelloApi.get('/members/me/boards')

    return api.data;
}

export async function getBoardById(id) {
    const api = await TrelloApi.get(`/boards/${id}`)
    return api.data;
}

export async function deleteBoard(id) {
    const api = await TrelloApi.delete(`/boards/${id}`)
    return api.data;
}