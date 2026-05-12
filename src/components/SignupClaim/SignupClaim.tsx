import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { BalanceCallout } from '../BalanceCallout'
import { FormField } from '../FormField'
import type { PlaygroundState, Translator } from '../types'

type SignupClaimProps = {
  state: PlaygroundState
  t: Translator
}

export function SignupClaim({ state, t }: SignupClaimProps) {
  return (
    <Box
      sx={{
        background: 'var(--sa-bg)',
        borderRadius: '8px',
        color: 'var(--sa-text)',
        display: 'flex',
        fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        justifyContent: 'center',
        padding: '32px',
      }}
    >
      <Box
        sx={{
          background: '#fff',
          borderRadius: '12px',
          maxWidth: 480,
          padding: '28px',
          width: '100%',
        }}
      >
        <Typography
          component="h2"
          sx={{ color: 'var(--sa-text)', fontSize: 24, fontWeight: 700, m: 0, mb: 0.75 }}
        >
          {t('signupWelcome')}
        </Typography>
        <Typography sx={{ color: 'var(--sa-text-dim)', fontSize: 14, mb: 2.5 }}>
          {t('signupClaimSub')}
        </Typography>
        <BalanceCallout
          amount={`RM ${state.balance.toFixed(2)}`}
          label={t('signupBalanceLabel')}
        />
        <FormField label={t('signupEmail')}>
          <input defaultValue="aishah@example.com" disabled type="email" />
        </FormField>
        <FormField label={t('signupPassword')}>
          <input placeholder="********" type="password" />
        </FormField>
        <FormField label={t('signupConfirm')}>
          <input placeholder="********" type="password" />
        </FormField>
        <Button
          fullWidth
          variant="contained"
          disableElevation
          sx={{
            bgcolor: 'var(--sa-accent)',
            color: '#fff',
            fontSize: 13,
            fontWeight: 500,
            padding: '12px',
            textTransform: 'none',
            '&:hover': { bgcolor: 'var(--sa-accent)', transform: 'translateY(-1px)' },
          }}
        >
          {t('signupContinue')}
        </Button>
      </Box>
    </Box>
  )
}
