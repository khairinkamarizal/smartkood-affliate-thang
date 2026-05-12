import { AffiliateShareCard } from './AffiliateShareCard'
import { ProductCard } from './ProductCard'
import type { PlaygroundState, Translator } from './types'

type SmartKoodLandingProps = {
  state: PlaygroundState
  t: Translator
}

export function SmartKoodLanding({ state, t }: SmartKoodLandingProps) {
  return (
    <div className={`sk-app sk-${state.portal}`}>
      <div className="sk-header">
        <span>SmartKood</span>
        <span className="locale-chip">{state.locale.toUpperCase()}</span>
      </div>
      <div className="sk-content">
        <ProductCard t={t} />
        <AffiliateShareCard portal={state.portal} t={t} />
      </div>
    </div>
  )
}
