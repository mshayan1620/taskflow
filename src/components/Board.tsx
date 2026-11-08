"use client";

import { useState, useCallback } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { mockColumns } from "@/lib/mock-data";
import type { Column as ColumnType, Task, CreateTaskInput } from "@/types";
import { Column } from "./Column";
import { TaskCard } from "./TaskCard";
import { TaskModal } from "./TaskModal";

export function Board() {
  const [columns, setColumns] = useState<ColumnType[]>(mockColumns);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [targetColumnId, setTargetColumnId] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const findColumnByTaskId = useCallback(
    (taskId: string) => columns.find((col) => col.tasks.some((t) => t.id === taskId)),
    [columns]
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const col = findColumnByTaskId(active.id as string);
    const task = col?.tasks.find((t) => t.id === active.id);
    if (task) setActiveTask(task);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeCol = findColumnByTaskId(active.id as string);
    const overCol =
      columns.find((c) => c.id === over.id) ?? findColumnByTaskId(over.id as string);

    if (!activeCol || !overCol || activeCol.id === overCol.id) return;

    setColumns((prev) => {
      const sourceCol = prev.find((c) => c.id === activeCol.id)!;
      const destCol = prev.find((c) => c.id === overCol.id)!;
      const task = sourceCol.tasks.find((t) => t.id === active.id)!;

      return prev.map((col) => {
        if (col.id === sourceCol.id) {
          return { ...col, tasks: col.tasks.filter((t) => t.id !== active.id) };
        }
        if (col.id === destCol.id) {
          return { ...col, tasks: [...col.tasks, { ...task, columnId: col.id }] };
        }
        return col;
      });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over || active.id === over.id) return;

    const col = findColumnByTaskId(active.id as string);
    if (!col) return;

    const oldIndex = col.tasks.findIndex((t) => t.id === active.id);
    const newIndex = col.tasks.findIndex((t) => t.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      setColumns((prev) =>
        prev.map((c) =>
          c.id === col.id
            ? { ...c, tasks: arrayMove(c.tasks, oldIndex, newIndex) }
            : c
        )
      );
    }
  };

  const handleAddTask = (columnId: string) => {
    setEditingTask(null);
    setTargetColumnId(columnId);
    setModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setTargetColumnId(task.columnId);
    setModalOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        tasks: col.tasks.filter((t) => t.id !== taskId),
      }))
    );
  };

  const handleSaveTask = (data: CreateTaskInput & { id?: string }) => {
    if (data.id) {
      setColumns((prev) =>
        prev.map((col) => ({
          ...col,
          tasks: col.tasks.map((t) =>
            t.id === data.id
              ? {
                  ...t,
                  title: data.title,
                  description: data.description ?? null,
                  priority: data.priority ?? t.priority,
                  dueDate: data.dueDate ?? null,
                }
              : t
          ),
        }))
      );
    } else {
      const newTask: Task = {
        id: `task-${Date.now()}`,
        title: data.title,
        description: data.description ?? null,
        priority: data.priority ?? "MEDIUM",
        dueDate: data.dueDate ?? null,
        position: 0,
        columnId: data.columnId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setColumns((prev) =>
        prev.map((col) =>
          col.id === data.columnId
            ? { ...col, tasks: [...col.tasks, newTask] }
            : col
        )
      );
    }
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-6 overflow-x-auto pb-4">
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
        <DragOverlay>
          {activeTask && (
            <TaskCard task={activeTask} onEdit={() => {}} onDelete={() => {}} />
          )}
        </DragOverlay>
      </DndContext>
      <TaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveTask}
        task={editingTask}
        columnId={targetColumnId}
      />
    </>
  );
}
