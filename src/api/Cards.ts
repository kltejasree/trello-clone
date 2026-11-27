import TrelloApi from "./TrelloApi";

export async function createCard(listId: String, cardName: String) {
    const api = await TrelloApi.post(`/cards`, null, {
        params: {
            idList : listId,
            name: cardName
        }
    })

    return api.data;
}

export async function getAllCards(listId: String) {
    const api = await TrelloApi.get(`/lists/${listId}/cards`)
    return api.data
}

export async function archieveCard(cardId: String) {
    const api = await TrelloApi.put(`/cards/${cardId}/closed`, null, {
        params: {
            value: true,
        }
    })

    return api.data
}

export async function deleteCard(cardId: String) {
    const api = await TrelloApi.delete(`/cards/${cardId}`)

    return api.data
}


export async function updateCard(cardId: String, cardName: String) {
    const api = await TrelloApi.put(`/cards/${cardId}`, null, {
        params: {
            name: cardName
        }
    });

    return api.data;
}