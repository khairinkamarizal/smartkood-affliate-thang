import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import type { Translator } from '../types'

type ProductCardProps = {
  t: Translator
}

export function ProductCard({ t }: ProductCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        background: 'var(--sk-bg)',
        border: '1px solid var(--sk-border)',
        borderRadius: '8px',
        mb: '16px',
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box
          sx={{
            alignItems: 'center',
            aspectRatio: '1.6',
            background:
              'linear-gradient(135deg, rgba(58, 77, 84, 0.08), rgba(106, 175, 104, 0.08)), var(--sk-input-bg)',
            borderRadius: '4px',
            color: 'var(--sk-text-dim)',
            display: 'flex',
            fontFamily: 'var(--mono)',
            fontSize: 11,
            justifyContent: 'center',
            mb: '12px',
          }}
        >
          [product image]
        </Box>
        <Typography sx={{ fontSize: 16, fontWeight: 500, mb: '4px' }}>{t('productName')}</Typography>
        <Typography
          sx={{ color: 'var(--sk-primary)', fontSize: 18, fontWeight: 600, mb: '8px' }}
        >
          {t('productPrice')}
        </Typography>
        <Typography sx={{ color: 'var(--sk-text-dim)', fontSize: 11 }}>{t('productMeta')}</Typography>
      </CardContent>
    </Card>
  )
}
