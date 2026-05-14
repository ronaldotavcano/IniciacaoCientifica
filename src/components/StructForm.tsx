interface SimpleListFormData {
  structName: string
  nextPointerName: string
}

interface StructFormProps {
  activeStructure: string
  onSubmit: (data: SimpleListFormData) => void
}

/*
export default function StructForm({ activeStructure, onSubmit }: StructFormProps) {
  return (
    <div>
      
    </div>
  )
}
*/