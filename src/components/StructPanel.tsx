import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import SimpleListForm from "./forms/SimpleListForm"
import DoubleListForm from "./forms/DoubleListForm"
import StackForm from "./forms/StackForm"
import QueueForm from "./forms/QueueForm"
import {
  type FormData,
  type DoubleListFormData,
  type SimpleListFormData,
  type StackFormData,
  type QueueFormData,
} from "@/types/StructTypes"

const STRUCTURES = [
  { id: "lista-simples", label: "Lista Simples", badge: "→",    description: "Cada nó aponta para o próximo. O último aponta para NULL." },
  { id: "lista-dupla",   label: "Lista Dupla",   badge: "⇄",    description: "Cada nó aponta para o próximo e para o anterior." },
  { id: "pilha",         label: "Pilha",          badge: "LIFO", description: "Inserção e remoção sempre no topo. Last In, First Out." },
  { id: "fila",          label: "Fila",           badge: "FIFO", description: "Inserção no fim, remoção no início. First In, First Out." },
]

// ── geradores de código C ──────────────────────────────────────────

function codeStruct(structure: string, data: FormData): string {
  if (structure === "lista-simples") {
    const d = data as SimpleListFormData
    return `typedef struct ${d.structName} {\n    int dado;\n    struct ${d.structName} *${d.nextPointerName};\n} ${d.structName};`
  }
  if (structure === "lista-dupla") {
    const d = data as DoubleListFormData
    return `typedef struct ${d.structName} {\n    int dado;\n    struct ${d.structName} *${d.prevPointerName};\n    struct ${d.structName} *${d.nextPointerName};\n} ${d.structName};`
  }
  if (structure === "pilha") {
    const d = data as StackFormData
    return `typedef struct ${d.structName} {\n    int dado;\n    struct ${d.structName} *${d.nextPointerName};\n} ${d.structName};\n\ntypedef struct {\n    ${d.structName} *${d.topPointerName};\n} ${d.stackName};`
  }
  if (structure === "fila") {
    const d = data as QueueFormData
    return `typedef struct ${d.structName} {\n    int dado;\n    struct ${d.structName} *${d.nextPointerName};\n} ${d.structName};\n\ntypedef struct {\n    ${d.structName} *${d.startPointerName};\n    ${d.structName} *${d.endPointerName};\n} ${d.queueName};`
  }
  return ""
}

function codeInsertStart(structure: string, data: FormData): string {
  if (structure === "lista-simples") {
    const d = data as SimpleListFormData
    return `${d.structName}* inserirInicio(${d.structName}* lista, int valor) {\n    ${d.structName}* novo = malloc(sizeof(${d.structName}));\n    novo->dado = valor;\n    novo->${d.nextPointerName} = lista;\n    return novo;\n}`
  }
  if (structure === "lista-dupla") {
    const d = data as DoubleListFormData
    return `${d.structName}* inserirInicio(${d.structName}* lista, int valor) {\n    ${d.structName}* novo = malloc(sizeof(${d.structName}));\n    novo->dado = valor;\n    novo->${d.nextPointerName} = lista;\n    novo->${d.prevPointerName} = NULL;\n    if (lista) lista->${d.prevPointerName} = novo;\n    return novo;\n}`
  }
  return ""
}

function codeInsertEnd(structure: string, data: FormData): string {
  if (structure === "lista-simples") {
    const d = data as SimpleListFormData
    return `${d.structName}* inserirFim(${d.structName}* lista, int valor) {\n    ${d.structName}* novo = malloc(sizeof(${d.structName}));\n    novo->dado = valor;\n    novo->${d.nextPointerName} = NULL;\n    if (!lista) return novo;\n    ${d.structName}* atual = lista;\n    while (atual->${d.nextPointerName}) atual = atual->${d.nextPointerName};\n    atual->${d.nextPointerName} = novo;\n    return lista;\n}`
  }
  if (structure === "lista-dupla") {
    const d = data as DoubleListFormData
    return `${d.structName}* inserirFim(${d.structName}* lista, int valor) {\n    ${d.structName}* novo = malloc(sizeof(${d.structName}));\n    novo->dado = valor;\n    novo->${d.nextPointerName} = NULL;\n    if (!lista) { novo->${d.prevPointerName} = NULL; return novo; }\n    ${d.structName}* atual = lista;\n    while (atual->${d.nextPointerName}) atual = atual->${d.nextPointerName};\n    atual->${d.nextPointerName} = novo;\n    novo->${d.prevPointerName} = atual;\n    return lista;\n}`
  }
  return ""
}

