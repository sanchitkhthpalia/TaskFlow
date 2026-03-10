import React, { memo, useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { Trash2, GripVertical, CheckCircle, Circle } from 'lucide-react';

const TaskItem = ({ task, provided, isDragging }) => {
    const { toggleTask, deleteTask } = useTasks();
    const [isRemoving, setIsRemoving] = useState(false);

    // Smooth delete: allow animation to finish before removing from state
    const handleRemove = () => {
        setIsRemoving(true);
        setTimeout(() => deleteTask(task.id), 200);
    };

    return (
        <li
            {...provided.draggableProps}
            ref={provided.innerRef}
            className={`
        card card-hover task-entry 
        ${isRemoving ? 'task-exit' : ''} 
        ${isDragging ? 'is-dragging' : ''} 
        flex items-center gap-4
      `}
            style={{
                ...provided.draggableProps.style,
                padding: '16px 20px',
                marginBottom: '12px',
                userSelect: 'none',
                // Dynamic drag styles
                borderColor: isDragging ? 'var(--primary)' : 'var(--border-color)',
                boxShadow: isDragging ? 'var(--shadow-lg)' : 'var(--shadow)',
                background: isDragging ? 'var(--glass-bg)' : 'var(--card-bg)'
            }}
        >
            {/* Drag handle */}
            <div
                {...provided.dragHandleProps}
                className="text-muted cursor-grab active:cursor-grabbing hover:text-main transition-colors"
            >
                <GripVertical size={18} />
            </div>

            {/* Completion toggle */}
            <button
                onClick={() => toggleTask(task.id)}
                className={`flex items-center justify-center scale-on-hover scale-on-click ${task.completed ? 'text-success' : 'text-muted'
                    }`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
                {task.completed ? (
                    <CheckCircle size={22} fill="currentColor" fillOpacity={0.15} />
                ) : (
                    <Circle size={22} />
                )}
            </button>

            <span className={`flex-1 font-medium completed-text ${task.completed ? 'is-active' : ''}`}>
                {task.text}
            </span>

            {/* Action buttons */}
            <button
                onClick={handleRemove}
                className="btn-icon"
                title="Delete task"
            >
                <Trash2 size={16} />
            </button>
        </li>
    );
};

export default memo(TaskItem);
