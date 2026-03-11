import React from 'react';

const TaskSkeleton = () => {
    return (
        <div className="skeleton-container">
            {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton-item">
                    <div className="skeleton-shimmer" />
                    <div className="skeleton-content">
                        <div className="skeleton-circle" />
                        <div className="flex-1">
                            <div className="flex items-center">
                                <div className="skeleton-tag" />
                                <div className="skeleton-line" style={{ maxWidth: i === 2 ? '150px' : '200px' }} />
                            </div>
                        </div>
                        <div className="skeleton-circle" style={{ width: '16px', height: '16px', borderRadius: '4px' }} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskSkeleton;
