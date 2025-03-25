export default function formatDailyPoints(dailyPoints: number): string {
  if (dailyPoints < 1000) return dailyPoints.toFixed(2);

  return parseInt((dailyPoints / 1000).toString()) + "k";
}
