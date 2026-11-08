"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Calendar, Trash2, Pencil } from "lucide-react";
import type { Task, Priority } from "@/types";
import clsx from "clsx";

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  LOW: { label: "Low", className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300" },
  MEDIUM: { label: "Medium", className: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" },
  HIGH: { label: "High", className: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300" },
  URGENT: { label: "Urgent", className: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" },
};

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task.id, data: { type: "task", task } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priority = priorityConfig[task.priority];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(
        "card group cursor-grab active:cursor-grabbing",
        isDragging && "opacity-50 shadow-lg"
      )}
    >
      <div className="flex items-start gap-2">
        <button
          {...attributes}
          {...listeners}
          className="mt-0.5 shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-medium leading-snug">{task.title}</h3>
            <div className="flex shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                onClick={() => onEdit(task)}
                className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          {task.description && (
            <p className="mt-1 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
              {task.description}
            </p>
          )}
          <div className="mt-2 flex items-center gap-2">
            <span className={clsx("rounded-full px-2 py-0.5 text-xs font-medium", priority.className)}>
              {priority.label}
            </span>
            {task.dueDate && (
              <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <Calendar className="h-3 w-3" />
                {new Date(task.dueDate).toLocaleDateString("en-CA")}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
