import { useState } from 'react'
import { NumberStepper } from '../../components/NumberStepper'
import { SourceNote } from '../../components/SourceNote'

// Approximate A/B/C line points digitized from page 33
// [trees_per_acre, basal_area_sqft]
const A_LINE = [[150,65],[300,58],[450,52],[600,70],[750,88],[900,92],[1050,95]]
const B_LINE = [[150,50],[300,42],[450,35],[600,44],[750,52],[900,52],[1050,52]]
const C_LINE = [[150,40],[225,33],[300,30],[375,33],[450,40]]

const X_MIN = 150, X_MAX = 1050
const Y_MIN = 25, Y_MAX = 125
const SVG_W = 380, SVG_H = 280
const MARGIN = { top: 20, right: 20, bottom: 40, left: 45 }
const PLOT_W = SVG_W - MARGIN.left - MARGIN.right
const PLOT_H = SVG_H - MARGIN.top - MARGIN.bottom

function toSvgX(trees: number) {
  return MARGIN.left + ((trees - X_MIN) / (X_MAX - X_MIN)) * PLOT_W
}
function toSvgY(ba: number) {
  return MARGIN.top + PLOT_H - ((ba - Y_MIN) / (Y_MAX - Y_MIN)) * PLOT_H
}
function linePoints(pts: number[][]) {
  return pts.map(([x,y]) => `${toSvgX(x)},${toSvgY(y)}`).join(' ')
}

function getZone(trees: number, ba: number): string {
  function interpLine(line: number[][], x: number): number | null {
    const sorted = [...line].sort((a,b) => a[0]-b[0])
    if (x < sorted[0][0] || x > sorted[sorted.length-1][0]) return null
    for (let i=0; i<sorted.length-1; i++) {
      if (x >= sorted[i][0] && x <= sorted[i+1][0]) {
        const t = (x - sorted[i][0]) / (sorted[i+1][0] - sorted[i][0])
        return sorted[i][1] + t * (sorted[i+1][1] - sorted[i][1])
      }
    }
    return null
  }
  const aVal = interpLine(A_LINE, trees)
  const bVal = interpLine(B_LINE, trees)
  const cVal = interpLine(C_LINE, trees)

  if (aVal !== null && ba > aVal) return 'overstocked'
  if (bVal !== null && ba >= bVal) return 'adequate'
  if (cVal !== null && ba >= cVal) return 'adequate_10yr'
  return 'understocked'
}

const ZONE_LABELS: Record<string, string> = {
  overstocked: '⚠️ Overstocked — above the A line',
  adequate: '✅ Adequately stocked — between A and B lines',
  adequate_10yr: '📈 Should be adequately stocked within 10 years — between B and C lines',
  understocked: '❌ Definitely understocked — below C line',
}
const ZONE_COLORS: Record<string, string> = {
  overstocked: '#8b1a1a',
  adequate: '#155724',
  adequate_10yr: '#856404',
  understocked: '#721c24',
}

export function NorthernHardwoodGuide({ onBack }: { onBack: () => void }) {
  const [trees, setTrees] = useState(300)
  const [ba, setBa] = useState(70)

  const zone = getZone(trees, ba)
  const px = toSvgX(trees)
  const py = toSvgY(ba)
  const inBounds = trees >= X_MIN && trees <= X_MAX && ba >= Y_MIN && ba <= Y_MAX

  return (
    <div className="screen">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <div className="page-title">Northern Hardwood Stocking Guide</div>
      <div className="page-subtitle">Even-aged northern hardwoods</div>

      <div className="card">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="stocking-svg" aria-label="Northern Hardwood Stocking Guide chart">
          <rect x={MARGIN.left} y={MARGIN.top} width={PLOT_W} height={PLOT_H} fill="#f8f8f4" stroke="#ccc" />

          <polyline points={linePoints(A_LINE)} fill="none" stroke="#1a3009" strokeWidth="2.5" />
          <text x={toSvgX(1050)+2} y={toSvgY(95)} fontSize="11" fill="#1a3009">A</text>

          <polyline points={linePoints(B_LINE)} fill="none" stroke="#4a7c2a" strokeWidth="2" />
          <text x={toSvgX(1050)+2} y={toSvgY(52)} fontSize="11" fill="#4a7c2a">B</text>

          <polyline points={linePoints(C_LINE)} fill="none" stroke="#7a9e4e" strokeWidth="1.5" strokeDasharray="5,3" />
          <text x={toSvgX(450)+2} y={toSvgY(40)} fontSize="11" fill="#7a9e4e">C</text>

          {inBounds && (
            <circle cx={px} cy={py} r="7" fill="#cc3300" stroke="white" strokeWidth="2" className="stocking-point" />
          )}

          {[150,300,450,600,750,900,1050].map(v => (
            <text key={v} x={toSvgX(v)} y={SVG_H-8} fontSize="9" textAnchor="middle" fill="#555">{v}</text>
          ))}

          {[25,50,75,100,125].map(v => (
            <text key={v} x={MARGIN.left-4} y={toSvgY(v)+3} fontSize="9" textAnchor="end" fill="#555">{v}</text>
          ))}

          <text x={SVG_W/2} y={SVG_H-1} fontSize="10" textAnchor="middle" fill="#333">Trees per Acre</text>
          <text x={10} y={SVG_H/2} fontSize="10" textAnchor="middle" fill="#333"
            transform={`rotate(-90, 10, ${SVG_H/2})`}>BA (ft²/acre)</text>
        </svg>
      </div>

      <div className="card">
        <h2>Enter Stand Data</h2>
        <div className="form-group">
          <label>Trees per Acre</label>
          <NumberStepper value={trees} onChange={setTrees} min={150} max={1050} step={50} />
        </div>
        <div className="form-group">
          <label>Basal Area (ft²/acre)</label>
          <NumberStepper value={ba} onChange={setBa} min={25} max={125} step={5} />
        </div>
      </div>

      {inBounds && (
        <div className="card" style={{ borderLeft: `4px solid ${ZONE_COLORS[zone]}` }}>
          <div style={{ color: ZONE_COLORS[zone], fontWeight: 'bold', fontSize: '0.9rem' }}>
            {ZONE_LABELS[zone]}
          </div>
        </div>
      )}

      <SourceNote section="Northern Hardwood Stocking Guide" page={33} />
      <div className="source-note" style={{ marginTop: 4 }}>
        From: A Silvicultural Guide for Northern Hardwoods in the Northeast. Chart lines are digitized approximations — confirm with professional judgment.
      </div>
    </div>
  )
}
