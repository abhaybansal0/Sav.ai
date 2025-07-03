// components/CourseGraph.tsx
"use client";
import React from "react";
// Note the scoped import
import { ReactFlow, MiniMap, Controls, Background } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

export interface NodeData {
  id: string;
  label: string;
  position: { x: number; y: number };
  completed?: boolean;
}

export interface EdgeData {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
}

interface CourseGraphProps {
  nodes: NodeData[];
  edges: EdgeData[];
}

export default function CourseGraph({ nodes, edges }: CourseGraphProps) {
  const formattedNodes = nodes.map(n => ({
    id: n.id,
    type: "default",
    data: { label: n.label },
    position: n.position,
    style: {
      border: n.completed ? "2px solid #10B981" : "2px solid #CBD5E1",
      background: n.completed ? "#DCFCE7" : "#F1F5F9",
      borderRadius: 8,
      width: 120,
      height: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }));

  const formattedEdges = edges.map(e => ({
    id: e.id,
    source: e.source,
    target: e.target,
    animated: e.animated || false,
    style: { stroke: e.animated ? "#10B981" : "#CBD5E1" }
  }));

  return (
    <div style={{ width: "100%", height: 500 }}>
      <ReactFlow nodes={formattedNodes} edges={formattedEdges} fitView>
        <MiniMap />
        <Controls />
        <Background gap={16} />
      </ReactFlow>
    </div>
  );
}
