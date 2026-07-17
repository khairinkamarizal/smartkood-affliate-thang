import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import { useMemo, useState } from 'react'
import type { ScreenId } from '../types'

type HandoffPanelProps = { screen: ScreenId }
type Pane = 'prompt' | 'html' | 'css'
type Artifact = { name: string; prompt: string; html: string; css: string }

export function HandoffPanel({ screen }: HandoffPanelProps) {
  const [pane, setPane] = useState<Pane>('prompt')
  const [copied, setCopied] = useState(false)
  const artifact = useMemo(() => getArtifact(screen), [screen])
  const value = artifact[pane]

  const copy = async () => {
    try { await navigator.clipboard.writeText(value) } catch { /* preview environment */ }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Box component="aside" className="handoff-sidebar" aria-label="Component handoff">
      <Box className="handoff-titlebar">
        <Box>
          <Typography component="h2">Component handoff</Typography>
          <Typography>{artifact.name}</Typography>
        </Box>
        <span>v1.0</span>
      </Box>
      <Tabs value={pane} onChange={(_, next: Pane) => setPane(next)} variant="fullWidth" aria-label="Handoff code panes">
        <Tab value="prompt" label="AI Prompt" />
        <Tab value="html" label="HTML" />
        <Tab value="css" label="CSS" />
      </Tabs>
      <Box className="editor-toolbar">
        <span>{pane === 'prompt' ? 'PROMPT.md' : pane.toUpperCase()}</span>
        <Button onClick={copy} startIcon={copied ? <CheckRoundedIcon /> : <ContentCopyRoundedIcon />}>{copied ? 'Copied' : 'Copy'}</Button>
      </Box>
      <Box component="pre" className="code-editor"><code>{value}</code></Box>
      <Box aria-live="polite" className="handoff-live">{copied ? `${pane} copied` : ''}</Box>
      <Box className="palette-strip" aria-label="Apple-inspired vibrant design palette">
        <span style={{ background: '#0071e3' }} /><span style={{ background: '#5ac8fa' }} /><span style={{ background: '#ff3b6b' }} /><span style={{ background: '#ff9f0a' }} /><span style={{ background: '#f7f7f5' }} />
      </Box>
    </Box>
  )
}

function getArtifact(screen: ScreenId): Artifact {
  if (screen === 'sk-landing-with-card') return cardArtifact
  if (screen.startsWith('share-dialog')) return dialogArtifact
  if (screen.startsWith('email-conversion')) return emailArtifact
  return signupArtifact
}

const sharedBrief = `Visual direction: vibrant Apple-inspired commerce: crisp, minimal, high-chroma, and never cartoonish or generic AI. Use solid Apple blue #0071e3 for actions, vivid coral #ff3b6b for earned-value emphasis, and controlled cyan #5ac8fa and tangerine #ff9f0a accents. Surfaces are clean white or cool gray, borders are 1px, and shadows are soft. Use an SF Pro/system stack with a strict optical hierarchy: display headlines at 700, controls at 600, labels at 500–600, and body copy at 400; never use 800 or 900 weights. Keep gradients limited to thin spectrum rails and diffused background light. Never use gradient buttons, purple wash, glassmorphism overload, thick black outlines, or floating blobs.`

const cardArtifact: Artifact = {
  name: 'AffiliateShareCard',
  prompt: `Create a responsive affiliate earnings card for React. ${sharedBrief}\n\nKeep this hierarchy: affiliate badge, strong earnings headline, one supporting sentence, then a full-width CTA. Use a subtle multi-color 3px rail at the top; do not add new content. The amount is vivid coral and the CTA is solid Apple blue. Minimum touch target 44px; preserve visible focus and reduced-motion support.`,
  html: `<section class="affiliate-card" aria-labelledby="affiliate-title">
  <span class="affiliate-badge">Become an affiliate</span>
  <h2 id="affiliate-title">Earn <strong>RM230+</strong> or more by sharing this product</h2>
  <p>When 10 friends buy through your link, rewards land in your wallet automatically.</p>
  <button type="button">Start earning now <span aria-hidden="true">→</span></button>
</section>`,
  css: `.affiliate-card {
  position: relative; overflow: hidden; padding: 22px;
  border: 1px solid rgba(29,37,39,.10); border-radius: 22px;
  background: radial-gradient(circle at 12% 0%, rgba(117,185,214,.42), transparent 36%),
    radial-gradient(circle at 100% 18%, rgba(229,111,99,.28), transparent 34%), #fff;
  box-shadow: 0 22px 52px rgba(35,57,60,.14);
}
.affiliate-card::before { content:""; position:absolute; inset:0 24px auto; height:3px;
  background:linear-gradient(90deg,#5ac8fa,#0071e3 34%,#ff3b6b 68%,#ff9f0a); }
.affiliate-badge { display:inline-block; padding:7px 11px; border-radius:999px; background:rgba(255,255,255,.72); font-weight:600; font-size:11.5px; }
.affiliate-card h2 { margin:14px 0 10px; font:700 30px/1.08 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; letter-spacing:-.035em; color:#171d1f; }
.affiliate-card h2 strong { color:#ff3b6b; }
.affiliate-card p { color:#646b6c; font:500 12.5px/1.58 system-ui; }
.affiliate-card button { width:100%; min-height:48px; margin-top:22px; border:0; border-radius:13px; background:#0071e3; color:white; font-size:15px; font-weight:600; }
.affiliate-card button:hover { background:#0064c8; }
.affiliate-card button:focus-visible { outline:3px solid #5ac8fa; outline-offset:3px; }`,
}

