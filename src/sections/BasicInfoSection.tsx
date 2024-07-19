"use client";

import TextComponent from "@/components/TextComponent";
import { BasicFieldsT } from "@/types/basicInfoTypes";
import React from "react";

const BasciInfoFields: BasicFieldsT[] = [
  {
    label: "Staff Name",
    name: "basicInfo.staffName",
    type: "text",
  },
  {
    label: "Customer Name",
    name: "basicInfo.customerName",
    type: "text",
  },
  {
    label: "Date",
    name: "basicInfo.date",
    type: "date",
  },
];

export default function BasicInfoSection():JSX.Element {
  return (
    <div>
      {BasciInfoFields.map((field: BasicFieldsT):JSX.Element => {
        return (
          <TextComponent
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
          />
        );
      })}
    </div>
  );
}
