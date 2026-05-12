import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

const STRUCTURES = [
  {
    id: "lista-simples",
    label: "Lista Simples",
    badge: "→",
    description: "Cada nó aponta para o próximo. O último aponta para NULL.",
    code: `#include <stdio.h>
#include <stdlib.h>

typedef struct No {
    int dado;
    struct No *prox;
} No;

// Complete a função abaixo:
No* criarNo(int valor) {

}`,
  },
  {
    id: "lista-dupla",
    label: "Lista Dupla",
    badge: "⇄",
    description: "Cada nó aponta para o próximo e para o anterior.",
    code: `#include <stdio.h>
#include <stdlib.h>

typedef struct No {
    int dado;
    struct No *prox;
    struct No *ante;
} No;

// Complete a função abaixo:
No* criarNo(int valor) {

}`,
  },
  {
    id: "pilha",
    label: "Pilha",
    badge: "LIFO",
    description: "Inserção e remoção sempre no topo. Last In, First Out.",
    code: `#include <stdio.h>
#include <stdlib.h>

typedef struct No {
    int dado;
    struct No *prox;
} No;

typedef struct {
    No *topo;
} Pilha;

// Complete as funções abaixo:
void push(Pilha *p, int valor) {

}`,
  },
  {
    id: "fila",
    label: "Fila",
    badge: "FIFO",
    description: "Inserção no fim, remoção no início. First In, First Out.",
    code: `#include <stdio.h>
#include <stdlib.h>

typedef struct No {
    int dado;
    struct No *prox;
} No;

typedef struct {
    No *inicio;
    No *fim;
} Fila;

// Complete as funções abaixo:
void enqueue(Fila *f, int valor) {

}`,
  },
]

interface StructPanelProps {
  activeStructure: string
  onStructureChange: (value: string) => void
}

export default function StructPanel({ activeStructure, onStructureChange }: StructPanelProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-border flex items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Estrutura
        </span>
      </div>

      <Tabs value={activeStructure} onValueChange={onStructureChange} className="flex flex-col flex-1 overflow-hidden">
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
              <div className="select-none bg-muted/30 border-r border-border px-3 py-4 text-xs font-mono text-muted-foreground leading-6 shrink-0">
                {s.code.split("\n").map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              <textarea
                readOnly
                defaultValue={s.code}
                spellCheck={false}
                className="
                  flex-1 resize-none bg-transparent
                  px-4 py-4
                  text-xs font-mono leading-6
                  text-foreground
                  focus:outline-none
                  overflow-auto
                "
              />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}