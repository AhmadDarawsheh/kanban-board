// BoardView.jsx
'use client';
import React, { useEffect, useState } from 'react';
import {
    DragDropContext,
    Droppable,
    Draggable
} from '@hello-pangea/dnd';
import { v4 as uuid } from 'uuid';
import CardWithTask from './CardWithTask';

const STORAGE_KEY = boardId => `kanban-board:${boardId}`;

const BoardView = ({ boardId, initialLists }) => {
    const [lists, setLists] = useState(initialLists);
    const [input, setInput] = useState({});

    // load from localStorage once
    useEffect(() => {
        const saved = window.localStorage.getItem(STORAGE_KEY(boardId));
        if (saved) setLists(JSON.parse(saved));
    }, [boardId]);

    // persist any change
    useEffect(() => {
        window.localStorage.setItem(
            STORAGE_KEY(boardId),
            JSON.stringify(lists)
        );
    }, [boardId, lists]);

    const onDragEnd = ({ source, destination }) => {
        if (!destination) return;

        // clone lists to avoid direct mutation
        const copy = lists.map(lst => ({
            ...lst,
            cards: [...lst.cards]
        }));

        const srcList = copy.find(l => l.id === source.droppableId);
        const dstList = copy.find(l => l.id === destination.droppableId);
        const [movedCard] = srcList.cards.splice(source.index, 1);
        dstList.cards.splice(destination.index, 0, movedCard);

        setLists(copy);
    };

    const handleAdd = (listId) => {
        const text = (input[listId] || '').trim();
        if (!text) return;

        setLists(prev =>
            prev.map(list =>
                list.id === listId
                    ? {
                        ...list,
                        cards: [
                            ...list.cards,
                            { id: uuid(), content: text, subtasks: [] }
                        ]
                    }
                    : list
            )
        );

        setInput(prev => ({ ...prev, [listId]: '' }));
    };

    const handleRemove = (listId, cardId) => {
        setLists(prev =>
            prev.map(list =>
                list.id === listId
                    ? {
                        ...list,
                        cards: list.cards.filter(c => c.id !== cardId)
                    }
                    : list
            )
        );
    };

    const handleUpdateCard = (oldListId, updatedCard) => {
        const total = updatedCard.subtasks.length;
        const completed = updatedCard.subtasks.filter(t => t.completed).length;

        // ➋ decide destination list
        let newListId = oldListId;
        if (completed === 0) newListId = "a";
        else if (completed === total) newListId = "c";
        else newListId = "b";

        setLists(prevLists => {
            // ➌ 1) Remove the card from its old list
            let listsWithoutCard = prevLists.map(list =>
                list.id === oldListId
                    ? { ...list, cards: list.cards.filter(c => c.id !== updatedCard.id) }
                    : list
            );

            // ➍ 2) Insert the updatedCard into the target list
            return listsWithoutCard.map(list =>
                list.id === newListId
                    ? { ...list, cards: [...list.cards, updatedCard] }
                    : list
            );
        });
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto p-4">
                {lists.map(list => (
                    <Droppable key={list.id} droppableId={list.id}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="bg-gray-100 rounded p-4 flex flex-col"
                            >
                                <h2 className="font-semibold mb-4">{list.title}</h2>
                                <div className="flex-1 space-y-2">
                                    {list.cards.map((card, idx) => (
                                        <Draggable
                                            key={card.id}
                                            draggableId={card.id}
                                            index={idx}
                                        >
                                            {(prov) => (
                                                <div
                                                    ref={prov.innerRef}
                                                    {...prov.draggableProps}
                                                    {...prov.dragHandleProps}
                                                    className="relative"
                                                >
                                                    <CardWithTask
                                                        card={card}
                                                        listId={list.id}
                                                        onUpdateCard={(oldListId, updatedCard) =>
                                                            handleUpdateCard(oldListId, updatedCard)}
                                                    />

                                                    {/* Remove button */}
                                                    <button
                                                        onClick={() =>
                                                            handleRemove(list.id, card.id)
                                                        }
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
                                        placeholder="New card..."
                                        value={input[list.id] || ''}
                                        onChange={e =>
                                            setInput(prev => ({
                                                ...prev,
                                                [list.id]: e.target.value
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
    );
};

export default BoardView;
