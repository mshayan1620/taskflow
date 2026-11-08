"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import type { Column as ColumnType, Task } from "@/types";
import { TaskCard } from "./TaskCard";
import clsx from "clsx";

interface ColumnProps {
  column: ColumnType;
  onAddTask: (columnId: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export function Column({ column, onAddTask, onEditTask, onDeleteTask }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <div className="flex w-80 shrink-0 flex-col rounded-xl bg-gray-100 dark:bg-gray-900">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold">{column.title}</h2>
          <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
            {column.tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask(column.id)}
          className="rounded-md p-1 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          aria-label={`Add task to ${column.title}`}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div
        ref={setNodeRef}
        className={clsx(
          "flex flex-1 flex-col gap-2 overflow-y-auto px-3 pb-3",
          isOver && "bg-brand-50/50 dark:bg-brand-950/20"
        )}
        style={{ minHeight: "100px" }}
      >
        <SortableContext
          items={column.tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {column.tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
