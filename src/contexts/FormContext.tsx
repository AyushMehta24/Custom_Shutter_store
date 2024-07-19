
import React, { createContext, useContext, ReactNode } from "react";
import { useForm, FieldValues, UseFormReturn } from "react-hook-form";

interface FormContextType extends UseFormReturn<FieldValues> {}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider = ({ children }: FormProviderProps) => {
  const methods = useForm<FieldValues>({
    defaultValues: {
      discountInfo: {
        discountType: "amount",
      },
    },
  });
  return (
    <FormContext.Provider value={methods}>{children}</FormContext.Provider>
  );
};
