import React from 'react';
import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';
import EmptyState from './EmptyState';
import TaskSkeleton from './TaskSkeleton';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

export default function TaskList() {
    const { filteredTasks, reorderTasks, isLoading } = useTasks();

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // Prevent accidental drags when clicking toggle/delete
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = filteredTasks.findIndex((task) => task.id === active.id);
            const newIndex = filteredTasks.findIndex((task) => task.id === over.id);

            reorderTasks(oldIndex, newIndex);
        }
    };

    if (isLoading) {
        return <TaskSkeleton />;
    }

    if (filteredTasks.length === 0) {
        return <EmptyState />;
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
        >
            <SortableContext
                items={filteredTasks.map(t => t.id)}
                strategy={verticalListSortingStrategy}
            >
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {filteredTasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </ul>
            </SortableContext>
        </DndContext>
    );
}
