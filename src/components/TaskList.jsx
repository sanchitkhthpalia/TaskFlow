import React from 'react';
import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';
import { Sparkles } from 'lucide-react';
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
    const { filteredTasks, reorderTasks } = useTasks();

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
