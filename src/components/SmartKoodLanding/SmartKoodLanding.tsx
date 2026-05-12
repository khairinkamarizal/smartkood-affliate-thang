import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import { AffiliateShareCard } from '../AffiliateShareCard'
import { ProductCard } from '../ProductCard'
import type { PlaygroundState, Translator } from '../types'

type SmartKoodLandingProps = {
  state: PlaygroundState
  t: Translator
}

export function SmartKoodLanding({ state, t }: SmartKoodLandingProps) {
  return (
    <Box
      sx={{
        background: 'var(--sk-bg)',
        borderRadius: '8px',
        color: 'var(--sk-text)',
        fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          background: 'var(--sk-primary)',
          color: '#fff',
          display: 'flex',
          fontSize: 16,
          fontWeight: 500,
          justifyContent: 'space-between',
          minHeight: 52,
          padding: '14px 18px',
        }}
      >
        <span>SmartKood</span>
        <Chip
          label={state.locale.toUpperCase()}
          size="small"
          sx={{
            background: 'rgba(255, 255, 255, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            color: '#fff',
            fontSize: 11,
            height: 22,
            opacity: 0.85,
          }}
        />
      </Box>
      <Box sx={{ padding: '18px' }}>
        <ProductCard t={t} />
        <AffiliateShareCard t={t} />
      </Box>
    </Box>
  )
}
