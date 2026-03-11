import React from 'react';
import { useTasks } from '../context/TaskContext';
import { ArrowUpDown } from 'lucide-react';

const SortSelector = () => {
    const { sortOption, setSortOption } = useTasks();

    const options = [
        { id: 'manual', label: 'Custom Order' },
        { id: 'newest', label: 'Newest First' },
        { id: 'oldest', label: 'Oldest First' },
        { id: 'completed', label: 'Completed First' },
        { id: 'pending', label: 'Pending First' },
    ];

    return (
        <div className="flex items-center gap-3">
            <span className="text-muted" style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Sort by:</span>
            <div className="relative flex items-center">
                <ArrowUpDown size={14} className="text-muted" style={{ position: 'absolute', left: '12px', pointerEvents: 'none' }} />
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="category-select"
                    style={{ paddingLeft: '32px', height: '36px', fontSize: '0.8rem' }}
                >
                    {options.map(opt => (
                        <option key={opt.id} value={opt.id}>{opt.label}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SortSelector;
