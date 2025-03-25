import _ from "lodash";
import { createContext, useState } from "react";

export const BalanceContext = createContext<number>(0);
export const BalanceContextUpdate = createContext<React.Dispatch<
  React.SetStateAction<number>
> | null>(null);

export function BalanceProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState<number>(_.random(10, 300, true));

  return (
    <BalanceContext.Provider value={balance}>
      <BalanceContextUpdate.Provider value={setBalance}>
        {children}
      </BalanceContextUpdate.Provider>
    </BalanceContext.Provider>
  );
}
