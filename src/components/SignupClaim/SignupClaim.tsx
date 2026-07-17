import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
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
        alignItems: 'center',
        background: 'radial-gradient(circle at 10% 10%, rgba(90,200,250,.28), transparent 30%), radial-gradient(circle at 90% 90%, rgba(255,59,107,.18), transparent 32%), #f5f5f7',
        borderRadius: '8px',
        color: '#171419',
        display: 'flex',
        fontFamily: 'Roboto, sans-serif',
        justifyContent: 'center',
        minHeight: 600,
        padding: { xs: '16px', sm: '32px' },
      }}
    >
      <Box
        sx={{
          background: '#fff',
          border: '1px solid #e1e2e7',
          borderRadius: '24px',
          boxShadow: '0 28px 70px rgba(33,28,49,.12)',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '.88fr 1.12fr' },
          maxWidth: 820,
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
          '&::before': {
            background: 'linear-gradient(90deg, #5ac8fa, #0071e3 34%, #ff3b6b 68%, #ff9f0a)',
            content: '""',
            height: 3,
            left: 0,
            position: 'absolute',
            right: 0,
            top: 0,
            zIndex: 2,
          },
        }}
      >
        <Box
          sx={{
            background:
              'radial-gradient(circle at 12% 0%, rgba(90,200,250,.55), transparent 36%), radial-gradient(circle at 100% 18%, rgba(255,59,107,.34), transparent 34%), radial-gradient(circle at 58% 115%, rgba(255,159,10,.38), transparent 40%), linear-gradient(145deg, #ffffff 8%, #f2f8ff 55%, #fff8ed 100%)',
            borderBottom: { xs: '1px solid #e7e6eb', md: 0 },
            borderRight: { xs: 0, md: '1px solid #e7e6eb' },
            color: '#171419',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            minHeight: { xs: 300, md: 480 },
            overflow: 'hidden',
            padding: { xs: '32px 24px', sm: '40px' },
            position: 'relative',
          }}
        >
          <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', position: 'relative', zIndex: 1 }}>
            <Typography sx={{ color: '#0071e3', fontSize: 17, fontWeight: 600, letterSpacing: '-.025em', mb: { xs: '40px', md: '48px' } }}>
              smartaffiliate<Box component="span" sx={{ color: '#ff3b6b' }}>.</Box>
            </Typography>
            <Typography component="div" role="heading" aria-level={1} sx={{ fontSize: { xs: 36, sm: 44 }, fontWeight: 600, letterSpacing: '-.04em', lineHeight: 1.05 }}>
              {t('signupWelcome')}
            </Typography>
            <Typography sx={{ color: '#69636d', fontSize: 15, lineHeight: 1.5, mt: '16px' }}>{t('signupClaimSub')}</Typography>
            <Box sx={{ mt: 'auto', pt: { xs: '44px', md: '56px' } }}>
              <Box sx={{ alignItems: 'center', display: 'flex', gap: '8px' }}>
                <Box aria-hidden="true" sx={{ background: '#ffd60a', borderRadius: '50%', height: 8, width: 8 }} />
                <Typography sx={{ color: '#5f5964', fontSize: 11, fontWeight: 600, letterSpacing: '.075em', textTransform: 'uppercase' }}>
                  {t('signupBalanceLabel')}
                </Typography>
              </Box>
              <Typography sx={{ color: '#ff3b6b', fontSize: { xs: 46, sm: 54 }, fontWeight: 600, letterSpacing: '-.055em', lineHeight: 1, mt: '10px' }}>
                RM {state.balance.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          component="form"
          onSubmit={(event) => event.preventDefault()}
          sx={{
            '--sk-border': '#d9d9e0',
            '--sk-input-bg': '#f5f5f7',
            '--sk-secondary': '#0071e3',
            '--sk-text': '#171419',
            '--sk-text-dim': '#68626c',
            alignSelf: 'center',
            padding: { xs: '32px 24px', sm: '40px 48px' },
            '& input': { borderRadius: '11px', minHeight: 46 },
            '& input:focus': { boxShadow: '0 0 0 3px rgba(0,113,227,.14)' },
          }}
        >
          <FormField label={t('signupEmail')} htmlFor="signup-email">
            <input id="signup-email" autoComplete="email" defaultValue="aishah@example.com" disabled type="email" />
          </FormField>
          <FormField label={t('signupPassword')} htmlFor="signup-password">
            <input id="signup-password" autoComplete="new-password" placeholder="********" type="password" />
          </FormField>
          <FormField label={t('signupConfirm')} htmlFor="signup-confirm">
            <input id="signup-confirm" autoComplete="new-password" placeholder="********" type="password" />
          </FormField>
          <Button
            fullWidth
            variant="contained"
            disableElevation
            endIcon={<ArrowForwardRoundedIcon />}
            sx={{
              background: '#0071e3',
              borderRadius: '12px',
              boxShadow: '0 10px 24px rgba(0,113,227,.24)',
              color: '#fff',
              fontSize: 15,
              fontWeight: 600,
              minHeight: 46,
              mt: 0,
              textTransform: 'none',
              '&:hover': { background: '#0064c8', boxShadow: '0 13px 28px rgba(0,113,227,.3)', transform: 'translateY(-1px)' },
              '&:focus-visible': { outline: '3px solid #73c8f2', outlineOffset: 3 },
            }}
          >
            {t('signupContinue')}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
