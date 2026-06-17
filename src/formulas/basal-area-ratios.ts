export function basalAreaSawtimberRatio(avgLogsPerTree: number): number {
  return 25 + avgLogsPerTree * 50;
}
export function basalAreaPulpwoodRatio(avgSticksPerTree: number): number {
  return parseFloat((0.037 + avgSticksPerTree * 0.053).toFixed(4));
}
export function basalAreaSawtimberVolume(basalArea: number, avgLogsPerTree: number): number {
  return Math.round(basalArea * basalAreaSawtimberRatio(avgLogsPerTree));
}
export function basalAreaPulpwoodVolume(basalArea: number, avgSticksPerTree: number): number {
  return parseFloat((basalArea * basalAreaPulpwoodRatio(avgSticksPerTree)).toFixed(4));
}
