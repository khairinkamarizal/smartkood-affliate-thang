type SegmentedControlProps<T extends string> = {
  label: string
  options: { label: string; value: T }[]
  value: T
  onChange: (value: T) => void
}

export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <>
      <h2>{label}</h2>
      <div className="seg">
        {options.map((option) => (
          <button
            className={option.value === value ? 'active' : ''}
            key={option.value}
            onClick={() => onChange(option.value)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
    </>
  )
}
