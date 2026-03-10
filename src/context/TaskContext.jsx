import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const TaskContext = createContext();

export function useTasks() {
    const context = useContext(TaskContext);
    if (!context) throw new Error('useTasks must be used within a TaskProvider');
    return context;
}

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useLocalStorage('tasks-flow-data', []);
    const [filter, setFilter] = useState('all');
    const [theme, setTheme] = useLocalStorage('app-theme', 'light');
    const [toast, setToast] = useState(null);

    // Side effect to sync theme with DOM
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const showToast = useCallback((message, type = 'success') => {
        setToast({ message, type, id: Date.now() });
        setTimeout(() => setToast(null), 3000);
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    }, [setTheme]);

    const addTask = useCallback((text) => {
        setTasks(prev => [{
            id: Date.now().toString(),
            text,
            completed: false,
            createdAt: Date.now()
        }, ...prev]);
        showToast('Task added successfully!');
    }, [setTasks, showToast]);

    const deleteTask = useCallback((id) => {
        setTasks(prev => prev.filter(t => t.id !== id));
        showToast('Task deleted.', 'info');
    }, [setTasks, showToast]);

    const toggleTask = useCallback((id) => {
        setTasks(prev => prev.map(t => {
            if (t.id === id) {
                const newState = !t.completed;
                if (newState) showToast('Task completed! 🎉');
                return { ...t, completed: newState };
            }
            return t;
        }));
    }, [setTasks, showToast]);

    // Handles drag-and-drop reordering logic
    // Ensures reordering works even when a filter is active
    const reorderTasks = useCallback((sourceIdx, destIdx) => {
        if (sourceIdx === destIdx) return;

        setTasks(prev => {
            // 1. Get the items currently in view
            const viewItems = filter === 'all'
                ? [...prev]
                : prev.filter(t => filter === 'completed' ? t.completed : !t.completed);

            // 2. Reorder the view items
            const reorderedView = [...viewItems];
            const [moved] = reorderedView.splice(sourceIdx, 1);
            reorderedView.splice(destIdx, 0, moved);

            // 3. Map the reordered view items back into the original array
            // This preserves the relative positions of any items that are currently filtered out
            let viewItemIdx = 0;
            return prev.map(task => {
                const isInView = filter === 'all' ||
                    (filter === 'completed' ? task.completed : !task.completed);

                return isInView ? reorderedView[viewItemIdx++] : task;
            });
        });
    }, [setTasks, filter]);

    const filteredTasks = useMemo(() => {
        if (filter === 'completed') return tasks.filter(t => t.completed);
        if (filter === 'pending') return tasks.filter(t => !t.completed);
        return tasks;
    }, [tasks, filter]);

    const value = useMemo(() => ({
        tasks,
        filteredTasks,
        filter,
        setFilter,
        theme,
        toggleTheme,
        addTask,
        deleteTask,
        toggleTask,
        reorderTasks,
        toast
    }), [tasks, filteredTasks, filter, theme, toggleTheme, addTask, deleteTask, toggleTask, reorderTasks, toast]);

    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
