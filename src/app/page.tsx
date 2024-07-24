"use client";

import { AmountProvider } from "@/contexts/AmountContext";
import ShutterForm from "@/components/ShutterForm";
import store, { persistor } from "@/store/store";
import { Provider } from "react-redux";
import { Suspense } from "react";
import { PersistGate } from "redux-persist/integration/react";

export default function page(): JSX.Element {
  return (
    <div className="w-full p-5">
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AmountProvider>
              <Suspense>
                <ShutterForm />
              </Suspense>
            </AmountProvider>
          </PersistGate>
      </Provider>
    </div>
  );
}
