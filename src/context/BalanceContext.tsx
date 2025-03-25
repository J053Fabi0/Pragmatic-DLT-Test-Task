import _ from "lodash";
import { createContext, useState } from "react";

export const BalanceContext = createContext<number>(0);
export const BalanceContextUpdate = createContext<React.Dispatch<
  React.SetStateAction<number>
> | null>(null);
export const CardLimitContext = createContext<number>(0);
export const CardLimitContextUpdate = createContext<React.Dispatch<
  React.SetStateAction<number>
> | null>(null);

export function BalanceProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState<number>(_.random(10, 300, true));
  const [cardLimit, setCardLimit] = useState<number>(1500);

  return (
    <BalanceContext.Provider value={balance}>
      <BalanceContextUpdate.Provider value={setBalance}>
        <CardLimitContext.Provider value={cardLimit}>
          <CardLimitContextUpdate.Provider value={setCardLimit}>
            {children}
          </CardLimitContextUpdate.Provider>
        </CardLimitContext.Provider>
      </BalanceContextUpdate.Provider>
    </BalanceContext.Provider>
  );
}
