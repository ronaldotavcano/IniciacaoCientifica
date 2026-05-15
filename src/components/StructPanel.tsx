import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import StructForm from "./StructForm"
import { useState } from "react"
import { type FormData, type DoubleListFormData, type SimpleListFormData, type StackFormData, type QueueFormData } from "@/types/StructTypes"

const STRUCTURES = [
  {
    id: "lista-simples",
    label: "Lista Simples",
    badge: "→",
    description: "Cada nó aponta para o próximo. O último aponta para NULL.",
  },
  {
    id: "lista-dupla",
    label: "Lista Dupla",
    badge: "⇄",
    description: "Cada nó aponta para o próximo e para o anterior.",
  },
  {
    id: "pilha",
    label: "Pilha",
    badge: "LIFO",
    description: "Inserção e remoção sempre no topo. Last In, First Out.",
  },
  {
    id: "fila",
    label: "Fila",
    badge: "FIFO",
    description: "Inserção no fim, remoção no início. First In, First Out.",
  },
]

function generateCode(structure: string, data: FormData): string {
  if (structure === "lista-simples"){
    const d = data as SimpleListFormData
    return `#include <stdio.h>
#include <stdlib.h>

typedef struct ${d.structName} {
    int dado;
    struct ${d.structName} *${d.nextPointerName};
} ${d.structName};`
  }

  if (structure === "lista-dupla"){
    const d = data as DoubleListFormData
    return `#include <stdio.h>
#include <stdlib.h>

typedef struct ${d.structName} {
    int dado;
    struct ${d.structName} *${d.previousPointerName};
    struct ${d.structName} *${d.nextPointerName};
} ${d.structName};`
  }

  if (structure === "pilha"){
    const d = data as StackFormData
    return `#include <stdio.h>
#include <stdlib.h>
  
typedef struct ${d.structName} {
    int dado;
    struct ${d.structName} *${d.nextPointerName};
} ${d.structName};
  
typedef struct {
    ${d.structName} *${d.topPointerName};
} ${d.stackName};
  }`
}
  
  if (structure === "fila"){
    const d = data as QueueFormData
    return `#include <stdio.h>
#include <stdlib.h>
  
typedef struct ${d.structName} {
    int dado;
    struct ${d.structName} *${d.nextPointerName};
} ${d.structName};
  
typedef struct {
    ${d.structName} *${d.startPointerName};
    ${d.structName} *${d.endPointerName};
} ${d.queueName};
  }`
  }

  return ""
}

interface StructPanelProps {
  activeStructure: string
  onStructureChange: (value: string) => void
}

export default function StructPanel({ activeStructure, onStructureChange }: StructPanelProps) {
  const [showCode, setShowCode] = useState(false)
  const [submittedData, setSubmittedData] = useState<FormData | null>(null)

  function handleFormSubmit(data: FormData) {
    setSubmittedData(data)
    setShowCode(true)
  }
  
  function handleStructureChange(value: string) {
  setShowCode(false)
  setSubmittedData(null)
  onStructureChange(value)
}

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-border flex items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Estrutura
        </span>
      </div>

      <Tabs value={activeStructure} onValueChange={handleStructureChange} className="flex flex-col flex-1 overflow-hidden">
        <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent px-4 gap-1 h-10 shrink-0">
          {STRUCTURES.map(s => (
            <TabsTrigger
              key={s.id}
              value={s.id}
              className="text-xs px-3 data-[state=active]:bg-background data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              {s.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {STRUCTURES.map(s => (
          <TabsContent
            key={s.id}
            value={s.id}
            className="flex flex-col flex-1 overflow-hidden mt-0 p-0"
          >
            <div className="px-4 py-3 border-b border-border flex items-center gap-2 shrink-0">
              <Badge variant="outline" className="text-xs font-mono">
                {s.badge}
              </Badge>
              <p className="text-xs text-muted-foreground">{s.description}</p>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {showCode && submittedData ? (
                <pre className="p-4 text-xs font-mono overflow-auto">
                  {generateCode(activeStructure, submittedData)}
                </pre>
              ) : (
                <StructForm activeStructure={activeStructure} onSubmit={handleFormSubmit} />
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}