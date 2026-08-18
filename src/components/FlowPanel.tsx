import { ReactFlow, Background, Controls, BackgroundVariant, type Node, type Edge } from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { DoubleNode, SimpleNode, StackNode, NullNode } from "./nodes/StructNodes"
import { type FormData } from "@/types/StructTypes"

const nodeTypes = {
  "lista-simples": SimpleNode,
  "lista-dupla": DoubleNode,
  "pilha": StackNode,
  "fila": SimpleNode,
  "null": NullNode,
}

const PILHA_X = 80
const PILHA_BASE_Y = 420   
const PILHA_STEP = 90      

interface FlowPanelProps {
  activeStructure: string
  formData: FormData | null
  dynamicNodes: Node[]
}

export default function FlowPanel({ activeStructure, dynamicNodes }: FlowPanelProps) {

  function buildNodes(): Node[] {
    if (!dynamicNodes.length) return []

    if (activeStructure === "pilha") {
      const n = dynamicNodes.length

      const stackNodes = dynamicNodes.map((node, i) => ({
        ...node,
        position: {
          x: PILHA_X,
          y: PILHA_BASE_Y - (n - 1 - i) * PILHA_STEP,
        },
      }))

      const nullEnd: Node = {
        id: "null-node-end",
        type: "null",
        position: { x: PILHA_X, y: PILHA_BASE_Y - n * PILHA_STEP }, // sempre acima do topo
        data: {},
      }

      return [...stackNodes, nullEnd]
    }

    const lastNode = dynamicNodes[dynamicNodes.length - 1]
    const nullEnd: Node = {
      id: "null-node-end",
      type: "null",
      position: { x: lastNode.position.x + 200, y: lastNode.position.y },
      data: {},
    }

    if (activeStructure === "lista-dupla") {
      const firstNode = dynamicNodes[0]
      const nullStart: Node = {
        id: "null-node-start",
        type: "null",
        position: { x: firstNode.position.x - 200, y: firstNode.position.y },
        data: {},
      }
      return [nullStart, ...dynamicNodes, nullEnd]
    }

    return [...dynamicNodes, nullEnd]
  }

  function buildEdges(): Edge[] {
    if (!dynamicNodes.length) return []
    const edges: Edge[] = []

    if (activeStructure === "pilha") {
      const n = dynamicNodes.length
      for (let i = 0; i < n - 1; i++) {
        const upper = dynamicNodes[i] 
        const lower = dynamicNodes[i + 1]     
        edges.push({
          id: `e-${upper.id}-${lower.id}`,
          source: upper.id,
          sourceHandle: "source",
          target: lower.id,
          targetHandle: "target-top",
          animated: true,
        })
      }

      const topo = dynamicNodes[n - 1]
      edges.push({
        id: "e-null",
        source: topo.id,
        sourceHandle: "source-top",
        target: "null-node-end",
        targetHandle: "target-top",
        animated: true,
      })

      return edges
    }

    
    if (activeStructure === "lista-dupla") {
      edges.push({
        id: "e-null-start",
        source: dynamicNodes[0].id,
        sourceHandle: "source-ante",
        target: "null-node-start",
        targetHandle: "target-left",
        animated: true,
      })
    }

    for (let i = 0; i < dynamicNodes.length - 1; i++) {
      const current = dynamicNodes[i]
      const next = dynamicNodes[i + 1]

      if (activeStructure === "lista-dupla") {
        edges.push({
          id: `e-${current.id}-${next.id}-prox`,
          source: current.id, sourceHandle: "source-prox",
          target: next.id, targetHandle: "target-top",
          animated: true,
        })
        edges.push({
          id: `e-${next.id}-${current.id}-ante`,
          source: next.id, sourceHandle: "source-ante",
          target: current.id, targetHandle: "target-bottom",
          animated: true,
        })
      } else {
        edges.push({ id: `e-${current.id}-${next.id}`, source: current.id, target: next.id, animated: true })
      }
    }

    const lastNode = dynamicNodes[dynamicNodes.length - 1]
    if (activeStructure === "lista-dupla") {
      edges.push({
        id: "e-null-end",
        source: lastNode.id, sourceHandle: "source-prox",
        target: "null-node-end", targetHandle: "target-left",
        animated: true,
      })
    } else {
      edges.push({ id: "e-null", source: lastNode.id, target: "null-node-end", animated: true })
    }

    return edges
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between shrink-0">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Visualizador</span>
        {!dynamicNodes.length && (
          <span className="text-xs text-muted-foreground">Preencha o formulário e use as funções para adicionar nós</span>
        )}
      </div>
      <div className="flex-1">
        <ReactFlow nodeTypes={nodeTypes} nodes={buildNodes()} edges={buildEdges()} fitView proOptions={{ hideAttribution: false }}>
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  )
}