// CardWithTask.jsx
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

const CardWithTask = ({ card, listId, onUpdateCard }) => {
    // use the same key as the parent list expects
    const [subtasks, setSubtasks] = useState(card.subtasks || []);
    const [newTask, setNewTask] = useState('');

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
        <div className="mb-4 p-4 bg-white border-l-4 border-indigo-500 rounded-r-lg shadow-sm">
            <h3 className="font-semibold mb-2">{card.content}</h3>

            <ul className="space-y-1 mb-2">
                {subtasks.map(task => (
                    <li key={task.id} className="flex items-center">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleToggle(task.id)}
                        />
                        <span
                            className={
                                task.completed ? 'line-through text-gray-400 ml-2' : 'ml-2'
                            }
                        >
                            {task.content}
                        </span>
                        <button
                            className="ml-auto text-red-500 hover:underline text-sm"
                            onClick={() => handleRemoveTask(task.id)}
                        >
                            ✕
                        </button>
                    </li>
                ))}
            </ul>

            <div className="flex">
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
    );
};

export default CardWithTask;
