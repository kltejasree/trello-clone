import React from 'react'
import { archiveList } from '../api/List'

const DeleteList = ({ listId, refreshLists }) => {

    const handleArchive = async function() {
        try {
            await archiveList(listId);

            await refreshLists();

        } catch (error) {
            console.log('Error archiving list:', error);
        }
    }

    return (
        <div className="flex flex-col w-full max-w-[120px] border border-gray-300 gap-1 py-5 rounded">
            <button
                onClick={handleArchive}
                className="cursor-pointer w-[90%] border border-gray-300 m-2 rounded py-2"
            >
                Archive List
            </button>
        </div>
    )
}

export default DeleteList