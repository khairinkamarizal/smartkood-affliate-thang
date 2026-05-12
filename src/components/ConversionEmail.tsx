import { BalanceCallout } from './BalanceCallout'
import type { PlaygroundState, Translator } from './types'

type ConversionEmailProps = {
  state: PlaygroundState
  t: Translator
  variant: 'stub' | 'real'
}

export function ConversionEmail({ state, t, variant }: ConversionEmailProps) {
  const isStub = variant === 'stub'

  return (
    <div className="email-frame">
      <div className="email-headers">
        <HeaderRow label="From:" value="SmartAffiliate <noreply@smartaffiliate.com>" />
        <HeaderRow label="To:" value="aishah@example.com" />
        <HeaderRow label="Subject:" value={t('emailConvSubject')} />
      </div>
      <div className="email-body">
        <h2>{t('emailConvSubject')}</h2>
        <p>{t('emailConvHello')}</p>
        <p>{t('emailConvBody')}</p>
        <div className="product-info">
          <strong>{t('productName')}</strong>
          <br />
          {t('productPrice')} - {t('earnRate')}
        </div>
        <BalanceCallout amount={`RM ${state.balance.toFixed(2)}`} label={t('emailConvBalanceLabel')} />
        <div className="email-cta">
          <a
            className="cta-btn"
            href={isStub ? 'https://buyer.smartaffiliate.com/signup?email=aishah@example.com&claim_widget=true' : 'https://buyer.smartaffiliate.com/login?email=aishah@example.com'}
          >
            {isStub ? t('emailConvCtaStub') : t('emailConvCtaReal')}
          </a>
        </div>
        <div className="footer">{t('emailConvFooter')}</div>
      </div>
    </div>
  )
}

function HeaderRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="row">
      <span className="label">{label}</span>
      <span className="value">{value}</span>
    </div>
  )
}
