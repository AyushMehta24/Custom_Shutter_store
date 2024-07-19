import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

export default function FormListData() {
  const formData = useSelector((state: RootState) => state.form); 
  console.log(formData);

  return <div>FormListData</div>;
}
