import { RangeControl } from './RangeControl'
import { SegmentedControl } from './SegmentedControl'
import type { Locale, PlaygroundState, Screen, SetPlaygroundState } from './types'

type SidebarProps = {
  screens: Screen[]
  state: PlaygroundState
  setState: SetPlaygroundState
}

export function Sidebar({ screens, state, setState }: SidebarProps) {
  return (
    <aside className="sidebar">
      <h1>Affiliate Widget - Wireframes</h1>
      <div className="subtitle">2026-05-07 design (replaces 260506)</div>

      <h2>Screen</h2>
      <div className="screen-list">
        {screens.map((screen, index) => (
          <button
            className={`screen-btn ${state.screen === screen.id ? 'active' : ''}`}
            key={screen.id}
            onClick={() => setState((current) => ({ ...current, screen: screen.id }))}
            type="button"
          >
            <span>
              <span className="screen-num">{String(index + 1).padStart(2, '0')}</span>
              <span className="screen-title">{screen.title}</span>
            </span>
            <span className="screen-meta">{screen.meta}</span>
          </button>
        ))}
      </div>

      <SegmentedControl
        label="Locale"
        value={state.locale}
        options={[
          { label: 'EN', value: 'en' },
          { label: 'MS', value: 'ms' },
          { label: 'ZH', value: 'zh-CN' },
        ]}
        onChange={(locale: Locale) => setState((current) => ({ ...current, locale }))}
      />

      <h2>State</h2>
      <RangeControl
        label="Pending balance"
        min={0}
        max={500}
        step={5}
        value={state.balance}
        display={`RM ${state.balance.toFixed(2)}`}
        onChange={(balance) => setState((current) => ({ ...current, balance }))}
      />
      <RangeControl
        label="Commission rate"
        min={1}
        max={15}
        step={1}
        value={state.rate}
        display={`${state.rate}%`}
        onChange={(rate) => setState((current) => ({ ...current, rate }))}
      />
      <RangeControl
        label="Last conversion (RM)"
        min={5}
        max={200}
        step={5}
        value={state.lastConv}
        display={`RM ${state.lastConv.toFixed(2)}`}
        onChange={(lastConv) => setState((current) => ({ ...current, lastConv }))}
      />
    </aside>
  )
}
