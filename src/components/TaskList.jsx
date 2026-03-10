import React from 'react';
import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Sparkles } from 'lucide-react';

export default function TaskList() {
    const { filteredTasks, reorderTasks } = useTasks();

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        reorderTasks(result.source.index, result.destination.index);
    };

    if (filteredTasks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-16 text-center task-entry" style={{ minHeight: '300px' }}>
                <div
                    className="flex items-center justify-center"
                    style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: 'var(--border-color)',
                        color: 'var(--primary)',
                        marginBottom: '20px',
                        opacity: 0.8
                    }}
                >
                    <Sparkles size={32} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-main)' }}>
                    🎉 No tasks yet
                </h3>
                <p className="text-muted" style={{ maxWidth: '240px', lineHeight: 1.6 }}>
                    Start by adding your first task and stay on top of your goals.
                </p>
            </div>
        );
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="main-task-list">
                {(provided, snapshot) => (
                    <ul
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                            listStyle: 'none',
                            padding: 0,
                            minHeight: '20px',
                            transition: 'background 0.2s ease',
                            borderRadius: 'var(--radius)'
                        }}
                    >
                        {filteredTasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                {(provided, snapshot) => (
                                    <TaskItem
                                        task={task}
                                        provided={provided}
                                        isDragging={snapshot.isDragging}
                                    />
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    );
}
