import type { Dispatch, SetStateAction } from 'react'

export type Locale = 'en' | 'ms' | 'zh-CN'
export type Portal = 'v1' | 'v2'

export type ScreenId =
  | 'sa-seller-widgets'
  | 'sa-issue-widget'
  | 'sa-token-created'
  | 'sk-customerportal-editor'
  | 'sk-landing-with-card'
  | 'share-dialog-initial'
  | 'share-dialog-submitting'
  | 'share-dialog-success'
  | 'share-dialog-error-rate'
  | 'share-dialog-error-revoked'
  | 'email-conversion-stub'
  | 'email-conversion-real'
  | 'sa-signup-claim'

export type PlaygroundState = {
  screen: ScreenId
  portal: Portal
  locale: Locale
  balance: number
  rate: number
  lastConv: number
}

export type Screen = {
  id: ScreenId
  title: string
  meta: string
}

export type Translator = (key: string) => string
export type SetPlaygroundState = Dispatch<SetStateAction<PlaygroundState>>
export type ShareVariant = 'initial' | 'submitting' | 'success' | 'error-rate' | 'error-revoked'
