import {ReactFlow, Background, Controls, BackgroundVariant, type Node, type Edge} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { DoubleNode, SimpleNode, StackNode, NullNode } from "./nodes/StructNodes";
import { type FormData } from "@/types/StructTypes"

const nodeTypes = {
  "lista-simples": SimpleNode,
  "lista-dupla": DoubleNode,
  "pilha": StackNode,
  "fila": SimpleNode,
  "null": NullNode,
};

const STRUCTURE_NODES: Record<string, Node[]> = {
  "lista-simples": [
    {
      id: "node-1",
      position: { x: 80, y: 160 },
      data: { value: 10 },
      type: "lista-simples",
    },
    {
      id: "node-2",
      position: { x: 280, y: 160 },
      data: { value: 20 },
      type: "lista-simples",
    },
    {
      id: "node-3",
      position: { x: 480, y: 160 },
      data: { value: 30 },
      type: "lista-simples",
    },
  ],
  "lista-dupla": [
    {
      id: "node-1",
      position: { x: 80, y: 160 },
      data: { value: 10 },
      type: "lista-dupla",
    },
    {
      id: "node-2",
      position: { x: 320, y: 160 },
      data: { value: 20 },
      type: "lista-dupla",
    },
    {
      id: "node-3",
      position: { x: 560, y: 160 },
      data: { value: 30 },
      type: "lista-dupla",
    },
  ],
  pilha: [
    {
      id: "node-1",
      position: { x: 80, y: 60 },
      data: { value: 10 },
      type: "pilha",
    },
    {
      id: "node-2",
      position: { x: 80, y: 260 },
      data: { value: 20 },
      type: "pilha",
    },
    {
      id: "node-3",
      position: { x: 80, y: 460 },
      data: { value: 30 },
      type: "pilha",
    },
  ],
  fila: [
    {
      id: "node-1",
      position: { x: 80, y: 160 },
      data: { value: 10 },
      type: "lista-simples",
    },
    {
      id: "node-2",
      position: { x: 280, y: 160 },
      data: { value: 20 },
      type: "lista-simples",
    },
    {
      id: "node-3",
      position: { x: 480, y: 160 },
      data: { value: 30 },
      type: "lista-simples",
    },
  ],
};

const STRUCTURE_EDGES: Record<string, Edge[]> = {
  "lista-simples": [
    { id: "e1-2", source: "node-1", target: "node-2", animated: true },
    { id: "e2-3", source: "node-2", target: "node-3", animated: true },
  ],
  "lista-dupla": [
    {
      id: "e1-2",
      source: "node-1",
      sourceHandle: "source-prox",
      target: "node-2",
      targetHandle: "target-top",
      animated: true,
    },
    {
      id: "e2-3",
      source: "node-2",
      sourceHandle: "source-prox",
      target: "node-3",
      targetHandle: "target-top",
      animated: true,
    },
    {
      id: "e3-2",
      source: "node-3",
      sourceHandle: "source-ante",
      target: "node-2",
      targetHandle: "target-bottom",
      animated: true,
    },
    {
      id: "e2-1",
      source: "node-2",
      sourceHandle: "source-ante",
      target: "node-1",
      targetHandle: "target-bottom",
      animated: true,
    },
  ],
  pilha: [
    { id: "e1-2", source: "node-1", target: "node-2", animated: true },
    { id: "e2-3", source: "node-2", target: "node-3", animated: true },
  ],
  fila: [
    { id: "e1-2", source: "node-1", target: "node-2", animated: true },
    { id: "e2-3", source: "node-2", target: "node-3", animated: true },
  ],
};

interface FlowPanelProps {
  activeStructure: string;
  formData: FormData | null;
}

export default function FlowPanel({
  activeStructure,
  formData,
}: FlowPanelProps) {
  function buildNodes() {
  const base = STRUCTURE_NODES[activeStructure] ?? []

  const nodes = formData ? base.map((node) => ({...node, data: {
          ...node.data,
          nextPointerName: "nextPointerName" in formData ? formData.nextPointerName : undefined,
          prevPointerName: "prevPointerName" in formData ? formData.prevPointerName : undefined,
          topPointerName: "topPointerName" in formData ? formData.topPointerName : undefined,
        },
      }))
    : base

  const lastNode = base[base.length - 1]
  if (!lastNode) return nodes

  const isVertical = activeStructure === "pilha"
  const nullPosition = {
    x: isVertical ? lastNode.position.x : lastNode.position.x + 200,
    y: isVertical ? lastNode.position.y + 200 : lastNode.position.y,
  }

  const nullNode = {
    id: "null-node",
    type: "null",
    position: nullPosition,
    data: {},
  }

  return [...nodes, nullNode]
}

function buildEdges() {
  const base = STRUCTURE_EDGES[activeStructure] ?? []
  const nodes = STRUCTURE_NODES[activeStructure] ?? []
  if (!nodes.length) return base

  const lastNodeId = nodes[nodes.length - 1].id

  const nullEdge = {
    id: "e-null",
    source: lastNodeId,
    target: "null-node",
    animated: true,
  }

  return [...base, nullEdge]
}

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between shrink-0">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Visualizador
        </span>
      </div>
      <div className="flex-1">
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={buildNodes()}
          edges={buildEdges()}
          fitView
          proOptions={{ hideAttribution: false }}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
