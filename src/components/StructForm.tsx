import { useState } from "react"
import { Button } from "./ui/button"

interface SimpleListFormData {
  structName: string
  nextPointerName: string
  previousPointerName: string
}

interface StructFormProps {
  activeStructure: string
  onSubmit: (data: SimpleListFormData) => void
}


export default function StructForm({ activeStructure, onSubmit }: StructFormProps) {
    const [formData, setFormData] = useState<SimpleListFormData>({
    structName: "",
    nextPointerName: "",
    previousPointerName: "",
  })
  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    setFormData(prev =>({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  function handleSubmit(){
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

      {activeStructure === "lista-dupla" && (
        <div className="flex flex-col gap-1">
        <label className="text-sm text-muted-foreground">Nome Ponteiro Anterior</label>
        <input
          name="previousPointerName"
          value={formData.previousPointerName}
          onChange={handleChange}
          placeholder="Digite o nome do ponteiro "
          className="border border-border rounded px-3 py-2 text-sm bg-background text-foreground"
        />
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-sm text-muted-foreground">Nome Ponteiro Próximo</label>
        <input
          name="nextPointerName"
          value={formData.nextPointerName}
          onChange={handleChange}
          placeholder="Digite o nome do ponteiro "
          className="border border-border rounded px-3 py-2 text-sm bg-background text-foreground"
        />
      </div>

      <Button onClick={handleSubmit}>Enviar</Button>

    </div>
  )  
}
