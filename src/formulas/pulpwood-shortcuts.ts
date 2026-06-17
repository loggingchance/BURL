export function pulpwoodMethod1(avgTreesPerSample: number, avgSticksPerTree: number): number {
  return (avgTreesPerSample * (avgSticksPerTree + 1)) / 2;
}
export function pulpwoodMethod2(sticksTallied: number, treesTallied: number, pointSamples: number): number {
  return (sticksTallied + treesTallied) / (2 * pointSamples);
}
export function pulpwoodMethod3(sticksTallied: number, avgSticksPerTree: number, pointSamples: number): number {
  const factor = avgSticksPerTree <= 1 ? 0.9 : avgSticksPerTree <= 2 ? 0.7 : avgSticksPerTree <= 3 ? 0.65 : 0.6;
  return (sticksTallied * factor) / pointSamples;
}
