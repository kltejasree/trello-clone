import TrelloApi from "./TrelloApi.js";

export async function createChecklist(cardId: String, checklistName: String) {
    const api = await TrelloApi.post(`/cards/${cardId}/checklists`, null, {
        params: {
            name : checklistName
        }
    })

    return api.data;
}

export async function getAllChecklists(cardId: String) {
    const api = await TrelloApi.get(`/cards/${cardId}/checklists`, {
        params: {
            checkItems: 'all',
        }
    })
    return api.data
}

export async function deleteChecklist(checklistId: String) {
    const api = await TrelloApi.delete(`/checklists/${checklistId}`)
    return api.data
}