import { BalanceCallout } from './BalanceCallout'
import { FormField } from './FormField'
import type { PlaygroundState, Translator } from './types'

type SignupClaimProps = {
  state: PlaygroundState
  t: Translator
}

export function SignupClaim({ state, t }: SignupClaimProps) {
  return (
    <div className="sa-app signup-shell">
      <div className="sa-signup-card">
        <h2>{t('signupWelcome')}</h2>
        <div className="subtitle">{t('signupClaimSub')}</div>
        <BalanceCallout amount={`RM ${state.balance.toFixed(2)}`} label={t('signupBalanceLabel')} />
        <FormField label={t('signupEmail')}><input defaultValue="aishah@example.com" disabled type="email" /></FormField>
        <FormField label={t('signupPassword')}><input placeholder="********" type="password" /></FormField>
        <FormField label={t('signupConfirm')}><input placeholder="********" type="password" /></FormField>
        <button className="sa-btn full-width" type="button">{t('signupContinue')}</button>
      </div>
    </div>
  )
}
