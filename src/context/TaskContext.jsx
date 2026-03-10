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

    // Side effect to sync theme with DOM
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

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
    }, [setTasks]);

    const deleteTask = useCallback((id) => {
        setTasks(prev => prev.filter(t => t.id !== id));
    }, [setTasks]);

    const toggleTask = useCallback((id) => {
        setTasks(prev => prev.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
        ));
    }, [setTasks]);

    // Handles drag-and-drop reordering logic
    // Ensures reordering works even when a filter is active
    const reorderTasks = useCallback((sourceIdx, destIdx) => {
        setTasks(prev => {
            const currentView = filter === 'all'
                ? [...prev]
                : prev.filter(t => filter === 'completed' ? t.completed : !t.completed);

            const items = [...prev];
            const [moved] = currentView.splice(sourceIdx, 1);

            const actualSourceIdx = prev.findIndex(t => t.id === moved.id);
            const targetItem = currentView[destIdx];

            // If we move to the very end of a filtered list, we just push it back
            const actualDestIdx = targetItem
                ? prev.findIndex(t => t.id === targetItem.id)
                : prev.length;

            const [removed] = items.splice(actualSourceIdx, 1);
            items.splice(actualDestIdx, 0, removed);

            return items;
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
        reorderTasks
    }), [tasks, filteredTasks, filter, theme, toggleTheme, addTask, deleteTask, toggleTask, reorderTasks]);

    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
