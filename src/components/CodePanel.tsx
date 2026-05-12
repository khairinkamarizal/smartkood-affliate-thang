type CodePanelProps = {
  code: string
  copied: boolean
  onCopy: () => void
}

export function CodePanel({ code, copied, onCopy }: CodePanelProps) {
  return (
    <section className="code-section" aria-label="Selected component code">
      <div className="code-label">Plug-and-play component code</div>
      <pre className="code-output">{code}</pre>
      <div className="copy-row">
        <span className="helptext">Self-contained React snippet with default data and inline styles.</span>
        <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={onCopy} type="button">
          {copied ? 'Copied!' : 'Copy code'}
        </button>
      </div>
    </section>
  )
}
