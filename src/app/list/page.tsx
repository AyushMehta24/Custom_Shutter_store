"use client";

import React from "react";
import store from "@/store/store";
import { Provider } from "react-redux";
import OrdersList from "@/appPages/OrdersList";

export default function page() {
  return (
    <div>
      <Provider store={store}>
        <OrdersList />
      </Provider>
    </div>
  );
}
