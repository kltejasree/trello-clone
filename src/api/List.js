import TrelloApi from "./TrelloApi";

export async function CreateList(listName, BoardId) {
    const api = await TrelloApi.post('lists', null, {
        params: {
            name: listName,
            idBoard : BoardId

        }
    })
    return api.data;
}

export async function getAllLists(boardId) {
    let api = await TrelloApi.get(`/boards/${boardId}/lists`)
    return api.data;
}

export async function archiveList(listId) {
    const api = await TrelloApi.put(`lists/${listId}/closed`, null, {
        params: {
            value: true,
        }
    })

    return api.data
}


export async function updateList(listId, listName) {
    const api = await TrelloApi.put(`/lists/${listId}`, null, {
        params: {
            name: listName
        }
    });

    return api.data;
}

