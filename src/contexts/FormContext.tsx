import React, { createContext, useContext, ReactNode } from "react";
import { useForm, FieldValues, UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "@/validators/shutterFormSchema";
import { AmountContext } from "./AmountContext";

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
  const { finalAmount } = useContext(AmountContext) as {
    finalAmount: number;
  };
  const methods = useForm<FieldValues>({
    resolver: yupResolver(validationSchema) as any,
    context: { finalAmount: finalAmount },
    defaultValues: {
      discountInfo: {
        discountType: "amount",
        discount: 0,
      },
    },
  });
  return (
    <FormContext.Provider value={methods}>{children}</FormContext.Provider>
  );
};
