const INT_FACTORS: [number, number][] = [[1,750],[1.5,660],[2,625],[2.5,600],[3,580]];
export function getIntFactor(avgLogsPerTree: number): number {
  return INT_FACTORS.reduce((a, b) => Math.abs(b[0] - avgLogsPerTree) < Math.abs(a[0] - avgLogsPerTree) ? b : a)[1];
}
export function sawtimberInternational(logsTallied: number, avgLogsPerTree: number, pointSamples: number): number {
  return Math.round((logsTallied * getIntFactor(avgLogsPerTree)) / pointSamples);
}
const DOYLE_FACTORS: [number, number][] = [[12,0.50],[16,0.65],[20,0.75],[24,0.85],[28,0.90],[32,0.95]];
export function getDoyleFactor(avgDbh: number): number {
  return DOYLE_FACTORS.reduce((a, b) => Math.abs(b[0] - avgDbh) < Math.abs(a[0] - avgDbh) ? b : a)[1];
}
export function sawtimberDoyle(intVolume: number, avgDbh: number): number {
  return Math.round(intVolume * getDoyleFactor(avgDbh));
}
