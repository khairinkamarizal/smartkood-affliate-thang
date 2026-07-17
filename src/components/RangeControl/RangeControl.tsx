import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'

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
    <Box
      sx={{
        alignItems: 'center',
        color: 'var(--text-dim)',
        display: 'flex',
        fontSize: 11,
        gap: '8px',
        justifyContent: 'space-between',
        py: '8px',
      }}
    >
      <Typography component="span" sx={{ minWidth: 116, fontSize: 11, color: 'var(--text-dim)' }}>
        {label}
      </Typography>
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(_, next) => onChange(typeof next === 'number' ? next : next[0])}
        sx={{
          flex: 1,
          color: 'var(--accent)',
          height: 4,
          '& .MuiSlider-thumb': { width: 14, height: 14 },
        }}
      />
      <Typography
        component="span"
        sx={{
          color: 'var(--text)',
          fontFamily: 'var(--mono)',
          fontSize: 11,
          minWidth: 62,
          textAlign: 'right',
        }}
      >
        {display}
      </Typography>
    </Box>
  )
}
