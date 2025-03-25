import { useEffect, useState } from "react";
import type Transaction from "../types/transaction.type";
import generateTransactions from "../utils/generateData";
import { TransactionsContext, TransactionsContextUpdate } from "./contexts";

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
