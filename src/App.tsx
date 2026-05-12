import { useMemo, useState } from 'react'
import { CodePanel } from './components/CodePanel'
import { ScreenFrame } from './components/ScreenFrame'
import { Sidebar } from './components/Sidebar'
import type { Locale, PlaygroundState, Screen, ScreenId } from './components/types'
import './App.css'

const screens: Screen[] = [
  { id: 'sk-landing-with-card', title: 'SK landing page with card', meta: 'consumer view' },
  { id: 'share-dialog-initial', title: 'Share dialog: email entry', meta: 'pop-up state 1' },
  { id: 'share-dialog-submitting', title: 'Share dialog: submitting', meta: 'pop-up state 2' },
  { id: 'share-dialog-success', title: 'Share dialog: success', meta: 'pop-up state 3 (link revealed)' },
  { id: 'share-dialog-error-rate', title: 'Share dialog: rate limited', meta: 'pop-up error state' },
  { id: 'share-dialog-error-revoked', title: 'Share dialog: token revoked', meta: 'pop-up error state' },
  { id: 'email-conversion-stub', title: 'Conversion email - stub user', meta: 'sign-up CTA' },
  { id: 'email-conversion-real', title: 'Conversion email - real user', meta: 'sign-in CTA' },
  { id: 'sa-signup-claim', title: 'SA signup landing (claim)', meta: 'after clicking email link' },
]