function codeRemoveStart(structure: string, data: FormData): string {
  if (structure === "lista-simples") {
    const d = data as SimpleListFormData
    return `${d.structName}* removerInicio(${d.structName}* lista) {\n    if (!lista) return NULL;\n    ${d.structName}* temp = lista;\n    lista = lista->${d.nextPointerName};\n    free(temp);\n    return lista;\n}`
  }
  if (structure === "lista-dupla") {
    const d = data as DoubleListFormData
    return `${d.structName}* removerInicio(${d.structName}* lista) {\n    if (!lista) return NULL;\n    ${d.structName}* temp = lista;\n    lista = lista->${d.nextPointerName};\n    if (lista) lista->${d.prevPointerName} = NULL;\n    free(temp);\n    return lista;\n}`
  }
  return ""
}

function codeRemoveEnd(structure: string, data: FormData): string {
  if (structure === "lista-simples") {
    const d = data as SimpleListFormData
    return `${d.structName}* removerFim(${d.structName}* lista) {\n    if (!lista) return NULL;\n    if (!lista->${d.nextPointerName}) { free(lista); return NULL; }\n    ${d.structName}* atual = lista;\n    while (atual->${d.nextPointerName}->${d.nextPointerName})\n        atual = atual->${d.nextPointerName};\n    free(atual->${d.nextPointerName});\n    atual->${d.nextPointerName} = NULL;\n    return lista;\n}`
  }
  if (structure === "lista-dupla") {
    const d = data as DoubleListFormData
    return `${d.structName}* removerFim(${d.structName}* lista) {\n    if (!lista) return NULL;\n    ${d.structName}* atual = lista;\n    while (atual->${d.nextPointerName}) atual = atual->${d.nextPointerName};\n    if (atual->${d.prevPointerName}) atual->${d.prevPointerName}->${d.nextPointerName} = NULL;\n    else lista = NULL;\n    free(atual);\n    return lista;\n}`
  }
  return ""
}

function codePush(data: StackFormData): string {
  return `void push(${data.stackName}* p, int valor) {\n    ${data.structName}* novo = malloc(sizeof(${data.structName}));\n    novo->dado = valor;\n    novo->${data.nextPointerName} = p->${data.topPointerName};\n    p->${data.topPointerName} = novo;\n}`
}

function codePop(data: StackFormData): string {
  return `void pop(${data.stackName}* p) {\n    if (!p->${data.topPointerName}) return;\n    ${data.structName}* temp = p->${data.topPointerName};\n    p->${data.topPointerName} = temp->${data.nextPointerName};\n    free(temp);\n}`
}

function codeEnqueue(data: QueueFormData): string {
  return `void enqueue(${data.queueName}* f, int valor) {\n    ${data.structName}* novo = malloc(sizeof(${data.structName}));\n    novo->dado = valor;\n    novo->${data.nextPointerName} = NULL;\n    if (!f->${data.endPointerName}) {\n        f->${data.startPointerName} = f->${data.endPointerName} = novo;\n    } else {\n        f->${data.endPointerName}->${data.nextPointerName} = novo;\n        f->${data.endPointerName} = novo;\n    }\n}`
}

function codeDequeue(data: QueueFormData): string {
  return `void dequeue(${data.queueName}* f) {\n    if (!f->${data.startPointerName}) return;\n    ${data.structName}* temp = f->${data.startPointerName};\n    f->${data.startPointerName} = temp->${data.nextPointerName};\n    if (!f->${data.startPointerName}) f->${data.endPointerName} = NULL;\n    free(temp);\n}`
}

