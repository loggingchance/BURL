import { useState } from 'react'
import { sawtimberInternational, getIntFactor, sawtimberDoyle, getDoyleFactor } from '../../formulas/sawtimber-shortcuts'
import { SourceNote } from '../../components/SourceNote'

export function SawtimberCruiseCalculator({ onBack }: { onBack: () => void }) {
  const [samples, setSamples] = useState(8)
  const [logsTallied, setLogsTallied] = useState(22.5)
  const [avgLogs, setAvgLogs] = useState(2.5)
  const [doyleOn, setDoyleOn] = useState(false)
  const [avgDbh, setAvgDbh] = useState(16)

  const factor = getIntFactor(avgLogs)
  const intVol = sawtimberInternational(logsTallied, avgLogs, samples)
  const doyleFactor = getDoyleFactor(avgDbh)
  const doyleVol = sawtimberDoyle(intVol, avgDbh)

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
      <div className="page-title">Sawtimber Prism Cruise</div>
      <div className="page-subtitle">Board feet per acre (International 1/4")</div>
      <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px' }}>
        <span style={{ fontSize: '1.4rem' }}>🔵</span>
        <div>
          <div style={{ fontWeight: 'bold', color: 'var(--color-forest)', fontSize: '0.9rem' }}>
            BAF 10 Prism Required
          </div>
          <div style={{ fontSize: '0.78rem', color: '#555' }}>
            These formulas are calibrated for a 10-factor (BAF 10) prism or angle gauge.
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Cruise Data</h2>
        {numInput('Number of point samples', samples, setSamples)}
        {numInput('Total logs tallied', logsTallied, setLogsTallied, 0.5)}
        {numInput('Avg logs per tree', avgLogs, setAvgLogs, 0.5)}
      </div>

      <div className="formula-box">
        ({logsTallied} logs × {factor} factor) ÷ {samples} samples = {intVol.toLocaleString()}
      </div>

      <div className="result-card">
        <div className="result-value">{intVol.toLocaleString()}</div>
        <div className="result-unit">BF per Acre (Int. 1/4")</div>
        <div className="result-label">Volume factor for {avgLogs} logs/tree: {factor}</div>
      </div>

      <div className="card">
        <h2>Doyle Conversion</h2>
        <div className="rule-chips">
          <button className={`rule-chip ${!doyleOn ? 'active' : ''}`} onClick={() => setDoyleOn(false)}>Off</button>
          <button className={`rule-chip ${doyleOn ? 'active' : ''}`} onClick={() => setDoyleOn(true)}>On</button>
        </div>
        {doyleOn && (
          <>
            <div style={{ marginTop: 12 }}>
              {numInput('Avg DBH (inches)', avgDbh, setAvgDbh)}
            </div>
            <div className="formula-box">
              {intVol.toLocaleString()} × {doyleFactor} (DBH {avgDbh}") = {doyleVol.toLocaleString()}
            </div>
            <div className="result-card">
              <div className="result-value">{doyleVol.toLocaleString()}</div>
              <div className="result-unit">BF per Acre (Doyle)</div>
            </div>
          </>
        )}
      </div>

      <SourceNote section="Sawtimber Cruise Shortcuts" page={29} />
    </div>
  )
}
