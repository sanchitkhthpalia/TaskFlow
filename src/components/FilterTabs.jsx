import React from 'react';
import { useTasks } from '../context/TaskContext';
import { ListChecks, Clock, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const FilterTabs = () => {
    const { filter, setFilter } = useTasks();

    const filters = [
        { id: 'all', label: 'All', icon: ListChecks },
        { id: 'pending', label: 'Pending', icon: Clock },
        { id: 'completed', label: 'Done', icon: CheckCircle2 },
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
                        {f.label}
                    </button>
                );
            })}
        </div>
    );
};

export default FilterTabs;
