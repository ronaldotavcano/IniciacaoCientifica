interface SimpleListFormData {
  structName: string
  nextPointerName: string
}

interface StructFormProps {
  activeStructure: string
  onSubmit: (data: SimpleListFormData) => void
}


export default function StructForm({ activeStructure, onSubmit }: StructFormProps) {
  return (
    <div>
      active: {activeStructure}
      submit: <button onClick={() => onSubmit({ structName: "MinhaLista", nextPointerName: "proximo" })}>Enviar</button>
    </div>
  )
}
