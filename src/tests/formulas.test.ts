import { describe, it, expect } from 'vitest'
import { pulpwoodMethod1, pulpwoodMethod2, pulpwoodMethod3 } from '../formulas/pulpwood-shortcuts'
import { sawtimberInternational, sawtimberDoyle } from '../formulas/sawtimber-shortcuts'
import { basalAreaSawtimberRatio, basalAreaPulpwoodRatio } from '../formulas/basal-area-ratios'

describe('Pulpwood shortcut formulas', () => {
  it('Method 1: 6 trees/sample × (2.5 sticks + 1) ÷ 2 = 10.5 cords/acre', () => {
    expect(pulpwoodMethod1(6, 2.5)).toBe(10.5)
  })
  it('Method 2: (120 sticks + 48 trees) ÷ (2 × 8 samples) = 10.5 cords/acre', () => {
    expect(pulpwoodMethod2(120, 48, 8)).toBe(10.5)
  })
  it('Method 3: 132 sticks × 0.7 ÷ 10 samples = 9.24 cords/acre', () => {
    expect(pulpwoodMethod3(132, 2, 10)).toBeCloseTo(9.24, 2)
  })
})

describe('Sawtimber shortcut formulas', () => {
  it('22.5 logs × 600 factor ÷ 8 samples = 1688 BF/acre', () => {
    expect(sawtimberInternational(22.5, 2.5, 8)).toBe(1688)
  })
  it('Doyle conversion applies factor', () => {
    expect(sawtimberDoyle(1688, 16)).toBe(Math.round(1688 * 0.65))
  })
})

describe('Basal area ratios', () => {
  it('Sawtimber: 25 + (2.72 × 50) = 161 BF/sq.ft', () => {
    expect(basalAreaSawtimberRatio(2.72)).toBe(161)
  })
  it('Pulpwood: 0.037 + (3.3 × 0.053) ≈ 0.2119 cords/sq.ft', () => {
    expect(basalAreaPulpwoodRatio(3.3)).toBeCloseTo(0.2119, 4)
  })
})
