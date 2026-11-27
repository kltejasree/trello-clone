import TrelloApi from "./TrelloApi.js";

export async function CreateList(listName: String, BoardId: String) {
    const api = await TrelloApi.post('lists', null, {
        params: {
            name: listName,
            idBoard : BoardId

        }
    })
    return api.data;
}

export async function getAllLists(boardId: String) {
    let api = await TrelloApi.get(`/boards/${boardId}/lists`)
    return api.data;
}

export async function archiveList(listId: String) {
    const api = await TrelloApi.put(`lists/${listId}/closed`, null, {
        params: {
            value: true,
        }
    })

    return api.data
}


export async function updateList(listId: String, listName: String) {
    const api = await TrelloApi.put(`/lists/${listId}`, null, {
        params: {
            name: listName
        }
    });

    return api.data;
}

