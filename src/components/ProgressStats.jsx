import React, { useMemo } from 'react';
import { useTasks } from '../context/TaskContext';

const ProgressStats = () => {
    const { tasks } = useTasks();

    const stats = useMemo(() => {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

        return { total, completed, percentage };
    }, [tasks]);

    if (stats.total === 0) return null;

    return (
        <div className="progress-container card" style={{ padding: '20px', marginBottom: '32px' }}>
            <div className="progress-label">
                <span className="text-muted">Task Progress</span>
                <span className="text-main">
                    {stats.completed} of {stats.total} tasks completed
                </span>
            </div>
            
            <div className="progress-bar-bg">
                <div 
                    className="progress-bar-fill" 
                    style={{ width: `${stats.percentage}%` }}
                />
            </div>
            
            <div className="mt-4 flex justify-between items-center" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                <span>{stats.percentage}% Complete</span>
                <span>{stats.total - stats.completed} Remaining</span>
            </div>
        </div>
    );
};

export default ProgressStats;
