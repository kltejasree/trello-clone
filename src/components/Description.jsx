
import React, { useState } from 'react'
import { FaBars, FaChevronDown, FaChevronRight } from 'react-icons/fa'

const Description = () => {

    const [description, setDescription] = useState('')
    const [storeDescription, setStoreDescription] = useState('')
    const [enableMoreDescription, setEnableMoreDescription] = useState(false)
    const [isSaved, setIsSaved] = useState(false)

    const [showDescription, setShowDescription] = useState(true)
    const [isHovered, setIsHovered] = useState(false)

    function handleDescription(e) {
        setDescription(e.target.value)
    }

    function storedescription() {
        const text = description.trim()

        setStoreDescription(text)
        setDescription(text)
        setEnableMoreDescription(false)

        setIsSaved(text !== '')
    }

    function cancelDescription() {
        setDescription(storeDescription)
        setEnableMoreDescription(false)

        setIsSaved(storeDescription !== '')
    }

    function handleEdit() {
        setDescription(storeDescription)
        setIsSaved(false)
        setEnableMoreDescription(true)
    }

    function handleKeyDown(e) {
        if (e.key === 'Escape') cancelDescription()
    }

    function toggleDescription() {
        setShowDescription((prev) => !prev)
    }

    return (
        <>
            <div className="mt-8">

                {/* Description heading */}
                <div className="flex justify-between items-center mb-3">

                    <div className="flex items-center gap-3">

                        {/* Hover icon */}
                        <div
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={toggleDescription}
                            className="cursor-pointer w-5 h-5 flex items-center justify-center"
                        >
                            {!isHovered ? (
                                <FaBars className="w-5 h-5 text-gray-800" />
                            ) : showDescription ? (
                                <FaChevronDown className="w-4 h-4 text-gray-800" />
                            ) : (
                                <FaChevronRight className="w-4 h-4 text-gray-800" />
                            )}
                        </div>

                        <h4 className="text-base font-semibold text-gray-800 m-0">
                            Description
                        </h4>

                    </div>

                    {showDescription && isSaved && (
                        <button
                            onClick={handleEdit}
                            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-800 bg-white hover:bg-gray-100"
                        >
                            Edit
                        </button>
                    )}

                </div>

                {/* Description content */}
                {showDescription && (
                    <>
                        {!isSaved && (
                            <>
                                <div className="ml-8 border border-gray-400 rounded-md overflow-hidden focus-within:border-blue-500">

                                    <textarea
                                        autoFocus={enableMoreDescription}
                                        rows={enableMoreDescription ? 8 : 2}
                                        value={description}
                                        placeholder={
                                            enableMoreDescription
                                                ? "Make your description even better. Type '/' to insert content, formatting, and more."
                                                : "Add a more detailed information..."
                                        }
                                        onChange={handleDescription}
                                        onClick={() => setEnableMoreDescription(true)}
                                        onKeyDown={handleKeyDown}
                                        className="block w-full px-4 py-3 text-base text-gray-800 outline-none resize-y placeholder:text-gray-500"
                                    />

                                </div>

                                {enableMoreDescription && (
                                    <div className="flex gap-2 mt-3 ml-8">

                                        <button
                                            onClick={storedescription}
                                            className="rounded-md bg-blue-600 text-white text-sm px-4 py-1.5 hover:bg-blue-700"
                                        >
                                            Save
                                        </button>

                                        <button
                                            onClick={cancelDescription}
                                            className="rounded-md text-sm text-gray-800 px-4 py-1.5 hover:bg-gray-100"
                                        >
                                            Cancel
                                        </button>

                                    </div>
                                )}
                            </>
                        )}

                        {/* Saved description */}
                        {isSaved && (
                            <h4
                                onClick={handleEdit}
                                className="mt-2 ml-8 text-base font-normal text-gray-800 whitespace-pre-wrap cursor-pointer"
                            >
                                {storeDescription}
                            </h4>
                        )}
                    </>
                )}

            </div>
        </>
    )
}

export default Description
