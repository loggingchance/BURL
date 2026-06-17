export function tableGet(
  data: Record<string, Record<string, number | null>>,
  rowKey: number | string,
  colKey: number | string
): number | null | undefined {
  const row = data[String(rowKey)];
  if (!row) return undefined;
  const val = row[String(colKey)];
  if (val === undefined) return undefined;
  return val;
}

export function nearestKeys(keys: (number | string)[], target: number): { lower: string | null; upper: string | null } {
  const nums = keys.map(Number).sort((a, b) => a - b);
  const lower = nums.filter(n => n <= target).pop() ?? null;
  const upper = nums.find(n => n >= target) ?? null;
  return {
    lower: lower !== null ? String(lower) : null,
    upper: upper !== null ? String(upper) : null
  };
}
