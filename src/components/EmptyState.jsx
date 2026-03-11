import React from 'react';
import { useTasks } from '../context/TaskContext';

const EmptyState = () => {
    const { searchQuery, filter } = useTasks();

    const isSearching = searchQuery.trim() !== '';
    const isFiltered = filter !== 'all';

    let title = "No tasks yet";
    let subtitle = "Start by adding something you want to accomplish today.";
    let icon = "📋";

    if (isSearching) {
        title = "No results found";
        subtitle = `We couldn't find anything matching "${searchQuery}". Try a different term.`;
        icon = "🔍";
    } else if (isFiltered) {
        title = `No ${filter} tasks`;
        subtitle = `You don't have any tasks in the "${filter}" view right now.`;
        icon = "✨";
    }

    return (
        <div className="empty-state card" style={{ padding: '60px 40px', borderStyle: 'dashed', borderWidth: '2px', textAlign: 'center' }}>
            <div className="empty-icon" style={{ fontSize: '3.5rem', marginBottom: '24px' }}>{icon}</div>
            <h3 className="empty-title" style={{ fontSize: '1.5rem', fontWeight: 800 }}>{title}</h3>
            <p className="empty-subtitle" style={{ fontSize: '1rem', marginTop: '12px' }}>{subtitle}</p>
        </div>
    );
};

export default EmptyState;
