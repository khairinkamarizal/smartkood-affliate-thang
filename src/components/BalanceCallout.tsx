type BalanceCalloutProps = {
  amount: string
  label: string
}

export function BalanceCallout({ amount, label }: BalanceCalloutProps) {
  return (
    <div className="balance-callout">
      <div className="amount">{amount}</div>
      <div className="label">{label}</div>
    </div>
  )
}
