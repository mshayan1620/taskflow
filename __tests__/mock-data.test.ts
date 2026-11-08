import { describe, it, expect } from "vitest";
import { mockColumns } from "@/lib/mock-data";

describe("mock data", () => {
  it("should have three columns", () => {
    expect(mockColumns).toHaveLength(3);
  });

  it("should have correct column titles", () => {
    const titles = mockColumns.map((col) => col.title);
    expect(titles).toEqual(["To Do", "In Progress", "Done"]);
  });

  it("columns should be ordered by position", () => {
    const positions = mockColumns.map((col) => col.position);
    expect(positions).toEqual([0, 1, 2]);
  });

  it("each column should have tasks", () => {
    mockColumns.forEach((col) => {
      expect(col.tasks.length).toBeGreaterThan(0);
    });
  });

  it("tasks should have required fields", () => {
    mockColumns.forEach((col) => {
      col.tasks.forEach((task) => {
        expect(task).toHaveProperty("id");
        expect(task).toHaveProperty("title");
        expect(task).toHaveProperty("priority");
        expect(task).toHaveProperty("columnId");
        expect(task.columnId).toBe(col.id);
      });
    });
  });

  it("tasks should have valid priority values", () => {
    const validPriorities = ["LOW", "MEDIUM", "HIGH", "URGENT"];
    mockColumns.forEach((col) => {
      col.tasks.forEach((task) => {
        expect(validPriorities).toContain(task.priority);
      });
    });
  });
});
