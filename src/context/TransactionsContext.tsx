import type Transaction from "../types/transaction.type";
import generateTransactions from "../utils/generateData";
import { createContext, useEffect, useState } from "react";

export const TransactionsContext = createContext<Transaction[]>([]);
export const TransactionsContextUpdate = createContext<React.Dispatch<
  React.SetStateAction<Transaction[]>
> | null>(null);

export function TransactionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    setTransactions(generateTransactions(10));
  }, []);

  return (
    <TransactionsContext.Provider value={transactions}>
      <TransactionsContextUpdate.Provider value={setTransactions}>
        {children}
      </TransactionsContextUpdate.Provider>
    </TransactionsContext.Provider>
  );
}
