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
    const [lastDeleted, setLastDeleted] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('manual');
    const [isLoading, setIsLoading] = useState(true);

    // Side effect to sync theme with DOM
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Simulate initial load
        const timer = setTimeout(() => setIsLoading(false), 1200);
        return () => clearTimeout(timer);
    }, [theme]);

    const showToast = useCallback((message, type = 'success', onUndo = null) => {
        setToast({ message, type, onUndo, id: Date.now() });
        setTimeout(() => setToast(null), 3000);
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    }, [setTheme]);

    const addTask = useCallback((text, category = 'Personal') => {
        setTasks(prev => [{
            id: Date.now().toString(),
            text,
            category,
            completed: false,
            createdAt: Date.now()
        }, ...prev]);
        showToast('Task added successfully!');
    }, [setTasks, showToast]);

    const undoDelete = useCallback(() => {
        if (!lastDeleted) return;
        setTasks(prev => {
            const newTasks = [...prev];
            newTasks.splice(lastDeleted.index, 0, lastDeleted.task);
            return newTasks;
        });
        setLastDeleted(null);
        setToast(null); // Close the undo toast immediately
    }, [lastDeleted, setTasks]);

    const deleteTask = useCallback((id) => {
        setTasks(prev => {
            const index = prev.findIndex(t => t.id === id);
            if (index !== -1) {
                const taskToDelete = prev[index];
                setLastDeleted({ task: taskToDelete, index });
                showToast('Task deleted.', 'info', undoDelete);
            }
            return prev.filter(t => t.id !== id);
        });
    }, [setTasks, showToast, undoDelete]);

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

    const updateTask = useCallback((id, newText) => {
        if (!newText.trim()) return;
        setTasks(prev => prev.map(t => 
            t.id === id ? { ...t, text: newText.trim() } : t
        ));
        showToast('Task updated.');
    }, [setTasks, showToast]);

    // Handles drag-and-drop reordering logic
    // Ensures reordering works even when a filter is active
    const reorderTasks = useCallback((sourceIdx, destIdx) => {
        if (sourceIdx === destIdx) return;

        setSortOption('manual'); // Reset to manual order when user reorders
        setTasks(prev => {
            // 1. Get the items currently in view (including filters and search)
            let viewItems = prev;
            if (filter === 'completed') viewItems = prev.filter(t => t.completed);
            else if (filter === 'pending') viewItems = prev.filter(t => !t.completed);
            else if (['Work', 'Personal', 'Learning'].includes(filter)) {
                viewItems = prev.filter(t => t.category === filter);
            }

            if (searchQuery.trim()) {
                const query = searchQuery.toLowerCase().trim();
                viewItems = viewItems.filter(t => 
                    t.text.toLowerCase().includes(query) || 
                    t.category?.toLowerCase().includes(query)
                );
            }

            // Note: Since we reset sortOption to 'manual', we don't need to sort viewItems here
            // because they will match the 'manual' order in 'prev'.

            // 2. Reorder the view items
            const reorderedView = [...viewItems];
            const [moved] = reorderedView.splice(sourceIdx, 1);
            reorderedView.splice(destIdx, 0, moved);

            // 3. Map the reordered view items back into the original array
            let viewItemIdx = 0;
            return prev.map(task => {
                const isInFilter = filter === 'all' || 
                    (filter === 'completed' ? task.completed : 
                     filter === 'pending' ? !task.completed : 
                     task.category === filter);
                
                const isInSearch = !searchQuery.trim() || 
                    task.text.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
                    task.category?.toLowerCase().includes(searchQuery.toLowerCase().trim());

                const isInView = isInFilter && isInSearch;

                return isInView ? reorderedView[viewItemIdx++] : task;
            });
        });
    }, [setTasks, filter, searchQuery]);

    const filteredTasks = useMemo(() => {
        let results = tasks;

        // 1. Apply Status/Category Filters
        if (filter === 'completed') results = tasks.filter(t => t.completed);
        else if (filter === 'pending') results = tasks.filter(t => !t.completed);
        else if (['Work', 'Personal', 'Learning'].includes(filter)) {
            results = tasks.filter(t => t.category === filter);
        }

        // 2. Apply Search Query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            results = results.filter(t => 
                t.text.toLowerCase().includes(query) || 
                t.category?.toLowerCase().includes(query)
            );
        }

        // 3. Apply Sorting
        if (sortOption !== 'manual') {
            results = [...results].sort((a, b) => {
                if (sortOption === 'newest') return b.createdAt - a.createdAt;
                if (sortOption === 'oldest') return a.createdAt - b.createdAt;
                if (sortOption === 'completed') return (b.completed ? 1 : 0) - (a.completed ? 1 : 0);
                if (sortOption === 'pending') return (a.completed ? 1 : 0) - (b.completed ? 1 : 0);
                return 0;
            });
        }

        return results;
    }, [tasks, filter, searchQuery, sortOption]);

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
        updateTask,
        reorderTasks,
        toast,
        undoDelete,
        searchQuery,
        setSearchQuery,
        sortOption,
        setSortOption,
        isLoading
    }), [tasks, filteredTasks, filter, theme, toggleTheme, addTask, deleteTask, toggleTask, updateTask, reorderTasks, toast, undoDelete, searchQuery, sortOption, isLoading]);

    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
