// app/courses/[unit]/page.tsx
import CourseGraph, { NodeData, EdgeData } from "./cops"


export default function UnitPage() {
  // Default lesson data (no API fetch)
  const lessons: { slug: string; title: string }[] = [
    { slug: "lesson-1", title: "Introduction" },
    { slug: "lesson-2", title: "Basics" },
    { slug: "lesson-3", title: "Advanced Topics" },
    { slug: "lesson-4", title: "Summary" },
  ];

  // Default user progress state
  const userProgress = {
    completed: ["lesson-1", "lesson-2"],
  };

  // Map lessons to React Flow nodes
  const nodes: NodeData[] = lessons.map((lesson, i) => ({
    id: lesson.slug,
    label: lesson.title,
    position: { x: (i % 2) * 200, y: Math.floor(i / 2) * 120 },
    completed: userProgress.completed.includes(lesson.slug),
  }));

  // Create edges between consecutive lessons
  const edges: EdgeData[] = lessons.flatMap((lesson, i) => {
    if (i === 0) return [];
    return [{
      id: `e${lessons[i - 1].slug}-${lesson.slug}`,
      source: lessons[i - 1].slug,
      target: lesson.slug,
      animated: userProgress.completed.includes(lesson.slug),
    }];
  });

  // Render the graph with default data
  return <CourseGraph nodes={nodes} edges={edges} />;
}