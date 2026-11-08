import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, priority, dueDate, columnId } = body;

    if (!title || !columnId) {
      return NextResponse.json(
        { error: "Title and columnId are required" },
        { status: 400 }
      );
    }

    const maxPosition = await prisma.task.aggregate({
      where: { columnId },
      _max: { position: true },
    });

    const task = await prisma.task.create({
      data: {
        title,
        description: description || null,
        priority: priority || "MEDIUM",
        dueDate: dueDate ? new Date(dueDate) : null,
        position: (maxPosition._max.position ?? -1) + 1,
        columnId,
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("Failed to create task:", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}
