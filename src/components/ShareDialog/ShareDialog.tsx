import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { FormField } from '../FormField'
import type { ShareVariant, Translator } from '../types'

type ShareDialogScreenProps = {
  variant: ShareVariant
  t: Translator
}

export function ShareDialogScreen({ variant, t }: ShareDialogScreenProps) {
  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          background: 'var(--sk-primary)',
          color: '#fff',
          fontSize: 12,
          padding: '14px',
          textAlign: 'center',
        }}
      >
        SmartKood landing page (background dimmed)
      </Box>
      <ShareDialog t={t} variant={variant} />
    </Box>
  )
}

function ShareDialog({ variant, t }: ShareDialogScreenProps) {
  return (
    <Box
      sx={{
        background: '#fff',
        borderRadius: '14px 14px 0 0',
        color: 'var(--sk-text)',
        padding: '22px',
        position: 'relative',
        '&::before': {
          background: '#d1d5db',
          borderRadius: '999px',
          content: '""',
          display: 'block',
          height: 4,
          margin: '-8px auto 14px',
          width: 42,
        },
      }}
    >
      {variant === 'initial' && (
        <>
          <DialogHeading text={t('dialogTitle')} />
          <Typography
            sx={{ color: 'var(--sk-text-dim)', fontSize: 12, lineHeight: 1.5, mb: 1.5 }}
          >
            {t('dialogHelper')}
          </Typography>
          <FormField label={t('emailLabel')}>
            <input defaultValue="aishah@example.com" placeholder="you@example.com" type="email" />
          </FormField>
          <FormActions>
            <CancelButton>{t('cancel')}</CancelButton>
            <SubmitButton>{t('submit')}</SubmitButton>
          </FormActions>
        </>
      )}
      {variant === 'submitting' && (
        <>
          <DialogHeading text={t('dialogTitle')} />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={1}
            sx={{
              color: 'var(--sk-text-dim)',
              fontSize: 12,
              minHeight: 112,
              padding: 3,
            }}
          >
            <CircularProgress size={16} sx={{ color: 'var(--sk-secondary)' }} />
            <span>{t('submitting')}</span>
          </Stack>
        </>
      )}
      {variant === 'success' && <ShareSuccess t={t} />}
      {variant === 'error-rate' && (
        <>
          <DialogHeading text={t('dialogTitle')} />
          <Alert severity="warning" sx={{ mb: 1.5, fontSize: 12 }}>
            {t('errorRateLimited')}
          </Alert>
          <FormField label={t('emailLabel')}>
            <input defaultValue="aishah@example.com" disabled type="email" />
          </FormField>
          <FormActions>
            <CancelButton>{t('cancel')}</CancelButton>
            <SubmitButton disabled>
              {t('submit')} (60s)
            </SubmitButton>
          </FormActions>
        </>
      )}
      {variant === 'error-revoked' && (
        <>
          <DialogHeading text={t('dialogTitle')} />
          <Alert severity="error" sx={{ mb: 1.5, fontSize: 12 }}>
            {t('errorRevoked')}
          </Alert>
          <FormActions>
            <SubmitButton>{t('done')}</SubmitButton>
          </FormActions>
        </>
      )}
    </Box>
  )
}

