"use client";

import TextComponent from "@/components/TextComponent";
import { BasicFieldsT } from "@/types/basicInfoTypes";
import React, { Dispatch, SetStateAction, useState } from "react";
import AddCustomer from "./AddCustomer";
import ButtonComponent from "@/components/ButtonComponent";
import SelectComponent from "@/components/SelectComponent";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const BasciInfoFields: BasicFieldsT[] = [
  {
    label: "Staff Name",
    name: "basicInfo.staffName",
    type: "text",
  },
  {
    label: "Customer Name",
    name: "basicInfo.customerName",
    type: "select",
  },
  {
    label: "Date",
    name: "basicInfo.date",
    type: "date",
  },
];

export default function BasicInfoSection({
  setIsModal,
}: {
  setIsModal: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  const customers = useSelector(
    (state: RootState) => state.customers.customers
  );
  const customerNames: string[] = [];
  customers.map((customer) => {
    customerNames.push(customer.customerName);
  });
  return (
    <div className="">
      <h2 className="text-xl font-semibold">Basic Information</h2>
      <div className=" flex gap-5">
        {BasciInfoFields.map((field) => {
          if (field.type === "select") {
            return (
              <SelectComponent
                key={field.name}
                label={field.label}
                name={field.name}
                options={customerNames}
              />
            );
          } else {
            return (
              <TextComponent
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type}
              />
            );
          }
        })}
        <div className="flex items-end">
          <ButtonComponent
            handleClick={() => setIsModal(true)}
            label={"Add New Customer"}
            customClass={" w-40 text-blue-500 border-blue-500 py-2"}
          />
        </div>
      </div>
    </div>
  );
}
