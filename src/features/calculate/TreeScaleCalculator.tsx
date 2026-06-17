import { useState } from 'react'
import intlTable from '../../data/tables/tree-scale-international.json'
import scribnerTable from '../../data/tables/tree-scale-scribner.json'
import doyleTable from '../../data/tables/tree-scale-doyle.json'
import { tableGet } from '../../lib/lookup'
import { NumberStepper } from '../../components/NumberStepper'
import { SourceNote } from '../../components/SourceNote'

type Rule = 'international' | 'scribner' | 'doyle'

const RULES: { id: Rule; label: string; short: string }[] = [
  { id: 'international', label: 'International 1/4"', short: 'Int.' },
  { id: 'scribner', label: 'Scribner', short: 'Scrib.' },
  { id: 'doyle', label: 'Doyle', short: 'Doyle' },
]

const INT_LOG_OPTIONS = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4]
const SCRIB_LOG_OPTIONS = [1, 1.5, 2, 2.5, 3, 3.5, 4]
const DBH_OPTIONS = [12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42]
const DBH_OPTIONS_SCRIB = [12,14,16,18,20,22,24,26,28,30,32,34,36,38,40]

interface TallyItem { dbh: number; logs: number; bf: number }

export function TreeScaleCalculator({ onBack }: { onBack: () => void }) {
  const [rule, setRule] = useState<Rule>('international')
  const [dbh, setDbh] = useState(16)
  const [logs, setLogs] = useState(1)
  const [tally, setTally] = useState<TallyItem[]>([])

  const logOptions = rule === 'scribner' ? SCRIB_LOG_OPTIONS : INT_LOG_OPTIONS
  const dbhOptions = rule === 'scribner' ? DBH_OPTIONS_SCRIB : DBH_OPTIONS

  const table = rule === 'international' ? intlTable : rule === 'scribner' ? scribnerTable : doyleTable
  const sourcePages: Record<Rule, number> = { international: 1, scribner: 2, doyle: 3 }

  const validLogs = logOptions.includes(logs) ? logs : logOptions[0]
  const validDbh = dbhOptions.includes(dbh) ? dbh : dbhOptions[0]

  const result = tableGet(table.data as Record<string, Record<string, number | null>>, validDbh, validLogs)

  const addToTally = () => {
    if (typeof result === 'number') {
      setTally(prev => [...prev, { dbh: validDbh, logs: validLogs, bf: result }])
    }
  }

  const total = tally.reduce((sum, t) => sum + t.bf, 0)

  return (
    <div className="screen">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <div className="page-title">Tree Scale Calculator</div>
      <div className="page-subtitle">Board feet per standing tree</div>

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
        <h2>DBH (inches)</h2>
        <NumberStepper
          value={validDbh}
          onChange={v => setDbh(v)}
          min={12} max={dbhOptions[dbhOptions.length-1]}
          options={dbhOptions}
        />
      </div>

      <div className="card">
        <h2>Number of 16-Foot Logs</h2>
        <NumberStepper
          value={validLogs}
          onChange={v => setLogs(v)}
          min={logOptions[0]} max={logOptions[logOptions.length-1]}
          step={0.5}
          options={logOptions}
        />
      </div>

      {result === null && (
        <div className="warning-box">
          This DBH and log combination is not in the source table range.
        </div>
      )}
      {result === undefined && (
        <div className="warning-box">
          DBH {validDbh}" is outside the range of the {RULES.find(r=>r.id===rule)?.label} table (12"–{dbhOptions[dbhOptions.length-1]}").
        </div>
      )}

      {typeof result === 'number' && (
        <div className="result-card">
          <div className="result-value">{result.toLocaleString()}</div>
          <div className="result-unit">Board Feet</div>
          <div className="result-label">
            {RULES.find(r=>r.id===rule)?.label} Rule · DBH {validDbh}" · {validLogs} log{validLogs !== 1 ? 's' : ''}
          </div>
        </div>
      )}

      <SourceNote section="Tree Scale" page={sourcePages[rule]} />

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
                <span>DBH {t.dbh}", {t.logs} log{t.logs !== 1 ? 's' : ''}</span>
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
