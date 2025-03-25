import moment from "moment";
import { useContext, useRef } from "react";
import Transactions from "../components/Transactions";
import { Card, DarkThemeToggle } from "flowbite-react";
import numberWithCommas from "../utils/numberWithCommas";
import { BalanceContext, CardLimitContext } from "../context/BalanceContext";

export default function TransactionsList() {
  const balance = useContext(BalanceContext);
  const cardLimit = useContext(CardLimitContext);

  const availableBalance = cardLimit - balance;

  const nameOfMonth = useRef<string>("");
  if (nameOfMonth.current === "") nameOfMonth.current = moment().format("MMMM");

  return (
    <>
      <div className="absolute top-4 right-4">
        <DarkThemeToggle />
      </div>

      <div className="relative flex w-full max-w-5xl flex-col items-center justify-center gap-12">
        <div className="relative flex w-full flex-col items-start gap-6 self-stretch">
          <div className="grid w-full grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <Card className="h-full gap-2">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-gray-700 dark:text-gray-400">
                    Card balance
                  </p>
                  <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {numberWithCommas(balance)}
                  </h2>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    {numberWithCommas(availableBalance)} available
                  </p>
                </div>
              </Card>

              <Card>
                <div className="flex flex-col gap-0">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-400">
                    Daily points
                  </p>
                  <p className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                    434k
                  </p>
                </div>
              </Card>
            </div>

            <Card className="h-full">
              <div className="flex h-full flex-col items-center justify-center gap-2">
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  No payment due
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  You've paid your {nameOfMonth.current} balance
                </p>
              </div>
            </Card>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Latest transactions
          </h1>

          <Transactions />
        </div>
      </div>
    </>
  );
}
