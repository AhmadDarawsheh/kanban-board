'use client';
import {
    DragDropContext,
    Droppable,
    Draggable
} from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid'

const STORAGE_KEY = boardId => `kanban-board:${boardId}`

const BoardView = ({ boardId, initialLists }) => {

    const [lists, setLists] = useState([])
    const [input, setInput] = useState({})

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY(boardId))
        if (saved) {
            setLists(JSON.parse(saved))
        } else {
            setLists(initialLists)
        }

    }, [boardId, initialLists])

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY(boardId), JSON.stringify(lists))
    }, [boardId, lists])

    const onDragEnd = ({ source, destination }) => {
        if (!destination) return;

        const srcIdx = lists.findIndex(list => list.id === source.droppableId)
        const dstIdx = lists.findIndex(list => list.id === destination.droppableId)
        const srcList = lists[srcIdx]
        const dstList = lists[dstIdx]

        const [moved] = srcList.cards.splice(source.index, 1);
        dstList.cards.splice(destination.index, 0, moved);

        const newLists = [...lists]
        newLists[srcIdx] = srcList
        newLists[dstIdx] = dstList
        setLists(newLists)
    }

    const handleAdd = (listId) => {
        const text = input[listId]?.trim();
        if (!text) return;
        const next = lists.map((list) => (
            list.id === listId ? { ...list, cards: [...list.cards, { id: uuid, content: text }] } : list
        ))

        setLists(next)
        setInput({ ...prev, [listId]: '' })
    }

    const handleRemove = (listId, cardId) => {
        const next = lists.map((list) => (
            list.id === listId ? { ...list, cards: [list.cards.filter((c) => c.id !== cardId)] } : list
        ))

        setLists(next)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto p-4">
                {lists.map((list) => (
                    <Droppable key={list.id} droppableId={list.id}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="bg-gray-100 rounded p-4 flex flex-col"
                            >
                                <h2 className="font-semibold mb-4">{list.title}</h2>

                                <div className="flex-1 space-y-2">
                                    {list.cards.map((card, index) => (
                                        <Draggable
                                            key={card.id} draggableId={String(card.id)} index={index}
                                        >
                                            {(prov) => (
                                                <div
                                                    ref={prov.innerRef}
                                                    {...prov.draggableProps}
                                                    {...prov.dragHandleProps}
                                                    className="relative"
                                                >
                                                    <div className="mb-2 p-4 bg-white border-l-4 border-indigo-500 rounded-r-lg shadow-sm hover:shadow-md transition-shadow">
                                                        {card.content}
                                                    </div>
                                                    {/* Remove button */}
                                                    <button
                                                        onClick={() => handleRemove(list.id, card.id)}
                                                        className="absolute top-1 right-1 text-gray-400 hover:text-red-500"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>

                                {/* Add-Card UI */}
                                <div className="mt-4">
                                    <input
                                        type="text"
                                        placeholder="New card…"
                                        value={input[list.id] || ''}
                                        onChange={e =>
                                            setInput(prev => ({
                                                ...prev,       // prev is the existing inputs object
                                                [listId]: ''   // overwrite just this list’s entry
                                            }))
                                        }
                                        className="w-full mb-2 px-2 py-1 border rounded"
                                    />
                                    <button
                                        onClick={() => handleAdd(list.id)}
                                        className="w-full bg-indigo-600 text-white py-1 rounded hover:bg-indigo-700 transition"
                                    >
                                        Add Card
                                    </button>
                                </div>
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    )
}

export default BoardView