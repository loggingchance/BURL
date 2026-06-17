import { NorthernHardwoodGuide } from './NorthernHardwoodGuide'

interface Props {
  sub?: string
  onSubChange: (sub?: string) => void
}

export function StockingGuides({ sub, onSubChange }: Props) {
  const back = () => onSubChange(undefined)

  if (sub === 'northern-hardwood') return <NorthernHardwoodGuide onBack={back} />

  return (
    <div className="screen">
      <div className="page-title">Stocking Guides</div>
      <div className="page-subtitle">Stand density & stocking</div>
      <div className="card" style={{ cursor: 'pointer' }} onClick={() => onSubChange('northern-hardwood')}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 'bold', color: 'var(--color-forest)' }}>Northern Hardwood</div>
            <div style={{ fontSize: '0.78rem', color: '#666' }}>Even-aged northern hardwoods</div>
          </div>
          <span className="ref-status status-verified">Interactive</span>
        </div>
      </div>
      <div className="source-note" style={{ marginTop: 8 }}>
        Additional stocking guides (Upland Central Hardwood, Red Pine, White Pine) are in the handbook on pages 31–35. Interactive versions are planned for a future update.
      </div>
    </div>
  )
}
