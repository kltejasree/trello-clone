import TrelloApi from "./TrelloApi";

export async function createChecklist(cardId, checklistName) {
    const api = await TrelloApi.post(`/cards/${cardId}/checklists`, null, {
        params: {
            name : checklistName
        }
    })

    return api.data;
}

export async function getAllChecklists(cardId) {
    const api = await TrelloApi.get(`/cards/${cardId}/checklists`, {
        params: {
            checkItems: 'all',
        }
    })
    return api.data
}

export async function deleteChecklist(checklistId) {
    const api = await TrelloApi.delete(`/checklists/${checklistId}`)
    return api.data
}