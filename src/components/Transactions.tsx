import { List } from "flowbite-react";
import { Avatar } from "flowbite-react";
import { Link } from "react-router-dom";
import { ListItem } from "flowbite-react";
import { useContext, useRef } from "react";
import numberWithCommas from "../utils/numberWithCommas";
import { TransactionsContext } from "../context/TransactionsContext";
import getTransactionDescription from "../utils/getTransactionDescription";

export default function Transactions() {
  const transactions = useContext(TransactionsContext);

  const transactionDescriptions = useRef<string[][]>([]);
  if (transactionDescriptions.current.length === 0)
    for (let i = 0; i < transactions.length; i++) {
      const description = getTransactionDescription(transactions[i]);
      transactionDescriptions.current.push(description);
    }

  return (
    <List
      unstyled
      className="w-full divide-y divide-gray-200 rounded-lg bg-white px-5 dark:divide-gray-700 dark:bg-gray-800"
    >
      <ListItem className="pt-3 pb-3 sm:pt-4">
        {transactions.map((t, i) => (
          <Link
            to={`/transactions/${t.id}`}
            key={t.id}
            className="cursor-pointer"
          >
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
          </Link>
        ))}
      </ListItem>
    </List>
  );
}
