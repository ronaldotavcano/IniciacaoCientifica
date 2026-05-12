import { Handle, Position } from "@xyflow/react"

export function SimpleNode({ data }: { data: { value: number } }) {
  return (
    <div>
      <div className="flex border-[1.5px] border-gray-400 dark:border-border bg-card rounded-lg">
        
        <div className="py-2 px-4 text-foreground font-medium">
          {data.value}
        </div>

        <div className="border-l-[1.5px] border-gray-400 dark:border-border py-2 px-3 w-12 flex items-center justify-center">
          <span className="text-[10px] text-muted-foreground font-mono">*prox</span>
        </div>

      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  )
}

export function DoubleNode({ data }: { data: { value: number } }) {
  return (
    <div>
      <div className="flex border-[1.5px] border-gray-400 dark:border-border bg-card rounded-lg">

        <div className="relative border-r-[1.5px] border-gray-400 dark:border-border py-2 px-3 w-12 flex items-center justify-center">
          <span className="text-[10px] text-muted-foreground font-mono">*ante</span>
          <Handle type="source" position={Position.Left} id="source-ante" />
        </div>

        <div className="py-2 px-4 text-foreground font-medium">
          {data.value}
        </div>

        <div className="relative border-l-[1.5px] border-gray-400 dark:border-border py-2 px-3 w-12 flex items-center justify-center">
          <span className="text-[10px] text-muted-foreground font-mono">*prox</span>
          <Handle type="source" position={Position.Right} id="source-prox" />
        </div>

      </div>

      <Handle type="target" position={Position.Top} id="target-top" />
      <Handle type="target" position={Position.Bottom} id="target-bottom" />
    </div>
  )
}