function ShareSuccess({ t }: { t: Translator }) {
  const url = 'https://buyer.smartaffiliate.com/shop/products/aerolite-3000?ref=AKLR8MX2'

  return (
    <>
      <DialogHeading text={t('successTitle')} />
      <Alert
        icon={false}
        severity="success"
        sx={{
          bgcolor: '#ecfdf5',
          border: '1px solid #a7f3d0',
          color: '#047857',
          fontSize: 11,
          mb: 1.5,
          py: '8px',
        }}
      >
        {t('successCommission')}
      </Alert>
      <Box
        sx={{
          background: 'var(--sk-input-bg)',
          border: '1px solid var(--sk-border)',
          borderRadius: '6px',
          color: 'var(--sk-text)',
          fontFamily: 'var(--mono)',
          fontSize: 12,
          mb: 1.75,
          padding: '12px 14px',
          wordBreak: 'break-all',
        }}
      >
        {url}
      </Box>
      <Typography
        sx={{ color: 'var(--sk-text-dim)', fontSize: 12, mb: 0.5, mt: 1, textAlign: 'center' }}
      >
        {t('emailUsedFor')}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gap: 1,
          gridTemplateColumns: 'repeat(3, 1fr)',
          mb: 1.5,
        }}
      >
        <ShareButton primary icon="Copy" label={t('copy')} />
        <ShareButton icon="WA" label={t('whatsapp')} />
        <ShareButton icon="f" label={t('facebook')} />
        <ShareButton icon="TG" label={t('telegram')} />
        <ShareButton
          icon="..."
          label={`${t('nativeShare')} (Instagram, WeChat, RED, TikTok)`}
          more
        />
      </Box>
      <FormActions>
        <SubmitButton>{t('done')}</SubmitButton>
      </FormActions>
    </>
  )
}

function ShareButton({
  icon,
  label,
  primary,
  more,
}: {
  icon: string
  label: string
  primary?: boolean
  more?: boolean
}) {
  return (
    <Button
      variant="outlined"
      sx={{
        alignItems: 'center',
        background: primary ? 'var(--sk-secondary)' : more ? '#fff' : 'var(--sk-input-bg)',
        border: more ? '1px dashed var(--sk-border)' : '1px solid var(--sk-border)',
        borderColor: primary ? 'var(--sk-secondary)' : 'var(--sk-border)',
        borderRadius: '6px',
        color: primary ? '#fff' : 'var(--sk-text)',
        display: 'flex',
        flexDirection: 'column',
        fontSize: 11,
        gap: 0.5,
        gridColumn: more ? 'span 3' : 'auto',
        minHeight: more ? 54 : 66,
        padding: '10px',
        textAlign: 'center',
        textTransform: 'none',
        '&:hover': {
          background: primary ? 'var(--sk-secondary)' : '#fff',
          borderColor: primary ? 'var(--sk-secondary)' : '#cfd5dc',
          transform: 'translateY(-1px)',
        },
      }}
    >
      <Box component="span" sx={{ fontSize: 13, fontWeight: 700 }}>
        {icon}
      </Box>
      <span>{label}</span>
    </Button>
  )
}

function DialogHeading({ text }: { text: string }) {
  return (
    <Typography
      component="h3"
      sx={{ color: 'var(--sk-text)', fontSize: 18, fontWeight: 600, m: 0, mb: 1.5 }}
    >
      {text}
    </Typography>
  )
}

function FormActions({ children }: { children: React.ReactNode }) {
  return (
    <Stack direction="row" spacing={1.25} justifyContent="flex-end" sx={{ mt: 1.5 }}>
      {children}
    </Stack>
  )
}

function CancelButton({ children }: { children: React.ReactNode }) {
  return (
    <Button
      variant="outlined"
      sx={{
        border: '1px solid var(--sk-border)',
        borderRadius: '6px',
        color: 'var(--sk-text)',
        minHeight: 40,
        padding: '10px 16px',
        textTransform: 'none',
        '&:hover': { background: 'rgba(58, 77, 84, 0.05)', borderColor: 'var(--sk-border)' },
      }}
    >
      {children}
    </Button>
  )
}

function SubmitButton({
  children,
  disabled,
}: {
  children: React.ReactNode
  disabled?: boolean
}) {
  return (
    <Button
      variant="contained"
      disabled={disabled}
      disableElevation
      sx={{
        bgcolor: 'var(--sk-secondary)',
        borderRadius: '6px',
        color: '#fff',
        fontWeight: 500,
        minHeight: 40,
        padding: '10px 16px',
        textTransform: 'none',
        '&:hover': { bgcolor: 'var(--sk-secondary)', transform: 'translateY(-1px)' },
      }}
    >
      {children}
    </Button>
  )
}
