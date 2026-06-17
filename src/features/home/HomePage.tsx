import { InstallBanner } from '../../components/InstallBanner'

interface Props {
  onNavigate: (tab: string, sub?: string) => void
}

const cards = [
  { icon: '🌳', label: 'Scale a Tree', tab: 'calculate', sub: 'tree' },
  { icon: '📏', label: 'Scale Logs', tab: 'calculate', sub: 'log' },
  { icon: '🪵', label: 'Pulpwood', tab: 'calculate', sub: 'pulpwood' },
  { icon: '🧭', label: 'Prism Cruise', tab: 'cruise', sub: 'pulpwood' },
  { icon: '📐', label: 'Basal Area', tab: 'cruise', sub: 'basal' },
  { icon: '📊', label: 'Stocking Guides', tab: 'guides', sub: '' },
  { icon: '⚖️', label: 'Wood Weight', tab: 'calculate', sub: 'weight' },
  { icon: '🏗️', label: 'Lumber Scale', tab: 'calculate', sub: 'lumber' },
]

export function HomePage({ onNavigate }: Props) {
  return (
    <div className="screen">
      <div style={{ fontSize: '0.78rem', color: '#888', textAlign: 'center', marginBottom: 16 }}>
        Classic forester tables and calculations, rebuilt for mobile field use.
      </div>
      <InstallBanner />
      <div className="home-grid">
        {cards.map(c => (
          <div key={c.label} className="home-card" onClick={() => onNavigate(c.tab, c.sub)}>
            <span className="icon">{c.icon}</span>
            <span className="label">{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
