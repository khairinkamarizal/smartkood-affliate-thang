import type { Translator } from './types'

type ProductCardProps = {
  t: Translator
}

export function ProductCard({ t }: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="product-image">[product image]</div>
      <div className="product-name">{t('productName')}</div>
      <div className="product-price">{t('productPrice')}</div>
      <div className="product-meta">{t('productMeta')}</div>
    </div>
  )
}
