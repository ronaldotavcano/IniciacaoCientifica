import { useState, useRef, useCallback, useEffect } from "react"
import StructPanel from "@/components/StructPanel"
import FlowPanel from "@/components/FlowPanel"
import { type FormData } from "@/types/StructTypes"
import { type Node } from "@xyflow/react"

export default function HomePage() {
  const [dividerPct, setDividerPct] = useState(35)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const onMouseDown = useCallback(() => setIsDragging(true), [])
  const [activeStructure, setActiveStructure] = useState("lista-simples")
  const [submittedFormData, setSubmittedFormData] = useState<FormData | null>(null)
  const [dynamicNodes, setDynamicNodes] = useState<Node[]>([])

  function handleStructureChange(value: string) {
    setActiveStructure(value)
    setSubmittedFormData(null)
    setDynamicNodes([])
  }

  function makeNode(value: number, position: { x: number; y: number }): Node {
    return {
      id: `node-${Date.now()}`,
      type: activeStructure === "fila" ? "lista-simples" : activeStructure,
      position,
      data: {
        value,
        nextPointerName: submittedFormData && "nextPointerName" in submittedFormData ? submittedFormData.nextPointerName : undefined,
        prevPointerName: submittedFormData && "prevPointerName" in submittedFormData ? submittedFormData.prevPointerName : undefined,
        topPointerName:  submittedFormData && "topPointerName"  in submittedFormData ? submittedFormData.topPointerName  : undefined,
      },
    }
  }

  const SPACING_H = 200
  const SPACING_V = 200

  function handleInsertStart(value: number) {
    if (!submittedFormData) return
    setDynamicNodes(prev => {
      const isVertical = activeStructure === "pilha"
      const first = prev[0]
      const position = first
        ? {
            x: isVertical ? first.position.x : first.position.x - SPACING_H,
            y: isVertical ? first.position.y - SPACING_V : first.position.y,
          }
        : { x: 80, y: 160 }
      return [makeNode(value, position), ...prev]
    })
  }

  function handleInsertEnd(value: number) {
    if (!submittedFormData) return
    setDynamicNodes(prev => {
      const isVertical = activeStructure === "pilha"
      const last = prev[prev.length - 1]
      const position = last
        ? {
            x: isVertical ? last.position.x : last.position.x + SPACING_H,
            y: isVertical ? last.position.y + SPACING_V : last.position.y,
          }
        : { x: 80, y: 160 }
      return [...prev, makeNode(value, position)]
    })
  }

  function handleRemoveStart() {
    setDynamicNodes(prev => prev.slice(1))
  }

  function handleRemoveEnd() {
    setDynamicNodes(prev => prev.slice(0, -1))
  }

  useEffect(() => {
    if (!isDragging) return
    const onMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      const pct = ((e.clientX - rect.left) / rect.width) * 100
      setDividerPct(Math.min(55, Math.max(25, pct)))
    }
    const onUp = () => setIsDragging(false)
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
    }
  }, [isDragging])

  return (
    <div
      ref={containerRef}
      className="flex h-[calc(100vh-3.5rem)]"
      style={{ cursor: isDragging ? "col-resize" : "default", userSelect: isDragging ? "none" : "auto" }}
    >
      <div
        className="flex flex-col border-r border-border overflow-hidden"
        style={{ width: `${dividerPct}%` }}
      >
        <StructPanel
          activeStructure={activeStructure}
          onStructureChange={handleStructureChange}
          onFormSubmit={setSubmittedFormData}
          onInsertStart={handleInsertStart}
          onInsertEnd={handleInsertEnd}
          onRemoveStart={handleRemoveStart}
          onRemoveEnd={handleRemoveEnd}
        />
      </div>

      <div
        onMouseDown={onMouseDown}
        className="w-1 cursor-col-resize shrink-0 transition-colors hover:bg-primary"
        style={{ background: isDragging ? "hsl(var(--primary))" : undefined }}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <FlowPanel
          activeStructure={activeStructure}
          formData={submittedFormData}
          dynamicNodes={dynamicNodes}
        />
      </div>
    </div>
  )
}