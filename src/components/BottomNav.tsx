type Tab = 'home' | 'calculate' | 'cruise' | 'guides' | 'reference' | 'about'

interface Props {
  active: Tab
  onChange: (tab: Tab) => void
}

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: '🌲' },
  { id: 'calculate', label: 'Calculate', icon: '🔢' },
  { id: 'cruise', label: 'Cruise', icon: '🧭' },
  { id: 'guides', label: 'Guides', icon: '📊' },
  { id: 'reference', label: 'Reference', icon: '📖' },
  { id: 'about', label: 'About', icon: 'ℹ️' },
]

export function BottomNav({ active, onChange }: Props) {
  return (
    <nav className="bottom-nav">
      {tabs.map(t => (
        <button
          key={t.id}
          className={active === t.id ? 'active' : ''}
          onClick={() => onChange(t.id)}
          aria-label={t.label}
        >
          <span className="icon">{t.icon}</span>
          {t.label}
        </button>
      ))}
    </nav>
  )
}
