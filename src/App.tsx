import _ from "lodash";
import moment from "moment";
import { useRef, useState } from "react";
import numberWithCommas from "./utils/numberWithCommas";
import generateTransactions from "./utils/generateData";
import getTransactionDescription from "./utils/getTransactionDescription";
import { Card, DarkThemeToggle, Avatar, List, ListItem } from "flowbite-react";

const transactions = generateTransactions(10);

export default function App() {
  const [balance] = useState(() => _.random(10, 300, true));
  const [cardLimit] = useState(1500);
  const availableBalance = cardLimit - balance;

  const nameOfMonth = useRef<string>("");
  if (nameOfMonth.current === "") nameOfMonth.current = moment().format("MMMM");

  const transactionDescriptions = useRef<string[][]>([]);
  if (transactionDescriptions.current.length === 0)
    for (let i = 0; i < transactions.length; i++) {
      const description = getTransactionDescription(transactions[i]);
      transactionDescriptions.current.push(description);
    }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-200 px-4 py-24 dark:bg-gray-900">
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

          <List
            unstyled
            className="w-full divide-y divide-gray-200 rounded-lg bg-white px-5 dark:divide-gray-700 dark:bg-gray-800"
          >
            <ListItem className="pt-3 pb-3 sm:pt-4">
              {transactions.map((t, i) => (
                <>
                  {i !== 0 && (
                    <div className="my-2 border-b border-gray-200 dark:border-gray-700" />
                  )}
                  <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse">
                    <Avatar
                      size="md"
                      img={t.image}
                      alt={t.name === null ? "Payment" : t.name}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between">
                        <p className="truncate text-base font-semibold text-gray-900 dark:text-white">
                          {t.name === null ? "Payment" : t.name}
                        </p>
                        <div className="text-base font-semibold text-gray-900 dark:text-white">
                          {t.type === "payment" ? "+" : ""}
                          {numberWithCommas(t.amount)}
                        </div>
                      </div>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        {transactionDescriptions.current[i][0]}
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        {transactionDescriptions.current[i][1]}
                      </p>
                    </div>
                  </div>
                </>
              ))}
            </ListItem>
          </List>
        </div>
      </div>
    </main>
  );
}
