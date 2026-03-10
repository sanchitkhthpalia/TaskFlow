import React, { useMemo } from 'react';
import { useTasks } from '../context/TaskContext';
import { ListChecks, Clock, CheckCircle2 } from 'lucide-react';

const FilterTabs = () => {
    const { tasks, filter, setFilter } = useTasks();

    // Compute counts dynamically for each category
    const counts = useMemo(() => ({
        all: tasks.length,
        pending: tasks.filter(t => !t.completed).length,
        completed: tasks.filter(t => t.completed).length
    }), [tasks]);

    const filters = [
        { id: 'all', label: 'All', icon: ListChecks, count: counts.all },
        { id: 'pending', label: 'Pending', icon: Clock, count: counts.pending },
        { id: 'completed', label: 'Done', icon: CheckCircle2, count: counts.completed },
    ];

    return (
        <div
            className="flex p-1"
            style={{
                background: 'var(--border-color)',
                borderRadius: '10px',
                width: 'fit-content',
                gap: '4px'
            }}
        >
            {filters.map((f) => {
                const Icon = f.icon;
                const isActive = filter === f.id;

                return (
                    <button
                        key={f.id}
                        onClick={() => setFilter(f.id)}
                        className="flex items-center gap-2 px-4 py-1.5 text-xs font-bold transition-all duration-200"
                        style={{
                            borderRadius: '8px',
                            background: isActive ? 'var(--card-bg)' : 'transparent',
                            color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                            boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <Icon size={14} />
                        <span>{f.label}</span>
                        <span
                            style={{
                                opacity: 0.6,
                                fontSize: '0.7rem',
                                marginLeft: '-2px'
                            }}
                        >
                            ({f.count})
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

export default FilterTabs;
