import TrelloApi from "./TrelloApi";

export async function createCheckitem(checklistId: String, checkItemName: String) {
    const api = await TrelloApi.post(`/checklists/${checklistId}/checkItems`, null, {
        params: {
            name: checkItemName
        }
    })

    return api.data
}

export async function getCheckItems(checklistId: String) {
    const api = await TrelloApi.get(`checklists/${checklistId}/checkItems`)
    return api.data
}

export async function deleteCheckItem(checklistId: String, checkItemId: String) {
    const api = await TrelloApi.delete(`checklists/${checklistId}/checkItems/${checkItemId}`)
    return api.data
}

export async function updateCheckItem(cardId: String, checkItemId: String, state: 'complete' | 'incomplete') {
    const api = await TrelloApi.put(
        `/cards/${cardId}/checkItem/${checkItemId}`,
        null,
        {
            params: {
                state: state
            }
        }
    )

    return api.data
}


