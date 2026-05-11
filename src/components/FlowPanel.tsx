import { ReactFlow, Background, Controls, BackgroundVariant } from "@xyflow/react"
import "@xyflow/react/dist/style.css"

const initialNodes = [
  {
    id: "node-1",
    position: { x: 80, y: 160 },
    data: { label: "node-1" },
    type: " default",
  },
  {
    id: "node-2",
    position: { x: 320, y: 160 },
    data: { label: "node-2" },
    type: "default",
  },
  {
    id: "node-3",
    position: { x: 560, y: 160 },
    data: { label: "node-3" },
    type: "default",
  },
]

const initialEdges = [
  { id: "e1-2", source: "node-1", target: "node-2", animated: true },
  { id: "e2-3", source: "node-2", target: "node-3", animated: true },
]

export default function FlowPanel() {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between shrink-0">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Visualizador
        </span>
        
      </div>

      <div className="flex-1">
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
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