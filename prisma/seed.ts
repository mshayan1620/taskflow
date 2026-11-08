import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.task.deleteMany();
  await prisma.column.deleteMany();

  const todo = await prisma.column.create({
    data: {
      title: "To Do",
      position: 0,
      tasks: {
        create: [
          {
            title: "Set up CI/CD pipeline",
            description: "Configure GitHub Actions for automated testing and deployment",
            priority: "HIGH",
            position: 0,
            dueDate: new Date("2024-06-15"),
          },
          {
            title: "Design landing page mockup",
            description: "Create wireframes and hi-fi mockups in Figma",
            priority: "MEDIUM",
            position: 1,
          },
          {
            title: "Write API documentation",
            description: "Document all REST endpoints using OpenAPI spec",
            priority: "LOW",
            position: 2,
          },
        ],
      },
    },
  });

  const inProgress = await prisma.column.create({
    data: {
      title: "In Progress",
      position: 1,
      tasks: {
        create: [
          {
            title: "Implement user authentication",
            description: "Add JWT-based auth with login and registration",
            priority: "URGENT",
            position: 0,
            dueDate: new Date("2024-06-10"),
          },
          {
            title: "Build dashboard analytics",
            description: "Create charts for task completion rates and team velocity",
            priority: "MEDIUM",
            position: 1,
          },
        ],
      },
    },
  });

  const done = await prisma.column.create({
    data: {
      title: "Done",
      position: 2,
      tasks: {
        create: [
          {
            title: "Database schema design",
            description: "Design and implement PostgreSQL schema with Prisma",
            priority: "HIGH",
            position: 0,
          },
          {
            title: "Project scaffolding",
            description: "Set up Next.js 14 with TypeScript, Tailwind, and Prisma",
            priority: "MEDIUM",
            position: 1,
          },
        ],
      },
    },
  });

  console.log(`Seeded ${todo.title}, ${inProgress.title}, ${done.title}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
