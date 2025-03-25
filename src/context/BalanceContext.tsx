import {
  BalanceContext,
  CardLimitContext,
  BalanceContextUpdate,
  CardLimitContextUpdate,
} from "./contexts";
import _ from "lodash";
import { useState } from "react";

export default function BalanceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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
