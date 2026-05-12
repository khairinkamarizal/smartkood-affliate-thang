import Typography from '@mui/material/Typography'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

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
      <Typography
        variant="h2"
        sx={{
          color: 'var(--text-dim)',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.06em',
          mt: 2,
          mb: 1,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </Typography>
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={(_, next) => {
          if (next !== null) onChange(next as T)
        }}
        sx={{
          background: 'var(--panel-2)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          p: '3px',
          '& .MuiToggleButton-root': {
            background: 'transparent',
            border: 0,
            borderRadius: '3px !important',
            color: 'var(--text-dim)',
            fontSize: 10,
            minWidth: 42,
            padding: '5px 10px',
            textTransform: 'none',
            transition: 'background 140ms var(--mui-ease), color 140ms var(--mui-ease)',
            '&.Mui-selected': {
              background: 'var(--bg)',
              color: 'var(--text)',
              '&:hover': { background: 'var(--bg)' },
            },
          },
        }}
      >
        {options.map((option) => (
          <ToggleButton key={option.value} value={option.value}>
            {option.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </>
  )
}
