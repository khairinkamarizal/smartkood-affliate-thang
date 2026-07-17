import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import { ConversionEmail } from '../ConversionEmail'
import { ShareDialogScreen } from '../ShareDialog'
import { SignupClaim } from '../SignupClaim'
import { SmartKoodLanding } from '../SmartKoodLanding'
import type { PlaygroundState, Screen, Translator } from '../types'

type ScreenFrameProps = {
  screen: Screen
  state: PlaygroundState
  t: Translator
}

type FrameMeta = {
  width: 'mobile' | 'desktop'
  tag: string
  tagColor: string
}

export function ScreenFrame({ screen, state, t }: ScreenFrameProps) {
  const meta = getFrameMeta(state)
  const frameWidth = meta.width === 'mobile' ? 380 : 980

  return (
    <Box>
      <Box
        sx={{
          alignItems: 'center',
          color: 'var(--text-dim)',
          display: 'flex',
          flexWrap: 'wrap',
          fontFamily: 'var(--mono)',
          fontSize: 11,
          gap: '8px',
          mb: '8px',
        }}
      >
        <Chip
          label={meta.tag}
          size="small"
          sx={{
            bgcolor: meta.tagColor,
            borderRadius: '3px',
            color: '#fff',
            fontSize: 9,
            fontWeight: 600,
            height: 'auto',
            padding: '1px 6px',
            '& .MuiChip-label': { px: 0 },
          }}
        />
        <span>{screen.title}</span>
      </Box>
      <Box
        sx={{
          background: 'var(--panel)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          maxWidth: '100%',
          padding: 2,
          width: frameWidth,
        }}
      >
        <ScreenRenderer state={state} t={t} />
      </Box>
    </Box>
  )
}

function getFrameMeta(state: PlaygroundState): FrameMeta {
  if (state.screen.startsWith('sa-')) {
    return {
      width: 'desktop',
      tag: state.screen === 'sa-signup-claim' ? 'SA signup' : 'SA seller',
      tagColor: 'var(--accent)',
    }
  }
  if (state.screen === 'sk-customerportal-editor') {
    return { width: 'desktop', tag: 'SK customerportal', tagColor: 'var(--accent-2)' }
  }
  if (state.screen.startsWith('email-')) {
    return {
      width: 'desktop',
      tag: state.screen === 'email-conversion-stub' ? 'Email (stub)' : 'Email (real user)',
      tagColor: 'var(--warn)',
    }
  }
  return { width: 'mobile', tag: 'SK latest', tagColor: 'var(--accent-2)' }
}

function ScreenRenderer({ state, t }: { state: PlaygroundState; t: Translator }) {
  switch (state.screen) {
    case 'sk-landing-with-card':
      return <SmartKoodLanding state={state} t={t} />
    case 'share-dialog-initial':
      return <ShareDialogScreen variant="initial" t={t} />
    case 'share-dialog-submitting':
      return <ShareDialogScreen variant="submitting" t={t} />
    case 'share-dialog-success':
      return <ShareDialogScreen variant="success" t={t} />
    case 'share-dialog-error-rate':
      return <ShareDialogScreen variant="error-rate" t={t} />
    case 'share-dialog-error-revoked':
      return <ShareDialogScreen variant="error-revoked" t={t} />
    case 'email-conversion-stub':
      return <ConversionEmail state={state} t={t} variant="stub" />
    case 'email-conversion-real':
      return <ConversionEmail state={state} t={t} variant="real" />
    case 'sa-signup-claim':
      return <SignupClaim state={state} t={t} />
    default:
      return <SmartKoodLanding state={state} t={t} />
  }
}
