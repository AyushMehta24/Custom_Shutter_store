"use client";

import RadioComponent from "@/components/RadioComponent";
import TextComponent from "@/components/TextComponent";
import { AmountContext } from "@/contexts/AmountContext";
import { FormType } from "@/types/basicInfoTypes";
import React, { useContext, useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

const Radio_Options: {
  name: string;
  label: string;
  value: string;
}[] = [
  { name: "discountInfo.discountType", label: "Amount", value: "amount" },
  {
    name: "discountInfo.discountType",
    label: "Percentage",
    value: "percentage",
  },
];

export default function DiscountSection({
  register,
  errors,
}: {
  register: UseFormRegister<FormType>;
  errors: FieldErrors<FormType>;
}): JSX.Element {
  const { finalAmount } = useContext(AmountContext) as {
    finalAmount: number;
  };
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState("amount");

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold">Discount Information</h2>
      <div className="flex flex-col gap-3">
        <RadioComponent
          register={register}
          errors={errors}
          options={Radio_Options}
          label={"Discount Type"}
          handleChange={(e) => {
            setDiscountType(e.target.value);
          }}
        />
        <TextComponent
          register={register}
          errors={errors}
          label={"Discount"}
          name={"discountInfo.discount"}
          type={"text"}
          handleChange={(e) => {
            setDiscount(+e.target.value);
          }}
        />
        <p>
          Payable Amount :{" "}
          {discount > 0 && discount <= finalAmount
            ? discountType === "amount"
              ? finalAmount - discount
              : finalAmount - (finalAmount * discount) / 100
            : finalAmount}
        </p>
      </div>
    </div>
  );
}
