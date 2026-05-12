import type { ReactNode } from 'react'

type FormFieldProps = {
  label: string
  children: ReactNode
}

export function FormField({ label, children }: FormFieldProps) {
  return (
    <div className="form-field">
      <label>{label}</label>
      {children}
    </div>
  )
}
