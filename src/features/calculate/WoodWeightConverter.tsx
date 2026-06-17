import { useState } from 'react'
import weightData from '../../data/tables/wood-weight.json'
import { SourceNote } from '../../components/SourceNote'
import { roundTons } from '../../lib/rounding'

type Mode = 'cords' | 'bf'

interface Species {
  name: string
  weight_per_cord: number
  tons_per_cord: number
  weight_per_1000bf: number
}

const SPECIES = weightData.species as Species[]

export function WoodWeightConverter({ onBack }: { onBack: () => void }) {
  const [speciesIdx, setSpeciesIdx] = useState(0)
  const [mode, setMode] = useState<Mode>('cords')
  const [amount, setAmount] = useState(1)

  const sp = SPECIES[speciesIdx]

  const pounds = mode === 'cords'
    ? sp.weight_per_cord * amount
    : (sp.weight_per_1000bf / 1000) * amount
  const tons = roundTons(pounds / 2000)

  return (
    <div className="screen">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <div className="page-title">Wood Weight Converter</div>
      <div className="page-subtitle">Green weight by species</div>

      <div className="card">
        <h2>Species</h2>
        <div className="form-group">
          <select value={speciesIdx} onChange={e => setSpeciesIdx(Number(e.target.value))}>
            {SPECIES.map((s, i) => (
              <option key={s.name} value={i}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="card">
        <h2>Input Unit</h2>
        <div className="rule-chips">
          <button className={`rule-chip ${mode === 'cords' ? 'active' : ''}`} onClick={() => setMode('cords')}>
            Cords
          </button>
          <button className={`rule-chip ${mode === 'bf' ? 'active' : ''}`} onClick={() => setMode('bf')}>
            Board Feet
          </button>
        </div>
        <div className="form-group" style={{ marginTop: 12 }}>
          <label>{mode === 'cords' ? 'Number of Cords' : 'Board Feet'}</label>
          <input
            type="number"
            min={0}
            value={amount}
            onChange={e => setAmount(Math.max(0, Number(e.target.value) || 0))}
          />
        </div>
      </div>

      <div className="result-card">
        <div className="result-value">{Math.round(pounds).toLocaleString()}</div>
        <div className="result-unit">Pounds</div>
        <div className="result-label">{tons.toLocaleString()} tons</div>
      </div>

      <SourceNote section="Wood Weight" page={15} />
      <div className="source-note" style={{ marginTop: 4 }}>
        Reference values: {sp.weight_per_cord.toLocaleString()} lb/cord ({sp.tons_per_cord} tons/cord),
        {' '}{sp.weight_per_1000bf.toLocaleString()} lb per 1,000 BF.
      </div>
    </div>
  )
}
