import React, { useReducer } from 'react'
import { FaBars, FaChevronDown, FaChevronRight } from 'react-icons/fa'

const initialState = {
    description: '',
    storeDescription: '',
    enableMoreDescription: false,
    isSaved: false,
    showDescription: true,
    isHovered: false
}

const descriptionReducer = (state, action) => {
    switch (action.type) {
        case 'description':
            return { ...state, description: action.payload }

        case 'storeDescription':
            return {
                ...state,
                storeDescription: action.payload,
                description: action.payload,
                enableMoreDescription: false,
                isSaved: action.payload !== ''
            }

        case 'cancelDescription':
            return {
                ...state,
                description: state.storeDescription,
                enableMoreDescription: false,
                isSaved: state.storeDescription !== ''
            }

        case 'editDescription':
            return {
                ...state,
                description: state.storeDescription,
                isSaved: false,
                enableMoreDescription: true
            }

        case 'enableMoreDescription':
            return { ...state, enableMoreDescription: true }

        case 'showDescription':
            return { ...state, showDescription: !state.showDescription }

        case 'isHovered':
            return { ...state, isHovered: action.payload }

        default:
            return state
    }
}

const Description = () => {

    const [state, dispatch] = useReducer(descriptionReducer, initialState)

    function storedescription() {
        const text = state.description.trim()

        dispatch({
            type: 'storeDescription',
            payload: text
        })
    }

    function handleKeyDown(e) {
        if (e.key === 'Escape') {
            dispatch({ type: 'cancelDescription' })
        }
    }

    return (
        <>
            <div className="mt-8">

                <div className="flex justify-between items-center mb-3">

                    <div className="flex items-center gap-3">

                        <div
                            onMouseEnter={() => dispatch({ type: 'isHovered', payload: true })}
                            onMouseLeave={() => dispatch({ type: 'isHovered', payload: false })}
                            onClick={() => dispatch({ type: 'showDescription' })}
                            className="cursor-pointer w-5 h-5 flex items-center justify-center"
                        >
                            {!state.isHovered ? (
                                <FaBars className="w-5 h-5 text-gray-800" />
                            ) : state.showDescription ? (
                                <FaChevronDown className="w-4 h-4 text-gray-800" />
                            ) : (
                                <FaChevronRight className="w-4 h-4 text-gray-800" />
                            )}
                        </div>

                        <h4 className="text-base font-semibold text-gray-800 m-0">
                            Description
                        </h4>

                    </div>

                    {state.showDescription && state.isSaved && (
                        <button
                            onClick={() => dispatch({ type: 'editDescription' })}
                            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-800 bg-white hover:bg-gray-100"
                        >
                            Edit
                        </button>
                    )}

                </div>

                {state.showDescription && (
                    <>
                        {!state.isSaved && (
                            <>
                                <div className="ml-8 border border-gray-400 rounded-md overflow-hidden focus-within:border-blue-500">

                                    <textarea
                                        autoFocus={state.enableMoreDescription}
                                        rows={state.enableMoreDescription ? 8 : 2}
                                        value={state.description}
                                        placeholder={
                                            state.enableMoreDescription
                                                ? "Make your description even better. Type '/' to insert content, formatting, and more."
                                                : "Add a more detailed information..."
                                        }
                                        onChange={(e) => dispatch({
                                            type: 'description',
                                            payload: e.target.value
                                        })}
                                        onClick={() => dispatch({ type: 'enableMoreDescription' })}
                                        onKeyDown={handleKeyDown}
                                        className="block w-full px-4 py-3 text-base text-gray-800 outline-none resize-y placeholder:text-gray-500"
                                    />

                                </div>

                                {state.enableMoreDescription && (
                                    <div className="flex gap-2 mt-3 ml-8">

                                        <button
                                            onClick={storedescription}
                                            className="rounded-md bg-blue-600 text-white text-sm px-4 py-1.5 hover:bg-blue-700"
                                        >
                                            Save
                                        </button>

                                        <button
                                            onClick={() => dispatch({ type: 'cancelDescription' })}
                                            className="rounded-md text-sm text-gray-800 px-4 py-1.5 hover:bg-gray-100"
                                        >
                                            Cancel
                                        </button>

                                    </div>
                                )}
                            </>
                        )}

                        {state.isSaved && (
                            <h4
                                onClick={() => dispatch({ type: 'editDescription' })}
                                className="mt-2 ml-8 text-base font-normal text-gray-800 whitespace-pre-wrap cursor-pointer"
                            >
                                {state.storeDescription}
                            </h4>
                        )}
                    </>
                )}

            </div>
        </>
    )
}

export default Description