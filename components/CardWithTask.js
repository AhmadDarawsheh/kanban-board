// CardWithTask.jsx
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

const CardWithTask = ({ card, listId, onUpdateCard }) => {
    // use the same key as the parent list expects
    const [subtasks, setSubtasks] = useState(card.subtasks || []);
    const [newTask, setNewTask] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    // whenever subtasks change, push the update up
    useEffect(() => {
        onUpdateCard(listId, { ...card, subtasks });
    }, [subtasks]);

    const handleAddTask = () => {
        const content = newTask.trim();
        if (!content) return;
        setSubtasks(prev => [
            ...prev,
            { id: uuid(), content, completed: false }
        ]);
        setNewTask('');
    };

    const handleRemoveTask = (taskId) =>
        setSubtasks(prev => prev.filter(t => t.id !== taskId));

    const handleToggle = (taskId) =>
        setSubtasks(prev =>
            prev.map(t =>
                t.id === taskId ? { ...t, completed: !t.completed } : t
            )
        );

    return (
        <div className="mb-4 bg-white border-l-4 border-indigo-500 rounded-r-lg shadow-sm">
            {/* header */}
            <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => setIsOpen(o => !o)}
            >
                <h3 className="font-semibold">{card.content}</h3>
                {/* simple CSS-rotated arrow */}
                <span
                    className={`transform transition-transform ${isOpen ? 'rotate-90' : ''
                        }`}
                >
                    ▶
                </span>
            </div>

            {/* body: only show when open */}
            {isOpen && (
                <div className="px-4 pb-4 pt-0 space-y-2">
                    <ul className="space-y-1">
                        {subtasks.map(task => (
                            <li key={task.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => handleToggle(task.id)}
                                />
                                <span
                                    className={`ml-2 ${task.completed
                                        ? 'line-through text-gray-400'
                                        : ''
                                        }`}
                                >
                                    {task.content}
                                </span>
                                <button
                                    onClick={() => handleRemoveTask(task.id)}
                                    className="ml-auto text-red-500 hover:underline text-sm"
                                >
                                    ✕
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="flex mt-2">
                        <input
                            type="text"
                            value={newTask}
                            onChange={e => setNewTask(e.target.value)}
                            placeholder="New subtask…"
                            className="flex-1 px-2 py-1 border rounded-l"
                        />
                        <button
                            onClick={handleAddTask}
                            className="px-3 bg-indigo-600 text-white rounded-r hover:bg-indigo-700"
                        >
                            Add
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardWithTask;
