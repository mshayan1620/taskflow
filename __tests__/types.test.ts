import { describe, it, expect } from "vitest";
import type { Task, Column, Priority } from "@/types";

describe("type contracts", () => {
  it("Task type should be constructable", () => {
    const task: Task = {
      id: "test-1",
      title: "Test Task",
      description: "A test task",
      priority: "HIGH",
      dueDate: "2024-06-15",
      position: 0,
      columnId: "col-1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    expect(task.id).toBe("test-1");
    expect(task.priority).toBe("HIGH");
  });

  it("Column type should hold tasks array", () => {
    const column: Column = {
      id: "col-1",
      title: "Test Column",
      position: 0,
      tasks: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    expect(column.tasks).toEqual([]);
    expect(column.title).toBe("Test Column");
  });

  it("Priority should accept valid values", () => {
    const priorities: Priority[] = ["LOW", "MEDIUM", "HIGH", "URGENT"];
    expect(priorities).toHaveLength(4);
  });

  it("Task should accept null description and dueDate", () => {
    const task: Task = {
      id: "test-2",
      title: "Minimal Task",
      description: null,
      priority: "LOW",
      dueDate: null,
      position: 0,
      columnId: "col-1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    expect(task.description).toBeNull();
    expect(task.dueDate).toBeNull();
  });
});
