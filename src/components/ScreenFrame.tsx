import { ConversionEmail } from './ConversionEmail'
import { ShareDialogScreen } from './ShareDialog'
import { SignupClaim } from './SignupClaim'
import { SmartKoodLanding } from './SmartKoodLanding'
import type { PlaygroundState, Screen, Translator } from './types'

type ScreenFrameProps = {
  screen: Screen
  state: PlaygroundState
  t: Translator
}

export function ScreenFrame({ screen, state, t }: ScreenFrameProps) {
  const meta = getFrameMeta(state)

  return (
    <div>
      <div className="screen-label">
        <span className={`dev-tag ${meta.tagClass}`}>{meta.tag}</span>
        <span>{screen.title}</span>
      </div>
      <div className={`screen-frame ${meta.width}`}>
        <ScreenRenderer state={state} t={t} />
      </div>
    </div>
  )
}

function getFrameMeta(state: PlaygroundState) {
  if (state.screen.startsWith('sa-')) {
    return { width: 'desktop', tag: state.screen === 'sa-signup-claim' ? 'SA signup' : 'SA seller', tagClass: 'sa' }
  }
  if (state.screen === 'sk-customerportal-editor') return { width: 'desktop', tag: 'SK customerportal', tagClass: '' }
  if (state.screen.startsWith('email-')) {
    return { width: 'desktop', tag: state.screen === 'email-conversion-stub' ? 'Email (stub)' : 'Email (real user)', tagClass: 'email' }
  }
  return { width: 'mobile', tag: `SK ${state.portal}`, tagClass: '' }
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
