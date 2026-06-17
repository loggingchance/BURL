import { PulpwoodCruiseCalculator } from './PulpwoodCruiseCalculator'
import { SawtimberCruiseCalculator } from './SawtimberCruiseCalculator'
import { BasalAreaRatioCalculator } from './BasalAreaRatioCalculator'

interface Props {
  sub?: string
  onSubChange: (sub?: string) => void
}

const TOOLS = [
  { id: 'pulpwood', icon: '🪵', label: 'Pulpwood Cruise', desc: 'Cords per acre — three shortcut methods' },
  { id: 'sawtimber', icon: '🌲', label: 'Sawtimber Cruise', desc: 'BF per acre with Doyle conversion' },
  { id: 'basal', icon: '📐', label: 'Basal Area Ratios', desc: 'Volume per unit of basal area' },
]

export function CruiseScreen({ sub, onSubChange }: Props) {
  const back = () => onSubChange(undefined)

  if (sub === 'pulpwood') return <PulpwoodCruiseCalculator onBack={back} />
  if (sub === 'sawtimber') return <SawtimberCruiseCalculator onBack={back} />
  if (sub === 'basal') return <BasalAreaRatioCalculator onBack={back} />

  return (
    <div className="screen">
      <div className="page-title">Cruise</div>
      <div className="page-subtitle">Prism / point-sample shortcuts</div>
      {TOOLS.map(t => (
        <div key={t.id} className="card" style={{ cursor: 'pointer' }} onClick={() => onSubChange(t.id)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: '1.8rem' }}>{t.icon}</span>
            <div>
              <div style={{ fontWeight: 'bold', color: 'var(--color-forest)' }}>{t.label}</div>
              <div style={{ fontSize: '0.78rem', color: '#666' }}>{t.desc}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
