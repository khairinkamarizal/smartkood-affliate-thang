type RangeControlProps = {
  label: string
  min: number
  max: number
  step: number
  value: number
  display: string
  onChange: (value: number) => void
}

export function RangeControl({
  label,
  min,
  max,
  step,
  value,
  display,
  onChange,
}: RangeControlProps) {
  return (
    <label className="control-row">
      <span>{label}</span>
      <input
        max={max}
        min={min}
        onChange={(event) => onChange(Number(event.target.value))}
        step={step}
        type="range"
        value={value}
      />
      <span className="value">{display}</span>
    </label>
  )
}
