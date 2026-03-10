import React from 'react';
import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { ClipboardList } from 'lucide-react';

export default function TaskList() {
    const { filteredTasks, reorderTasks } = useTasks();

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        reorderTasks(result.source.index, result.destination.index);
    };

    if (filteredTasks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center opacity-60">
                <ClipboardList size={40} strokeWidth={1} style={{ marginBottom: '16px' }} />
                <p className="font-medium">No tasks found</p>
                <p className="text-sm">Try changing your filter or adding a new task.</p>
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
