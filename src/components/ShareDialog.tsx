import { FormField } from './FormField'
import type { ShareVariant, Translator } from './types'

type ShareDialogScreenProps = {
  variant: ShareVariant
  t: Translator
}

export function ShareDialogScreen({ variant, t }: ShareDialogScreenProps) {
  return (
    <div className="dialog-screen">
      <div className="dialog-backdrop-label">SmartKood landing page (background dimmed)</div>
      <ShareDialog t={t} variant={variant} />
    </div>
  )
}

function ShareDialog({ variant, t }: ShareDialogScreenProps) {
  return (
    <div className="share-dialog">
      {variant === 'initial' && (
        <>
          <h3>{t('dialogTitle')}</h3>
          <div className="form-helper">{t('dialogHelper')}</div>
          <FormField label={t('emailLabel')}><input defaultValue="aishah@example.com" placeholder="you@example.com" type="email" /></FormField>
          <div className="form-actions">
            <button className="btn-cancel" type="button">{t('cancel')}</button>
            <button className="btn-submit" type="button">{t('submit')}</button>
          </div>
        </>
      )}
      {variant === 'submitting' && (
        <>
          <h3>{t('dialogTitle')}</h3>
          <div className="submitting-spinner"><span className="spinner" /> {t('submitting')}</div>
        </>
      )}
      {variant === 'success' && <ShareSuccess t={t} />}
      {variant === 'error-rate' && (
        <>
          <h3>{t('dialogTitle')}</h3>
          <div className="error-banner warn">! {t('errorRateLimited')}</div>
          <FormField label={t('emailLabel')}><input defaultValue="aishah@example.com" disabled type="email" /></FormField>
          <div className="form-actions">
            <button className="btn-cancel" type="button">{t('cancel')}</button>
            <button className="btn-submit" disabled type="button">{t('submit')} (60s)</button>
          </div>
        </>
      )}
      {variant === 'error-revoked' && (
        <>
          <h3>{t('dialogTitle')}</h3>
          <div className="error-banner">x {t('errorRevoked')}</div>
          <div className="form-actions">
            <button className="btn-submit" type="button">{t('done')}</button>
          </div>
        </>
      )}
    </div>
  )
}

function ShareSuccess({ t }: { t: Translator }) {
  const url = 'https://buyer.smartaffiliate.com/shop/products/aerolite-3000?ref=AKLR8MX2'

  return (
    <>
      <h3>{t('successTitle')}</h3>
      <div className="success-pill">OK {t('successCommission')}</div>
      <div className="url-display">{url}</div>
      <div className="commission-line">{t('emailUsedFor')}</div>
      <div className="share-buttons">
        <ShareButton primary icon="Copy" label={t('copy')} />
        <ShareButton icon="WA" label={t('whatsapp')} />
        <ShareButton icon="f" label={t('facebook')} />
        <ShareButton icon="TG" label={t('telegram')} />
        <ShareButton icon="..." label={`${t('nativeShare')} (Instagram, WeChat, RED, TikTok)`} more />
      </div>
      <div className="form-actions">
        <button className="btn-submit" type="button">{t('done')}</button>
      </div>
    </>
  )
}

function ShareButton({ icon, label, primary, more }: { icon: string; label: string; primary?: boolean; more?: boolean }) {
  return (
    <button className={`share-btn ${primary ? 'primary' : ''} ${more ? 'more' : ''}`} type="button">
      <span className="share-icon">{icon}</span>
      <span>{label}</span>
    </button>
  )
}