const dialogArtifact: Artifact = {
  name: 'ShareDialog',
  prompt: `Create a mobile-first affiliate share flow as an iPhone-style bottom sheet. ${sharedBrief}\n\nSupport initial, submitting, success, rate-limited, and revoked states. Submitting uses an Apple-blue button at 72% opacity with a spinner and no hover. Rate-limited uses a flat neutral-gray disabled button with no shadow. Keep labels associated, announce copy success with aria-live, and keep the sheet anchored to the bottom with a 28px top radius.`,
  html: `<div class="sheet-backdrop">
  <section class="share-sheet" role="dialog" aria-modal="true" aria-labelledby="share-title">
    <span class="sheet-handle" aria-hidden="true"></span>
    <h2 id="share-title">Share &amp; earn</h2>
    <p>Enter your email. We'll send you a link to share.</p>
    <label for="share-email">Your email address</label>
    <input id="share-email" type="email" value="aishah@example.com">
    <div class="actions"><button class="quiet">Cancel</button><button class="primary">Get my link</button></div>
  </section>
</div>`,
  css: `.sheet-backdrop { position:relative; min-height:650px; background:rgba(17,24,25,.42); }
.share-sheet { position:absolute; inset:auto 0 0; padding:20px 20px 24px; border-radius:28px 28px 0 0;
  background:rgba(255,255,255,.96); box-shadow:0 -24px 64px rgba(28,44,46,.22); color:#171d1f; }
.sheet-handle { display:block; width:44px; height:4px; margin:-8px auto 20px; border-radius:99px;
  background:linear-gradient(90deg,#5ac8fa,#0071e3 34%,#ff3b6b 68%,#ff9f0a); }
.share-sheet h2 { margin:0 0 8px; font:700 28px/1.08 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; letter-spacing:-.035em; }
.share-sheet label { display:block; margin:18px 0 7px; color:#686f70; font:650 12px system-ui; }
.share-sheet input { width:100%; min-height:46px; padding:0 12px; border:1px solid #d9ddde; border-radius:11px; background:#f5f7f7; }
.actions { display:grid; grid-template-columns:1fr 2fr; gap:10px; margin-top:16px; }
.actions button { min-height:46px; border:0; border-radius:12px; font-size:15px; font-weight:600; }
.primary { background:#0071e3; color:white; }.quiet { background:transparent; color:#727879; }
.primary:disabled[data-state="loading"] { opacity:.72; }.primary:disabled[data-state="rate"] { background:#eceeef; color:#8e9394; opacity:1; }`,
}

