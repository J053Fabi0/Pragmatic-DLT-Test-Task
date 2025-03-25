import { createContext } from "react";
import type Transaction from "../types/transaction.type";

export const BalanceContext = createContext<number>(0);
export const BalanceContextUpdate = createContext<React.Dispatch<
  React.SetStateAction<number>
> | null>(null);
export const CardLimitContext = createContext<number>(0);
export const CardLimitContextUpdate = createContext<React.Dispatch<
  React.SetStateAction<number>
> | null>(null);

export const DailyPointsContext = createContext<number>(0);

export const TransactionsContext = createContext<Transaction[]>([]);
export const TransactionsContextUpdate = createContext<React.Dispatch<
  React.SetStateAction<Transaction[]>
> | null>(null);
