import { Routes, Route } from "react-router-dom";
import TransactionsList from "./views/TransactionsList";
import TransactionDetail from "./views/TransactionDetail";
import { TransactionsProvider } from "./context/TransactionsContext";

export default function App() {
  return (
    <TransactionsProvider>
      <Routes>
        <Route path="/" element={<TransactionsList />} />
        <Route path="/transaction/:id" element={<TransactionDetail />} />
      </Routes>
    </TransactionsProvider>
  );
}