const translations: Record<Locale, Record<string, string>> = {
  en: {
    productName: 'Aerolite Air Purifier 3000',
    productPrice: 'RM 459.00',
    productMeta: 'Authentic - Verified by SmartKood',
    earnTitle: 'Earn affiliate commission',
    earnRate: 'Earn ${rate}%',
    earnDesc: 'Share this product with friends. When they buy, you earn commission.',
    shareNow: 'Share Now',
    dialogTitle: 'Share & earn',
    dialogHelper: "Enter your email. We'll send you a link to share. When someone buys via your link, you earn ${rate}% commission.",
    emailLabel: 'Your email address',
    submit: 'Get my link',
    cancel: 'Cancel',
    successTitle: 'Your share link is ready',
    successCommission: "You'll earn ${rate}% on every purchase",
    copy: 'Copy link',
    whatsapp: 'WhatsApp',
    facebook: 'Facebook',
    telegram: 'Telegram',
    nativeShare: 'More apps...',
    done: 'Done',
    errorRateLimited: 'Too many requests. Try again in 60 seconds.',
    errorRevoked: 'This affiliate share is currently unavailable. Please contact the brand.',
    submitting: 'Generating your link...',
    emailUsedFor: "We'll email ${email} when someone buys.",
    emailConvSubject: 'You earned RM ${conv} from your share!',
    emailConvHello: 'Hi there!',
    emailConvBody: 'Someone made a purchase using your affiliate link for ${product}. You earned RM ${conv} in commission.',
    emailConvBalanceLabel: 'Your pending balance',
    emailConvCtaStub: 'Sign up to claim your balance',
    emailConvCtaReal: 'Sign in to view your balance',
    emailConvFooter: "You're receiving this because someone shared an affiliate link from this email address. To stop receiving these or delete your data, contact SmartAffiliate support.",
    signupWelcome: 'Welcome!',
    signupClaimSub: 'Set up your SmartAffiliate account to claim your earnings.',
    signupBalanceLabel: 'Pending earnings',
    signupEmail: 'Email',
    signupPassword: 'Set a password',
    signupConfirm: 'Confirm password',
    signupContinue: 'Create account & claim',
    sellerWidgetTitle: 'Affiliate widget tokens',
    sellerWidgetSub: 'Generate tokens to embed in SmartKood landing pages. Each token is bound to one product.',
    issueWidget: 'Issue widget token',
    tableToken: 'Token',
    tableProduct: 'Product',
    tableLabel: 'Label',
    tableStatus: 'Status',
    tableShares: 'Shares',
    tableLastUsed: 'Last used',
    tableActions: 'Actions',
    statusActive: 'active',
    statusRevoked: 'revoked',
    actCopy: 'Copy',
    actEdit: 'Edit',
    actRegen: 'Regenerate',
    actRevoke: 'Revoke',
    issueModalTitle: 'Issue new widget token',
    issueModalSub: 'Pick the product this widget will share. The token grants permission to mint affiliate links for this specific product.',
    productPicker: 'Product',
    optionalLabel: 'Label (optional, for your records)',
    optionalExpiry: 'Expires (optional)',
    issueBtn: 'Issue token',
    tokenCreatedLabel: 'Token created - copy now',
    tokenReminder: 'Paste this into your SmartKood card config. You can re-copy this token anytime from the list above.',
    customerportalEditorTitle: 'Product Landing Page - Layout Editor',
    paletteTitle: 'Card Types',
    settingsTitle: 'Card Settings',
    selectedAffiliateShare: 'Affiliate Share Card',
    settingsTokenLabel: 'Widget Token',
    settingsTokenHelper: 'Paste the token from your SmartAffiliate seller portal',
    settingsLabelLabel: 'Display Label (Optional)',
    settingsLabelHelper: 'Leave blank to use the default headline',
    featureGateBadge: 'Feature enabled for this brand',
  },
  ms: {
    productName: 'Penapis Udara Aerolite 3000',
    productPrice: 'RM 459.00',
    productMeta: 'Tulen - Disahkan oleh SmartKood',
    earnTitle: 'Dapatkan komisen afiliat',
    earnRate: 'Dapat ${rate}%',
    earnDesc: 'Kongsi produk ini dengan rakan. Apabila mereka membeli, anda dapat komisen.',
    shareNow: 'Kongsi Sekarang',
    dialogTitle: 'Kongsi & dapat komisen',
    dialogHelper: 'Masukkan e-mel anda. Kami akan hantar pautan untuk dikongsi. Apabila seseorang beli melalui pautan, anda dapat ${rate}% komisen.',
    emailLabel: 'Alamat e-mel anda',
    submit: 'Dapatkan pautan',
    cancel: 'Batal',
    successTitle: 'Pautan kongsi anda sudah sedia',
    successCommission: 'Anda akan dapat ${rate}% bagi setiap pembelian',
    copy: 'Salin pautan',
    whatsapp: 'WhatsApp',
    facebook: 'Facebook',
    telegram: 'Telegram',
    nativeShare: 'Lebih banyak apl...',
    done: 'Selesai',
    errorRateLimited: 'Terlalu banyak permintaan. Cuba lagi dalam 60 saat.',
    errorRevoked: 'Perkongsian afiliat ini tidak tersedia sekarang. Sila hubungi jenama.',
    submitting: 'Menjana pautan anda...',
    emailUsedFor: 'Kami akan e-mel ${email} apabila seseorang membeli.',
    emailConvSubject: 'Anda dapat RM ${conv} dari perkongsian anda!',
    emailConvHello: 'Helo!',
    emailConvBody: 'Seseorang membuat pembelian menggunakan pautan afiliat anda untuk ${product}. Anda dapat RM ${conv} komisen.',
    emailConvBalanceLabel: 'Baki tertunda anda',
    emailConvCtaStub: 'Daftar untuk menuntut baki anda',
    emailConvCtaReal: 'Log masuk untuk lihat baki anda',
    emailConvFooter: 'Anda menerima e-mel ini kerana seseorang berkongsi pautan afiliat dari alamat e-mel ini. Untuk berhenti atau padam data, hubungi sokongan SmartAffiliate.',
    signupWelcome: 'Selamat datang!',
    signupClaimSub: 'Sediakan akaun SmartAffiliate untuk menuntut pendapatan anda.',
    signupBalanceLabel: 'Pendapatan tertunda',
    signupEmail: 'E-mel',
    signupPassword: 'Tetapkan kata laluan',
    signupConfirm: 'Sahkan kata laluan',
    signupContinue: 'Cipta akaun & tuntut',
    sellerWidgetTitle: 'Token widget afiliat',
    sellerWidgetSub: 'Hasilkan token untuk dibenamkan dalam halaman pendaratan SmartKood. Setiap token terikat kepada satu produk.',
    issueWidget: 'Hasilkan token widget',
    tableToken: 'Token',
    tableProduct: 'Produk',
    tableLabel: 'Label',
    tableStatus: 'Status',
    tableShares: 'Perkongsian',
    tableLastUsed: 'Guna terakhir',
    tableActions: 'Tindakan',
    statusActive: 'aktif',
    statusRevoked: 'dibatalkan',
    actCopy: 'Salin',
    actEdit: 'Edit',
    actRegen: 'Jana semula',
    actRevoke: 'Batal',
    issueModalTitle: 'Hasilkan token widget baru',
    issueModalSub: 'Pilih produk yang akan dikongsi widget ini. Token ini memberi kebenaran untuk menjana pautan afiliat untuk produk tertentu ini.',
    productPicker: 'Produk',
    optionalLabel: 'Label (pilihan, untuk rekod anda)',
    optionalExpiry: 'Tamat tempoh (pilihan)',
    issueBtn: 'Hasilkan token',
    tokenCreatedLabel: 'Token dijana - salin sekarang',
    tokenReminder: 'Tampal ini ke dalam konfigurasi kad SmartKood anda. Anda boleh menyalin token ini bila-bila masa dari senarai di atas.',
    customerportalEditorTitle: 'Halaman Pendaratan Produk - Editor Susun Atur',
    paletteTitle: 'Jenis Kad',
    settingsTitle: 'Tetapan Kad',
    selectedAffiliateShare: 'Kad Perkongsian Afiliat',
    settingsTokenLabel: 'Token Widget',
    settingsTokenHelper: 'Tampal token dari portal penjual SmartAffiliate anda',
    settingsLabelLabel: 'Label Paparan (Pilihan)',
    settingsLabelHelper: 'Biarkan kosong untuk menggunakan tajuk lalai',
    featureGateBadge: 'Ciri didayakan untuk jenama ini',
  },
  'zh-CN': {
    productName: 'Aerolite 空气净化器 3000',
    productPrice: 'RM 459.00',
    productMeta: '正品 - 由 SmartKood 验证',
    earnTitle: '赚取联盟佣金',
    earnRate: '赚取 ${rate}%',
    earnDesc: '把这个产品分享给朋友。朋友购买后，你就能获得佣金。',
    shareNow: '立即分享',
    dialogTitle: '分享并赚取佣金',
    dialogHelper: '输入你的电邮。我们会发送可分享的链接给你。有人通过你的链接购买时，你将获得 ${rate}% 佣金。',
    emailLabel: '你的电邮地址',
    submit: '获取我的链接',
    cancel: '取消',
    successTitle: '你的分享链接已准备好',
    successCommission: '每次购买你都将获得 ${rate}%',
    copy: '复制链接',
    whatsapp: 'WhatsApp',
    facebook: 'Facebook',
    telegram: 'Telegram',
    nativeShare: '更多应用...',
    done: '完成',
    errorRateLimited: '请求过多。请在 60 秒后再试。',
    errorRevoked: '此联盟分享目前不可用。请联系品牌方。',
    submitting: '正在生成你的链接...',
    emailUsedFor: '有人购买时，我们会发送电邮到 ${email}。',
    emailConvSubject: '你通过分享赚取了 RM ${conv}！',
    emailConvHello: '你好！',
    emailConvBody: '有人通过你为 ${product} 分享的联盟链接完成了购买。你赚取了 RM ${conv} 佣金。',
    emailConvBalanceLabel: '你的待结余额',
    emailConvCtaStub: '注册以领取余额',
    emailConvCtaReal: '登录查看余额',
    emailConvFooter: '你收到这封电邮，是因为有人使用此电邮地址分享了联盟链接。如需停止接收或删除数据，请联系 SmartAffiliate 支持。',
    signupWelcome: '欢迎！',
    signupClaimSub: '设置你的 SmartAffiliate 账户以领取收益。',
    signupBalanceLabel: '待领取收益',
    signupEmail: '电邮',
    signupPassword: '设置密码',
    signupConfirm: '确认密码',
    signupContinue: '创建账户并领取',
    sellerWidgetTitle: '联盟小组件令牌',
    sellerWidgetSub: '生成令牌并嵌入 SmartKood 落地页。每个令牌绑定一个产品。',
    issueWidget: '生成小组件令牌',
    tableToken: '令牌',
    tableProduct: '产品',
    tableLabel: '标签',
    tableStatus: '状态',
    tableShares: '分享数',
    tableLastUsed: '最后使用',
    tableActions: '操作',
    statusActive: '启用',
    statusRevoked: '已撤销',
    actCopy: '复制',
    actEdit: '编辑',
    actRegen: '重新生成',
    actRevoke: '撤销',
    issueModalTitle: '生成新的小组件令牌',
    issueModalSub: '选择此小组件要分享的产品。该令牌允许为指定产品生成联盟链接。',
    productPicker: '产品',
    optionalLabel: '标签（可选，用于记录）',
    optionalExpiry: '到期日（可选）',
    issueBtn: '生成令牌',
    tokenCreatedLabel: '令牌已生成 - 立即复制',
    tokenReminder: '将此令牌粘贴到你的 SmartKood 卡片配置中。之后也可以随时从列表重新复制。',
    customerportalEditorTitle: '产品落地页 - 布局编辑器',
    paletteTitle: '卡片类型',
    settingsTitle: '卡片设置',
    selectedAffiliateShare: '联盟分享卡片',
    settingsTokenLabel: '小组件令牌',
    settingsTokenHelper: '从你的 SmartAffiliate 卖家门户复制令牌并粘贴到这里',
    settingsLabelLabel: '显示标签（可选）',
    settingsLabelHelper: '留空则使用默认标题',
    featureGateBadge: '此品牌已启用该功能',
  },
}

