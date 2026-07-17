import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

type BalanceCalloutProps = {
  amount: string
  label: string
}

export function BalanceCallout({ amount, label }: BalanceCalloutProps) {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
        border: '1px solid #a7f3d0',
        borderRadius: '8px',
        my: 2,
        p: 2,
        textAlign: 'center',
      }}
    >
      <Typography sx={{ color: '#047857', fontSize: 28, fontWeight: 600 }}>{amount}</Typography>
      <Typography
        sx={{
          color: '#047857',
          fontSize: 11,
          letterSpacing: '0.05em',
          mt: 0.5,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </Typography>
    </Box>
  )
}
