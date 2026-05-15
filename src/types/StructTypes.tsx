export interface SimpleListFormData {
  structName: string
  nextPointerName: string
}

export interface DoubleListFormData {
  structName: string
  nextPointerName: string
  previousPointerName: string
}

export interface StackFormData {
  structName: string
  stackName: string
  nextPointerName: string
  topPointerName: string
}

export interface QueueFormData {
  structName: string
  queueName: string
  nextPointerName: string
  startPointerName: string
  endPointerName: string
}

export type FormData = SimpleListFormData | DoubleListFormData | StackFormData | QueueFormData