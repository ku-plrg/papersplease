export function flip(rec: Record<string, string[]>) {
  return Object.entries(rec).reduce((acc, [k, vs]) => {
    for (const v of vs) acc[v] = k;
    return acc;
  }, {} as Record<string, string>);
}
