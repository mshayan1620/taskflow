"use client";

import { Search, Filter } from "lucide-react";
import type { Priority } from "@/types";

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  priorityFilter: Priority | "ALL";
  onPriorityChange: (priority: Priority | "ALL") => void;
}

export function SearchFilter({
  searchQuery,
  onSearchChange,
  priorityFilter,
  onPriorityChange,
}: SearchFilterProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800"
        />
      </div>
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-gray-400" />
        <select
          value={priorityFilter}
          onChange={(e) => onPriorityChange(e.target.value as Priority | "ALL")}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
        >
          <option value="ALL">All Priorities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </select>
      </div>
    </div>
  );
}
