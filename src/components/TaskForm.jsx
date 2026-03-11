import React, { useState, useRef, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import { PlusCircle, AlertCircle } from 'lucide-react';

export default function TaskForm() {
    const [text, setText] = useState('');
    const [category, setCategory] = useState('Personal');
    const [error, setError] = useState(false);
    const { addTask } = useTasks();
    const inputRef = useRef(null);

    // Categories list
    const categories = ['Work', 'Personal', 'Learning'];

    // Auto-focus on mount
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    // Auto-expand textarea as user types
    const adjustHeight = () => {
        const textarea = inputRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    const handleSubmit = (e) => {
        if (e) e.preventDefault();

        if (!text.trim()) {
            setError(true);
            return;
        }

        addTask(text.trim(), category);
        setText('');
        setError(false);
        
        // Keep focus and reset height
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.style.height = 'auto';
        }
    };

    const handleKeyDown = (e) => {
        // Enter to submit, Shift + Enter for new line
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
        
        // Clear input on Escape
        if (e.key === 'Escape') {
            setText('');
            setError(false);
            if (inputRef.current) {
                inputRef.current.style.height = 'auto';
            }
        }
    };

    return (
        <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <label className="text-muted" style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        New Task
                    </label>
                    
                    <select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="category-select"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="flex gap-4 stack-on-mobile">
                    <textarea
                        ref={inputRef}
                        className="task-input"
                        placeholder="Plan something new..."
                        rows={1}
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value);
                            adjustHeight();
                            if (error) setError(false);
                        }}
                        onKeyDown={handleKeyDown}
                        style={{ 
                            resize: 'none', 
                            overflow: 'hidden',
                            minHeight: '48px',
                            lineHeight: '1.5',
                            padding: '12px 18px'
                        }}
                    />
                    <button
                        type="submit"
                        className="btn-primary scale-on-hover scale-on-click"
                        style={{ justifyContent: 'center', height: 'fit-content', alignSelf: 'flex-start' }}
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
