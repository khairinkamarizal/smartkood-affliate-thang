import type { Portal, Translator } from './types'

type AffiliateShareCardProps = {
  portal: Portal
  t: Translator
}

export function AffiliateShareCard({ portal, t }: AffiliateShareCardProps) {
  if (portal === 'v1') {
    return (
      <div className="share-card">
        <div className="share-card-rate">{t('earnRate')}</div>
        <div className="share-card-title">{t('earnTitle')}</div>
        <div className="share-card-desc">{t('earnDesc')}</div>
        <button className="btn" type="button">{t('shareNow')}</button>
      </div>
    )
  }

  return (
    <div className="share-card">
      <div className="share-rate-pill">{t('earnRate')}</div>
      <div className="share-card-title">{t('earnTitle')}</div>
      <div className="share-card-desc">{t('earnDesc')}</div>
      <button className="btn btn-primary-green" type="button">{t('shareNow')}</button>
    </div>
  )
}
