import React, { memo, useState, useRef, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import { Trash2, GripVertical, CheckCircle, Circle } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TaskItem = ({ task }) => {
    const { toggleTask, deleteTask, updateTask } = useTasks();
    const [isRemoving, setIsRemoving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);
    const editInputRef = useRef(null);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: task.id, disabled: isEditing });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 999 : (isEditing ? 100 : 1),
        position: 'relative',
        opacity: isDragging ? 0.8 : 1,
    };

    const handleRemove = () => {
        setIsRemoving(true);
        setTimeout(() => deleteTask(task.id), 200);
    };

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        if (editText.trim() && editText.trim() !== task.text) {
            updateTask(task.id, editText.trim());
        } else {
            setEditText(task.text);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSave();
        } else if (e.key === 'Escape') {
            setEditText(task.text);
            setIsEditing(false);
        }
    };

    return (
        <li
            ref={setNodeRef}
            style={style}
            className={`
                task-item task-entry 
                ${task.completed ? 'completed' : ''}
                ${isRemoving ? 'task-exit' : ''} 
                ${isDragging ? 'is-dragging' : ''} 
                ${isEditing ? 'is-editing-item' : ''}
            `}
        >
            {/* Drag handle */}
            <div
                {...attributes}
                {...listeners}
                className={`text-muted transition-colors ${isEditing ? 'opacity-20 cursor-default' : 'cursor-grab active:cursor-grabbing hover:text-main'}`}
                style={{ display: 'flex', alignItems: 'center' }}
            >
                <GripVertical size={18} />
            </div>

            {/* Completion toggle (Custom Hidden Input + Styled Div) */}
            <div 
                className="checkbox-wrapper" 
                onClick={() => !isEditing && toggleTask(task.id)}
            >
                <div className={`checkbox-custom ${task.completed ? 'checked' : ''}`}>
                </div>
            </div>

            {isEditing ? (
                <input
                    ref={editInputRef}
                    type="text"
                    className="flex-1 font-medium bg-transparent border-none outline-none text-main"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleSave}
                    style={{ padding: 0, margin: 0, fontSize: 'inherit' }}
                />
            ) : (
                <div 
                    className="flex-1 flex items-center gap-3 overflow-hidden"
                    onDoubleClick={handleDoubleClick}
                    title="Double-click to edit"
                >
                    <span className="task-text truncate">
                        {task.text}
                    </span>
                    <span className={`tag tag-${task.category?.toLowerCase()} flex-shrink-0`}>
                        {task.category || 'Personal'}
                    </span>
                </div>
            )}

            {/* Action buttons */}
            <button
                onClick={handleRemove}
                className="btn-icon btn-icon-danger"
                title="Delete task"
                disabled={isEditing}
                style={{ opacity: isEditing ? 0.5 : 1 }}
            >
                <Trash2 size={16} />
            </button>
        </li>
    );
};

export default memo(TaskItem);
