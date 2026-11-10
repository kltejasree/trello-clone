import TrelloApi from "./TrelloApi";

export async function createCard(listId, cardName) {
    const api = await TrelloApi.post(`/cards`, null, {
        params: {
            idList : listId,
            name: cardName
        }
    })

    return api.data;
}

export async function getAllCards(listId) {
    const api = await TrelloApi.get(`/lists/${listId}/cards`)
    return api.data
}

export async function archieveCard(cardId) {
    const api = await TrelloApi.put(`/cards/${cardId}/closed`, null, {
        params: {
            value: true,
        }
    })

    return api.data
}

export async function deleteCard(cardId) {
    const api = await TrelloApi.delete(`/cards/${cardId}`)

    return api.data
}


export async function updateCard(cardId, cardName) {
    const api = await TrelloApi.put(`/cards/${cardId}`, null, {
        params: {
            name: cardName
        }
    });

    return api.data;
}