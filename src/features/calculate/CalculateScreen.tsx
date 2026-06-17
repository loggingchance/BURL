import { TreeScaleCalculator } from './TreeScaleCalculator'
import { LogScaleCalculator } from './LogScaleCalculator'
import { PulpwoodCalculator } from './PulpwoodCalculator'
import { LumberScaleCalculator } from './LumberScaleCalculator'
import { WoodWeightConverter } from './WoodWeightConverter'

interface Props {
  sub?: string
  onSubChange: (sub?: string) => void
}

const CALCULATORS = [
  { id: 'tree', icon: '🌳', label: 'Tree Scale', desc: 'Board feet per standing tree' },
  { id: 'log', icon: '📏', label: 'Log Scale', desc: 'Board feet per cut log' },
  { id: 'pulpwood', icon: '🪵', label: 'Pulpwood', desc: 'Cords per standing tree' },
  { id: 'lumber', icon: '🏗️', label: 'Lumber Scale', desc: 'Board feet of dimensional lumber' },
  { id: 'weight', icon: '⚖️', label: 'Wood Weight', desc: 'Convert cords / BF to pounds & tons' },
]

export function CalculateScreen({ sub, onSubChange }: Props) {
  const back = () => onSubChange(undefined)

  if (sub === 'tree') return <TreeScaleCalculator onBack={back} />
  if (sub === 'log') return <LogScaleCalculator onBack={back} />
  if (sub === 'pulpwood') return <PulpwoodCalculator onBack={back} />
  if (sub === 'lumber') return <LumberScaleCalculator onBack={back} />
  if (sub === 'weight') return <WoodWeightConverter onBack={back} />

  return (
    <div className="screen">
      <div className="page-title">Calculate</div>
      <div className="page-subtitle">Scaling and volume calculators</div>
      {CALCULATORS.map(c => (
        <div key={c.id} className="card" style={{ cursor: 'pointer' }} onClick={() => onSubChange(c.id)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: '1.8rem' }}>{c.icon}</span>
            <div>
              <div style={{ fontWeight: 'bold', color: 'var(--color-forest)' }}>{c.label}</div>
              <div style={{ fontSize: '0.78rem', color: '#666' }}>{c.desc}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
