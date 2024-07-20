"use client";

import { AmountProvider } from "@/contexts/AmountContext";
import { FormProvider } from "@/contexts/FormContext";
import ShutterForm from "@/pages/ShutterForm";
import store from "@/store/store";
import { Provider } from "react-redux";

export default function page(): JSX.Element {
  return (
    <div className="w-full p-5">
      <Provider store={store}>
        <AmountProvider>
          <FormProvider>
            <ShutterForm />
          </FormProvider>
        </AmountProvider>
      </Provider>
    </div>
  );
}