const emailArtifact: Artifact = {
  name: 'ConversionEmail',
  prompt: `Create a 600px-wide affiliate reward newsletter. ${sharedBrief}\n\nUse a branded header, a centered editorial reward message, a plain two-line purchase receipt, a balance row, one solid Apple-blue CTA, and a distinct branded footer. Keep the layout email-friendly: single column, generous spacing, no dark reward cards, no huge promo panels, and no invented claims. Provide separate sign-up and sign-in CTA variants.`,
  html: `<article class="reward-email">
  <header><b><i>smart</i>affiliate.</b><small>SmartKood</small></header>
  <main>
    <p>Hi there!</p><h1>You earned <em>RM 22.00</em> from your share!</h1>
    <p>Someone made a purchase using your affiliate link for Aerolite Air Purifier 3000.</p>
    <dl><div><dt>Aerolite Air Purifier 3000</dt><dd>RM 459.00</dd></div><div><dt>Your pending balance</dt><dd>RM 42.00</dd></div></dl>
    <a class="email-cta" href="#">Sign up to claim your balance →</a>
  </main>
  <footer><b>SmartAffiliate · SmartKood</b><p>You're receiving this because someone shared an affiliate link from this email address.</p></footer>
</article>`,
  css: `.reward-email { max-width:600px; margin:auto; overflow:hidden; border:1px solid #e2e5e5; border-radius:22px; background:#fff; box-shadow:0 24px 60px rgba(33,45,46,.10); color:#171d1f; font-family:system-ui; }
.reward-email::before { content:""; display:block; height:3px; background:linear-gradient(90deg,#5ac8fa,#0071e3 34%,#ff3b6b 68%,#ff9f0a); }
.reward-email header { display:flex; justify-content:space-between; padding:26px 38px; background:#0071e3; color:#fff; }.reward-email header i { color:#ffd60a; font-style:normal; }
.reward-email main { padding:48px; text-align:center; border-block:1px solid #eceeee; }.reward-email h1 { margin:12px auto 20px; max-width:470px; font-size:40px; font-weight:700; line-height:1.06; letter-spacing:-.04em; }.reward-email h1 em { color:#ff3b6b; font-style:normal; }
.reward-email dl { margin:32px 0 26px; text-align:left; }.reward-email dl div { display:flex; justify-content:space-between; padding:18px 0; border-bottom:1px solid #e8ebeb; }.reward-email dd { margin:0; font-weight:600; }
.email-cta { display:inline-flex; padding:14px 20px; border-radius:12px; background:#0071e3; color:#fff; text-decoration:none; font-size:14px; font-weight:600; }
.reward-email footer { padding:24px 38px; color:#83898a; font-size:10px; text-align:center; }`,
}

const signupArtifact: Artifact = {
  name: 'SignupClaim',
  prompt: `Create an earnings-claim signup page. ${sharedBrief}\n\nUse one white two-column card: the left side holds the existing welcome copy and pending amount on controlled cyan/coral diffused light; the right side holds the three existing fields and one solid Apple-blue submit button. Stack the columns on mobile. Do not add benefits, testimonials, or extra marketing copy. Associate every label and input and keep targets at least 44px.`,
  html: `<main class="claim-page">
  <section class="claim-summary"><b>smartaffiliate.</b><h1>Welcome!</h1><p>Set up your SmartAffiliate account to claim your earnings.</p><small>Pending earnings</small><strong>RM 42.00</strong></section>
  <form class="claim-form">
    <label>Email<input type="email" value="aishah@example.com" disabled></label>
    <label>Set a password<input type="password"></label>
    <label>Confirm password<input type="password"></label>
    <button>Create account &amp; claim →</button>
  </form>
</main>`,
  css: `.claim-page { display:grid; grid-template-columns:.88fr 1.12fr; max-width:820px; margin:auto; overflow:hidden; border:1px solid #e1e5e5; border-radius:24px; background:#fff; box-shadow:0 28px 70px rgba(33,45,46,.12); font-family:system-ui; }
.claim-summary { display:flex; min-height:500px; flex-direction:column; justify-content:space-between; padding:42px 38px; background:radial-gradient(circle at 0 0,rgba(117,185,214,.3),transparent 45%),radial-gradient(circle at 100% 100%,rgba(229,111,99,.18),transparent 44%),#f8f9f9; }
.claim-summary h1 { margin:56px 0 8px; font-size:44px; font-weight:700; line-height:1.05; letter-spacing:-.04em; }.claim-summary strong { display:block; margin-top:8px; font-size:54px; font-weight:700; letter-spacing:-.05em; }
.claim-form { align-self:center; padding:44px 48px; }.claim-form label { display:block; margin-bottom:16px; color:#686f70; font-size:13px; font-weight:500; }.claim-form input { display:block; width:100%; min-height:46px; margin-top:7px; border:1px solid #d9ddde; border-radius:11px; background:#f5f7f7; font-size:15px; }
.claim-form button { width:100%; min-height:46px; border:0; border-radius:12px; background:#0071e3; color:#fff; font-size:15px; font-weight:600; }
@media(max-width:700px){.claim-page{grid-template-columns:1fr}.claim-summary{min-height:260px}}`,
}
