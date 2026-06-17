import { useState } from 'react'
import {
  basalAreaSawtimberRatio,
  basalAreaPulpwoodRatio,
  basalAreaSawtimberVolume,
  basalAreaPulpwoodVolume,
} from '../../formulas/basal-area-ratios'
import { SourceNote } from '../../components/SourceNote'

type Type = 'sawtimber' | 'pulpwood'

export function BasalAreaRatioCalculator({ onBack }: { onBack: () => void }) {
  const [type, setType] = useState<Type>('sawtimber')
  const [avgLogs, setAvgLogs] = useState(2.5)
  const [avgSticks, setAvgSticks] = useState(3)
  const [baOn, setBaOn] = useState(false)
  const [basalArea, setBasalArea] = useState(80)

  const isSaw = type === 'sawtimber'
  const ratio = isSaw ? basalAreaSawtimberRatio(avgLogs) : basalAreaPulpwoodRatio(avgSticks)
  const volume = isSaw
    ? basalAreaSawtimberVolume(basalArea, avgLogs)
    : basalAreaPulpwoodVolume(basalArea, avgSticks)
  const ratioUnit = isSaw ? 'BF per sq.ft of BA' : 'cords per sq.ft of BA'
  const volUnit = isSaw ? 'BF per Acre' : 'Cords per Acre'
  const formula = isSaw
    ? `25 + (${avgLogs} logs × 50) = ${ratio}`
    : `0.037 + (${avgSticks} sticks × 0.053) = ${ratio}`

  const numInput = (label: string, value: number, set: (n: number) => void, step = 1) => (
    <div className="form-group">
      <label>{label}</label>
      <input type="number" step={step} value={value}
        onChange={e => set(Number(e.target.value) || 0)} />
    </div>
  )

  return (
    <div className="screen">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <div className="page-title">Basal Area Ratios</div>
      <div className="page-subtitle">Volume per unit of basal area</div>

      <div className="card">
        <h2>Product Type</h2>
        <div className="rule-chips">
          <button className={`rule-chip ${isSaw ? 'active' : ''}`} onClick={() => setType('sawtimber')}>Sawtimber</button>
          <button className={`rule-chip ${!isSaw ? 'active' : ''}`} onClick={() => setType('pulpwood')}>Pulpwood</button>
        </div>
      </div>

      <div className="card">
        <h2>Stand Average</h2>
        {isSaw
          ? numInput('Avg logs per tree', avgLogs, setAvgLogs, 0.5)
          : numInput('Avg sticks per tree', avgSticks, setAvgSticks, 0.5)}
      </div>

      <div className="formula-box">{formula}</div>

      <div className="result-card">
        <div className="result-value">{ratio.toLocaleString()}</div>
        <div className="result-unit">{ratioUnit}</div>
      </div>

      <div className="card">
        <h2>Total Volume (optional)</h2>
        <div className="rule-chips">
          <button className={`rule-chip ${!baOn ? 'active' : ''}`} onClick={() => setBaOn(false)}>Off</button>
          <button className={`rule-chip ${baOn ? 'active' : ''}`} onClick={() => setBaOn(true)}>On</button>
        </div>
        {baOn && (
          <>
            <div style={{ marginTop: 12 }}>
              {numInput('Basal area (sq.ft/acre)', basalArea, setBasalArea)}
            </div>
            <div className="formula-box">
              {basalArea} × {ratio} = {volume.toLocaleString()}
            </div>
            <div className="result-card">
              <div className="result-value">{volume.toLocaleString()}</div>
              <div className="result-unit">{volUnit}</div>
            </div>
          </>
        )}
      </div>

      <SourceNote section="Basal Area Volume Ratios" page={30} />
    </div>
  )
}
