import { useState, useRef, useCallback, useEffect } from "react"
import StructPanel from "@/components/StructPanel"
import FlowPanel from "@/components/FlowPanel"
 
export default function HomePage() {
  const [dividerPct, setDividerPct] = useState(35)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const onMouseDown = useCallback(() => setIsDragging(true), [])
  const [activeStructure, setActiveStructure] = useState("lista-simples")
 
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
        <StructPanel activeStructure={activeStructure} onStructureChange={setActiveStructure} />
      </div>
 
      <div
        onMouseDown={onMouseDown}
        className="w-1 cursor-col-resize shrink-0 transition-colors hover:bg-primary"
        style={{ background: isDragging ? "hsl(var(--primary))" : undefined }}
      />
 
      <div className="flex flex-col flex-1 overflow-hidden">
        <FlowPanel activeStructure={activeStructure}/>
      </div>
    </div>
  )
}