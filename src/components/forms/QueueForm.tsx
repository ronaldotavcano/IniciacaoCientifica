import { useState } from "react"
import { Button } from "@/components/ui/button"
import { type QueueFormData } from "@/types/StructTypes"

interface QueueFormProps {
  onSubmit: (data: QueueFormData) => void
}

export default function QueueForm({ onSubmit }: QueueFormProps) {
  const [formData, setFormData] = useState<QueueFormData>({
    structName: "",
    queueName: "",
    nextPointerName: "",
    startPointerName: "",
    endPointerName: "",
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  function handleSubmit() {
    onSubmit(formData)
  }

  return (
    <div className="flex flex-col gap-4 p-4">

      <div className="flex flex-col gap-1">
        <label className="text-sm text-muted-foreground">Nome Nó</label>
        <input
          name="structName"
          value={formData.structName}
          onChange={handleChange}
          placeholder="ex: Digite o nome do nó"
          className="border border-border rounded px-3 py-2 text-sm bg-background text-foreground"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-muted-foreground">Nome da Fila</label>
        <input
          name="queueName"
          value={formData.queueName}
          onChange={handleChange}
          placeholder="ex: Fila"
          className="border border-border rounded px-3 py-2 text-sm bg-background text-foreground"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-muted-foreground">Nome Ponteiro Próximo</label>
        <input
          name="nextPointerName"
          value={formData.nextPointerName}
          onChange={handleChange}
          placeholder="ex: prox"
          className="border border-border rounded px-3 py-2 text-sm bg-background text-foreground"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-muted-foreground">Nome Ponteiro Início</label>
        <input
          name="startPointerName"
          value={formData.startPointerName}
          onChange={handleChange}
          placeholder="ex: inicio"
          className="border border-border rounded px-3 py-2 text-sm bg-background text-foreground"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-muted-foreground">Nome Ponteiro Fim</label>
        <input
          name="endPointerName"
          value={formData.endPointerName}
          onChange={handleChange}
          placeholder="ex: fim"
          className="border border-border rounded px-3 py-2 text-sm bg-background text-foreground"
        />
      </div>

      <Button onClick={handleSubmit}>Enviar</Button>

    </div>
  )
}