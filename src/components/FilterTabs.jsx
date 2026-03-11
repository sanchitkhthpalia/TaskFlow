import React, { useMemo } from 'react';
import { useTasks } from '../context/TaskContext';
import { ListChecks, Clock, CheckCircle2, Briefcase, User, GraduationCap } from 'lucide-react';

const FilterTabs = () => {
    const { tasks, filter, setFilter } = useTasks();

    // Compute counts dynamically for each category
    const counts = useMemo(() => ({
        all: tasks.length,
        pending: tasks.filter(t => !t.completed).length,
        completed: tasks.filter(t => t.completed).length,
        work: tasks.filter(t => t.category === 'Work').length,
        personal: tasks.filter(t => t.category === 'Personal').length,
        learning: tasks.filter(t => t.category === 'Learning').length
    }), [tasks]);

    const filters = [
        { id: 'all', label: 'All', icon: ListChecks, count: counts.all },
        { id: 'pending', label: 'Pending', icon: Clock, count: counts.pending },
        { id: 'completed', label: 'Done', icon: CheckCircle2, count: counts.completed },
        { id: 'Work', label: 'Work', icon: Briefcase, count: counts.work },
        { id: 'Personal', label: 'Personal', icon: User, count: counts.personal },
        { id: 'Learning', label: 'Learning', icon: GraduationCap, count: counts.learning },
    ];

    return (
        <div
            className="flex p-1.5 flex-wrap"
            style={{
                background: 'var(--border-color)',
                borderRadius: '12px',
                width: 'fit-content',
                gap: '4px',
                opacity: 0.9
            }}
        >
            {filters.map((f) => {
                const Icon = f.icon;
                const isActive = filter === f.id;

                return (
                    <button
                        key={f.id}
                        onClick={() => setFilter(f.id)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-bold transition-all duration-300"
                        style={{
                            borderRadius: '10px',
                            background: isActive ? 'var(--card-bg)' : 'transparent',
                            color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                            boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        <Icon size={14} className={isActive ? 'text-primary' : 'text-muted'} />
                        <span>{f.label}</span>
                        {f.count > 0 && (
                            <span
                                style={{
                                    opacity: 0.7,
                                    fontSize: '0.65rem',
                                    marginLeft: '2px',
                                    background: isActive ? 'var(--bg-main)' : 'rgba(0,0,0,0.05)',
                                    padding: '2px 6px',
                                    borderRadius: '4px'
                                }}
                            >
                                {f.count}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default FilterTabs;
