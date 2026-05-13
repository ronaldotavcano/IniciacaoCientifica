import { ReactFlow, Background, Controls, BackgroundVariant, type Node, type Edge } from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { DoubleNode, SimpleNode, StackNode } from "./nodes/StructNodes"

const nodeTypes = {
  "lista-simples":SimpleNode,
  "lista-dupla":DoubleNode,
  "pilha":StackNode,
  "fila":SimpleNode,
}

const STRUCTURE_NODES: Record<string, Node[]> = {
  "lista-simples": [
    { id: "node-1", position: { x: 80, y: 160 }, data: { value: 10 }, type: "lista-simples" },
    { id: "node-2", position: { x: 280, y: 160 }, data: { value: 20 }, type: "lista-simples" },
    { id: "node-3", position: { x: 480, y: 160 }, data: { value: 30 }, type: "lista-simples" },
  ],
  "lista-dupla": [
    { id: "node-1", position: { x: 80, y: 160 }, data: { value: 10 }, type: "lista-dupla" },
    { id: "node-2", position: { x: 320, y: 160 }, data: { value: 20 }, type: "lista-dupla" },
    { id: "node-3", position: { x: 560, y: 160 }, data: { value: 30 }, type: "lista-dupla" },
  ],
  "pilha": [
    { id: "node-1", position: { x: 80, y: 60 }, data: { value: 10 }, type: "pilha" },
    { id: "node-2", position: { x: 80, y: 260 }, data: { value: 20 }, type: "pilha" },
    { id: "node-3", position: { x: 80, y: 460 }, data: { value: 30 }, type: "pilha" },
  ],
  "fila": [
    { id: "node-1", position: { x: 80, y: 160 }, data: { value: 10 }, type: "lista-simples" },
    { id: "node-2", position: { x: 280, y: 160 }, data: { value: 20 }, type: "lista-simples" },
    { id: "node-3", position: { x: 480, y: 160 }, data: { value: 30 }, type: "lista-simples" },
  ],
}

const STRUCTURE_EDGES: Record<string, Edge[]> = {
  "lista-simples": [
    { id: "e1-2", source: "node-1", target: "node-2", animated: true },
    { id: "e2-3", source: "node-2", target: "node-3", animated: true },
  ],
  "lista-dupla": [
    { id: "e1-2", source: "node-1", sourceHandle: "source-prox", target: "node-2", targetHandle: "target-top", animated: true },
    { id: "e2-3", source: "node-2", sourceHandle: "source-prox", target: "node-3", targetHandle: "target-top", animated: true },
    { id: "e3-2", source: "node-3", sourceHandle: "source-ante", target: "node-2", targetHandle: "target-bottom", animated: true },
    { id: "e2-1", source: "node-2", sourceHandle: "source-ante", target: "node-1", targetHandle: "target-bottom", animated: true },
  ],
  "pilha": [
    { id: "e1-2", source: "node-1", target: "node-2", animated: true },
    { id: "e2-3", source: "node-2", target: "node-3", animated: true },
  ],
  "fila": [
    { id: "e1-2", source: "node-1", target: "node-2", animated: true },
    { id: "e2-3", source: "node-2", target: "node-3", animated: true },
  ],
}

interface FlowPanelProps {
  activeStructure: string
}

export default function FlowPanel({ activeStructure}: FlowPanelProps) {
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
          nodes={STRUCTURE_NODES[activeStructure] ?? []}
          edges={STRUCTURE_EDGES[activeStructure] ?? []}
          fitView
          proOptions={{ hideAttribution: false }}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  )
}