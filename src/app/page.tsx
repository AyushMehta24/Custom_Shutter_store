"use client";

import { AmountProvider } from "@/contexts/AmountContext";
import { FormProvider } from "@/contexts/FormContext";
import ShutterForm from "@/pages/ShutterForm";

export default function page(): JSX.Element {
  return (
    <div className="w-full p-5">
      <FormProvider>
        <AmountProvider>
          <ShutterForm />
        </AmountProvider>
      </FormProvider>
    </div>
  );
}