function App() {
  const [state, setState] = useState<PlaygroundState>({
    screen: 'sk-landing-with-card',
    portal: 'v2',
    locale: 'en',
    balance: 42,
    rate: 5,
    lastConv: 22,
  })
  const [copied, setCopied] = useState(false)
  const screen = screens.find((item) => item.id === state.screen) ?? screens[0]
  const t = useMemo(() => makeTranslator(state), [state])
  const componentCode = useMemo(() => buildComponentCode(state, screen), [state, screen])

  const copyComponentCode = async () => {
    await navigator.clipboard.writeText(componentCode)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  return (
    <div className="wireframe-app">
      <Sidebar screens={screens} state={state} setState={setState} />
      <main className="main">
        <section className="stage" aria-label="Selected wireframe screen">
          <ScreenFrame screen={screen} state={state} t={t} />
        </section>
        <CodePanel code={componentCode} copied={copied} onCopy={copyComponentCode} />
      </main>
    </div>
  )
}

function makeTranslator(state: PlaygroundState) {
  return (key: string) => {
    const value = translations[state.locale][key] ?? translations.en[key] ?? key
    return value
      .replaceAll('${rate}', String(state.rate))
      .replaceAll('${balance}', state.balance.toFixed(2))
      .replaceAll('${conv}', state.lastConv.toFixed(2))
      .replaceAll('${email}', 'aishah@example.com')
      .replaceAll('${product}', translations[state.locale].productName)
  }
}

function buildComponentCode(state: PlaygroundState, screen: Screen) {
  const snippets: Record<ScreenId, string> = {
    'sa-seller-widgets': sellerWidgetListSnippet(),
    'sa-issue-widget': issueWidgetModalSnippet(),
    'sa-token-created': tokenCreatedSnippet(state),
    'sk-customerportal-editor': customerPortalEditorSnippet(),
    'sk-landing-with-card': smartKoodLandingSnippet(state),
    'share-dialog-initial': shareDialogSnippet(state, 'initial'),
    'share-dialog-submitting': shareDialogSnippet(state, 'submitting'),
    'share-dialog-success': shareDialogSnippet(state, 'success'),
    'share-dialog-error-rate': shareDialogSnippet(state, 'rate-limited'),
    'share-dialog-error-revoked': shareDialogSnippet(state, 'token-revoked'),
    'email-conversion-stub': conversionEmailSnippet(state, 'stub'),
    'email-conversion-real': conversionEmailSnippet(state, 'real'),
    'sa-signup-claim': signupClaimSnippet(state),
  }

  return [
    `// ${screen.title}`,
    `// ${screen.meta}`,
    snippets[state.screen],
  ].join('\n')
}

function sellerWidgetListSnippet() {
  return `import * as React from 'react'

type WidgetToken = {
  token: string
  product: string
  label?: string
  status: 'active' | 'revoked'
  shares: number
  lastUsed: string
}

const defaultTokens: WidgetToken[] = [
  { token: 'ws_qx7n2_b8K3FL9pT4dZ5rH', product: 'Aerolite Air Purifier 3000', label: 'Q2 Campaign', status: 'active', shares: 142, lastUsed: '2 hours ago' },
  { token: 'ws_zk4m8_R2nB6XmQ1vP9wL', product: 'Aerolite Pro 5000', status: 'active', shares: 38, lastUsed: '1 day ago' },
  { token: 'ws_yp9d2_W7tK3MzN5cV8qE', product: 'Aerolite Mini', label: 'Discontinued', status: 'revoked', shares: 412, lastUsed: '3 weeks ago' },
]

export default function SellerWidgetList({ tokens = defaultTokens }: { tokens?: WidgetToken[] }) {
  return (
    <section style={styles.app}>
      <header style={styles.header}>
        <strong>SmartAffiliate - Seller</strong>
        <nav style={styles.nav}><span>Dashboard</span><span>Products</span><span>Orders</span><strong>Affiliate Widgets</strong><span>Payouts</span></nav>
      </header>
      <div style={styles.content}>
        <div style={styles.pageHeader}>
          <div>
            <h2 style={styles.title}>Affiliate widget tokens</h2>
            <p style={styles.subtle}>Generate tokens to embed in SmartKood landing pages. Each token is bound to one product.</p>
          </div>
          <button style={styles.primaryButton}>+ Issue widget token</button>
        </div>
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead><tr>{['Token', 'Product', 'Label', 'Status', 'Shares', 'Last used', 'Actions'].map((heading) => <th key={heading} style={styles.th}>{heading}</th>)}</tr></thead>
            <tbody>
              {tokens.map((row) => (
                <tr key={row.token}>
                  <td style={{ ...styles.td, ...styles.mono }}>{row.token}</td>
                  <td style={styles.td}>{row.product}</td>
                  <td style={styles.td}>{row.label || '-'}</td>
                  <td style={styles.td}><span style={{ ...styles.status, ...(row.status === 'active' ? styles.active : styles.revoked) }}>{row.status}</span></td>
                  <td style={styles.td}>{row.shares}</td>
                  <td style={styles.td}>{row.lastUsed}</td>
                  <td style={styles.td}><div style={styles.actions}>{['Copy', 'Edit', 'Regenerate', 'Revoke'].map((action) => <button key={action} style={action === 'Revoke' ? styles.dangerButton : styles.actionButton}>{action}</button>)}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

const styles = {
  app: { background: '#fafafa', borderRadius: 8, color: '#0a0a0a', fontFamily: 'Inter, system-ui, sans-serif', overflow: 'hidden' },
  header: { alignItems: 'center', background: '#fff', borderBottom: '1px solid #e5e5e5', display: 'flex', justifyContent: 'space-between', padding: '14px 24px' },
  nav: { color: '#525252', display: 'flex', fontSize: 13, gap: 16 },
  content: { padding: 24 },
  pageHeader: { alignItems: 'center', display: 'flex', justifyContent: 'space-between', gap: 16, marginBottom: 16 },
  title: { fontSize: 22, margin: 0 },
  subtle: { color: '#525252', fontSize: 13, margin: '4px 0 0' },
  primaryButton: { background: '#2563eb', border: 0, borderRadius: 6, color: '#fff', cursor: 'pointer', fontWeight: 600, padding: '10px 18px' },
  tableWrap: { overflowX: 'auto' as const },
  table: { background: '#fff', border: '1px solid #e5e5e5', borderCollapse: 'separate' as const, borderRadius: 8, borderSpacing: 0, width: '100%' },
  th: { background: '#f9fafb', borderBottom: '1px solid #e5e5e5', color: '#525252', fontSize: 11, fontWeight: 700, padding: '10px 14px', textAlign: 'left' as const, textTransform: 'uppercase' as const, whiteSpace: 'nowrap' as const },
  td: { borderBottom: '1px solid #f3f4f6', fontSize: 12, padding: '12px 14px', whiteSpace: 'nowrap' as const },
  mono: { fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace', fontSize: 11 },
  status: { borderRadius: 999, display: 'inline-block', fontSize: 10, fontWeight: 700, padding: '2px 8px' },
  active: { background: '#dcfce7', color: '#166534' },
  revoked: { background: '#fee2e2', color: '#991b1b' },
  actions: { display: 'flex', gap: 6 },
  actionButton: { background: '#fff', border: '1px solid #e5e5e5', borderRadius: 4, cursor: 'pointer', fontSize: 11, padding: '4px 10px' },
  dangerButton: { background: '#fff', border: '1px solid #ef4444', borderRadius: 4, color: '#ef4444', cursor: 'pointer', fontSize: 11, padding: '4px 10px' },
}`
}

function issueWidgetModalSnippet() {
  return `import * as React from 'react'

export default function IssueWidgetModal() {
  return (
    <div style={styles.shell}>
      <form style={styles.modal}>
        <h2 style={styles.title}>Issue new widget token</h2>
        <p style={styles.subtle}>Pick the product this widget will share. The token grants permission to mint affiliate links for this specific product.</p>
        <Field label="Product">
          <select defaultValue="aerolite" style={styles.input}>
            <option value="aerolite">Aerolite Air Purifier 3000 - RM 459.00 (Published)</option>
            <option value="pro">Aerolite Pro 5000 - RM 899.00 (Published)</option>
            <option value="mini">Aerolite Mini - RM 199.00 (Draft)</option>
          </select>
        </Field>
        <Field label="Label (optional, for your records)"><input placeholder="e.g., Q2 Spring Campaign" style={styles.input} /></Field>
        <Field label="Expires (optional)"><input type="date" style={styles.input} /></Field>
        <div style={styles.actions}>
          <button style={styles.secondaryButton} type="button">Cancel</button>
          <button style={styles.primaryButton} type="submit">Issue token</button>
        </div>
      </form>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label style={styles.field}><span style={styles.label}>{label}</span>{children}</label>
}

const styles = {
  shell: { background: '#fafafa', borderRadius: 8, display: 'flex', justifyContent: 'center', padding: 24 },
  modal: { background: '#fff', borderRadius: 12, maxWidth: 480, padding: 26, width: '100%' },
  title: { color: '#0a0a0a', fontSize: 18, margin: '0 0 6px' },
  subtle: { color: '#525252', fontSize: 13, lineHeight: 1.5, margin: '0 0 16px' },
  field: { display: 'block', marginBottom: 14 },
  label: { color: '#525252', display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6 },
  input: { border: '1px solid #e5e5e5', borderRadius: 6, boxSizing: 'border-box' as const, font: 'inherit', minHeight: 42, padding: '10px 12px', width: '100%' },
  actions: { display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 14 },
  primaryButton: { background: '#2563eb', border: 0, borderRadius: 6, color: '#fff', cursor: 'pointer', fontWeight: 600, padding: '10px 18px' },
  secondaryButton: { background: '#fff', border: '1px solid #e5e5e5', borderRadius: 6, color: '#0a0a0a', cursor: 'pointer', padding: '10px 16px' },
}`
}

function tokenCreatedSnippet(state: PlaygroundState) {
  return `import * as React from 'react'

export default function TokenCreated() {
  return (
    <div style={styles.shell}>
      <div style={styles.modal}>
        <h2 style={styles.title}>Token created</h2>
        <p style={styles.subtle}>Bound to: Aerolite Air Purifier 3000 - Earn ${state.rate}%</p>
        <div style={styles.tokenReveal}>
          <div style={styles.label}>Token created - copy now</div>
          <div style={styles.token}>ws_qx7n2_b8K3FL9pT4dZ5rH</div>
          <button style={styles.primaryButton}>Copy link</button>
        </div>
        <p style={styles.helper}>Paste this into your SmartKood card config. You can re-copy this token anytime from the list above.</p>
        <div style={styles.actions}><button style={styles.primaryButton}>Done</button></div>
      </div>
    </div>
  )
}

const styles = {
  shell: { background: '#fafafa', borderRadius: 8, display: 'flex', justifyContent: 'center', padding: 24 },
  modal: { background: '#fff', borderRadius: 12, maxWidth: 480, padding: 26, width: '100%' },
  title: { color: '#0a0a0a', fontSize: 18, margin: '0 0 6px' },
  subtle: { color: '#525252', fontSize: 13, margin: '0 0 16px' },
  tokenReveal: { background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 8, margin: '14px 0', padding: 16, textAlign: 'center' as const },
  label: { color: '#047857', fontSize: 11, fontWeight: 700, marginBottom: 6, textAlign: 'left' as const },
  token: { background: '#fff', borderRadius: 4, color: '#047857', fontFamily: 'ui-monospace, Consolas, monospace', fontSize: 14, marginBottom: 10, padding: 8, wordBreak: 'break-all' as const },
  helper: { color: '#525252', fontSize: 11, lineHeight: 1.5 },
  actions: { display: 'flex', justifyContent: 'flex-end', marginTop: 14 },
  primaryButton: { background: '#2563eb', border: 0, borderRadius: 6, color: '#fff', cursor: 'pointer', fontWeight: 600, padding: '10px 18px' },
}`
}

function customerPortalEditorSnippet() {
  return `import * as React from 'react'

const cardTypes = [
  ['Header', 'greeting section'],
  ['Product Card', 'authentication'],
  ['Warranty', 'registration'],
  ['Survey', 'consumer feedback'],
  ['Campaign', 'promo image'],
  ['Affiliate Share Card', 'NEW - share & earn'],
  ['Media', 'video / image'],
  ['Social Media', 'links'],
]

export default function CustomerPortalEditor() {
  return (
    <section style={styles.app}>
      <header style={styles.header}>
        <span>Product Landing Page - Layout Editor</span>
        <button style={styles.saveButton}>Save Layout</button>
      </header>
      <div style={styles.grid}>
        <aside style={styles.sidePanel}>
          <h4 style={styles.kicker}>Card Types</h4>
          {cardTypes.map(([name, meta]) => <CardType key={name} name={name} meta={meta} highlight={name === 'Affiliate Share Card'} />)}
        </aside>
        <main style={styles.canvas}>
          <CanvasCard name="Header" meta="Welcome back, {name}!" />
          <CanvasCard name="Product Card" meta="Authentic verification" />
          <CanvasCard selected name="Affiliate Share Card" meta="Token: ws_xx......dZ - Display: default" />
          <CanvasCard name="Warranty" meta="12 months coverage" />
        </main>
        <aside style={styles.settings}>
          <h4 style={styles.kicker}>Card Settings - Affiliate Share Card</h4>
          <Field label="Widget Token" helper="Paste the token from your SmartAffiliate seller portal" value="ws_qx7n2_b8K3FL9pT4dZ5rH" />
          <Field label="Display Label (Optional)" helper="Leave blank to use the default headline" placeholder="Earn affiliate commission" />
          <div style={styles.featureGate}>Feature enabled for this brand</div>
        </aside>
      </div>
    </section>
  )
}

function CardType({ name, meta, highlight }: { name: string; meta: string; highlight?: boolean }) {
  return <div style={{ ...styles.card, ...(highlight ? styles.highlightCard : {}) }}><strong>{name}</strong><small style={styles.meta}>{meta}</small></div>
}

function CanvasCard({ name, meta, selected }: { name: string; meta: string; selected?: boolean }) {
  return <div style={{ ...styles.card, ...(selected ? styles.selectedCard : {}) }}><strong>{name}</strong><small style={styles.meta}>{meta}</small></div>
}

function Field({ label, helper, value, placeholder }: { label: string; helper: string; value?: string; placeholder?: string }) {
  return <label style={styles.field}><span style={styles.label}>{label}</span><input defaultValue={value} placeholder={placeholder} style={styles.input} /><small style={styles.meta}>{helper}</small></label>
}

const styles = {
  app: { background: '#fff', borderRadius: 8, color: '#1f1f1f', overflow: 'hidden' },
  header: { alignItems: 'center', background: '#3a4d54', color: '#fff', display: 'flex', justifyContent: 'space-between', padding: '14px 18px' },
  saveButton: { background: '#fff', border: 0, borderRadius: 6, color: '#3a4d54', cursor: 'pointer', padding: '6px 14px' },
  grid: { display: 'grid', gridTemplateColumns: '200px minmax(0, 1fr) 280px', minHeight: 480 },
  sidePanel: { background: '#fafbfc', borderRight: '1px solid rgb(221,218,218)', padding: 12 },
  settings: { background: '#fafbfc', borderLeft: '1px solid rgb(221,218,218)', padding: 12 },
  canvas: { background: '#f4f7f8', padding: 16 },
  kicker: { color: '#6b7280', fontSize: 11, letterSpacing: '.04em', margin: '0 0 8px', textTransform: 'uppercase' as const },
  card: { background: '#fff', border: '1px solid rgb(221,218,218)', borderRadius: 6, display: 'grid', gap: 2, fontSize: 11, marginBottom: 6, padding: 10 },
  highlightCard: { background: '#f0fdf4', borderColor: '#6aaf68' },
  selectedCard: { background: '#f0fdf4', borderColor: '#6aaf68', outline: '2px solid rgba(106,175,104,.2)' },
  meta: { color: '#6b7280', fontSize: 10 },
  field: { display: 'block', marginBottom: 12 },
  label: { color: '#6b7280', display: 'block', fontSize: 10, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' as const },
  input: { border: '1px solid rgb(221,218,218)', borderRadius: 4, boxSizing: 'border-box' as const, padding: '8px 10px', width: '100%' },
  featureGate: { color: '#6aaf68', fontSize: 10, fontWeight: 600 },
}`
}

function smartKoodLandingSnippet(state: PlaygroundState) {
  return `import * as React from 'react'

export default function SmartKoodLanding() {
  return (
    <section style={styles.app}>
      <header style={styles.header}><span>SmartKood</span><span style={styles.locale}>${state.locale.toUpperCase()}</span></header>
      <div style={styles.content}>
        <div style={styles.productCard}>
          <div style={styles.image}>[product image]</div>
          <h2 style={styles.productName}>Aerolite Air Purifier 3000</h2>
          <div style={styles.price}>RM 459.00</div>
          <div style={styles.meta}>Authentic - Verified by SmartKood</div>
        </div>
        <div style={styles.shareCard}>
          <span style={styles.ratePill}>Earn ${state.rate}%</span>
          <h3 style={styles.shareTitle}>Earn affiliate commission</h3>
          <p style={styles.shareCopy}>Share this product with friends. When they buy, you earn commission.</p>
          <button style={styles.shareButton}>Share Now</button>
        </div>
      </div>
    </section>
  )
}

const styles = {
  app: { background: '#fff', borderRadius: 8, color: '#1f1f1f', fontFamily: 'Roboto, system-ui, sans-serif', overflow: 'hidden' },
  header: { alignItems: 'center', background: '#3a4d54', color: '#fff', display: 'flex', fontSize: 16, fontWeight: 600, justifyContent: 'space-between', minHeight: 52, padding: '14px 18px' },
  locale: { background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.16)', borderRadius: 999, fontSize: 11, padding: '2px 8px' },
  content: { padding: 18 },
  productCard: { border: '1px solid rgb(221,218,218)', borderRadius: 8, marginBottom: 14, padding: 16 },
  image: { alignItems: 'center', aspectRatio: '1.6', background: '#eceff0', borderRadius: 4, color: '#6b7280', display: 'flex', fontSize: 11, justifyContent: 'center', marginBottom: 12 },
  productName: { fontSize: 16, fontWeight: 500, margin: '0 0 4px' },
  price: { color: '#3a4d54', fontSize: 18, fontWeight: 700, marginBottom: 6 },
  meta: { color: '#6b7280', fontSize: 11 },
  shareCard: { border: '1px solid rgb(221,218,218)', borderRadius: 10, padding: 18 },
  ratePill: { background: '#6aaf68', borderRadius: 999, color: '#fff', display: 'inline-block', fontSize: 11, fontWeight: 700, marginBottom: 8, padding: '2px 10px' },
  shareTitle: { fontSize: 15, margin: '0 0 4px' },
  shareCopy: { color: '#6b7280', fontSize: 12, lineHeight: 1.5, margin: '0 0 12px' },
  shareButton: { background: '#6aaf68', border: 0, borderRadius: 8, color: '#fff', cursor: 'pointer', fontWeight: 600, padding: '10px 18px' },
}`
}

function shareDialogSnippet(state: PlaygroundState, variant: 'initial' | 'submitting' | 'success' | 'rate-limited' | 'token-revoked') {
  const body = {
    initial: `<h3 style={styles.title}>Share & earn</h3>
      <p style={styles.helper}>Enter your email. We'll send you a link to share. When someone buys via your link, you earn ${state.rate}% commission.</p>
      <label style={styles.field}><span style={styles.label}>Your email address</span><input defaultValue="aishah@example.com" placeholder="you@example.com" style={styles.input} type="email" /></label>
      <div style={styles.actions}><button style={styles.cancelButton}>Cancel</button><button style={styles.submitButton}>Get my link</button></div>`,
    submitting: `<h3 style={styles.title}>Share & earn</h3>
      <div style={styles.loading}><span style={styles.spinner} />Generating your link...</div>`,
    success: `<h3 style={styles.title}>Your share link is ready</h3>
      <div style={styles.success}>OK You'll earn ${state.rate}% on every purchase</div>
      <div style={styles.url}>https://buyer.smartaffiliate.com/shop/products/aerolite-3000?ref=AKLR8MX2</div>
      <p style={styles.center}>We'll email aishah@example.com when someone buys.</p>
      <div style={styles.shareGrid}>{['Copy link', 'WhatsApp', 'Facebook', 'Telegram', 'More apps...'].map((item) => <button key={item} style={item === 'Copy link' ? styles.sharePrimary : styles.shareButton}>{item}</button>)}</div>
      <div style={styles.actions}><button style={styles.submitButton}>Done</button></div>`,
    'rate-limited': `<h3 style={styles.title}>Share & earn</h3>
      <div style={styles.warn}>! Too many requests. Try again in 60 seconds.</div>
      <label style={styles.field}><span style={styles.label}>Your email address</span><input defaultValue="aishah@example.com" disabled style={styles.input} type="email" /></label>
      <div style={styles.actions}><button style={styles.cancelButton}>Cancel</button><button disabled style={styles.disabledButton}>Get my link (60s)</button></div>`,
    'token-revoked': `<h3 style={styles.title}>Share & earn</h3>
      <div style={styles.error}>x This affiliate share is currently unavailable. Please contact the brand.</div>
      <div style={styles.actions}><button style={styles.submitButton}>Done</button></div>`,
  }[variant]

  return `import * as React from 'react'

export default function ShareDialog() {
  return (
    <section style={styles.screen}>
      <div style={styles.backdropLabel}>SmartKood landing page (background dimmed)</div>
      <div style={styles.dialog}>
        <div style={styles.handle} />
        ${body}
      </div>
    </section>
  )
}

const styles = {
  screen: { width: '100%', fontFamily: 'Roboto, system-ui, sans-serif' },
  backdropLabel: { background: '#3a4d54', color: '#fff', fontSize: 12, padding: 14, textAlign: 'center' as const },
  dialog: { background: '#fff', borderRadius: '14px 14px 0 0', color: '#1f1f1f', padding: 22 },
  handle: { background: '#d1d5db', borderRadius: 999, height: 4, margin: '-8px auto 14px', width: 42 },
  title: { fontSize: 18, margin: '0 0 12px' },
  helper: { color: '#6b7280', fontSize: 12, lineHeight: 1.5, margin: '0 0 12px' },
  field: { display: 'block', marginBottom: 14 },
  label: { color: '#6b7280', display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6 },
  input: { background: '#eceff0', border: '1px solid rgb(221,218,218)', borderRadius: 6, boxSizing: 'border-box' as const, minHeight: 42, padding: '10px 12px', width: '100%' },
  actions: { display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 12 },
  cancelButton: { background: '#fff', border: '1px solid rgb(221,218,218)', borderRadius: 6, cursor: 'pointer', padding: '10px 16px' },
  submitButton: { background: '#6aaf68', border: 0, borderRadius: 6, color: '#fff', cursor: 'pointer', fontWeight: 600, padding: '10px 16px' },
  disabledButton: { background: '#6aaf68', border: 0, borderRadius: 6, color: '#fff', opacity: .6, padding: '10px 16px' },
  loading: { alignItems: 'center', color: '#6b7280', display: 'flex', gap: 8, justifyContent: 'center', minHeight: 112 },
  spinner: { border: '2px solid rgb(221,218,218)', borderTopColor: '#6aaf68', borderRadius: '50%', height: 16, width: 16 },
  success: { background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 6, color: '#047857', fontSize: 11, marginBottom: 12, padding: '8px 12px' },
  warn: { background: '#fef3c7', border: '1px solid #fde68a', borderRadius: 6, color: '#92400e', fontSize: 12, marginBottom: 12, padding: 12 },
  error: { background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 6, color: '#991b1b', fontSize: 12, marginBottom: 12, padding: 12 },
  url: { background: '#eceff0', border: '1px solid rgb(221,218,218)', borderRadius: 6, fontFamily: 'ui-monospace, Consolas, monospace', fontSize: 12, marginBottom: 12, padding: 12, wordBreak: 'break-all' as const },
  center: { color: '#6b7280', fontSize: 12, textAlign: 'center' as const },
  shareGrid: { display: 'grid', gap: 8, gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 12 },
  shareButton: { background: '#eceff0', border: '1px solid rgb(221,218,218)', borderRadius: 6, cursor: 'pointer', minHeight: 54, padding: 10 },
  sharePrimary: { background: '#6aaf68', border: '1px solid #6aaf68', borderRadius: 6, color: '#fff', cursor: 'pointer', minHeight: 54, padding: 10 },
}`
}

function conversionEmailSnippet(state: PlaygroundState, variant: 'stub' | 'real') {
  const cta = variant === 'stub'
    ? 'https://buyer.smartaffiliate.com/signup?email=aishah@example.com&claim_widget=true'
    : 'https://buyer.smartaffiliate.com/login?email=aishah@example.com'

  const ctaLabel = variant === 'stub' ? 'Sign up to claim your balance' : 'Sign in to view your balance'

  return `import * as React from 'react'

export default function ConversionEmail() {
  return (
    <article style={styles.email}>
      <div style={styles.headers}>
        <HeaderRow label="From:" value="SmartAffiliate <noreply@smartaffiliate.com>" />
        <HeaderRow label="To:" value="aishah@example.com" />
        <HeaderRow label="Subject:" value="You earned RM ${state.lastConv.toFixed(2)} from your share!" />
      </div>
      <div style={styles.body}>
        <h2 style={styles.title}>You earned RM ${state.lastConv.toFixed(2)} from your share!</h2>
        <p>Hi there!</p>
        <p>Someone made a purchase using your affiliate link for Aerolite Air Purifier 3000. You earned RM ${state.lastConv.toFixed(2)} in commission.</p>
        <div style={styles.productInfo}>
          <strong>Aerolite Air Purifier 3000</strong><br />
          RM 459.00 - Earn ${state.rate}%
        </div>
        <div style={styles.balance}>
          <div style={styles.amount}>RM ${state.balance.toFixed(2)}</div>
          <div style={styles.balanceLabel}>Your pending balance</div>
        </div>
        <div style={styles.ctaWrap}>
          <a style={styles.cta} href="${cta}">${ctaLabel}</a>
        </div>
        <footer style={styles.footer}>You're receiving this because someone shared an affiliate link from this email address. To stop receiving these or delete your data, contact SmartAffiliate support.</footer>
      </div>
    </article>
  )
}

function HeaderRow({ label, value }: { label: string; value: string }) {
  return <div style={styles.row}><span style={styles.headerLabel}>{label}</span><span>{value}</span></div>
}

const styles = {
  email: { background: '#fff', border: '1px solid #e5e5e5', borderRadius: 8, color: '#0a0a0a', overflow: 'hidden' },
  headers: { background: '#fafafa', borderBottom: '1px solid #e5e5e5', fontSize: 12, padding: '14px 20px' },
  row: { display: 'flex', gap: 8, padding: '2px 0' },
  headerLabel: { color: '#525252', minWidth: 50 },
  body: { fontSize: 14, lineHeight: 1.65, margin: '0 auto', maxWidth: 720, padding: '28px 32px' },
  title: { color: '#047857', fontSize: 22, margin: '0 0 12px' },
  productInfo: { background: '#f9fafb', border: '1px solid #edf0f3', borderRadius: 6, fontSize: 13, margin: '14px 0', padding: '12px 16px' },
  balance: { background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)', border: '1px solid #a7f3d0', borderRadius: 8, margin: '16px 0', padding: 16, textAlign: 'center' as const },
  amount: { color: '#047857', fontSize: 28, fontWeight: 800 },
  balanceLabel: { color: '#047857', fontSize: 11, letterSpacing: '.05em', textTransform: 'uppercase' as const },
  ctaWrap: { margin: '24px 0', textAlign: 'center' as const },
  cta: { background: '#2563eb', borderRadius: 6, color: '#fff', display: 'inline-block', fontWeight: 700, padding: '14px 28px', textDecoration: 'none' },
  footer: { borderTop: '1px solid #e5e5e5', color: '#525252', fontSize: 11, marginTop: 24, paddingTop: 16 },
}`
}

function signupClaimSnippet(state: PlaygroundState) {
  return `import * as React from 'react'

export default function SignupClaim() {
  return (
    <section style={styles.shell}>
      <form style={styles.card}>
        <h2 style={styles.title}>Welcome!</h2>
        <p style={styles.subtle}>Set up your SmartAffiliate account to claim your earnings.</p>
        <div style={styles.balance}>
          <div style={styles.amount}>RM ${state.balance.toFixed(2)}</div>
          <div style={styles.balanceLabel}>Pending earnings</div>
        </div>
        <Field label="Email"><input defaultValue="aishah@example.com" disabled style={styles.input} type="email" /></Field>
        <Field label="Set a password"><input placeholder="********" style={styles.input} type="password" /></Field>
        <Field label="Confirm password"><input placeholder="********" style={styles.input} type="password" /></Field>
        <button style={styles.submitButton}>Create account & claim</button>
      </form>
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label style={styles.field}><span style={styles.label}>{label}</span>{children}</label>
}

const styles = {
  shell: { background: '#fafafa', borderRadius: 8, display: 'flex', justifyContent: 'center', padding: 32 },
  card: { background: '#fff', borderRadius: 12, maxWidth: 480, padding: 28, width: '100%' },
  title: { color: '#0a0a0a', fontSize: 24, margin: '0 0 6px' },
  subtle: { color: '#525252', fontSize: 14, margin: '0 0 20px' },
  balance: { background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)', border: '1px solid #a7f3d0', borderRadius: 8, marginBottom: 20, padding: 16, textAlign: 'center' as const },
  amount: { color: '#047857', fontSize: 32, fontWeight: 800 },
  balanceLabel: { color: '#047857', fontSize: 11, letterSpacing: '.05em', textTransform: 'uppercase' as const },
  field: { display: 'block', marginBottom: 14 },
  label: { color: '#525252', display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6 },
  input: { border: '1px solid #e5e5e5', borderRadius: 6, boxSizing: 'border-box' as const, minHeight: 42, padding: '10px 12px', width: '100%' },
  submitButton: { background: '#2563eb', border: 0, borderRadius: 6, color: '#fff', cursor: 'pointer', fontWeight: 700, padding: 12, width: '100%' },
}`
}

export default App
