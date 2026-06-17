import { useState } from 'react'
import { pulpwoodMethod1, pulpwoodMethod2, pulpwoodMethod3 } from '../../formulas/pulpwood-shortcuts'
import { roundCords } from '../../lib/rounding'
import { SourceNote } from '../../components/SourceNote'

type Method = 'm1' | 'm2' | 'm3'

export function PulpwoodCruiseCalculator({ onBack }: { onBack: () => void }) {
  const [method, setMethod] = useState<Method>('m1')

  // Method 1 inputs
  const [avgTrees, setAvgTrees] = useState(6)
  const [avgSticks1, setAvgSticks1] = useState(2.5)
  // Method 2 inputs
  const [sticks2, setSticks2] = useState(120)
  const [trees2, setTrees2] = useState(48)
  const [samples2, setSamples2] = useState(8)
  // Method 3 inputs
  const [sticks3, setSticks3] = useState(132)
  const [avgSticks3, setAvgSticks3] = useState(2)
  const [samples3, setSamples3] = useState(10)

  let result = 0
  let formula = ''
  if (method === 'm1') {
    result = pulpwoodMethod1(avgTrees, avgSticks1)
    formula = `(${avgTrees} trees × (${avgSticks1} sticks + 1)) ÷ 2 = ${roundCords(result, 2)}`
  } else if (method === 'm2') {
    result = pulpwoodMethod2(sticks2, trees2, samples2)
    formula = `(${sticks2} + ${trees2}) ÷ (2 × ${samples2}) = ${roundCords(result, 2)}`
  } else {
    result = pulpwoodMethod3(sticks3, avgSticks3, samples3)
    formula = `(${sticks3} × factor) ÷ ${samples3} = ${roundCords(result, 2)}`
  }
  result = roundCords(result, 2)

  const loadExample = () => {
    if (method === 'm1') { setAvgTrees(6); setAvgSticks1(2.5) }
    else if (method === 'm2') { setSticks2(120); setTrees2(48); setSamples2(8) }
    else { setSticks3(132); setAvgSticks3(2); setSamples3(10) }
  }

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
      <div className="page-title">Pulpwood Prism Cruise</div>
      <div className="page-subtitle">Cords per acre — shortcut methods</div>
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

      <div className="method-tabs">
        <button className={`method-tab ${method === 'm1' ? 'active' : ''}`} onClick={() => setMethod('m1')}>Method 1</button>
        <button className={`method-tab ${method === 'm2' ? 'active' : ''}`} onClick={() => setMethod('m2')}>Method 2</button>
        <button className={`method-tab ${method === 'm3' ? 'active' : ''}`} onClick={() => setMethod('m3')}>Method 3</button>
      </div>

      <div className="card">
        {method === 'm1' && (
          <>
            <h2>Average trees & sticks</h2>
            {numInput('Avg trees per sample point', avgTrees, setAvgTrees)}
            {numInput('Avg sticks per tree', avgSticks1, setAvgSticks1, 0.1)}
          </>
        )}
        {method === 'm2' && (
          <>
            <h2>Tally totals</h2>
            {numInput('Total sticks tallied', sticks2, setSticks2)}
            {numInput('Total trees tallied', trees2, setTrees2)}
            {numInput('Number of point samples', samples2, setSamples2)}
          </>
        )}
        {method === 'm3' && (
          <>
            <h2>Sticks & factor</h2>
            {numInput('Total sticks tallied', sticks3, setSticks3)}
            {numInput('Avg sticks per tree', avgSticks3, setAvgSticks3, 0.1)}
            {numInput('Number of point samples', samples3, setSamples3)}
          </>
        )}
      </div>

      <div className="formula-box">{formula}</div>

      <div className="result-card">
        <div className="result-value">{result.toLocaleString()}</div>
        <div className="result-unit">Cords per Acre</div>
      </div>

      <button className="btn btn-secondary" style={{ marginBottom: 12 }} onClick={loadExample}>
        Load Example Values
      </button>

      <SourceNote section="Pulpwood Cruise Shortcuts" page={28} />
    </div>
  )
}
