import React, { createContext, ReactNode, useState } from "react";

export const AmountContext = createContext<{
  finalAmount: number;
  setFinalAmount: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

export const AmountProvider = ({ children }: { children: ReactNode }) => {
  const [finalAmount, setFinalAmount] = useState(0);
  return (
    <AmountContext.Provider
      value={{ finalAmount, setFinalAmount }}
    >
      {children}
    </AmountContext.Provider>
  );
};