function FunctionCard({
  title,
  code,
  showInput = false,
  onExecute,
}: {
  title: string
  code: string
  showInput?: boolean
  onExecute: (value?: number) => void
}) {
  const [inputValue, setInputValue] = useState("")

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="px-3 py-2 bg-muted flex items-center justify-between">
        <span className="text-xs font-semibold font-mono">{title}</span>
      </div>
      <pre className="p-3 text-xs font-mono overflow-auto bg-background text-foreground leading-relaxed whitespace-pre-wrap">
        {code}
      </pre>
      <div className="px-3 py-2 border-t border-border flex items-center gap-2">
        {showInput && (
          <input
            type="number"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="valor"
            onKeyDown={e => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()}
            className="border border-border rounded px-2 py-1 text-xs w-20 bg-background text-foreground [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        )}
        <Button
          size="sm"
          className="text-xs h-7"
          onClick={() => {
            onExecute(showInput ? Number(inputValue) : undefined)
            setInputValue("")
          }}
        >
          Executar
        </Button>
      </div>
    </div>
  )
}

interface StructPanelProps {
  activeStructure: string
  onStructureChange: (value: string) => void
  onFormSubmit: (data: FormData) => void
  onInsertStart: (value: number) => void
  onInsertEnd: (value: number) => void
  onRemoveStart: () => void
  onRemoveEnd: () => void
}


export default function StructPanel({
  activeStructure,
  onStructureChange,
  onFormSubmit,
  onInsertStart,
  onInsertEnd,
  onRemoveStart,
  onRemoveEnd,
}: StructPanelProps) {
  const [showFunctions, setShowFunctions] = useState(false)
  const [submittedData, setSubmittedData] = useState<FormData | null>(null)

  function handleFormSubmit(data: FormData) {
    setSubmittedData(data)
    setShowFunctions(true)
    onFormSubmit(data)
  }

  function handleStructureChange(value: string) {
    setShowFunctions(false)
    setSubmittedData(null)
    onStructureChange(value)
  }

  function renderFunctions() {
    if (!submittedData) return null

    if (activeStructure === "lista-simples") {
      return (
        <>
          <FunctionCard title="inserirInicio()" code={codeInsertStart(activeStructure, submittedData)} showInput onExecute={v => v !== undefined && onInsertStart(v)} />
          <FunctionCard title="inserirFim()"    code={codeInsertEnd(activeStructure, submittedData)}   showInput onExecute={v => v !== undefined && onInsertEnd(v)} />
          <FunctionCard title="removerInicio()" code={codeRemoveStart(activeStructure, submittedData)} onExecute={() => onRemoveStart()} />
          <FunctionCard title="removerFim()"    code={codeRemoveEnd(activeStructure, submittedData)}   onExecute={() => onRemoveEnd()} />
        </>
      )
    }

    if (activeStructure === "lista-dupla") {
      return (
        <>
          <FunctionCard title="inserirInicio()" code={codeInsertStart(activeStructure, submittedData)} showInput onExecute={v => v !== undefined && onInsertStart(v)} />
          <FunctionCard title="inserirFim()"    code={codeInsertEnd(activeStructure, submittedData)}   showInput onExecute={v => v !== undefined && onInsertEnd(v)} />
          <FunctionCard title="removerInicio()" code={codeRemoveStart(activeStructure, submittedData)} onExecute={() => onRemoveStart()} />
          <FunctionCard title="removerFim()"    code={codeRemoveEnd(activeStructure, submittedData)}   onExecute={() => onRemoveEnd()} />
        </>
      )
    }

    if (activeStructure === "pilha") {
      const d = submittedData as StackFormData
      return (
        <>
          <FunctionCard title="push()" code={codePush(d)} showInput onExecute={v => v !== undefined && onInsertEnd(v)} />
          <FunctionCard title="pop()"  code={codePop(d)}  onExecute={() => onRemoveEnd()} />
        </>
      )
    }

    if (activeStructure === "fila") {
      const d = submittedData as QueueFormData
      return (
        <>
          <FunctionCard title="enqueue()" code={codeEnqueue(d)} showInput onExecute={v => v !== undefined && onInsertEnd(v)} />
          <FunctionCard title="dequeue()" code={codeDequeue(d)} onExecute={() => onRemoveStart()} />
        </>
      )
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-border flex items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Estrutura
        </span>
      </div>

      <Tabs
        value={activeStructure}
        onValueChange={handleStructureChange}
        className="flex flex-col flex-1 overflow-hidden"
      >
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
              <Badge variant="outline" className="text-xs font-mono">{s.badge}</Badge>
              <p className="text-xs text-muted-foreground">{s.description}</p>
            </div>

            <div className="flex flex-col flex-1 overflow-y-auto">
              {showFunctions && submittedData ? (
                <div className="flex flex-col gap-3 p-4">
                  <div className="border border-border rounded-lg overflow-hidden">
                    <div className="px-3 py-2 bg-muted">
                      <span className="text-xs font-semibold font-mono">Estrutura</span>
                    </div>
                    <pre className="p-3 text-xs font-mono overflow-auto bg-background text-foreground leading-relaxed whitespace-pre-wrap">
                      {codeStruct(activeStructure, submittedData)}
                    </pre>
                  </div>

                  {renderFunctions()}
                </div>
              ) : (
                <>
                  {s.id === "lista-simples" && <SimpleListForm onSubmit={handleFormSubmit} />}
                  {s.id === "lista-dupla"   && <DoubleListForm onSubmit={handleFormSubmit} />}
                  {s.id === "pilha"          && <StackForm      onSubmit={handleFormSubmit} />}
                  {s.id === "fila"           && <QueueForm      onSubmit={handleFormSubmit} />}
                </>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}