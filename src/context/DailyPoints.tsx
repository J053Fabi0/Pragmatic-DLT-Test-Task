import moment from "moment";
import type { Moment } from "moment";
import { useContext, useEffect, useState } from "react";
import { DailyPointsContext, TransactionsContext } from "./contexts";

function getIsNthOfSeason(date: Moment, nth: number): boolean {
  const day = date.format("DD");
  if (nth.toString().padStart(2, "0") !== day) return false;

  const month = date.format("MM");
  // march, june, september, december
  return month === "03" || month === "06" || month === "09" || month === "12";
}

function getDailyPoints(from: Moment, to?: Moment): number {
  from = from.startOf("day");
  to = (to || moment()).startOf("day");

  const date = from.clone();

  const points: number[] = [];
  do {
    if (getIsNthOfSeason(date, 1)) points.push(2);
    else if (getIsNthOfSeason(date, 2)) points.push(3);
    else {
      let point = 0;
      const i = points.length - 1;
      // 60% of the previous day
      if (i - 1 >= 0) point += points[i - 1] * 0.6;
      // 100% of the day before of the previous one
      if (i - 2 >= 0) point += points[i - 2];
      points.push(point);
    }
  } while (date.isBefore(to) && (date.add(1, "day"), true));

  let total = 0;
  for (const point of points) total += point;

  return total;
}

export function DailyPointsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dailyPoints, setDailyPoints] = useState<number>(0);
  const transactions = useContext(TransactionsContext);

  useEffect(() => {
    if (transactions.length === 0) return;

    let latestTransactionDate: Moment | null = null;
    let oldestTransactionDate: Moment | null = null;

    for (const transaction of transactions) {
      const transactionDate = moment(transaction.date);

      if (
        latestTransactionDate === null ||
        latestTransactionDate.isBefore(transactionDate)
      )
        latestTransactionDate = transactionDate;

      if (
        oldestTransactionDate === null ||
        oldestTransactionDate.isAfter(transactionDate)
      )
        oldestTransactionDate = transactionDate;
    }

    const points = getDailyPoints(
      oldestTransactionDate as Moment,
      latestTransactionDate as Moment,
    );

    setDailyPoints(points);
  }, [transactions]);

  return (
    <DailyPointsContext.Provider value={dailyPoints}>
      {children}
    </DailyPointsContext.Provider>
  );
}
