export function isUnlocked(
  day: number,
  year: number,
  monthIndex0: number,
  now = new Date(),
  unlockHourLocal = 0
) {
  // unlock at local time (default midnight)
  const unlockAt = new Date(year, monthIndex0, day, unlockHourLocal, 0, 0, 0);
  return now.getTime() >= unlockAt.getTime();
}
