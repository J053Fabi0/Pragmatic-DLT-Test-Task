import TransactionsList from "./views/TransactionsList";
import TransactionDetail from "./views/TransactionDetail";
import { Routes, Route, Navigate } from "react-router-dom";
import { BalanceProvider } from "./context/BalanceContext";
import { DailyPointsProvider } from "./context/DailyPoints";
import { TransactionsProvider } from "./context/TransactionsContext";

export default function App() {
  return (
    <TransactionsProvider>
      <BalanceProvider>
        <DailyPointsProvider>
          <main className="flex min-h-screen flex-col items-center bg-gray-200 px-4 py-24 dark:bg-gray-900">
            <Routes>
              <Route path="/" element={<TransactionsList />} />
              <Route path="/transactions" element={<TransactionsList />} />
              <Route path="/transactions/:id" element={<TransactionDetail />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </DailyPointsProvider>
      </BalanceProvider>
    </TransactionsProvider>
  );
}
