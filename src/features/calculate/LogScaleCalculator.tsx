import { useState } from 'react'
import intlTable from '../../data/tables/log-scale-international.json'
import scribnerTable from '../../data/tables/log-scale-scribner.json'
import doyleTable from '../../data/tables/log-scale-doyle.json'
import { tableGet } from '../../lib/lookup'
import { NumberStepper } from '../../components/NumberStepper'
import { SourceNote } from '../../components/SourceNote'

type Rule = 'international' | 'scribner' | 'doyle'

const RULES: { id: Rule; label: string }[] = [
  { id: 'international', label: 'International 1/4"' },
  { id: 'scribner', label: 'Scribner' },
  { id: 'doyle', label: 'Doyle' },
]

const DIAM_OPTIONS: number[] = []
for (let d = 6; d <= 30; d++) DIAM_OPTIONS.push(d)
const LENGTH_OPTIONS = [6, 8, 10, 12, 14, 16]

interface TallyItem { diam: number; length: number; bf: number }

export function LogScaleCalculator({ onBack }: { onBack: () => void }) {
  const [rule, setRule] = useState<Rule>('international')
  const [diam, setDiam] = useState(12)
  const [length, setLength] = useState(16)
  const [tally, setTally] = useState<TallyItem[]>([])

  const table: any = rule === 'international' ? intlTable : rule === 'scribner' ? scribnerTable : doyleTable
  const multiplier: number = table.multiply_by ?? 1
  const sourcePages: Record<Rule, number> = { international: 4, scribner: 5, doyle: 6 }

  const raw = tableGet(table.data as Record<string, Record<string, number | null>>, diam, length)
  const result = typeof raw === 'number' ? raw * multiplier : raw

  const addToTally = () => {
    if (typeof result === 'number') {
      setTally(prev => [...prev, { diam, length, bf: result }])
    }
  }

  const total = tally.reduce((sum, t) => sum + t.bf, 0)

  return (
    <div className="screen">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <div className="page-title">Log Scale Calculator</div>
      <div className="page-subtitle">Board feet per log (small-end diameter)</div>

      <div className="card">
        <h2>Scaling Rule</h2>
        <div className="rule-chips">
          {RULES.map(r => (
            <button key={r.id} className={`rule-chip ${rule === r.id ? 'active' : ''}`} onClick={() => setRule(r.id)}>
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <h2>Scaling Diameter (inches)</h2>
        <NumberStepper value={diam} onChange={setDiam} min={6} max={30} options={DIAM_OPTIONS} />
      </div>

      <div className="card">
        <h2>Log Length (feet)</h2>
        <NumberStepper value={length} onChange={setLength} min={6} max={16} step={2} options={LENGTH_OPTIONS} />
      </div>

      {(rule === 'scribner' || rule === 'doyle') && (
        <div className="warning-box">
          Note: Scribner and Doyle log scale tables in the handbook are in tens; values shown here are in board feet.
        </div>
      )}

      {result === null && (
        <div className="warning-box">
          This diameter and length combination is below the merchantable range.
        </div>
      )}
      {result === undefined && (
        <div className="warning-box">
          This combination is outside the table range.
        </div>
      )}

      {typeof result === 'number' && (
        <div className="result-card">
          <div className="result-value">{result.toLocaleString()}</div>
          <div className="result-unit">Board Feet</div>
          <div className="result-label">
            {RULES.find(r => r.id === rule)?.label} Rule · {diam}" × {length} ft
          </div>
        </div>
      )}

      <SourceNote section="Log Scale" page={sourcePages[rule]} />

      {typeof result === 'number' && (
        <button className="btn btn-secondary" style={{ marginBottom: 12 }} onClick={addToTally}>
          + Add to Tally
        </button>
      )}

      {tally.length > 0 && (
        <div className="card">
          <h2>Tally</h2>
          <ul className="tally-list">
            {tally.map((t, i) => (
              <li key={i}>
                <span>{t.diam}" × {t.length} ft</span>
                <span>{t.bf.toLocaleString()} BF</span>
              </li>
            ))}
          </ul>
          <div className="tally-total">
            <span>Total</span>
            <span>{total.toLocaleString()} BF</span>
          </div>
          <button className="btn btn-small btn-danger" style={{ marginTop: 8 }} onClick={() => setTally([])}>
            Clear Tally
          </button>
        </div>
      )}
    </div>
  )
}
