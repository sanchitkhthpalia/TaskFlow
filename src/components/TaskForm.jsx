import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { PlusCircle, AlertCircle } from 'lucide-react';

export default function TaskForm() {
    const [text, setText] = useState('');
    const [error, setError] = useState(false);
    const { addTask } = useTasks();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!text.trim()) {
            setError(true);
            return;
        }

        addTask(text.trim());
        setText('');
        setError(false);
    };

    const handleKeyDown = (e) => {
        // Clear input on Escape
        if (e.key === 'Escape') {
            setText('');
            setError(false);
        }
        // Enter is handled by form onSubmit, but explicit handling can be Added 
        // if we wanted to prevent default behavior or add secondary logic.
    };

    return (
        <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label className="text-muted" style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                }}>
                    New Task
                </label>

                <div className="flex gap-4 stack-on-mobile">
                    <input
                        type="text"
                        className="task-input"
                        placeholder="Plan something new..."
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value);
                            if (error) setError(false);
                        }}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        type="submit"
                        className="btn-primary scale-on-hover scale-on-click"
                        style={{ justifyContent: 'center' }}
                    >
                        <PlusCircle size={18} />
                        <span>Add Task</span>
                    </button>
                </div>

                {error && (
                    <div className="flex items-center gap-2 task-entry" style={{ color: 'var(--danger)', fontSize: '0.85rem' }}>
                        <AlertCircle size={14} />
                        <span>Task text cannot be empty.</span>
                    </div>
                )}
            </form>
        </div>
    );
}
