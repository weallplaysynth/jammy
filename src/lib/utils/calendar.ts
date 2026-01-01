export function buildMonthGrid(year: number, monthIndex0: number) {
  // monthIndex0: 0=Jan
  const first = new Date(year, monthIndex0, 1);
  const daysInMonth = new Date(year, monthIndex0 + 1, 0).getDate();

  // Make Monday=0..Sunday=6 (UK-friendly)
  const jsDay = first.getDay(); // 0=Sun..6=Sat
  const mondayFirstOffset = (jsDay + 6) % 7;

  const cells: Array<{ day: number | null }> = [];

  for (let i = 0; i < mondayFirstOffset; i++) cells.push({ day: null });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d });

  // pad to full weeks (multiples of 7)
  while (cells.length % 7 !== 0) cells.push({ day: null });

  return cells;
}
