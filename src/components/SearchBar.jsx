import React from 'react';
import { useTasks } from '../context/TaskContext';
import { Search, X } from 'lucide-react';

const SearchBar = () => {
    const { searchQuery, setSearchQuery } = useTasks();

    return (
        <div className="search-container card" style={{ padding: '0 20px', marginBottom: '32px', display: 'flex', alignItems: 'center' }}>
            <Search size={20} className="text-muted" style={{ marginRight: '16px' }} />
            <input
                type="text"
                className="flex-1 bg-transparent border-none outline-none text-main font-medium"
                placeholder="Search tasks or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ fontSize: '1rem', height: '56px', padding: 0 }}
            />
            {searchQuery && (
                <button
                    onClick={() => setSearchQuery('')}
                    className="btn-icon"
                    title="Clear search"
                >
                    <X size={18} />
                </button>
            )}
        </div>
    );
};

export default SearchBar;
