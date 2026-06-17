import { useState } from 'react'
import pulpTable from '../../data/tables/pulpwood-standing-tree.json'
import { tableGet } from '../../lib/lookup'
import { roundCords } from '../../lib/rounding'
import { NumberStepper } from '../../components/NumberStepper'
import { SourceNote } from '../../components/SourceNote'

const DBH_OPTIONS = [5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 18, 20, 22]
const STICK_OPTIONS = [1, 2, 3, 4, 5, 6, 7]

interface TallyItem { dbh: number; sticks: number; cords: number }

export function PulpwoodCalculator({ onBack }: { onBack: () => void }) {
  const [dbh, setDbh] = useState(10)
  const [sticks, setSticks] = useState(2)
  const [tally, setTally] = useState<TallyItem[]>([])

  const result = tableGet(
    pulpTable.data as Record<string, Record<string, number | null>>,
    dbh, sticks
  )

  const addToTally = () => {
    if (typeof result === 'number') {
      setTally(prev => [...prev, { dbh, sticks, cords: result }])
    }
  }

  const total = roundCords(tally.reduce((sum, t) => sum + t.cords, 0))

  return (
    <div className="screen">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <div className="page-title">Pulpwood Calculator</div>
      <div className="page-subtitle">Cords per standing tree</div>

      <div className="card">
        <h2>DBH (inches)</h2>
        <NumberStepper value={dbh} onChange={setDbh} min={5} max={22} options={DBH_OPTIONS} />
      </div>

      <div className="card">
        <h2>Number of 5-Foot Sticks</h2>
        <NumberStepper value={sticks} onChange={setSticks} min={1} max={7} options={STICK_OPTIONS} />
      </div>

      {result === null && (
        <div className="warning-box">
          This DBH and stick combination is not in the source table range.
        </div>
      )}
      {result === undefined && (
        <div className="warning-box">This combination is outside the table range.</div>
      )}

      {typeof result === 'number' && (
        <div className="result-card">
          <div className="result-value">{result.toFixed(3)}</div>
          <div className="result-unit">Cords</div>
          <div className="result-label">DBH {dbh}" · {sticks} stick{sticks !== 1 ? 's' : ''}</div>
        </div>
      )}

      <SourceNote section="Pulpwood Standing Tree" page={7} />

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
                <span>DBH {t.dbh}", {t.sticks} stick{t.sticks !== 1 ? 's' : ''}</span>
                <span>{t.cords.toFixed(3)} cd</span>
              </li>
            ))}
          </ul>
          <div className="tally-total">
            <span>Total</span>
            <span>{total.toFixed(3)} cords</span>
          </div>
          <button className="btn btn-small btn-danger" style={{ marginTop: 8 }} onClick={() => setTally([])}>
            Clear Tally
          </button>
        </div>
      )}
    </div>
  )
}
