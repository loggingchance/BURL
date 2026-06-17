import { useState } from 'react'
import { SourceNote } from '../../components/SourceNote'
import { NumberStepper } from '../../components/NumberStepper'

// Nominal lumber dimensions: thickness (in) x width (in)
const DIMENSIONS: { label: string; t: number; w: number }[] = [
  { label: '1 × 4', t: 1, w: 4 },
  { label: '1 × 6', t: 1, w: 6 },
  { label: '1 × 8', t: 1, w: 8 },
  { label: '1 × 10', t: 1, w: 10 },
  { label: '1 × 12', t: 1, w: 12 },
  { label: '2 × 4', t: 2, w: 4 },
  { label: '2 × 6', t: 2, w: 6 },
  { label: '2 × 8', t: 2, w: 8 },
  { label: '2 × 10', t: 2, w: 10 },
  { label: '2 × 12', t: 2, w: 12 },
  { label: '4 × 4', t: 4, w: 4 },
  { label: '6 × 6', t: 6, w: 6 },
]
const LENGTH_OPTIONS = [6, 8, 10, 12, 14, 16]

export function LumberScaleCalculator({ onBack }: { onBack: () => void }) {
  const [dimIdx, setDimIdx] = useState(5)
  const [length, setLength] = useState(8)
  const [qty, setQty] = useState(1)

  const dim = DIMENSIONS[dimIdx]
  // Board feet per piece = T(in) × W(in) × L(ft) / 12
  const bfPerPiece = (dim.t * dim.w * length) / 12
  const totalBf = bfPerPiece * qty

  return (
    <div className="screen">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <div className="page-title">Lumber Scale Calculator</div>
      <div className="page-subtitle">Board feet of dimensional lumber</div>

      <div className="card">
        <h2>Dimension (thickness × width)</h2>
        <div className="form-group">
          <select value={dimIdx} onChange={e => setDimIdx(Number(e.target.value))}>
            {DIMENSIONS.map((d, i) => (
              <option key={d.label} value={i}>{d.label} in</option>
            ))}
          </select>
        </div>
      </div>

      <div className="card">
        <h2>Length (feet)</h2>
        <NumberStepper value={length} onChange={setLength} min={6} max={16} step={2} options={LENGTH_OPTIONS} />
      </div>

      <div className="card">
        <h2>Quantity (pieces)</h2>
        <div className="form-group">
          <input
            type="number"
            min={1}
            value={qty}
            onChange={e => setQty(Math.max(1, Number(e.target.value) || 1))}
          />
        </div>
      </div>

      <div className="formula-box">
        BF/piece = T × W × L ÷ 12 = {dim.t} × {dim.w} × {length} ÷ 12 = {bfPerPiece.toFixed(2)}
      </div>

      <div className="result-card">
        <div className="result-value">{parseFloat(totalBf.toFixed(2)).toLocaleString()}</div>
        <div className="result-unit">Board Feet</div>
        <div className="result-label">
          {qty} × {dim.label} × {length} ft @ {bfPerPiece.toFixed(2)} BF each
        </div>
      </div>

      <SourceNote section="Lumber Scale (Board Foot Formula)" page={20} />
    </div>
  )
}
