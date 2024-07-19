"use client"

import FormDataListPage from "@/pages/FormListData";
import React from "react";
import store from "@/store/store";
import { Provider } from "react-redux";

export default function page() {
  return (
    <div>
      <Provider store={store}>
        <FormDataListPage />
      </Provider>
    </div>
  );
}
