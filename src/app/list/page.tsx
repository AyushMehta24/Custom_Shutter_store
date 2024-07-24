"use client";

import React from "react";
import store, { persistor } from "@/store/store";
import { Provider } from "react-redux";
import OrdersList from "@/components/OrdersList";
import { PersistGate } from "redux-persist/integration/react";

export default function page() {
  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <OrdersList />
        </PersistGate>
      </Provider>
    </div>
  );
}
